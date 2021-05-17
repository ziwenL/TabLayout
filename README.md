# TabLayout
:star:<a href="https://blog.csdn.net/lzw398756924/article/details/110000692">博客地址</a>:star:
<p>　　tab-layou 是一个基于小程序端为了实现贴近原生端 TabLayout + ViewPager 的功能及切换效果的自定义组件。</p>
<p>　　本项目旨在展示 tab-layout 的源码及基本使用与显示效果。</p>

## 基本介绍
<p>　　主要通过 <a href="https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html" rel="nofollow">scroll-view</a> 、<a href="https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html" rel="nofollow">swiper</a> 、<a href="https://developers.weixin.qq.com/miniprogram/dev/component/swiper-item.html" rel="nofollow">swiper-item</a> 、<a href="https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html" rel="nofollow">movable-area</a> 、<a href="https://developers.weixin.qq.com/miniprogram/dev/component/movable-view.html" rel="nofollow">movable-view</a> 配合 <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html" rel="nofollow">插槽</a> 和 <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html" rel="nofollow">抽象节点</a> 来实现该组件。 <p>
<p><b>该组件具备以下功能点：</b><p>
<ul>
  <li>
    <p>指示器（Index）具有切换过渡效果</p>
  </li>
  <li>
    <p>指示器（Index）需可自定义，常见的有：可固定宽度、可与 Tab 内容等宽、可覆盖在 Tab 上</p>
  </li>
  <li>
    <p>Tab 可自定义、可支持自动适应父控件宽度等分 Tab 宽度</p>
  </li>
  <li>
    <p>当 Tab 总宽度超出父控件宽度时，Tab 行支持滚动且切换 Page 时保证当前 Tab 可见</p>
  </li>
  <li>
    <p>支持 Page 切换监听</p>
  </li>
</ul>
<p><b>属性说明</b></p>

|属性|类型|默认值|必填|说明|
|:---:|:---:|:---:|:---:|:---:|
| tabList | Array |[]|是|数据源，根据数据源将自动生成对应 Tab 和 Page 数|
| isTabCenter | boolean |false|否|Tab 是否居中显示，Tab 总宽度未填满 TabLayout 时,可通过该属性讲 Tab 居中显示|
| targetIndex | number |0|否|选中 Tab 下标，可通过该属性跳转指定 Tab 与 Page|
| indexAreaHeight | number |10|是|Index 及其活动区域高度，单位为 px|
| indexStyle | string | |否|可通过该属性设置 index 的 style|
| indexAreaStyle | string | |否|可通过该属性设置 index 活动区域的 style|
| isStopTouchMove | boolean |false|否|是否禁止左右滑动， true 禁止 false 允许|
| isTabSpaceEqual | boolean |false|否|是否根据组件宽度等分 Tab 宽度|
| pageChange | eventhandle | |否|页面切换监听事件|
| index | slot(插槽) | |否|自定义 Index view 插槽|
| subContent | slot(插槽) | |否|位于 Tab 与 Page 之间的插槽，不在 Tab/Page 内，即不会随着 Tab/Page 变动或切换|
| item-tab | generic(抽象节点) | |是|插入自定义 Tab View 的抽象节点，决定 Tab 样式与内容|
| item-page | generic(抽象节点) | |是|插入自定义 Page View 的抽象节点，决定 Page 样式与内容|


## 效果演示

