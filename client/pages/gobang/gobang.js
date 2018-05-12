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
    row: 16,
    col: 16,
    spaceW: 30,
    chessArr: [],
    isWho: 1, // 1黑棋 2白棋
    type: 1,
    whoFirst: 1,
    chessState: 0, // 0 未开始 1 已开始 2 已结束
    success: false,
    historyArr: [],
    redoArr: []
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
      historyArr: [],
      redoArr: [],
      isWho,
      success: false
    })
  },

  downChess (e) {
    let isWho = this.data.isWho
    let historyArr = this.data.historyArr
    let chessArr = this.data.chessArr
    let dataObj = e.currentTarget.dataset
    let downObj = chessArr[dataObj.row][dataObj.col]
    if (downObj.active > 0) { return }
    let redoArr = []
    downObj.active = isWho
    historyArr.push({
      row: dataObj.row,
      col: dataObj.col,
      active: isWho
    })
    let setData = {
      chessArr,
      historyArr,
      redoArr
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
    let gridArr = []
    let chessArr = this.data.chessArr
    let successNum = 0
    let rowMinMax = {
      min: rowi - 4 > 0 ? rowi - 4 : 0,
      max: rowi + 4 > this.data.row - 1 ? this.data.row - 1 : rowi + 4
    }
    let colMinMax = {
      min: coli - 4 > 0 ? coli - 4 : 0,
      max: coli + 4 > this.data.col - 1 ? this.data.col- 1 : coli + 4
    }
    console.log(rowMinMax, colMinMax)
    let arr = []
    for (let i = rowMinMax.min; i <= rowMinMax.max; i++){ // 列
      arr.push(this.data.chessArr[i][coli].active)
    }
    console.log('-------列-------', arr)
    if (this.isFiveChess(arr)) { return }
    arr = []
    for (let i = colMinMax.min; i <= colMinMax.max; i++) { // 横
      arr.push(this.data.chessArr[rowi][i].active)
    }
    console.log('-------横-------', arr)
    if (this.isFiveChess(arr)) { return }
    arr = []
    let nr, nc, len
    if (rowi - rowMinMax.min > coli - colMinMax.min) { // 左斜
      nc = colMinMax.min
      nr = rowi - (coli - colMinMax.min)
    } else {
      nr = rowMinMax.min
      nc = coli - (rowi - rowMinMax.min)
    }
    while (nc < this.data.col && nr < this.data.row) {
      arr.push(this.data.chessArr[nr++][nc++].active)
    }
    console.log('-------左斜-------', arr)
    if (this.isFiveChess(arr)) { return }
    arr = []
    if (rowMinMax.max - rowi > coli - colMinMax.min) { // 右斜
      nc = colMinMax.min
      nr = rowi + (coli - colMinMax.min)
    } else {
      nr = rowMinMax.max
      nc = coli - (rowMinMax.max - rowi)
    }
    while (nc < this.data.col && nr > -1) {
      arr.push(this.data.chessArr[nr--][nc++].active)
    }
    console.log('-------右斜-------', arr)
    if (this.isFiveChess(arr)) { return }
  },

  isFiveChess (arr) {
    let isWho = this.data.isWho
    let isSuccess = false
    let chessState = this.data.chessState
    let reg = new RegExp(isWho + '+', 'g')
    let matchArr = arr.join('').match(reg) || []
    console.log(matchArr)
    let n = 0
    for (let i = 0; i < matchArr.length; i++) {
      if (matchArr[i].length > n) {
        n = matchArr[i].length
      }
    }
    if (n >= 5) {
      console.log('isSuccess')
      isSuccess = true
      chessState = 2
    }
    util.setData(this, {
      isWho: isWho === 1 ? 2 : 1,
      success: isSuccess,
      chessState
    })
    return isSuccess
  },

  // 悔棋
  prevHistory () {
    let historyArr = this.data.historyArr
    if (historyArr.length === 0) return
    let chessArr = this.data.chessArr
    let redoArr = this.data.redoArr
    let obj = historyArr.pop()
    redoArr.push({...obj})
    let isWho = chessArr[obj.row][obj.col].active
    chessArr[obj.row][obj.col].active = 0
    let setData = {
      chessArr,
      isWho,
      historyArr,
      redoArr
    }
    util.setData(this, setData)
  },

  // 撤消悔棋
  nextHistory () {
    let redoArr = this.data.redoArr
    if (redoArr.length === 0) return
    let chessArr = this.data.chessArr
    let historyArr = this.data.historyArr
    let obj = redoArr.pop()
    historyArr.push({ ...obj })
    let isWho = obj.active === 1 ? 2 : 1
    chessArr[obj.row][obj.col].active = obj.active
    let setData = {
      chessArr,
      isWho,
      historyArr,
      redoArr
    }
    util.setData(this, setData)
  }
})