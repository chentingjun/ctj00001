//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    let logs = [{
      time: '2018/05/05',
      title: '发布第一版',
      intros: ['初版拼图']
    }, {
      time: '2018/05/12',
      title: '优化拼图，增加五子棋',
      intros: [
        '修复图片边缘样式',
        '增加本地自定义图片背景',
        '增加计时功能',
        '增加计步功能',
        '增加五子棋',
        '先后手、悔棋、撤消悔棋、重新开始'
      ]
    }]
    this.setData({
      logs
    })
  }
})
