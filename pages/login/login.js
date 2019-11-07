// pages/login/login.js
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  wxlogo(){
    wx.login({
      success(res) {
        console.log(res)
        request({
          url: API.login,
          data: {code:res.code},
          method: 'post',
          success: res=> {
            app.globalData.user=res.data;
            wx.setStorageSync('user', res.data);
            app.globalData.session_id = res.session_id;
            wx.setStorageSync('session', res.session_id);
            if(res.code==4001){
              wx.navigateTo({
                url:'../phone/index'
              })
            }else{
              wx.switchTab({
                url: '../face/index',
              })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },
  noLogin(){
    // wx.navigateTo({
    //   url: '../phone/index',
    // })
    wx.switchTab({
      url: '../face/index',
    })
  },
  agree(){
    wx.navigateTo({
      url: '../agreement/index',
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