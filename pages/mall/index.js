// pages/mall/index.js
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
    hotList: [],
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.goodsbk,
      method: 'post',
      success: res => {
        console.log(res)
        if (!res.length) return
        if (res.length > 3) {
          res.length = 3;
        }
        this.setData({
          hotList: res
        })
      },
    })
    this.getList()
  },
  getList() {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: API.goodsjx,
      data: {
        page: this.data.page
      },
      method: 'POST',
      success: res => {
        if (res.legnth === 0) {
          return
        }
        this.setData({
          list: this.data.list.concat(res.data),
          page: this.data.page += 1
        })
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
      },
    })
  },
  buy(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../sub-order/index?id=${id}&num=${1}`,
    })
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id,
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})