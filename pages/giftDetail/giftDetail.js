import req from '../../utils/request.js'
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        chooseAddress: false,
        animationData: {},


        goods_info: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        that.data.giftId = options.id
        req.get('/wx/giftDetail.htm?giftId=' + that.data.giftId).then((res)=>{
            that.setData({
                goods_info: res.data.gift
            })
        })
    },

    chooseAddress: function(e) {
        // 用that取代this，防止不必要的情况发生
        var that = this;
        // 创建一个动画实例
        var animation = wx.createAnimation({
            // 动画持续时间
            duration: 500,
            // 定义动画效果，当前是匀速
            timingFunction: 'linear'
        })
        // 将该变量赋值给当前动画
        that.animation = animation
        // 先在y轴偏移，然后用step()完成一个动画
        animation.translateY(500).step()
        // 用setData改变当前动画
        that.setData({
            // 通过export()方法导出数据
            animationData: animation.export(),
            // 改变view里面的Wx：if
            chooseAddress: true
        })
        // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
        setTimeout(function() {
            animation.translateY(0).step()
            that.setData({
                animationData: animation.export()
            })
        }, 500)
    },


    previewImage: function(e) {
        var current = e.target.dataset.src;
        var imglist = [];
        imglist.push(current)
        wx.previewImage({
            urls: imglist // 需要预览的图片http链接列表  
        })
    },

    hideModal: function(){
        let that = this
        that.setData({
            chooseAddress: false
        })
    },

    formSubmit: function(e) {
        let that = this
        let contact = e.detail.value
        let msg = ""
        if (contact.consignee.length == 0) {
            msg = "请输入收货人姓名"
        } else if (contact.phonenum.length == 0) {
            msg = "请输入收货人手机号"
        } else if (contact.address.length == 0) {
            msg = "请输入收货人地址"
        } 
        if (msg.length != 0) {
            wx.showModal({
                title: msg,
                showCancel: false
            })
            return
        }
        req.get('/wx/dunhuan.htm?giftId=' + that.data.giftId
            + '&consignee=' + contact.consignee
            + '&phonenum=' + contact.phonenum
            + '&address=' + contact.address
        ).then((res)=>{
            console.log(res)
            wx.showModal({
                title: res.data.message,
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                            url: '../home/home',
                        })
                    }
                }
            })
        })
    }
})