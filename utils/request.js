const app = getApp();
const moment = require('./moment.min.js');
const md5 = require('./md5.js')
/**
 * 封装请求
 * @param {JSONObject} options 请求参数
 * @example
 {
   url: '/Wxuser/api',
   method: 'POST',
   loading: true, boolean | timestep（毫秒）
   data: {
     key: "value"
   },
   success: (res) => {
     // res={code: 0, data: ..., desc: ''}
   }
 }
 */
const request = (options) => {
  const loading = options.loading ? setTimeout(() => {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    });
  }, typeof options.loading == 'number' ? options.loading : 300) : 0;
  let obj = {}
  if (app.globalData.userInfo) {
    obj = {
      id: app.globalData.userInfo.id,
      time: moment().unix()
    }
    obj.crfs = md5(`${obj.time}company${obj.id}`)
  }
  return wx.request({
    method: options.method || 'GET',
    dataType: options.dataType || 'json',
    responseType: options.responseType || 'text',
    ...options,
    header: {
      'content-type': options.contentType || 'application/json',
      ...options.header,
      ...obj
    },
    success: function(res) {
      if (res.data.code === 10004) {
        app.getUserInfo(() => {
          request(options);
        });
      } else {
        typeof options.success === 'function' && options.success.call(this, res.data, res);
      }
    },
    fail: function() {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
      console.error(res.data)
    },
    complete: function() {
      if (options.loading) {
        clearTimeout(loading);
        wx.hideLoading();
      }
      typeof options.complete === 'function' && options.complete.call(this);

    }
  });
}

module.exports = request