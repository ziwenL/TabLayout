// page/style-a/item-page/item-page.js
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
    currentIndex: {
      type: Number,
      observer: function (newVal) {
        var position = this.data.position
        if (position == newVal) {
          // 滚到到当前 Page 时
          if (!this.data.isLoadData) {
            // 可在此处进行懒加载
            this.lazyload()
          }
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoadData: false,
    triggered: false,
    /**
     * 屏幕高度
     */
    screenHeight: wx.getSystemInfoSync().windowHeight,
    /**
     * 当前 Page 组件高度，固定 scroll-view 高度解决嵌套滚动卡顿问题
     */
    pageHeight: 0,
    testData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      if (this.data.currentIndex == this.data.position) {
        this.lazyload()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 懒加载
     */
    lazyload() {
      wx.showLoading({
        title: '加载中',
      })
      var that = this
      var query = this.createSelectorQuery();
      query.select('#scroll-view').boundingClientRect()
      query.exec(function (rect) {
        var height = that.data.screenHeight - rect[0].top
        that.setData({
          isLoadData: true,
          pageHeight: height
        })
        that.triggerEvent("updata")
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    },

    /**
     * 下拉刷新
     */
    onRefresh: function (e) {
      var that = this
      var testData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      setTimeout(function () {
        that.setData({
          testData: testData,
          triggered: false
        })
        that.triggerEvent("updata")
      }, 1000)
    },

    /**
     * 加载更多
     */
    onLoadMore: function (e) {
      var testData = this.data.testData
      if (testData.length > 20) {
        return
      }
      wx.showLoading({
        title: '加载中',
      })
      testData.push(testData[testData.length - 1] + 1)
      testData.push(testData[testData.length - 1] + 1)
      testData.push(testData[testData.length - 1] + 1)
      testData.push(testData[testData.length - 1] + 1)
      this.setData({
        testData: testData
      })
      this.triggerEvent("updata")
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    }
  }
})