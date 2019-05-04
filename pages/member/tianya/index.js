import req from '../../../utils/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

        type: [
            { id: 0, key: '全部' }, 
            { id: 1001, key: '福彩3D' }, 
            { id: 1001, key: '双色球' }, 
            {id: 1001, key: '15选5' }
            ],
        cycle: [
            {id: 0, key: '全部'},
            {id: 1, key: '一个星期'},
            {id: 2, key: '一个月'},
            {id: 3, key: '两个月'}, 
            {id: 4, key: '三个月'}
            ],
        status: [
            {id: 0, key: '全部'},
            {id: 301, key: '成功'}, 
            {id: 401, key: '中奖'}, 
            {id: 501, key: '未中奖'}
            ],

        /** 分页 */
        list: [],       //列表
        page: 0,        //page 默认从0开始
        typeVal: 0,     //条件1
        cycleVal: 0,     //条件2
        statusVal: 0,    //条件3
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
        req.get('/wx/tiyan.htm?&pageNo=' + that.data.page 
            + "&typeVal=" + that.data.type[that.data.typeVal].id 
            + "&cycleVal=" + that.data.cycle[that.data.cycleVal].id
            + "&statusVal=" + that.data.status[that.data.statusVal].id).then((res) => {
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
    },

    bindPickerChange(e) {
        let that = this
        let index = e.target.dataset.index
        switch(index) {
            case "1":
                this.setData({
                    typeVal: e.detail.value
                })
                break
            case "2":
                this.setData({
                    cycleVal: e.detail.value
                })
                break
            case "3":
                this.setData({
                    statusVal: e.detail.value
                })
                break
        }

        that.setData({
            list: []
        }, that.getListData())
        
        
    },

    
})