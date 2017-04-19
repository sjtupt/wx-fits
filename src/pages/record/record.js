import * as Storage from '../../utils/storage'
var util = require('../../utils/util.js')

// 获取全局应用程序实例对象
// const app = getApp()

const timeNoons = [{id: 0, name: '上午', timePeriod:'03:00am - 09:00am'},{id: 1, name: '中午', timePeriod:'09:00am - 15:00pm'},{id: 2, name: '下午', timePeriod:'15:00pm - 21:00pm'},{id: 3, name: '晚上', timePeriod:'21:00pm - 03:00pm'}]

const validWeight = input => input.match(/^(\d+)(\.?)(\d*)$/g) == null ? false : true

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '记一记',
    recordBtnDisabled: true,
    isBackFromSelectDay: false
  },

  bindinput(e) {

    let inputString = e.detail.value
    if (!validWeight(inputString)) {
      wx.showToast({
        title: '亲，输入有误',
        icon: 'warn',
        duration: 1000
      })

      return inputString.substring(0, inputString.length-1)
    }

    if (parseInt(inputString) > 0 && parseInt(inputString) < 150) {
      this.setData({
        recordBtnDisabled: false,
        currentValidWeight: parseInt(inputString)
      })
    } else {
      this.setData({
        recordBtnDisabled: true
      })
    }
  },

  chooseDay() {
    wx.navigateTo({
      url: '../selectDay/selectDay?date='+this.data.dayShow
    })
  },
  chooseTime() {
    wx.showActionSheet({
      itemList: timeNoons.map((item) => item.timePeriod),
      success: res => this.setCurrentTimeIndex(res.tapIndex),
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  save() {
    // Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
    //   console.log(res)
    // }, err => {
    //   console.log(err)
    // })

    Storage.setLocalData(Storage.kWeightInfo)({
      weight: this.data.currentValidWeight,
      time: Date.now()
    }).then(
      res => {
        wx.switchTab({
          url: '/pages/home/home'
        })
      },
      err => {
        console.log('err', err)
      })

  },
  bindblur(e){
    // this.save(e.detail.value)
  },
  bindconfirm(e){
    // this.save(e.detail.value)
  },

  setCurrentTimeIndex(index) {
    if (index < 0 || index >= timeNoons.length) {
      return
    }
    this.setData({
      currentTimeIndex: index,
      currentTimeShow: timeNoons[index]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    if (!this.data.isBackFromSelectDay) {
      this.setCurrentTimeIndex(0)
      this.setData({
        recordBtnDisabled: true,
        currentValidWeight: 0,
        inputValue: null,
        dayShow: util.dateFormat(new Date(), 'yyyy-MM-dd'),
        dayDetailShow: util.relationWithToday(new Date())
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.setData({
      isBackFromSelectDay: false
    })
  },
})
