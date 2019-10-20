// pages/self-detail/index.js
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
    age:22,
    msg: {

    },
    inputList: [{
      key: 'age',
      type: 'num',
      label: '年龄',
      maxLength: 4
    }, {
      key: 'nickname',
      type: 'text',
      label: '收货人姓名',
      maxLength: 20
    }, {
      key: 'tel',
      type: 'tnumext',
      label: '收货人电话',
      maxLength: 11
    }, {
      key: 'address',
      type: 'text',
      label: '收货人地址',
      maxLength: 50
    }],
    edit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: API.selfData,
      // data: obj,
      method: 'POST',
      success: res => {
        msg: res
        
      }
    })
  },
  changeImg(){
    wx.chooseImage({
      count:1,
      success: res=> {
        // console.log(res)
        wx.uploadFile({
          url: API.upHeadImg,
          filePath: res.tempFilePaths[0],
          name: 'head_img',
          success:_res=>{
            wx.showToast({
              title: '修改成功',
            })
            let { msg } = this.data;
            msg.head_img = res.tempFilePaths[0]
            this.setData({
              msg
            })
          }
        })
      },
    })
  },
  edit() {
    if (!this.data.edit) {
      this.setData({
        edit: true
      })
    } else {
      let {
        age,
        tel,
        nickname,
        address,sex
      } = this.data.msg;
      if (!age || !tel || !nickname || !address) {
        return wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
      }
      request({
        url: API.changeSelfData,
        data: {
          age,
          tel,
          nickname,
          address,
          sex
        },
        method: 'post',
        success: res => {
          this.setData({
            edit: false
          })
          wx.showToast({
            title: '修改成功',
            icon: 'none'
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        },
        complete: function(res) {},
      })
    }
  },
  changeInput(e) {
    let {
      key
    } = e.currentTarget.dataset;
    let {
      msg
    } = this.data;
    msg[key] = e.detail.value;
    this.setData({
      msg
    })
  },
  changeSex(e) {
    console.log(e)
    let {msg}=this.data
    msg.sex = e.detail.value;
    this.setData({
      msg
    });
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