import * as RES from '../../utils/res'
import * as Storage from '../../utils/storage'
var util = require('../../utils/util.js')

// 获取全局应用程序实例对象
const app = getApp()

const pngHomeHeaderBg = '../../resource/bb_family~iphone.png'
const headerBgRatio = (210 / 375).toFixed(1)

const buildWeightIncrease = value => delta => {
  value.delta = delta
  if (value.delta > 0) {
    value.increase = 1
  } else if (value.delta === 0) {
    value.increase = 0
  } else {
    value.increase = -1
  }
}

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Fits',
    homeHeaderBg: pngHomeHeaderBg,
    homeHeaderBgWidth: app.globalData.windowWidth,
    homeHeaderBgHeight: headerBgRatio * app.globalData.windowWidth,
    contentHeight: app.globalData.windowHeight - headerBgRatio * app.globalData.windowWidth,
  },
  gotoRecord() {
    wx.switchTab({
      url: '/pages/record/record'
    })
  },
  buildData(data) {
    let keys = Object.keys(data).sort()

    let result = []
    for (let i = keys.length - 1; i > 0; i--) {
      let current = data[keys[i]]
      let pre = data[keys[i-1]]
      buildWeightIncrease(current)((current.weight-pre.weight).toFixed(1))
      result.push(current)
    }
    if (keys.length >= 1) {
      let current = data[keys[0]]
      current.increase = 0
      current.delta = 0
      result.push(current)
    }

    result = result.reduce((dic, item, index) => (dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')] ? dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')].push(item) : dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')] = [item]) && dic, {})
    return Object.keys(result).sort().reverse().map((key) => {
      return Object.assign({day: key, weightInfos: result[key]})
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
      this.setData({
        weightData: this.buildData(res)
      })
    }, err => {
      console.log(err)
    })
  }
})
