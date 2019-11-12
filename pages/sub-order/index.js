// pages/sub-order/index.js
const app = getApp();
const request = require('../../utils/request');
import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HOST,
    order: true,
    options: {},
    pay:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options
    })
    request({
      url: API.orderData,
      data: options,
      success: res => {
        console.log(res)
        this.setData({
          msg: res.msg,
          user: res.msg.user
        })
      }
    })
  },
  bindKeyInput(e) { //input change
    let {
      key
    } = e.currentTarget.dataset;
    let {
      user
    } = this.data;
    user[key] = e.detail.value
    this.setData({
      user
    })
  },
  submitOrder() {
    for (let key in this.data.user) {
      if (!this.data.user[key]) {
        return wx.showToast({
          title: '个人信息请填写完整',
          icon: 'none'
        })
      }
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.user.tel))) {
      return wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
    }
    request({//下单
      url: API.subOrder,
      method: 'post',
      data: { ...this.data.user,
        ...this.data.options
      },
      success: res => {
        console.log(res)
        this.setData({order:false,pay:res.data})
        request({
          url: API.wxpay,
          data: { id: res.data.id, money_sum: res.data.money_sum, openid: app.globalData.user.open_id },
          method: 'post',
          success: res => {
            wx.requestPayment({
              timeStamp: res.msg.timeStamp,
              nonceStr: res.msg.nonceStr,
              package: res.msg.package,
              signType: res.msg.signType,
              paySign: res.msg.paySign,
              success: _res => {
                // this.getList()
                wx.showToast({
                  title: '下单成功',
                })
                request({//支付后台回调
                  url: API.paySuc,
                  data: { out_trade_no: res.out_trade_no, type: res.type },
                  method: 'post',
                  success: function (res) {
                    wx.switchTab({
                      url: '../self/index',
                    })
                   },
                })
              }
            })
          },
          complete: function (res) { },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})