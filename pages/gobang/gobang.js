// pages/gobang/gobang.js
const app = getApp()
const {
  util,
  globalData
} = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pintuW: 0.8,
    row: 10,
    col: 10,
    spaceW: 30,
    chessArr: [],
    isWho: 1, // 1黑棋 2白棋
    type: 1,
    whoFirst: 1,
    chessState: 0, // 0 未开始 1 已开始 2 已结束
    success: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initChess()
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

  initChess () {
    let screenW = globalData.systemInfo.screenWidth
    let spaceW = parseInt(screenW * this.data.pintuW / this.data.row)
    let arr = []
    for (let i = 0; i < this.data.row; i++) {
      arr.push([])
      for (let j = 0; j < this.data.col; j++) {
        arr[i].push({
          active: 0 // 0 未下子
        })
      }
    }
    let isWho = this.data.whoFirst
    util.setData(this, {
      chessArr: arr,
      spaceW: spaceW,
      chessState: 0,
      isWho
    })
  },

  downChess (e) {
    let isWho = this.data.isWho
    let chessArr = this.data.chessArr
    let dataObj = e.target.dataset
    let downObj = chessArr[dataObj.row][dataObj.col]
    if (downObj.active > 0) { return }
    downObj.active = isWho
    let setData = {
      chessArr
    }
    if (this.data.chessState === 0) {
      setData.chessState = 1
    }
    console.log(isWho, dataObj.row, dataObj.col)
    this.isSuccess(dataObj.row, dataObj.col)
    util.setData(this, setData)
  },

  initWhoFirst (e) {
    let chessState = this.data.chessState
    if (chessState > 0) {
      return
    }
    let isWho = parseInt(e.detail.value) || 1
    util.setData(this, {
      whoFirst: isWho,
      isWho
    })
  },

  isSuccess (rowi, coli) {
    console.log(rowi, coli)
    // let rowMinMax = {
    //   min: rowi - 4 > 0 ? rowi - 4 : 0,
    //   max: rowi + 4 > this.data.row ? this.data.row : rowi + 4
    // }
    // let colMinMax = {
    //   min: coli - 4 > 0 ? coli - 4 : 0,
    //   max: coli + 4 > this.data.col ? this.data.col : coli + 4
    // }
    // let arr1 = [], arr2 = [], arr3 = [], arr4 = []
    // for (let i = rowMinMax.min; i < rowMinMax.max; i++){
    //   arr1.push(this.data.chessArr[i][coli].active)
    // }
    // for (let i = colMinMax.min; i < colMinMax.max; i++) {
    //   arr1.push(this.data.chessArr[rowi][i].active)
    // }
    // let nr, nc, len
    // if (rowi - rowMinMax.min > coli - colMinMax.min) {
    //   nc = colMinMax.min
    //   nr = rowi - (coli - colMinMax.min)
    // } else {
    //   nr = rowMinMax.min
    //   nc = coli - (rowi - rowMinMax.min)
    // }
    // coli - colMinMax.min
  },

  isFiveChess (arr) {
    let isWho = this.data.isWho
    let reg = new RegExp(isWho + '+', 'g')
    let matchArr = arr.join('').match(reg)
    let n = 0
    for (let i = 0; i < matchArr.length; i++) {
      if (matchArr[i].length > n) {
        n = matchArr[i].length
      }
    }
    if (n === 5) {
      console.log('isSuccess')
    }
    console.log(matchArr)
    util.setData(this, {
      isWho: isWho === 1 ? 2 : 1
    })
  }
})