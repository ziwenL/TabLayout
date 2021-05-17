const app = getApp()

Page({
  data: {
    styleList: [{
        title: "常见样式",
        sub: " Page 懒加载；\n Page 切换时 Tab 自动跟随滚动;\n Page 内 scroll-view 滚动处理;"
      },
      {
        title: "Tab 宽度等分",
        sub: "Tab 宽度等分;\n跳转指定 Position = 2;\n监听页面切换;"
      },
      {
        title: "Page 内容不一致",
        sub: "根据 Position 变化调整 Page 布局;\n Index 宽度与 Tab 宽度保持一致;\n Tab 总宽度未填满 TabLayout 时居中显示 Tab;"
      },
      {
        title: "Index 覆盖 Tab",
        sub: "Index 悬浮覆盖在 Tab 上;\nTab 与 Index 之间插入固定 View;\n Page 禁止左右滑动;"
      },
    ]
  },

  onLoad() {

  },

  tapStyle: function (e) {
    var position = e.currentTarget.dataset.position
    switch (position) {
      case 0:
        wx.navigateTo({
          url: '/pages/style-a/style-a',
        })
        break
      case 1:
        wx.navigateTo({
          url: '/pages/style-b/style-b',
        })
        break
      case 2:
        wx.navigateTo({
          url: '/pages/style-c/style-c',
        })
        break
        case 3:
          wx.navigateTo({
            url: '/pages/style-d/style-d',
          })
          break
    }
  }
})