
const app = getApp()
var call = require("../../utils/request.js")
var signUtil = require("../../utils/signutil.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentSwiper: 0,
    banner: [],
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png',
      '../../images/banner3.png'
    ],
    items: [{
      id: "1",
      title: "汽车影院",
      recom: 4.5,
      image: "../../images/item1.png"
    },
    {
      id: "2",
      title: "跑马场",
      recom: 4.5,
      image: "../../images/item2.png"
    },
    {
      id: "3",
      title: "卡丁车竞技",
      recom: 4.5,
      image: "../../images/item3.png"
    },
    {
      id: "4",
      title: "农业采摘园",
      recom: 4.5,
      image: "../../images/item4.png"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this

  /**
  * 获取banner
  */
    var time_stamp = call.reateTimeStamp();
    var api_code = app.globalData.api_code;
    var ret = {
      api_code: api_code,
      time_stamp: time_stamp,
      Bn_fenlei: '1'
    }
    var sign = signUtil.getbannerSign(ret);
    call.request('index/banner', {
      api_code: api_code,
      time_stamp: time_stamp,
      sign: sign,
      Bn_fenlei: '1',
    }, this.onBannerSuccess, this.onBannerFail);
    /**
   * 获取项目列表
   */
    var ret = {
      api_code: api_code,
      time_stamp: time_stamp,
    }
    var sign = signUtil.getbannerSign(ret);
    call.request('index/products', {
      api_code: app.globalData.api_code,
      time_stamp: time_stamp,
      sign: sign
    }, this.onListSuccess, this.onListFail);
  },

  /**
  * 请求成功
  */
  onBannerSuccess: function (data) {
    console.log(data);
    var that = this;
    that.setData({
      banner: data.banner,
    });
  },
  onListSuccess: function (data) {
    console.log(data);
    var that = this;
    that.setData({
      product:data.productslist,
    })
  },
  /**
 * 请求失败
 */
  onListFail: function (data) {
    console.log(data)
  },
  onBannerFail: function (data) {
    console.log(data)
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  go: function (e) {
    console.log('1')
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
		/**

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