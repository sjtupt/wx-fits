import * as Storage from '../../utils/storage'

// 获取全局应用程序实例对象
// const app = getApp()

const timeNoons = [{id: 0, name: '上午', timePeriod:'03:00am - 09:00am'},{id: 1, name: '中午', timePeriod:'09:00am - 15:00pm'},{id: 2, name: '下午', timePeriod:'15:00pm - 21:00pm'},{id: 3, name: '晚上', timePeriod:'21:00pm - 03:00pm'}]

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '记一记'
  },
  //
  // bindinput(e){
  //   console.log(e.detail.value)
  // },
  chooseDay() {
    wx.navigateTo({
      url: '../selectDay/selectDay'
    })
  },
  chooseTime() {
    wx.showActionSheet({
      itemList: timeNoons.map((item) => item.timePeriod),
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  save(weight) {
    Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

    Storage.setLocalData(Storage.kWeightInfo)({
      weight: weight,
      time: Date.now()
    }).then(res => console.log('set suc', res), err => console.log('err', err))
  },
  bindblur(e){
    // this.save(e.detail.value)
  },
  bindconfirm(e){
    this.save(e.detail.value)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
