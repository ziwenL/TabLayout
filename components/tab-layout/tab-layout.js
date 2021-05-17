// components/tab-layout/tab-layou.js
Component({

  options: {
    // 启用 slot 属性
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * Tab 数据源
     */
    tabList: {
      type: Array,
      value: [],
      observer: function (newVal) {
        if (this.data.tabList.length != 0 &&
          this.data.tabWidthList.length == 0 &&
          !this.data.isInit) {
          this.init()
        }
      }
    },
    /**
     * Tab 是否居中显示
     * Tab 总宽度未填满 TabLayout 时,可通过该属性讲 Tab 居中显示
     */
    isTabCenter: {
      type: Boolean,
      value: false
    },
    /**
     * 选中 Tab 下标
     */
    targetIndex: {
      type: Number,
      value: 0
    },
    /**
     * Index 高度
     */
    indexAreaHeight: {
      type: Number,
      value: 10
    },
    /**
     * Index 样式
     */
    indexStyle: {
      type: String
    },
    /**
     * IndexArea 样式
     * Index 活动区域样式
     */
    indexAreaStyle: {
      type: String
    },
    /**
     * 是否禁止左右滑动 true 禁止 false 允许
     * ps：可能会影响页面内滚动，谨慎使用
     */
    isStopTouchMove: {
      type: Boolean,
      value: false
    },
    /**
     * 是否根据组件宽度等分 Tab 宽度
     */
    isTabSpaceEqual: {
      type: Boolean,
      value: false
    },
    /**
     * 是否设置 Index 悬浮在 Tab 上
     */
    isSetIndexPositionAbsolute:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 是否初始化
     */
    isInit: false,
    /**
     * Tab 变动前的下标
     */
    currentIndex: 0,
    /**
     * 促使 ScrollView 横向滚动的偏移量
     */
    tabLayoutScrollLeft: 0,
    /**
     * 当前组件宽度
     */
    tabLayoutWidth: wx.getSystemInfoSync().windowWidth,
    /**
     * 单个 Tab 的宽度 （ 也是 index 的宽度 ）
     */
    tabWidth: 0,
    /**
     * Tab 宽度集合
     */
    tabWidthList: [],
    /**
     * Index 可活动宽度（ 实际是 tabLayout 的内容总宽度 ）
     */
    indexAreaWidth: 0,
    /**
     * Index 横向移动位置
     */
    tabIndexScrollX: 0,
    /**
     * 所有 Tab 中的最小宽度
     */
    minTabWidth: 0,
    /**
     * Index 的偏移量（针对于当前 Tab 而言）
     */
    indexOffset: 0
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      // 获取组件相关宽度
      if (this.data.tabList.length != 0 && !this.data.isInit) {
        this.init()
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init: function () {
      this.data.isInit = true
      var that = this
      var indexAreaWidth = that.data.indexAreaWidth
      var tabList = that.data.tabList
      var tabWidthList = that.data.tabWidthList
      var targetIndex = that.data.targetIndex
      var isTabSpaceEqual = that.data.isTabSpaceEqual
      var tabLayoutWidth = that.data.tabLayoutWidth
      var minTabWidth = that.data.minTabWidth
      var indexStyle = that.data.indexStyle
      var query = this.createSelectorQuery();
      // 选择 TabLayout 
      query.select('#tab-layout').boundingClientRect()
      // 选择所有 Tab 
      tabList.forEach(function (item, index) {
        query.select('#tab' + index).boundingClientRect()
      });
      query.exec(function (rect) {
        // 当前 TabLayout 宽度 
        tabLayoutWidth = rect[0].width
        if (isTabSpaceEqual) {
          // Tab 宽度等分
          var tabWidth = tabLayoutWidth / tabList.length
          minTabWidth = tabWidth
          tabList.forEach(function (item, index) {
            indexAreaWidth += tabWidth
            tabWidthList.push(tabWidth)
          })
        } else {
          rect.forEach(function (item, index) {
            if (index != 0) {
              // 记录所有 Tab 宽度
              var tabWidth = item.right - item.left
              if (minTabWidth == 0 || minTabWidth > tabWidth) {
                minTabWidth = tabWidth
              }
              indexAreaWidth += tabWidth
              tabWidthList.push(tabWidth)
            }
          })
        }
        that.setData({
          tabLayoutWidth: tabLayoutWidth,
          minTabWidth: minTabWidth,
          tabWidth: that.isEmpty(indexStyle) ? minTabWidth : tabWidthList[that.data.currentIndex],
          tabWidthList: tabWidthList,
          indexAreaWidth: indexAreaWidth,
        })
        if (targetIndex == 0) {
          if (that.isEmpty(indexStyle)) {
            //设置 Index 偏移量
            var currentTabWidth = tabWidthList[0]
            if (currentTabWidth != minTabWidth) {
              var indexOffset = (currentTabWidth - minTabWidth) / 2
              that.setData({
                indexOffset: indexOffset,
                tabIndexScrollX: indexOffset
              })
            }
          }
        } else {
          // 跳转指定页面
          that.handlePageChange(targetIndex)
        }
      })
    },

    /**
     * tab 点击事件
     */
    tapTab: function (e) {
      var currentPageIndex = e.currentTarget.dataset.index
      var targetIndex = this.data.targetIndex
      if (currentPageIndex != targetIndex) {
        this.setData({
          targetIndex: currentPageIndex,
        })
        this.triggerEvent("pageChange", currentPageIndex)
      }
    },

    /**
     * 页面切换监听 
     */
    onChangePage: function (e) {
      let targetIndex = e.detail.current
      this.handlePageChange(targetIndex)
    },

    /**
     * 禁止滑动
     */
    stopTouchMove: function (e) {
      return false
    },

    /**
     * 处理页面切换
     * 主要计算 Index 和 Tablayout 的滚动距离
     * @param {Number} targetIndex 目标位置
     */
    handlePageChange(targetIndex) {
      var currentIndex = this.data.currentIndex
      var tabLayoutWidth = this.data.tabLayoutWidth
      var tabWidthList = this.data.tabWidthList
      var tabIndexScrollX = this.data.tabIndexScrollX
      var tabList = this.data.tabList
      var minTabWidth = this.data.minTabWidth
      var indexStyle = this.data.indexStyle
      /**
       * 计算此次 Page 切换 Index 需要移动的距离 index_dx
       */
      var index_dx = 0
      var jumpCount = targetIndex - currentIndex
      tabWidthList.forEach(function (item, index) {
        if (jumpCount > 0) {
          if (index >= currentIndex && index < targetIndex) {
            index_dx += item
          }
        } else {
          if (index >= targetIndex && index < currentIndex) {
            index_dx -= item
          }
        }
      })
      /**
       * 当采用 slot 方式设置 Index 时，固定 Index 显示区域宽度避免滑动时跳动
       */
      if (this.isEmpty(indexStyle)) {
        var targetTabWidth = tabWidthList[targetIndex]
        var indexOffset = this.data.indexOffset
        index_dx = index_dx + ((targetTabWidth - minTabWidth) / 2) - indexOffset
        this.data.indexOffset = ((targetTabWidth - minTabWidth) / 2)
      }
      /**
       * 计算此次 Page 切换为了完全显示当前选中 Tab , TabLayout 需要横向滚动的距离 tabLayoutScrollLeft
       */
      var tabLayoutScrollLeft = 0
      // 当前 ScrollView 偏移量（包含用户手动移动的偏移量,最准确）
      var currentTabLayoutScrollLeft = this.data.tabLayoutScrollLeft
      // 判断当前选中 Tab 的前一个 Tab 和后一个 Tab 是否超出屏幕，是则使 Tablayout 滚动，使得三个 Tab 可以完全展示在屏幕内
      if (targetIndex == 0) {
        tabLayoutScrollLeft = 0
      } else {
        var indexLeft = 0
        var indexRight = 0
        tabWidthList.forEach(function (item, index) {
          if (index < targetIndex - 1) {
            indexLeft += item
          }
          if (index <= targetIndex + 1) {
            indexRight += item
          }
        })
        if (indexLeft - currentTabLayoutScrollLeft < 0) {
          tabLayoutScrollLeft = currentTabLayoutScrollLeft + (indexLeft - currentTabLayoutScrollLeft)
        } else if (indexRight + currentTabLayoutScrollLeft > tabLayoutWidth) {
          tabLayoutScrollLeft = indexRight - tabLayoutWidth
        }
      }
      this.setData({
        tabWidth: this.isEmpty(indexStyle) ? this.data.minTabWidth : tabWidthList[targetIndex],
        tabIndexScrollX: tabIndexScrollX + index_dx,
        currentIndex: targetIndex,
        targetIndex: targetIndex,
        tabLayoutScrollLeft: tabLayoutScrollLeft,
        tabList: tabList
      })
      // 传递 Page 切换事件
      this.triggerEvent("pageChange", targetIndex)
    },

    /**
     * 子 Page 刷新数据
     * 当子 Page 组件中调用 setData 方法时，可能会导致子 Page 组件中获取到的 item 值为 null ，此时可通过触发该方法来重新获得 item 值
     */
    onPageUpdata: function () {
      this.setData({
        currentIndex: this.data.currentIndex,
        targetIndex: this.data.targetIndex,
        tabList: this.data.tabList
      })
    },

    /**
     *  String 对象判空
     */
    isEmpty(obj) {
      if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true;
      } else {
        return false;
      }
    }
  }
})