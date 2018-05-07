// components/MineGrid/MineGrid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    sortArr(a, b) {
      return a.index > b.index ? 1 : -1
    },
    /**
     * 初始化棋盘
     */
    initMineBoard() {
      let arr = []
      arr.filter(item => {
        return Math.random() > 0.5
      })
      for (let i = 0; i < this.data.rowNum * this.data.colNum; i++) {
        arr.push({
          index: i, // 顺序
          selected: 0 // 是否打开
        })
      }
      arr.sort(() => Math.random() * 3 - 1)
      for (let i = 0; i < this.data.mineNum; i++) {
        arr[i].selected = 1
      }
      arr.sort(this.sortArr)
      console.log(arr)
      util.setData(this, {
        chessArr: arr
      })
    },
    selectedFlag(num) {
      let str = ''
      if (num === 1) {
        str = '旗'
      } else if (num === 2) {
        str = '雷'
      } else if (num === 3) {
        str = '空'
      }
      debugger
      return str
    }
  }
})
