// pages/face/index.js
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
    page: 1,
    swiperList: [],
    list: [],
    flexList: [{
      name: '商城认证',
      icon: '../../img/icons/face-1.png',
      path: '../upload/index'
    }, {
      name: '嘟嘟介绍',
      icon: '../../img/icons/face-2.png',
      path: '../dudu-intro/index'
    }, {
      name: '分享赚钱',
      icon: '../../img/icons/face-3.png',
      path: '../dudu-rule/index'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //轮播图
    request({
      url: API.banners,
      method: 'POST',
      success: res => {
        this.setData({
          swiperList: res
        })
        console.log(res)
      }
    })
    this.getList()
  },
  goto(e){
    let url=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../out/index?url='+url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    // window.location.href='www.baidu.com'
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
  detail(e) {//详情
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id,
    })
  },
  buy(e) {//立即订购
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../sub-order/index?id=${id}&num=${1}`,
    })
  },
  facegoto(e) { //跳转
    let path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path,
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