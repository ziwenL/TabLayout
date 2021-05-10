// page/style-b/style-b.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["第一個", "第二個", "第三個", "第四個", "第五個"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 页面切换事件监听
   */
  bindPageChange: function (e) {
    var currentPosition = e.detail
    wx.showToast({
      title: String(currentPosition),
    })
  }
})