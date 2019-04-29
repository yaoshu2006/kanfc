var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_shoucang: 0,
        goods_info: {},
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,

    },


    previewImage: function(e) {
        var current = e.target.dataset.src;
        let a = []
        a.push(current)
        wx.previewImage({
            urls: a // 当前显示图片的http链接 
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        let index = options.index

        let pages = getCurrentPages();
        let Page = pages[pages.length - 1];//当前页
        let prevPage = pages[pages.length - 2];  //上一个页面
        let info = prevPage.data.goodsList[index] //取上页data里的数据也可以修改

        that.setData({
            goods_info: info
        })    
    },
})