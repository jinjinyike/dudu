// pages/phone/index.js
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
    phone: '',
    btntext: '获取验证码',
    vcode: '',
    intr_no:'',
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if(options.code){
      this.setData({ intr_no: options.code, disabled:true})
      this.wxlogo()
    }
  },
  wxlogo() {
    wx.login({
      success(res) {
        console.log(res)
        request({
          url: API.login,
          data: { code: res.code },
          method: 'post',
          success: res => {
            
            app.globalData.session_id = res.session_id;
            wx.setStorageSync('session', res.session_id);
            if (res.code == 2000){
              app.globalData.user = res.data;
              wx.setStorageSync('user', res.data);
              wx.switchTab({
                url: '../face/index',
              })
            }
            // if (res.code == 4001) {
            //   wx.navigateTo({
            //     url: '../phone/index'
            //   })
            // } else {
            
            // }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
  bindinput(e) {
    let key = e.target.dataset.key;
    this.setData({
      [key]: e.detail.value
    })
  },
  getCode() {
    if (this.data.btntext !== '获取验证码') return wx.showToast({
      title: '请稍后再试',
      icon: 'none'
    })
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    request({
      url: API.getCode,
      data: {
        phone: this.data.phone
      },
      method: 'POST',
      loading: false,
      success: res => {
        if (res.msg.code) {
          let _this = this;
          let coden = 60 // 定义60秒的倒计时
          let codeV = setInterval(function() {
            _this.setData({ 
              btntext: (--coden) + 's'
            })
            if (coden == -1) { // 清除setInterval倒计时，
              clearInterval(codeV)
              _this.setData({
                btntext: '获取验证码'
              })
            }
          }, 1000) 
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      },
      // fail: function(res) {},
      // complete: function(res) {},
    })
  },
  submit() {
    const {
      phone,
      vcode, intr_no
    } = this.data
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    // verify.length !== 6
    if ((!vcode )) {
      return wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }
    if ((!intr_no)) {
      return wx.showToast({
        title: '请输入推荐码',
        icon: 'none'
      })
    }
    let obj = {
      phone,
      vcode,
      intr_no,
    }
    request({
      url: API.regist,
      data: obj,
      method: 'POST',
      success: res => {
        if (res.code !== 2000) {
          return wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        //注册——身份验证
        // app.globalData.userInfo = res.data;
        // wx.setStorage({
        //   key: 'userInfo',
        //   data: JSON.stringify(res.data),
        // })
        app.globalData.user = res.data;
        wx.setStorageSync('user', res.data);
        wx.switchTab({
          url: '../face/index',
        })
        
      }
    })
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: '0372-2929993',
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