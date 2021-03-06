// pages/become-menber/index.js
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
    code: '',
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({user:app.globalData.user,HOST})
    request({
      url: API.toIntr,
      method: 'post',
      success: res => {
        this.setData({msg:res.msg})
      },
      complete: function(res) {},
    })
  },
  changeCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  submit() {
    let {code,msg}=this.data
    request({
      url: API.applyCz,
      data: { openid: app.globalData.user.open_id, money: msg.money, intr_no:code},
      method: 'post',
      success: res => {
        wx.requestPayment({
          timeStamp: res.msg.timeStamp,
          nonceStr: res.msg.nonceStr,
          package: res.msg.package,
          signType: res.msg.signType,
          paySign: res.msg.paySign,
          success: _res => {
            console.log(_res)
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
      fail: function(res) {},
      complete: function(res) {},
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
  onShareAppMessage: function () {

  }
})