import * as RES from '../../utils/res'
import * as Storage from '../../utils/storage'

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
  buildData(data) {
    console.log(data)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
      this.buildData(res)
    }, err => {
      console.log(err)
    })
  }
})
