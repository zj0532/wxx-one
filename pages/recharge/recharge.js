var app = getApp()
var call = require("../../utils/request.js")
var signUtil = require("../../utils/signutil.js")
// pages/recharge/recharge.js
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
    var api_code = app.globalData.api_code
    var time_stamp = call.reateTimeStamp();
    //var us_session = app.globalData.us_session;
    var us_session = '89e1989a1e5602546ade20482c2bf341';
    var user_login = {
      api_code: api_code,
      time_stamp: time_stamp,
      us_session: us_session,
    }
    var sign = signUtil.getbannerSign(user_login);
    call.request('user/chongzhi_list', {
      api_code: api_code,
      time_stamp: time_stamp,
      us_session: us_session,
      sign: sign
    }, this.onlistSuccess, this.onlistFail);
  },

  onlistSuccess:function(data){
    console.log(data);
    var that = this;
    app.globalData.data = data.list,
    that.setData({
      recharge:data.list,
      clickId: '0',
      money: data.list[0].shiji_money,
    })
  },
  onlistFail:function(data){
    console.log(data);
  },
  choice:function(res){
    console.log(res);
    this.setData({
      clickId: res.currentTarget.id,
      money: app.globalData.data[res.currentTarget.id].shiji_money
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