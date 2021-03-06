// pages/account-rest/index.js
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
    money: '',
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      money: app.globalData.user.now_money
    })
    this.getList()

  },
  getList() {
    request({
      url: API.moneyList,
      data: {
        page: 1
      },
      method: 'post',
      success: res => {
        if (res.msg.length) {
          res.msg.forEach(ele => ele.add_time = moment.unix(ele.add_time).format('YYYY-MM-DD HH:mm:ss'))
        }
        this.setData({
          list: this.data.list.concat(res.msg),
          page: this.data.page += 1
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
    this.getList()
  },

  
})