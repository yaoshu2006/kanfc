import req from '../../utils/request.js'
var mtabW;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requestUrl: "", 
        tabs: [],   //顶部tab
        activeIndex: 0,
        slideOffset: 0,
        tabW: 0,

        //多个TAB数组的数据存放
        listData: [],       //多维数组
        page: [0],           //page 默认从0开始
        last: [],           //是否最后一个元素,
        loading: [],        //是否加载中
        firstLoading: [],   //是否第一次加载

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            tabs: ["双色球", "3D", "15选5", "七乐彩", "6+1"],
        })

        wx.getSystemInfo({
            success: function (res) {
                mtabW = res.windowWidth / that.data.tabs.length 
                let scrollHeight = wx.getSystemInfoSync().windowHeight - 44;
                that.setData({
                    tabW: mtabW,
                    scrollHeight: scrollHeight
                })
            }
        });

        //默认加载第一页数据
        that.getListData(that.data.activeIndex)
    },

    onShow: function () {
        let that = this
        var community_id = app.globalData.community_id_for_switch_tab;
        console.log(community_id);

        that.setData({
            activeIndex: community_id || 0
        })
        // TODO: DO SOMETHING
        if (community_id) {
            // 处理完成后，清空缓存值
            app.globalData.community_id_for_switch_tab = null;
        }
    },


    tabClick: function (e) {
        var that = this;
        var idIndex = e.currentTarget.id;
        var offsetW = e.currentTarget.offsetLeft;  //2种方法获取距离文档左边有多少距离
        that.setData({
            activeIndex: idIndex,
            slideOffset: offsetW
        });
    },

    //
    bindChange: function (e) {
        var that = this
        var current = e.detail.current;
        var offsetW = current * mtabW;    //2种方法获取距离文档左边有多少距离
        this.setData({
            activeIndex: current,
            slideOffset: offsetW
        });
        if (current == 1 && !that.data.listData[1] && !that.data.firstLoading[1]) {
            console.log("第一次加载页面1")
            that.getListData(1)
        } else if (current == 2 && !that.data.listData[2] && !that.data.firstLoading[2]) {
            console.log("第一次加载页面2")
            that.getListData(2)
        } else if (current == 3 && !that.data.listData[3] && !that.data.firstLoading[3]) {
            console.log("第一次加载页面3")
            that.getListData(3)
        } else if (current == 4 && !that.data.listData[4] && !that.data.firstLoading[4]) {
            console.log("第一次加载页面4")
            that.getListData(4)
        } 
    },

    //第一个页面的分页
    getListData: function (offset) {
        let that = this
        let requestUrl = ""
        switch (offset) {
            case 0:
                requestUrl= "https://weixin.nonot.cn/index.php/Index/ssqNJson"
                break
            case 1:
                requestUrl= "https://weixin.nonot.cn/index.php/Index/tdNJson"
                break
            case 2:
                requestUrl = "https://weixin.nonot.cn/index.php/Index/swxwNJson"
                break
            case 3:
                requestUrl = "https://weixin.nonot.cn/index.php/Index/klcNJson"
                break
            case 4:
                requestUrl = "https://weixin.nonot.cn/index.php/Index/ljyNJson"
                break
        }
        req.get(requestUrl + "/page/" + (that.data.page[offset] ? that.data.page[offset] : 0))
            .then((res) => {
                if (!that.data.listData[offset]) {
                    that.data.listData[offset] = []
                }
                if (!that.data.page[offset]) {
                    that.data.page[offset] = 0
                }
                let param1 = "listData[" + offset + "]"
                let param2 = "last[" + offset + "]"
                let param3 = "loading[" + offset + "]"
                let param4 = "firstLoading[" + offset + "]"
                that.setData({
                    [param1]: that.data.listData[offset].concat(res.data.list),
                    [param2]: res.data.list.length != 20,
                    [param3]: false,
                    [param4]: false,
                })
            })
    },

    getdatalist: function (e) { //触底开始下一页
        let that = this
        let index = e.currentTarget.dataset.index
        if (!that.data.last[index] && !that.data.loading[index]) {
            let param1 = "loading[" + index + "]"
            let param2 = "page[" + index + "]" 
            that.setData({
                [param1]: true,
                [param2]: that.data.page[index] + 1
            })
            console.log("加载下一页")
            that.getListData(index)
        } else {
            console.log("没有了")
        }
    }
})