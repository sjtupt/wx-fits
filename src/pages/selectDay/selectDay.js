
// 获取全局应用程序实例对象
// const app = getApp()

const week = ['日','一','二','三','四','五','六']

const DaysOneWeek = 7

const getCalendarInfos = () => {
  let now = new Date()
  let firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  let lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth()+1, 0)

  let lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()

  let days = []
  for (let i = firstDayOfCurrentMonth.getDay(); i > 0; i--) {
    days.push(lastDayOfLastMonth-i+1)
  }
  for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
    days.push(i)
  }
  for (let i = DaysOneWeek - lastDayOfCurrentMonth.getDay(); i > 1; i--) {
    days.push(DaysOneWeek - lastDayOfCurrentMonth.getDay() - i + 1)
  }
  return days
}

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '选择日期',
    week: week,
    days: getCalendarInfos().reduce((rows, key, index) => (index % DaysOneWeek == 0 ? rows.push([key])
    : rows[rows.length-1].push(key)) && rows, [])
  },
  chooseDay(e) {
    console.log(e.currentTarget.dataset.day)
    wx.navigateBack()
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
