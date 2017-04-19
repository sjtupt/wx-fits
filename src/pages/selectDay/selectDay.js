var util = require('../../utils/util.js')

// 获取全局应用程序实例对象
// const app = getApp()

const week = ['日','一','二','三','四','五','六']

const DaysOneWeek = 7

const plusDay = day => number => {
  let res = new Date(day)
  res.setDate(day.getDate() + number)
  return res
}

const configDay = day => selectDay => {
  day.canSelect = util.isEarlier(day.date,new Date())
  day.detail = util.isToday(day.date) ? '今天': ''
  day.isCurrentSelect = util.isSameDay(day.date, selectDay)
}

const getCalendarInfos = (dateString) => {
  let selectDay = new Date(dateString)

  let firstDayOfCurrentMonth = new Date(selectDay.getFullYear(), selectDay.getMonth(), 1)
  let lastDayOfCurrentMonth = new Date(selectDay.getFullYear(), selectDay.getMonth()+1, 0)

  let lastDayOfLastMonth = new Date(selectDay.getFullYear(), selectDay.getMonth(), 0).getDate()

  let days = []
  for (let i = firstDayOfCurrentMonth.getDay(); i > 0; i--) {
    let day = {day: lastDayOfLastMonth-i+1, date: plusDay(firstDayOfCurrentMonth)(-i)}
    configDay(day)(selectDay)
    days.push(day)
  }
  for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
    let day = {day: i, date: plusDay(firstDayOfCurrentMonth)(i-1)}
    configDay(day)(selectDay)
    days.push(day)
  }
  for (let i = DaysOneWeek - lastDayOfCurrentMonth.getDay(); i > 1; i--) {
    let day = {day: DaysOneWeek - lastDayOfCurrentMonth.getDay() - i + 1, date: plusDay(lastDayOfCurrentMonth)(DaysOneWeek - lastDayOfCurrentMonth.getDay() - i + 1)}
    configDay(day)(selectDay)
    days.push(day)
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
    week: week
  },
  chooseDay(e) {
    let day = e.currentTarget.dataset.day
    if (day.canSelect) {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        isBackFromSelectDay: true,
        dayShow: util.dateFormat(new Date(day.date), 'yyyy-MM-dd'),
        dayDetailShow: util.relationWithToday(new Date(day.date))
      })
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '亲，选择日期不能早于当前日期哦',
        icon: 'warn',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option){

    this.setData({
      currentDay: new Date(option.date),
      currentDayShow: util.dateFormat(new Date(option.date), 'yyyy-MM'),
      days: getCalendarInfos(option.date).reduce((rows, key, index) => (index % DaysOneWeek == 0 ? rows.push([key])
        : rows[rows.length-1].push(key)) && rows, [])
    })
  }
})