![效果演示 -- 常见样式](https://img-blog.csdnimg.cn/20210511160509564.gif)
![效果演示 -- Tab 宽度等分](https://img-blog.csdnimg.cn/20210511160659754.gif)
![效果演示 -- Page 内容不一致](https://img-blog.csdnimg.cn/20210511161009462.gif)
![效果演示 -- Index 覆盖 Tab](https://img-blog.csdnimg.cn/20210517110434660.gif)

## 使用步骤
<p><b>1.</b> 复制 <a href="https://github.com/ziwenL/TabLayout/tree/main/components/tab-layout" rel="nofollow">tab-layout</a> 组件(即 tab-layout.js、tab-layout.json、tab-layout.wxml 和 tab-layout.wxss 文件)到项目中</p>
<p><b>2.</b> 自定义 Tab 与 Page 组件，并声明 item、position 和 currentIndex 三个自定义属性</p>

```
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 对应赋值给 tab-layout 的 tabList 的 item
     */
    item: Object,
    /**
     * 当前组件 (page) 对应在 tabList 中的位置
     */
    position: Number,
    /**
     * 当前 tab-layout 选中位置
     */
    currentIndex: Number,
  },
  .......
)}

```
<p><b>3.</b> 在页面的配置文件中引用 tab-layout 、自定义的 Tab 和 Page 组件</p>

```
{
  "usingComponents": {
    "tab-layout":"/components/tab-layout/tab-layout",
    "item-page":"./item-page/item-page",
    "item-tab":"./item-tab/item-tab"
  }
}
```
<p><b>4.</b> 在布局文件中使用 TabLayout 组件，并通过抽象节点 generic:item-tab 和 generic:item-page 分别与自定义的 Tab 和 Page 绑定</p>
<p><b>5.</b> 使用自定义属性 indexAreaHeight 为 Index 及其活动区域设置高度</p>
<p><b>6.</b> 使用自定义属性 tabList 设置数据源，根据数据源将自动生成对应数量的 Tab 和 Page</p>

```
<tab-layout tabList="{{tabList}}" indexAreaHeight="5" generic:item-tab="item-tab" generic:item-page="item-page">
  <view slot="index">
    <view class="index"></view>
  </view>
</tab-layout>
```
<p><b>7.</b> 按需选择可采用插槽 slot="index" 或自定义属性 indexStyle 设置 Index 的样式</p>
<p>　　<b>7.1</b> 采用插槽 slot="index" 方式设置 Index 样式</p>
<p>　　.wxml 中</p>

```
<tab-layout tabList="{{tabList}}" indexAreaHeight="5" generic:item-tab="item-tab" generic:item-page="item-page">
  <view slot="index">
    <view class="index"></view>
  </view>
</tab-layout>
```
<p>　　.wxss 中</p>

```
.index{
  width: 60rpx;
  height: 5rpx;
  background: linear-gradient(to right, #00CFFF, #00A1FF);
  border-radius: 2rpx;
}
```
<p>　　<b>7.2</b> 采用自定义属性 indexStyle 方式设置 Index 样式</p>
<p>　　.wxml 中</p>

```
<tab-layout tabList="{{tabList}}" indexAreaHeight="32" generic:item-tab="item-tab" generic:item-page="item-page"
 indexStyle="background:#4D999999;border-radius: 10rpx;">
</tab-layout>
```

## 注意事项
<p><b>可能出现问题：</b></p>
<p><b>1.</b> 当 item-page 中存在竖直滚动的 scroll-view 时出现滑动冲突该如何解决？</p>
<p>　　在 item-page 组件 attached 方法中按需为 scroll-view 设置固定高度或占满屏幕剩余位置<a href="https://github.com/ziwenL/TabLayout/blob/main/pages/style-a/item-page/item-page.js" rel="nofollow">（点击跳转查看参考写法）</a></p>
<p><b>2.</b> 当 item-page 或 item-tab 中调用 this.setData ( ) 之后，发现自定义属性 item 获取值为 null ?</p>
<p>　　出现该种情况，应在 this.setData ( ) 之后，执行 <b>this.triggerEvent("updata")</b> 触发 tab-layout 的 onPageUpdata 方法重新得到 item 值</p>
<p><b>3.</b> 如何实现 " 懒加载 " ，即当 Tab 首次被选中时，才进行对应 Page 的数据加载？</p>
<p>　　为自定义组件 item-page 设置一个懒加载标志位暂定为 isLoadData ，通过订阅自定义属性 currentIndex ，在 currentIndex 属性变化或组件进行到 attached 生命周期时，通过判断 isLoadData 和 currentIndex 是否与 position 相等来进行数据加载并调整标志位<a href="https://github.com/ziwenL/TabLayout/blob/main/pages/style-a/item-page/item-page.js" rel="nofollow">（点击跳转查看参考写法）</a></p>

## 最后
<p>　　小程序代码片段：https://developers.weixin.qq.com/s/d9UT7emF7Aq0</p>
<h3>About Me<h3>
<ul>
<li>
<p>Email: ziwen.lan@foxmail.com</p>
</li>
</ul>
