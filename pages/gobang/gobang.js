// pages/gobang/gobang.js
const app = getApp()
const { util } = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pintuW: 0.8,
    row: 10,
    spaceW: 30,
    rowArr: [],
    isWho: 1, // 黑棋
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenW = 750 // 全屏宽750rpx
    let spaceW = parseInt(screenW * this.data.pintuW / this.data.row)
    let arr = []
    for (let i = 0; i < this.data.row; i++) {
      arr.push('')
    }
    util.setData(this, {
      rowArr: arr,
      spaceW: spaceW
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
  
  },

  downChess () {
    let isWho = this.data.isWho
  }
})