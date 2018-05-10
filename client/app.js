//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
const service = require('./utils/service.js');
const util = require('./utils/util.js');

App({
    service,
    util,
    onLaunch: function () {
        wx.getSystemInfo({
            success: systemInfo => {
                this.globalData.systemInfo = systemInfo
            }
        })
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    globalData: {
        systemInfo: null,
        userInfo: null
    },
    rpx2px(num) {
        return parseInt(this.globalData.systemInfo.screenWidth / 750 * num)
    }
})