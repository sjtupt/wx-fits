// 获取全局应用程序实例对象
// const app = getApp()
var wxCharts = require('../../lib/wxcharts-min');
var util = require('../../utils/util.js')
import * as Storage from '../../utils/storage'

var app = getApp();
var lineChart = null;
var windowWidth = 320;

const OneDay = 24 * 60 * 60 * 1000
const TimePeriods = [{key: '一周内', selected: true, time: 7 * OneDay },{key: '两周内', selected: false, time: 15 * OneDay},{key: '一个月内', selected: false, time: 30 * OneDay}]

Page({
  data: {
    timePeriods: TimePeriods,
    currentTimePeriodIndex: 0
  },
  gotoRecord() {
    wx.switchTab({
      url: '/pages/record/record'
    })
  },
  changeTimePeriod(e) {
    let currentClicked = e.currentTarget.dataset.index
    if (this.data.currentTimePeriodIndex === currentClicked) {
      return
    }
    TimePeriods[this.data.currentTimePeriodIndex].selected = false
    TimePeriods[currentClicked].selected = true

    this.setData({
      currentTimePeriodIndex: currentClicked,
      timePeriods: TimePeriods
    })
    this.updateData(this.data.statData)
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      // animation: true,
      // tooltip: null
    });
  },
  getDateWithinTimePeriod(data) {
    let keys = Object.keys(data).sort()
    let result = []
    for (let i = keys.length-1;i >= 0;i--) {
      if ((new Date()).valueOf() - keys[i] <= TimePeriods[this.data.currentTimePeriodIndex].time) {
        result.push(data[keys[i]])
      } else {
        break
      }
    }

    // 每一天的合并取平均值
    result = result.reduce((dic, item, index) => (dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')] ? dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')].push(item) : dic[util.dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd')] = [item]) && dic, {})
    let categories = Object.keys(result).reverse()
    return {
      key: categories.map(key => util.dateFormat(new Date(key), 'MM-dd')),
      data: categories.map(key => ((result[key].reduce((sum,item, index) => sum += parseFloat(item.weight), 0))/result[key].length).toFixed(1))
    }
  },
  getData(data) {
    return this.getDateWithinTimePeriod(data).data
  },
  getCategories(data){
    return this.getDateWithinTimePeriod(data).key
  },
  updateData(data) {
    var series = [{
      name: '体重',
      data: this.getData(data),
      format: function (val, name) {
        return parseFloat(val).toFixed(1) + 'kg';
      }
    }];
    if (lineChart === null) {
      this.getLineChart(data)
    } else {
      lineChart.updateData({
        categories: this.getCategories(data),
        series: series
      });
    }
  },
  getLineChart(data) {
    return new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: this.getCategories(data),
      animation: true,
      background: '#ffffff',
      series: [{
        name: '体重 (公斤)',
        data: this.getData(data),
        format: function (val, name) {
          return parseFloat(val) + 'kg';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '体重 (公斤)',
        format: function (val) {
          return val.toFixed(1);
        },
        min: 0,
        max: 70
      },
      legend: false,
      width: windowWidth,
      height: 300,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    })
  },
  onShow() {
    let that = this
    Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
      console.log('success')
      that.setData({
        statData: res,
        isNoData: false
      })
      that.updateData(res)
    }, err => {
      that.setData({
        isNoData: true
      })
      console.log('fail')
      console.log(err)
    })
  },
  onLoad() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    Storage.getLocalDataByKey(Storage.kWeightInfo).then(data => {
      lineChart = this.getLineChart(data)
    }, err => {
      console.log(err)
    })
  }
});
