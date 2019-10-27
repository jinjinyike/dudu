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
    HOST,
    obj:{
      type:1,
    },
    id:'',
    user: app.globalData.user
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _url=''
    if(options.id){
      this.setData({ id:options.id })
      _url = '?id=' + options.id
    }
    
    request({
      url: API.disDeta+_url,
      method: 'get',
      success: res=>{
        console.log(res)
        if(res.type!==1&&res.type!==2){
          res.type=1;
        }
        if(res.data){
          this.setData({obj:res.data})
        }
      },
      complete: function(res) {},
    })
  },
  radioChange(e){
    let { obj } = this.data;
    obj['type'] = e.detail.value;
    this.setData({obj})
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
            console.log(_res)
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
          title: '请填写完整信息',
          icon:'none'
        })
      }
      if (!obj[key] && obj.type == 2 && key == 'open_img') {
        return wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
      }
      if (!obj[key] && key != 'open_img' && key !='frbank_img'){
        return wx.showToast({
          title: '请填写完整信息',
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
    // for (let key in obj) {
    //   if (typeof (obj[key]) == 'string') {
    //     obj[key].replace(HOST, '')
    //   }
    // }
    if(this.data.id){
      obj.id=this.data.id;
    }
    console.log(obj)
    // obj.forEach(ele=>ele.replace(HOST,''))
    request({
      url: API.disDeta,
      data: obj,
      method: 'post',
      success: res=> {
        wx.showToast({
          title: res.msg,
        })
        // wx.switchTab({
        //   url: '../self/index',
        // })
      },
      fail: function(res) {
        wx.showToast({
          title: '认证失败',
          icon:'none'
        })
      },
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
  // onShareAppMessage: function () {

  // }
})