// pages/upload/index.js
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
    obj:{
      type:1,
    },
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id}=app.globalData.user;
    this.setData({user:app.globalData.user})
    request({
      url: API.disDeta+'?id='+id,
      data: {id},
      method: 'get',
      success: res=>{
        console.log(res)
        if(res.type!==1&&res.type!==2){
          res.tyrp=1;
        }
        this.setData({obj:res.data})
      },
      complete: function(res) {},
    })
  },
  changetext(e){
    let key = e.currentTarget.dataset.key;
    let {obj}=this.data;
    obj[key]=e.detail.value;
    this.setData({obj})
  },
  uploadImg(e){
    let key=e.currentTarget.dataset.key;
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res)
        wx.uploadFile({
          url: API.upImg,
          filePath: res.tempFilePaths[0],
          name: 'img',
          success: _res => {
            // console.log(_res)
            let { obj } = this.data;
            obj[key] = HOST+JSON.parse(_res.data).data
            this.setData({
              obj
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  save(){
    let {obj}=this.data
    for (let key in this.data.obj){
      if (!obj[key] && obj.type == 1 && key=='frbank_img'){
        return wx.showToast({
          title: '请填写完整',
          icon:'none'
        })
      }
      if (!obj[key] && obj.type == 1 && key == 'frbank_img') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'none'
        })
      }
      if(!obj[key]){
        return wx.showToast({
          title: '请填写完整',
          icon: 'none'
        })
      }
    }
    if (!(/^1[3456789]\d{9}$/.test(obj.tel))) {
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
    }
    obj.forEach(ele=>ele.replace(HOST,''))
    request({
      url: API.disDeta,
      data: obj,
      method: 'post',
      success: res=> {
        wx.showToast({
          title: '提交成功',
        })
        wx.switchTab({
          url: '../self/index',
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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