// pages/order/index.js
const app = getApp();
const request = require('../../utils/request');
import {
  API,
  HOST
} from '../../utils/config.js';
const orderType={
  1: '待付款订单',
  2: '待收货订单',
  3: '待评价订单',
  4:'已完成订单',
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HOST,
    obj: {
      page: 1,
      type: 1,
    },
    list:[],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({type:options.type})
    wx.setNavigationBarTitle({
      title: orderType[options.type],
    })
    this.setData({obj:options},_=>{
      this.getList()
    })
  },
  wxPay(e){//微信支付
    let {id,money}=e.currentTarget.dataset;
    console.log(app)
    request({
      url: API.wxpay,
      data: { id, money_sum: money, openid:app.globalData.user.open_id},
      method: 'post',
      success: res=> {
        wx.requestPayment({
          timeStamp: res.msg.timeStamp,
          nonceStr: res.msg.nonceStr,
          package: res.msg.package,
          signType: res.msg.signType,
          paySign: res.msg.paySign,
          success:_res=>{
            console.log(_res)
            request({//支付后台回调
              url: API.paySuc,
              data: { out_trade_no: res.out_trade_no, type: res.type},
              method: 'post',
              success: function(res) {},
            })
            let obj=this.data;
            obj.page=1;
            this.setData({list:[],obj},_=>{
              this.getList('clear')
            })
          }
        })
      },
      complete: function(res) {},
    })
  },
  pingjia(e){//评价
    let index=e.currentTarget.dataset.index;
    console.log(index)
    wx.setStorageSync('order', this.data.list[index])
    wx.navigateTo({
      url: '../evuluate/index',
    })
  },
  sureGood(e){//缺人收获
    let id = e.currentTarget.dataset.id;
    request({
      url: API.rece,
      data: {id},
      method: 'post',
      success: res=> {
        wx.showToast({
          title: '确认成功',
        })
        let {obj}=this.data;
        obj.page=1;
        this.setData({list:[],obj},_=>{
          this.getList()
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getList(type) {
    wx.showLoading({
      title: '数据加载中...',
    })
    let {obj,list}=this.data;
    request({
      url: API.orderList,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.data.length === 0) {
          return
        }
        obj.page += 1
        this.setData({
          list: list.concat(res.data),
          obj
        })
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
      },
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
  onShareAppMessage: function() {

  }
})