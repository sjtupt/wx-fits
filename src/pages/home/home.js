import * as RES from '../../utils/res'

// 获取全局应用程序实例对象
const app = getApp()

const pngHomeHeaderBg = '../../resource/bb_family~iphone.png'
const headerBgRatio = (210 / 375).toFixed(1)

const weightData = [
  {
    day:"2017-04-11",
    weightInfos:
      [
        {
          time: "09:45",
          weight: 50,
          increase: 1,
          delta: 0.3
        },
        {
          time: "19:45",
          weight: 50,
          increase: -1,
          delta: 1.3
        }
      ]
  },
  {
    day:"2017-04-12",
    weightInfos:
      [
        {
          time: "09:45",
          weight: 50,
          increase: 1,
          delta: 0.3
        },
        {
          time: "19:45",
          weight: 50,
          increase: -1,
          delta: 1.3
        }
      ]
  },
  {
    day:"2017-04-12",
    weightInfos:
      [
        {
          time: "09:45",
          weight: 50,
          increase: 1,
          delta: 0.3
        },
        {
          time: "19:45",
          weight: 50,
          increase: -1,
          delta: 1.3
        }
      ]
  },
  {
    day:"2017-04-12",
    weightInfos:
      [
        {
          time: "09:45",
          weight: 50,
          increase: 1,
          delta: 0.3
        },
        {
          time: "19:45",
          weight: 50,
          increase: -1,
          delta: 1.3
        }
      ]
  }
]

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
    weightData: weightData
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
