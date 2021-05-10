// page/style-b/item-page/item-page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    position: Number,
    currentIndex: {
      type: Number,
      observer: function (newVal) {
        var position = this.data.position
        if (position == newVal) {
          // TODO 滚到到当前 Page 时
          if (!this.data.isLoadData) {
            // TODO 可在此处进行懒加载
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
    isLoadData: false
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
      this.setData({
        isLoadData: true
      })
      this.triggerEvent("updata")
      //TODO 
    }
  }
})