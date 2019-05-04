import wfc from '../../../utils/wfc.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

        hball: [],  //百位
        sball: [],  //十位
        ball: [],   //个位


        //选中的
        ballbox: [],
        count: 1,
        value: 0 //所需总积分
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.reset()
    },

    bindchange: function(e) {
        let that = this
        let type = e.currentTarget.dataset.type



    },

    selectball: function (e) {
        let that = this
        let type = e.currentTarget.dataset.type
        let index = e.currentTarget.dataset.index
        let select = e.currentTarget.dataset.select
        if (!that.validData(type, index, select)) {
            wx.showModal({
                title: '每位只能选择一个红球',
                showCancel: false
            })
            return
        }
        let param = ""
        let checked
        switch (type) {
            case "1":
                param = "hball[" + index + "].checked"
                checked = that.data.hball[index].checked
                break
            case "2":
                param = "sball[" + index + "].checked"
                checked = that.data.sball[index].checked
                break
            case "3":
                param = "ball[" + index + "].checked"
                checked = that.data.ball[index].checked
                break
        }
        that.setData({
            [param]: !checked
        })
    },

    //校验玩法规则
    validData: function (type, index, select) {
        let that = this
        let maxHballNum = 1
        let maxSballNum = 1
        let maxBallNum = 1
        let hballNum = (type == "1" && !select) ? 1 : 0
        let sballNum = (type == "2" && !select) ? 1 : 0
        let ballNum = (type == "3" && !select) ? 1 : 0
        hballNum += that.getBall(that.data.hball).length
        if (hballNum > maxHballNum) {
            return false
        }
        sballNum += that.getBall(that.data.sball).length
        if (sballNum > maxSballNum) {
            return false
        }
        ballNum += that.getBall(that.data.ball).length
        if (ballNum > maxBallNum) {
            return false
        }
        return true
    },

    sends: function () {
        let that = this
        let ball1 = that.getBall(that.data.hball)
        if (ball1.length != 1) {
            wx.showModal({
                title: '百位上请选择1个',
                showCancel: false
            })
            return
        }
        let ball2 = that.getBall(that.data.sball)
        if (ball2.length != 1) {
            wx.showModal({
                title: '十位上请选择1个',
                showCancel: false
            })
            return
        }
        let ball3 = that.getBall(that.data.sball)
        if (ball3.length != 1) {
            wx.showModal({
                title: '个位上请选择一个',
                showCancel: false
            })
            return
        }
        let box = []
        box.push(ball1[0])
        box.push(ball2[0])
        box.push(ball3[0])
        that.data.ballbox.push(box)
        that.setData({
            ballbox: that.data.ballbox
        })
        that.reset()
    },


    //获取数组中的球
    getBall: function (arr) {
        let array = []
        for (let i in arr) {
            if (arr[i].checked) {
                array.push(arr[i].num)
            }
        }
        return array
    },


    reset: function () {
        let that = this
        let ball0 = wfc.getBallArrayFrom0();
        let ball1 = wfc.getBallArrayFrom0();
        let ball2 = wfc.getBallArrayFrom0();
        that.setData({
            hball: ball0,
            sball: ball1,
            ball: ball2
        })
    },

    clean: function () {
        let that = this
        that.setData({
            ballbox: []
        })
    },

    random: function (e) {
        let that = this
        let count = e.currentTarget.dataset.num
        let result = []
        for (let i = 0; i < count; i++) {
            let box = []
            for (let i = 0; i < 3; i++) {
                let index = Math.floor(Math.random() * 10);
                box.push(index)
            }
            result.push(box)
        }
        that.setData({
            ballbox: that.data.ballbox.concat(result)
        })
        that.count()
    },
    //计算总数
    count: function () {
        let that = this
        let value = that.data.ballbox.length * 2 * that.data.count
        that.setData({
            value: value
        })
    },

    //事件处理函数
    /*点击减号*/
    bindMinus: function (e) {
        let that = this
        var num = this.data.count;
        if (num > 1) {
            num--;
        }
        var minusStat = num > 1 ? true : false;
        that.setData({
            count: num,
            minusStatus: minusStat
        }, () => {
            that.count()
        })
    },
    /*点击加号*/
    bindPlus: function (e) {
        let that = this
        var num = this.data.count;
        num++;
        var minusStat = num > 1 ? true : false;
        that.setData({
            count: num,
            minusStatus: minusStat
        }, () => {
            that.count()
        })
    },


})