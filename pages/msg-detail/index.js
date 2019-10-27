// pages/msg-detail/index.js
const app = getApp();
const request = require('../../utils/request');
const moment = require('../../utils/moment.min.js');

import {
  formatRichText
} from '../../utils/util.js'
import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.msgDetail,
      data: {
        id: options.id
      },
      method: 'post',
      success: res => {
        console.log(res)
        res.msg.content = formatRichText(res.msg.content)
        res.msg.add_time = moment.unix(res.msg.add_time).format('YYYY-MM-DD HH:mm:ss')
        this.setData({
          msg: res.msg
        })
      },
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
  // onShareAppMessage: function() {

  // }
})