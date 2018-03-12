
mui.init({
  swipeBack:true //启用右滑关闭功能
});

var Intent = null,
  File = null,
  Uri = null,
  main = null;
var shares = null;
var shareImageUrl = '';
mui.plusReady(function() {
  console.log(1)
  updateSerivces();
  if (plus.os.name == "Android") {
    Intent = plus.android.importClass("android.content.Intent");
    File = plus.android.importClass("java.io.File");
    Uri = plus.android.importClass("android.net.Uri");
    main = plus.android.runtimeMainActivity();
  }
});
/**
 * 更新分享服务
 */
function updateSerivces() {
  console.log(1)
  plus.share.getServices(function(s) {
    shares = {};
    for (var i in s) {
      var t = s[i];
      shares[t.id] = t;
    }
    outSet("获取分享服务列表成功");
  }, function(e) {
    outSet("获取分享服务列表失败：" + e.message);
  });
}
/**
 * 分享操作
 */
function shareAction(id, ex) {
  console.log('id = ' + id);
  console.log('ex = ' + ex);
  console.log('shares[id]' + shares[id]);
  var s = null;
  if (!id || !(s = shares[id])) {
    outLine("无效的分享服务！");
    return;
  }
  if (s.authenticated) {
    outSet("---已授权---");
    shareMessage(s, ex);
  } else {
    outSet("---未授权---");
    s.authorize(function() {
      shareMessage(s, ex);
    }, function(e) {
      outLine("认证授权失败");
    });
  }
}
/**
 * 发送分享消息
 */
function shareMessage(s, ex) {
  var msg = {
    content: '分享-详情',
    href: 'http://blog.csdn.net/zhuming3834',
    title: 'HGDQ-分享测试-title',
    content: 'HGDQ-分享测试-content',
    thumbs: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
    pictures: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
    extra: {
      scene: ex
    }
  };
  s.send(msg, function() {
    outLine("分享成功!");
  }, function(e) {
    outLine("分享失败!");
  });
}
/**
 * 分享按钮点击事件
 * 注意这里的这些id值
 */
function shareHref() {
  var ids = [{
      id: "weixin",
      ex: "WXSceneSession"  /*微信好友*/
    }, {
      id: "weixin",
      ex: "WXSceneTimeline" /*微信朋友圈*/
    }, {
      id: "qq"   /*QQ好友*/
    },{
      id: "tencentweibo"   /*腾讯微博*/
    },{
      id: "sinaweibo"  /*新浪微博*/
    }],
    bts = [{
      title: "发送给微信好友"
    }, {
      title: "分享到微信朋友圈"
    }, {
      title: "分享到QQ"
    }, {
      title: "分享到腾讯微博"
    }, {
      title: "分享到新浪微博"
    }];
  plus.nativeUI.actionSheet({
      cancel: "取消",
      buttons: bts
    },
    function(e) {
      var i = e.index;
      console.log('i = ' + i);
      if (i > 0) {
        shareAction(ids[i - 1].id, ids[i - 1].ex);
      }
    }
  );
}
// 控制台输出日志
function outSet(msg) {
  console.log(msg);
}
// 界面弹出吐司提示
function outLine(msg) {
  mui.toast(msg);
}
