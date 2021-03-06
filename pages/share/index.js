// pages/share/index.js
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
    id:'',
    obj:{},
    intr_img:''
  },
  shareRule(){
    wx.navigateTo({
      url: '../dudu-rule/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({id:options.id})
    request({
      url: API.shareDara,
      method: 'post',
      data: {
        id: options.id
      },
      success: res => {
        console.log(res)
        this.setData({obj:res})
      }
    })
    request({
      url: API.selfCode,
      method: 'post',
      success: res => {
        this.setData({ intr_img: res.msg.intr_img })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  previewImage() {
    wx.previewImage({
      urls: [HOST + this.data.intr_img],
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