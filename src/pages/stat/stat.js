// 获取全局应用程序实例对象
// const app = getApp()
var wxCharts = require('../../lib/wxcharts-min');
var util = require('../../utils/util.js')
import * as Storage from '../../utils/storage'

var app = getApp();
var lineChart = null;

const OneDay = 24 * 60 * 60 * 1000
const TimePeriods = [{key: '一周内', selected: true, time: 7 * OneDay },{key: '两周内', selected: false, time: 15 * OneDay},{key: '一个月内', selected: false, time: 30 * OneDay}]

Page({
  data: {
    timePeriods: TimePeriods,
    currentTimePeriodIndex: 0
  },
  changeTimePeriod(e) {
    this.setData({
      currentTimePeriodIndex: e.currentTarget.dataset.index
    })
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
      console.log((new Date()).valueOf(),parseInt(keys[i]),(new Date()).valueOf()-parseInt(keys[i]),TimePeriods[this.data.currentTimePeriodIndex].time)
      if ((new Date()).valueOf() - keys[i] <= TimePeriods[this.data.currentTimePeriodIndex].time) {
        result.push(data[keys[i]])
      } else {
        break
      }
    }
    return result
  },
  getData(data) {
    let newData = this.getDateWithinTimePeriod(data)
    return Object.keys(newData).sort().map((key) => newData[key].weight)
  },
  getCategories(data){
    let newData = this.getDateWithinTimePeriod(data)
    return Object.keys(newData).sort().map((key) => util.dateFormat(new Date(parseInt(key)), 'MM-dd'))
  },
  updateData(data) {
    var series = [{
      name: '体重',
      data: this.getData(data),
      format: function (val, name) {
        return parseFloat(val).toFixed(1) + 'kg';
      }
    }];
    lineChart.updateData({
      categories: this.getCategories(data),
      series: series
    });
  },
  onShow() {
    let that = this
    Storage.getLocalDataByKey(Storage.kWeightInfo).then(res => {
      that.updateData(res)
    }, err => {
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
      lineChart = new wxCharts({
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
        legend:false,
        width: windowWidth,
        height: 300,
        dataLabel: false,
        dataPointShape: true,
        extra: {
          lineStyle: 'curve'
        }
      });
    }, err => {
      console.log(err)
    })
  }
});
