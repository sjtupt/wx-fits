/**
 * Created by sjtupt on 2017/4/18.
 */

export const kWeightInfo = "kWeightInfo"
export const getLocalDataByKey = key => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: function(res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

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

const setLocalDataWithCallback = key => value => data => resolve => reject => {
  let result = [value]
  if (data.length === 0) {
    value.increase = 0
    value.delta = 0
  } else  {
    buildWeightIncrease(value)(value.weight - data[0].weight)
    result = result.concat(data)
  }
  wx.setStorage({
    key:key,
    data: result,
    success: function(res) {
      resolve(res)
    },
    fail: function (err) {
      reject(err)
    }
  })
}

export const setLocalData = key => value => {
  return new Promise((resolve, reject) => {
    getLocalDataByKey(key).then(res => {
      setLocalDataWithCallback(key)(value)(res)(resolve)(reject)
    }, err => {
      setLocalDataWithCallback(key)(value)([])(resolve)(reject)
    })
  })
}
