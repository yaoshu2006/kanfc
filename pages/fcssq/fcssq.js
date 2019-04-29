var app = getApp()
Page( {
  data: {
    "ssqList": [{ "lotteryIissue": "2019047", "lotteryDate": "2019-04-25", "red1": "03", "red2": "11", "red3": "18", "red4": "25", "red5": "30", "red6": "33", "blue1": "14" }, { "lotteryIissue": "2019046", "lotteryDate": "2019-04-23", "red1": "02", "red2": "12", "red3": "16", "red4": "22", "red5": "25", "red6": "32", "blue1": "06" }, { "lotteryIissue": "2019045", "lotteryDate": "2019-04-21", "red1": "01", "red2": "06", "red3": "17", "red4": "19", "red5": "27", "red6": "31", "blue1": "14" }, { "lotteryIissue": "2019044", "lotteryDate": "2019-04-18", "red1": "06", "red2": "14", "red3": "16", "red4": "17", "red5": "23", "red6": "29", "blue1": "07" }, { "lotteryIissue": "2019043", "lotteryDate": "2019-04-16", "red1": "01", "red2": "06", "red3": "12", "red4": "13", "red5": "24", "red6": "32", "blue1": "13" }, { "lotteryIissue": "2019042", "lotteryDate": "2019-04-14", "red1": "15", "red2": "17", "red3": "19", "red4": "22", "red5": "25", "red6": "26", "blue1": "04" }, { "lotteryIissue": "2019041", "lotteryDate": "2019-04-11", "red1": "02", "red2": "09", "red3": "13", "red4": "23", "red5": "24", "red6": "26", "blue1": "16" }, { "lotteryIissue": "2019040", "lotteryDate": "2019-04-09", "red1": "05", "red2": "06", "red3": "09", "red4": "18", "red5": "23", "red6": "31", "blue1": "11" }, { "lotteryIissue": "2019039", "lotteryDate": "2019-04-07", "red1": "06", "red2": "07", "red3": "11", "red4": "14", "red5": "27", "red6": "32", "blue1": "08" }, { "lotteryIissue": "2019038", "lotteryDate": "2019-04-04", "red1": "09", "red2": "12", "red3": "21", "red4": "27", "red5": "29", "red6": "30", "blue1": "05" }, { "lotteryIissue": "2019037", "lotteryDate": "2019-04-02", "red1": "01", "red2": "07", "red3": "12", "red4": "14", "red5": "18", "red6": "25", "blue1": "10" }, { "lotteryIissue": "2019036", "lotteryDate": "2019-03-31", "red1": "02", "red2": "10", "red3": "13", "red4": "16", "red5": "23", "red6": "32", "blue1": "08" }, { "lotteryIissue": "2019035", "lotteryDate": "2019-03-28", "red1": "01", "red2": "05", "red3": "07", "red4": "09", "red5": "10", "red6": "20", "blue1": "16" 
}
    ],
    animationNotice: {}
  },
  onReady: function() {

  },
  onLoad: function() {
    var me = this;
    var animation = wx.createAnimation( {
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo( {
      success: function( res ) {
        me.setData( { windowWidth: res.windowWidth })
      }
    });

    console.log( 'onLoad' );
  },
  startNotice: function() {
    var me = this;
    var notices = me.data.notices || [];
    if( notices.length == 0 ) {
      return;
    }

    var animation = me.animation;
    //animation.translateY( -12 ).opacity( 0 ).step();
    animation.translateY( 0 ).opacity( 1 ).step( { duration: 0 });
    me.setData( { animationNotice: animation.export() });

    var noticeIdx = me.data.noticeIdx + 1;
    if( noticeIdx == notices.length ) {
      noticeIdx = 0;
    }

    // 更换数据
    setTimeout( function() {
      me.setData( {
        noticeIdx: noticeIdx
      });
    }, 400 );

    // 启动下一次动画
    setTimeout( function() {
      me.startNotice();
    }, 5000 );
  },
  onShow: function() {
    this.startNotice();

  },
  onToTop: function( e ) {
    if( e.detail.scrollTop >= 290 ) {
      this.setData( { sortPanelPos: 'fixed' });
    } else {
      this.setData( { sortPanelPos: 'relative' });
    }
    console.log( e.detail.scrollTop )
  }
})
