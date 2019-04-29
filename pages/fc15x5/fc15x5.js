var app = getApp()
Page( {
  data: {
    "ssqList": [{ "lotteryIissue": "2019047", "lotteryDate": "2019-04-25", "red1": "03", "red2": "11", "red3": "18", "red4": "25", "red5": "30" }, { "lotteryIissue": "2019046", "lotteryDate": "2019-04-23", "red1": "02", "red2": "12", "red3": "16", "red4": "22", "red5": "25"}, { "lotteryIissue": "2019045", "lotteryDate": "2019-04-21", "red1": "01", "red2": "06", "red3": "17", "red4": "19", "red5": "27"}, { "lotteryIissue": "2019044", "lotteryDate": "2019-04-18", "red1": "06", "red2": "14", "red3": "16", "red4": "17", "red5": "23"}, { "lotteryIissue": "2019043", "lotteryDate": "2019-04-16", "red1": "01", "red2": "06", "red3": "12", "red4": "13", "red5": "24" }
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
