Page( {
    data: {
        // text:"这是一个页面"
        array: [ "福利", "Android", "iOS", "休息视频", "扩展资源", "前端", "all" ],
        index: 0,
        toastHidden: true
    },
       
    onLoad: function( options ) {
        // 页面初始化 options为页面跳转所带来的参数
        that = this;
    },

    onPickerChanged: function( event ) {
        this.setData( { index: event.detail.value })
    },

    onToastChanged: function() {
        that.setData( { toastHidden: true })
    },

    formSubmit: function( event ) {
        console.log( event );
        post( event.detail.value );
    },

    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
});

function post( data ) {
    console.log( Util.json2Form( data ) );
    wx.request( {
        url: Constant.BASE_URL + "/add2gank",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: Util.json2Form( data ).concat( "&debug=false" ),

        complete: function( res ) {
            if( res == null || res.data == null || res.data.msg == null ) {
                console.error(( Constant.ERROR_DATA_IS_NULL ) );
                return;
            }
            that.setData( { toastHidden: false, toastText: res.data.msg });
        }
    });
}

var that;
var Constant = require( '../../utils/constant.js' );
var Util = require( '../../utils/util.js' );