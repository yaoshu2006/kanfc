var app = getApp()
Page( {
  data: {
    "ssqList": [{ "lotteryIissue": "2019047", "lotteryDate": "2019-04-26", "red1": "01", "red2": "05", "red3": "10", "red4": "13", "red5": "14", "red6": "17", "red7": "22", "blue1": "30" }, { "lotteryIissue": "2019046", "lotteryDate": "2019-04-24", "red1": "03", "red2": "04", "red3": "05", "red4": "09", "red5": "19", "red6": "21", "red7": "29", "blue1": "14" }, { "lotteryIissue": "2019045", "lotteryDate": "2019-04-22", "red1": "02", "red2": "03", "red3": "04", "red4": "05", "red5": "08", "red6": "20", "red7": "21", "blue1": "23" }, { "lotteryIissue": "2019044", "lotteryDate": "2019-04-19", "red1": "03", "red2": "10", "red3": "12", "red4": "18", "red5": "20", "red6": "26", "red7": "29", "blue1": "06" }, { "lotteryIissue": "2019043", "lotteryDate": "2019-04-17", "red1": "02", "red2": "13", "red3": "15", "red4": "20", "red5": "21", "red6": "22", "red7": "25", "blue1": "28" }, { "lotteryIissue": "2019042", "lotteryDate": "2019-04-15", "red1": "05", "red2": "08", "red3": "09", "red4": "16", "red5": "17", "red6": "22", "red7": "24", "blue1": "14" }, { "lotteryIissue": "2019041", "lotteryDate": "2019-04-12", "red1": "02", "red2": "03", "red3": "07", "red4": "11", "red5": "13", "red6": "24", "red7": "26", "blue1": "20" }, { "lotteryIissue": "2019040", "lotteryDate": "2019-04-10", "red1": "02", "red2": "07", "red3": "10", "red4": "15", "red5": "19", "red6": "24", "red7": "30", "blue1": "03" }, { "lotteryIissue": "2019039", "lotteryDate": "2019-04-08", "red1": "06", "red2": "07", "red3": "09", "red4": "12", "red5": "23", "red6": "29", "red7": "30", "blue1": "14" }, { "lotteryIissue": "2019038", "lotteryDate": "2019-04-05", "red1": "02", "red2": "08", "red3": "12", "red4": "18", "red5": "21", "red6": "22", "red7": "28", "blue1": "20" }, { "lotteryIissue": "2019037", "lotteryDate": "2019-04-03", "red1": "02", "red2": "10", "red3": "13", "red4": "14", "red5": "16", "red6": "18", "red7": "25", "blue1": "27" }, { "lotteryIissue": "2019036", "lotteryDate": "2019-04-01", "red1": "06", "red2": "13", "red3": "14", "red4": "15", "red5": "16", "red6": "20", "red7": "26", "blue1": "08" }, { "lotteryIissue": "2019035", "lotteryDate": "2019-03-29", "red1": "01", "red2": "05", "red3": "13", "red4": "14", "red5": "23", "red6": "25", "red7": "26", "blue1": "21" }, { "lotteryIissue": "2019034", "lotteryDate": "2019-03-27", "red1": "01", "red2": "06", "red3": "10", "red4": "12", "red5": "23", "red6": "26", "red7": "29", "blue1": "13" }, { "lotteryIissue": "2019033", "lotteryDate": "2019-03-25", "red1": "02", "red2": "03", "red3": "05", "red4": "14", "red5": "16", "red6": "21", "red7": "25", "blue1": "22" }, { "lotteryIissue": "2019032", "lotteryDate": "2019-03-22", "red1": "03", "red2": "05", "red3": "07", "red4": "18", "red5": "24", "red6": "26", "red7": "29", "blue1": "22" }, { "lotteryIissue": "2019031", "lotteryDate": "2019-03-20", "red1": "07", "red2": "09", "red3": "10", "red4": "12", "red5": "17", "red6": "26", "red7": "28", "blue1": "16" }, { "lotteryIissue": "2019030", "lotteryDate": "2019-03-18", "red1": "07", "red2": "09", "red3": "15", "red4": "18", "red5": "19", "red6": "25", "red7": "26", "blue1": "21" 
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
