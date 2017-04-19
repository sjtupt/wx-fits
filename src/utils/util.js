function formatTime (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function dateFormat(date, format) {
  // if (typeof date !== 'object') {
  //   date = new Date(date.replace(/-/g, '/'));
  // }
  const map = {
    'M': date.getMonth() + 1, //月份
    'd': date.getDate(), //日
    'h': date.getHours(), //小时
    'm': date.getMinutes(), //分
    's': date.getSeconds(), //秒
    'q': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, tNum) {
    let vNum = map[tNum];
    if (vNum !== undefined) {
      if (all.length > 1) {
        vNum = '0' + vNum;
        vNum = vNum.substr(vNum.length - 2);
      }
      return vNum;
    } else if (tNum === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}

const oneDay = 24 * 60 * 60 * 1000

function isEarlier(day1,day2) {
  let newDay1 = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate())
  let newDay2 = new Date(day2.getFullYear(), day2.getMonth(), day2.getDate())

  return newDay2.getTime() >= newDay1.getTime()
}

function relationWithToday(date) {
  let now = new Date()
  let nowWithoutHours = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let dateWithoutHours = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  let timeSpan = nowWithoutHours.valueOf() - dateWithoutHours.valueOf()
  if (timeSpan < 0) {
    return ''
  } else if (timeSpan == 0) {
    return '今天'
  } else {
    let days = timeSpan / oneDay
    if (days > 365) {
      return days/365 + '年前'
    } else if (days > 30) {
      return days/30 + '月前'
    } else {
      return days + "天前"
    }
  }
}

function isToday(day) {
  return dateFormat((new Date(day)), 'yyyy-MM-dd') === dateFormat((new Date()), 'yyyy-MM-dd')
}

function  isSameDay(day1, day2) {
  let newDay1 = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate())
  let newDay2 = new Date(day2.getFullYear(), day2.getMonth(), day2.getDate())

  return newDay2.getTime() == newDay1.getTime()
}

module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
  relationWithToday: relationWithToday,
  oneDay: oneDay,
  isEarlier: isEarlier,
  isToday: isToday,
  isSameDay: isSameDay
}
