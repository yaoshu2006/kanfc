import req from '../../utils/request.js'
var app = getApp()
Page({
    data: {
        imgUrls: [
            'http://www.kanfucai.com/giftImg/20150804150734201.jpg',
            'http://www.kanfucai.com/giftImg/20190416104702493.jpg',

            'https://onegoods.nosdn.127.net/resupload/2016/9/20/f2f210633ca371ea6dc56a4b8916a15d.jpg',
            'https://onegoods.nosdn.127.net/resupload/2016/9/21/33c38d5283a862b2523fe2e085355cb2.jpg',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        windowWidth: 320,
        sortPanelTop: '0',
        sortPanelDist: '290',
        sortPanelPos: 'relative',


        /** 分页 */
        newsList: [], //活动列表
        page: 0, //page 默认从0开始
        last: false, //是否最后一个元素
        loading: false, //是否加载状态


    },
    onReady: function() {

    },
    onLoad: function() {
        var me = this;
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease-out',
        });
        me.animation = animation;
        wx.getSystemInfo({
            success: function(res) {
                me.setData({
                    windowWidth: res.windowWidth
                })
            }
        });


        me.getListData()
    },

    getListData: function() {
        let that = this
        req.get('/wx/news.htm?&pageNo=' + that.data.page).then((res) => {
            that.setData({
                newsList: that.data.newsList.concat(res.data.news),
                last: res.data.news.length != 10,
                loading: false
            })
        })
    },

    getdatalist: function() { //触底开始下一页
        let that = this
        if (!that.data.last && !that.data.loading) {
            that.setData({
                loading: true
            })
            console.log("加载下一页")
            that.data.page = that.data.page + 1
            that.getListData()
        } else {
            console.log("没有了")
        }
    }
})