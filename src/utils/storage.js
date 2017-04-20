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

const setLocalDataWithCallback = key => value => data => resolve => reject => {
  wx.setStorage({
    key:key,
    data: Object.assign({}, data, {[value.time]: value}),
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
