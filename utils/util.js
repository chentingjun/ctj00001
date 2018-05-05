const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装wx.setData，把一定间隔内的setData合并为一个
 *
 * 作者：刘志远 2018-01-10
 */
const setData = (thatPage, dataObj, rightnow = false, callback) => {
  clearTimeout(thatPage._setDataTimer)
  if (rightnow) {
    const data = {
      ...thatPage._dataToSet,
      ...dataObj
    }
    thatPage._dataToSet = null
    thatPage.setData(data, function () {
      typeof callback === 'function' && callback()
    })
  } else {
    thatPage._dataToSet = {
      ...thatPage._dataToSet,
      ...dataObj
    }
    // 延迟250ms渲染页面, 在此时间内如果有其他setData行为，取消上一次，再等待250ms一并渲染
    thatPage._setDataTimer = setTimeout(function () {
      if (thatPage._dataToSet) {
        const data = {
          ...thatPage._dataToSet
        }
        thatPage._dataToSet = null
        thatPage.setData(data, function () {
          typeof callback === 'function' && callback()
        })
      }
    }, 100)
  }
}

export {
  formatTime,
  setData
}
