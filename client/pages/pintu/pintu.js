// pages/pintu/pintu.js
const app = getApp()
const { util, rpx2px } = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pintuW: 0.8,
    imgW: 0,
    row: 3,
    col: 5,
    picArr: [],
    success: false,
    timer: null,
    time: 0, // 计时器
    stepNum: 0 // 计步器
  },

  customData: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initPicArr()
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
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
  /**
   * 初始化picArr
   */
  initPicArr () {
    this.success = false
    let r = this.data.row
    let c = this.data.col
    let screenW = 750 // 全屏宽750rpx
    let imgW = rpx2px(parseInt(screenW * this.data.pintuW / c))
    let arr = []
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        arr.push({
          width: imgW,
          height: imgW,
          backgroundPosition: -j * imgW + 'px ' + -i * imgW + 'px'
        })
      }
    }
    arr[arr.length - 1].backgroundPosition = imgW + 'px ' + imgW + 'px'
    util.setData(this, {
      imgW: imgW
    }, false, () => {
      this._unsetPicArr(arr)
    })
  },
  /**
   * 交换图片
   */
  swapPic (e) {
    let index = e.target.dataset.index
    let arr = this.data.picArr
    let col = Number(this.data.col)
    let r = parseInt(index / col)
    let c = index % col
    let keyVal = this.data.imgW + 'px ' + this.data.imgW + 'px'
    let clickVal = arr[index].backgroundPosition
    let isFind = false
    if (r > 0) { // 上
      let changeVal = arr[index - col].backgroundPosition
      if (changeVal === keyVal) {
        isFind = true
        arr = this._swapArr(arr, index - col, index)
      }
    }
    if (r < this.data.row - 1 && !isFind) {
      let changeVal = arr[index + col].backgroundPosition
      if (changeVal === keyVal) {
        isFind = true
        arr = this._swapArr(arr, index + col, index)
      }
    }
    if (c > 0 && !isFind) {
      let changeVal = arr[index - 1].backgroundPosition
      if (changeVal === keyVal) {
        isFind = true
        arr = this._swapArr(arr, index - 1, index)
      }
    }
    if (c < col - 1 && !isFind) {
      let changeVal = arr[index + 1].backgroundPosition
      if (changeVal === keyVal) {
        isFind = true
        arr = this._swapArr(arr, index + 1, index)
      }
    }
    if (isFind) {
      let setData = { picArr: arr, stepNum: this.data.stepNum + 1 }
      if (this.data.time === 0) {
        console.log('开始计时')
        clearInterval(this.data.timer)
        setData.timer = setInterval(() => {
          let t = this.data.time + 1
          console.log('t', t)
          util.setData(this, {time: t})
        }, 1000)
      }
      this._isSuccess(arr)
      util.setData(this, setData)
    }
  },
  /**
   * 行input
   * @param {*} e 
   */
  rowInput (e) {
    let oRow = this.data.row
    if (e.detail.value >= 3 && e.detail.value <= 10) {
      util.setData(this, {
        row: e.detail.value
      }, false, () => {
        this.initPicArr()
      })
    } else {
      util.setData(this, {
        row: oRow
      })
    }
  },
  /**
   * 列input
   * @param {*} e 
   */
  colInput(e) {
    let oCol = this.data.col
    if (e.detail.value >= 3 && e.detail.value <= 10) {
      util.setData(this, {
        col: e.detail.value
      }, false, () => {
        this.initPicArr()
      })
    } else {
      util.setData(this, {
        col: oCol
      })
    }
  },
  /**
   * 乱序
   */
  _unsetPicArr(arr) {
    arr = arr || [...this.data.picArr]
    let len = arr.length
    for (let i = 0; i < arr.length; i++) {
      let unsetIndex = parseInt(Math.random() * len)
      arr = this._swapArr(arr, i, unsetIndex)
    }
    this._isSuccess(arr)
    if (this.data.timer) {
      console.log('清空定时器')
      clearInterval(this.data.timer)
    }
    util.setData(this, {
      picArr: arr,
      time: 0,
      timer: null
    })
  },
  /**
   * 交换数组
   * @param {交换数组源} arr 
   * @param {交换源} i 
   * @param {被交换源} j 
   */
  _swapArr (arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr
  },
  _isSuccess (arr) {
    let r = this.data.row
    let c = this.data.col
    let imgW = this.data.imgW
    let successNum = 0
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        let index = i * c + j
        let backgroundPosition = -j * imgW + 'px ' + -i * imgW + 'px'
        if (backgroundPosition === arr[index].backgroundPosition) {
          successNum++
        }
      }
    }
    util.setData(this, {
      success: successNum === r * c - 1
    })
  }
})