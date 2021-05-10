// page/style-c/item-page/item-page.js
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
          
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
