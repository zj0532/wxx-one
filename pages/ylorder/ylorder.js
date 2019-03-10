var sliderWidth = 96;

// pages/ylorder/ylorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:["全部","待使用"],
    //默认第一页
    activeIndex:0,
    sliderOffset:0,
    sliderLeft:0,
    /**
		 * 全部票的数据
		 */
    all_items: [{
      "Bo_id": "1",
      "Bo_ordernum": "144",
      "Bps_product_name": "汽车影院-平日票",
      "Bps_img": "../../img/banner1.png",
      "Bo_number": 3,
      "Bo_sum_price": 100,
      "Bo_status": "待使用"
    }, {
      "Bo_id": "2",
      "Bo_ordernum": "345634",
      "Bps_product_name": "汽车影院-周末票",
        "Bps_img": "../../img/banner2.png",
      "Bo_number": 7,
      "Bo_sum_price": 300,
      "Bo_status": "已完成"
    }],
    use_items: [{
      "Bo_id": "1",
      "Bo_ordernum": "144",
      "Bps_product_name": "汽车影院-平日票",
      "Bps_img": "../../img/banner1.png",
      "Bo_number": 3,
      "Bo_sum_price": 100,
      "Bo_status": "待使用"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success:function(res){
        that.setData({
          sliderLeft:(res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset:res.windowWidth / that.data.tabs.length * that.data.activeIndex,
        });
      }
    });

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
  },

  tabClick:function(e){
    this.setData({
      sliderOffset:e.currentTarget.offsetLeft,
      activeIndex:e.currentTarget.id,
    })
  },

  itemclick:function(e){
    wx.navigateTo({
      url: '../YLOrderDetail/YLOrderDetail?id=' + e.currentTarget.id,
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