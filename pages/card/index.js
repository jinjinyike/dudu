// pages/card/index.js
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
    list: [{
      key: 'card_name',
      placeholder: '开户行',
      label: '开户行'
    }, {
      key: 'card_number',
      placeholder: '银行卡号',
      label: '银行卡号'
    }, {
      key: 'bank_name',
      placeholder: '银行名称',
      label: '银行名称'
    }],
    obj: {
      card_number: '',
      card_name: '',
      bank_name: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.card,
      // data: '',
      method: 'post',
      success: res=> {
        this.setData({obj:res.data})
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindinput(e){
    let {key}=e.currentTarget.dataset;
    let {obj}=this.data;
    obj[key]=e.detail.value;
    this.setData({obj})
  },
  save(){
    wx.request({
      url: API.changeCard,
      data: this.data.obj,
      method: 'post',
      success: res=> {
        wx.showToast({
          title: '修改成功',
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
  // onShareAppMessage: function() {

  // }
})