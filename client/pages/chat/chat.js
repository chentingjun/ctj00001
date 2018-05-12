// pages/chat/chat.js
const app = getApp()
const { qcloud } = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let con = new qcloud.Tunnel('https://nvwzl3rr.qcloud.la', 'wss://nvwzl3rr.ws.qcloud.la')
    con.open()
    con.emit('hello')
    // wx.connectSocket({
    //   url: 'wss://nvwzl3rr.ws.qcloud.la',
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   protocols: ['protocol1'],
    //   method: "GET",
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})