//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    let logs = [{
      time: '2018/05/05',
      txt: '发布第一版'
    }]
    this.setData({
      logs
    })
  }
})
