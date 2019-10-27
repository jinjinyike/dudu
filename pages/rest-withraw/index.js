// pages/rest-withraw/index.js
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
    money: 0,
    withdrowMoney: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      money: app.globalData.user.now_money
    })

  },
  editCard(){
    wx.navigateTo({
      url: '../card/index',
    })
  },
  changeMoney(e) {
    this.setData({
      withdrowMoney: e.detail.value
    })
  },
  withdraw() {
    if (!this.data.withdrowMoney) {
     return  wx.showToast({
        title: '请填写金额',
        icon: 'none'
      })
    }
    if (this.data.withdrowMoney == 0 || Number(this.data.withdrowMoney) < 0 || typeof (this.data.withdrowMoney)!=Number) {
      return wx.showToast({
        title: '请正确填写金额',
        icon: 'none'
      })
    }
    request({
      url: API.withdraw,
      data: {money:this.data.withdrowMoney,now_money:this.data.money},
      method: 'POST',
      success: res => {
        wx.showToast({
          title: '提现信息已提交',
          icon:'none'
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
  // onShareAppMessage: function() {

  // }
})