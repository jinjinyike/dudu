// pages/self/index.js
const app = getApp();
const request = require('../../utils/request');
import {
  API,
  HOST
} from '../../utils/config.js';
Page({
// level>=2 是推广员 有邀请码 =1是不是推广员
  /**
   * 页面的初始数据
   */
  data: {
    HOST,
    obj: {},
    orderStatus: [{
      text: '代付款',
      icon: '../../img/icons/order-1.png'
    }, {
      text: '待收货',
      icon: '../../img/icons/order-2.png'
    }, {
      text: '待评价',
      icon: '../../img/icons/order-3.png'
    }, {
      text: '已完成',
      icon: '../../img/icons/order-4.png'
    }],
    list: [{
      text: '旗下会员管理',
      icon: '../../img/icons/self-1.png',
      path: '../member-man/index'
    }, {
      text: '成为推广会员',
      icon: '../../img/icons/self-2.png',
      path: '../become-member/index'
    }, {
      text: '商户认证',
      icon: '../../img/icons/self-3.png',
      path:'../upload/index'
    }, {
      text: '售后服务',
      icon: '../../img/icons/self-4.png',
      path:'../sale-service/index'
    }, {
      text: '嘟嘟赚钱规则',
      icon: '../../img/icons/self-5.png',
      path:'../dudu-rule/index'
    }, {
      text: '嘟嘟赚钱简介',
      icon: '../../img/icons/self-6.png',
      path: './duduintro/index',
      path:'../dudu-intro/index'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    

  },
  goRestAccount() { //余额
    wx.navigateTo({
      url: '../account-rest/index',
    })
  },
  goMsgList() { //消息列表
    wx.navigateTo({
      url: '../msg-list/index',
    })
  },
  goWithrow() { //提现
    wx.navigateTo({
      url: '../rest-withraw/index',
    })
  },
  goOrder(e) { //订单
    let {
      type
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../order/index?page=1&type=' + type,
    })
  },
  goDetail() { //个人详情
    wx.navigateTo({
      url: '../self-detail/index',
    })
  },
  selfCode(){//邀请码活着推广
  if(this.data.obj.level==1){
    wx.navigateTo({
      url: '../become-member/index',
    })
  }else{

  }
  },
  goList(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: this.data.list[index].path,
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
    console.log(app.globalData)
    if (!app.globalData.session_id) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    request({
      url: API.personData,
      method: 'post',
      success: res => {
        let { list } = this.data
        if (res.level !== 1 && list[1].text =='成为推广会员') {
          list.splice(1, 1)
        } else if (res.level == 1 && list[0].text =='旗下会员管理'){
          list.splice(0, 1)
        }
        this.setData({
          obj: res,
          list
        })
        app.globalData.user = res
      },
      fail: function (res) {

      },
      complete: function (res) { },
    })
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