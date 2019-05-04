import req from '../../../utils/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

        /** 分页 */
        list: [],       //列表
        page: 0,        //page 默认从0开始
        last: false,    //是否最后一个元素
        loading: false, //是否加载状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.getListData()
    },


    getListData: function () {
        let that = this
        req.get('/wx/message.htm?&pageNo=' + that.data.page).then((res) => {
            that.setData({
                list: that.data.list.concat(res.data.result),
                last: res.data.lastPage,
                loading: false
            })
        })
    },

    getdatalist: function () { //触底开始下一页
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