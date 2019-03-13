var app = getApp()
var call = require("../../utils/request.js")
var signUtil = require("../../utils/signutil.js")
// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:{
       nickName:"凯迪",
       avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/n6lXPpKFDk2a6dd5uxa5Nxic4ibhGpbl9e4C6AT737WCb9GbVvRJSqngKXT3ThKc3k6p4ibNu2Y6QaWWzK2QFFlNg/132",
     },
     hasUserInfo:false,
     canIUse:wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true,
      })
    }else if(this.data.canIUse){
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true,
        })
      }
    }else{
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true,
          })
        }
      })
    }
    //登录接口
    var user_login = '';
    wx.login({
      success: res => {
        /**
         * 登录
         */
        var api_code = app.globalData.api_code
        var time_stamp = call.reateTimeStamp();
        var code = res.code
        var user_login = {
          api_code: api_code,
          time_stamp: time_stamp,
          phonetype: '小程序',
          wxpingzheng: code,
        }
      var sign = signUtil.getbannerSign(user_login);
      call.request('user/login', {
        api_code: api_code,
        time_stamp: time_stamp,
        phonetype: '小程序',
        wxpingzheng: code,
        sign: sign
      }, this.onUserLoginSuccess, this.onUserLoginFail);
      }
    })
  },
  onUserLoginSuccess:function(data){
      console.log(data);
      var that = this;
      that.setData({
        userinfo:data
      })
    app.globalData.us_session = data.us_session;
  },
  onUserLoginFail:function(data){
    console.log(data);
  },
  getUserInfo:function(e){

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true,
    })
  },

  //事件处理函数
  //充值
  toRecharge:function(){
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  //娱乐订单
  toYLOrder:function(){
    wx.navigateTo({
      url: '/pages/ylorder/ylorder',
    })
  },
  toCYOrer:function(){
    wx.navigateTo({
      url: '/pages/cyorder/cyorder',
    })
  },
  //零钱明细
  toSmallInfo:function(){
    wx.navigateTo({
      url: '/pages/SmallInfo/SmallInfo',
    })
  },
  //手机号
  toTel: function () {
    wx.navigateTo({
      url: '/pages/Tel/Tel',
    })
  },
  //手机号绑定
  toBindTel: function () {
    wx.navigateTo({
      url: '/pages/BindTel/BindTel',
    })
  },
  //身份信息
  toCard: function () {
    wx.navigateTo({
      url: '/pages/Card/Card',
    })
  },
  //身份信息绑定
  toBindCard: function () {
    wx.navigateTo({
      url: '/pages/BindCard/BindCard',
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