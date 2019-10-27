// pages/msg-list/index.js
const app = getApp();
const request = require('../../utils/request');
const moment = require('../../utils/moment.min.js');

import {
  API,
  HOST
} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.newslist,
      // data: '',
      method: 'post',
      success: res => {
        console.log(res)
        res.msg.forEach(ele => {
          ele.add_time = moment(ele.add_time).format('YYYY-MM-DD HH:mm:ss')
          ele.news.forEach(item => item.add_time = moment.unix(item.add_time).format('YYYY-MM-DD HH:mm:ss'))
        })
        this.setData({
          list: res.msg
        })
      },
    })
  },
  goMsgDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../msg-detail/index?id=' + id,
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