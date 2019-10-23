// pages/detail/index.js
const app = getApp();
const request = require('../../utils/request');
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
    HOST,
    obj: {},
    num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
      request({
        url: API.goodDeta,
        data: {
          id: options.id
        },
        method: 'post',
        success: res => {
          // console.log(res)
          res.detail = formatRichText(res.detail)
          this.setData({
            obj: res
          })
        },
        fail: function (res) {},
        complete: function (res) {},
      })
    }

  },
  goorder() {
    if(!this.data.num){
      return wx.showToast({
        title: '请填写订购数量',
        icon:'none'
      })
    }
    wx.navigateTo({
      url: `../sub-order/index?id=${this.data.id}&num=${this.data.num}`,
    })
  },
  goshare() {
    wx.navigateTo({
      url: `../share/index?id=${this.data.id}`,
    })
  },
  changeNum(e) {
    this.setData({
      num: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})