<template>
  <div class="invite">

    <!--/*****引导-->
    <img @click="yindaohide" v-show="first" src="../../assets/img/invite/invite-yindao.png" alt="" class="invite-yindao">

    <div class="header">
      <img @click="back" src="../../assets/img/huigongxiang/huigongxiang-back.png" alt="" id="back">
      <div class="title">邀请好友 <img class="yao" @click="getrule" src="../../assets/img/huigongxiang/huigongxiang-rule.png" alt=""> </div>
      <div class="title-litter">您已经成功邀请{{num}}位好友</div>
      <img  @click="share" src="../../assets/img/invite/invite-yao.png" alt="" class="rule">
    </div>

    <div class="center"></div>
    <div class="top"></div>
    <div class="prize">
      <div @click="getfriendscore">
        <img src="../../assets/img/invite/invite-prize1.png" alt="">
        <img src="../../assets/img/invite/invite-font1.png" alt="">
      </div>
      <div @click="getinvitetimes">
        <img src="../../assets/img/invite/invite-prize2.png" alt="">
        <img src="../../assets/img/invite/invite-font2.png" alt="">
      </div>
    </div>
    <div class="footer" ref="mybox">
      <div class="footer-title">好友动态</div>
      <ul class="list">
        <li v-for="item in friendinfo">{{item.last_login_time}}&nbsp;&nbsp; {{item.text1}}&nbsp;&nbsp;<span style="color:red">{{item.text2}}</span>&nbsp;&nbsp;{{item.text3}}</li>
        <li v-for="item in friendinfo">{{item.last_login_time}}&nbsp;&nbsp; {{item.text1}}&nbsp;&nbsp;<span style="color:red">{{item.text2}}</span>&nbsp;&nbsp;{{item.text3}}</li>
        <li v-for="item in friendinfo">{{item.last_login_time}}&nbsp;&nbsp; {{item.text1}}&nbsp;&nbsp;<span style="color:red">{{item.text2}}</span>&nbsp;&nbsp;{{item.text3}}</li>
      </ul>
    </div>
    <!--/*已经邀请的好友*/-->
    <div v-show="friendshow" class="already-box">
      <div class="already">
        <div class="already-top"></div>
        <ul class="already-content">
          <li>
            <div>名称</div>
            <div>当前积分</div>
          </li>
          <li v-for="item in friendslist">
            <div>{{item.nickname}}</div>
            <div>{{item.experience}}</div>
          </li>
        </ul>
        <div class="already-bottom"></div>
        <img @click="hidefriend" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>
    <!--/*邀请礼包*/-->
    <div v-show="libaoshow" class="libao-box">
      <div class="libao">
        <div class="libao-top"></div>
        <ul class="libao-content">
          <li>
            <img :src="libaoone.libao" alt="">
            <span>{{libaoone.font}}</span>
            <img @click="lingone" class="btn" :src="libaoone.btn" alt="">
          </li>
          <li>
            <img :src="libaotwo.libao" alt="">
            <span>{{libaotwo.font}}</span>
            <img @click="lingtwo" class="btn" :src="libaotwo.btn" alt="">
          </li>
          <li>
            <img :src="libaothree.libao" alt="">
            <span>{{libaothree.font}}</span>
            <img @click="lingthree" class="btn" :src="libaothree.btn" alt="">
          </li>
        </ul>
        <div class="libao-bottom"></div>
        <img @click="hidelibao" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>

    <!--/*获得页面*/-->
    <div v-show="hideprize" class="getprize-box">
      <div class="getprize">
        <img src="../../assets/img/invite/invite-get.png" alt="" class="getprize-top">
        <img src="../../assets/img/invite/invite-xingbi.png" alt="" class="getprize-xingbi2">
        <span>X &nbsp;{{xingbi}}</span>
        <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
        <p>奖励将在两小时内发放</p>
        <img @click="hidegetprize" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>

    <!--/*每日提示*/-->
    <div v-show="today" class="getprize-box">
      <div class="getprize">
        <img class="yaoqing" src="../../assets/img/invite/invite-yaoqingfriend.png" alt="">
        <div style="width: 100%;height: 0.3rem;font-size: 0.34rem;text-align: center;line-height: 0.3rem;color: rgb(172,4,124);position: absolute;top: 2.4rem;">活动提示</div>
        <p style="font-size: 0.26rem;color: #6468e7;">快邀请好友入住鱼小镇,获得丰厚的奖励~</p>
        <img @click="hidetoday" src="../../assets/img/Jackpot/Jack-ok.png" alt="" class="ok">
      </div>
    </div>


    <!--规则页面-->
    <div class="rulebox" v-show="showrule">
      <div>
        <p class="title">邀请好友规则</p>
        <p>独乐乐不如众乐乐,小动物们已经备上厚礼,期待这更多的小伙伴们的加入-</p>
        <p>1.成功邀请一位好友可获得一次福利抽奖机会，每日最多可获得3次机会。</p>
        <p>2.成功邀请一位好友进入鱼达人可获得“得一知己礼包”：鱼币50个。</p>
        <p>3.成功邀请三位好友进入鱼达人可获得“左右逢源礼包”：鱼币100个。</p>
        <p>4.成功邀请五位好友进入鱼达人可获得“呼朋唤友礼包”：鱼币150个。</p>
        <p>5.所有被邀请的好友共享所获得的鱼币会带给邀请人额外的收入。</p>
        <img @click="hiderule" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>

  </div>
</template>


<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default {
    data() {
      return {
        userId:localStorage.getItem('userId'),
        num:"0",
        friendshow:false,
        friendslist:[],
        friendinfo:[],
        libaoshow:false,
        libaoone:{
          libao:require("../../assets/img/invite/invite-prize-gift.png"),
          font:"成功邀请一人",
          btn:require("../../assets/img/invite/invite-lingbtn.png")
        },
        libaotwo:{
          libao:require("../../assets/img/invite/invite-prize-gift.png"),
          font:"成功邀请三人",
          btn:require("../../assets/img/invite/invite-lingbtn.png")
        },
        libaothree:{
          libao:require("../../assets/img/invite/invite-prize-gift.png"),
          font:"成功邀请五人",
          btn:require("../../assets/img/invite/invite-lingbtn.png")
        },
        hideprize:false,
        xingbi:"",
        showrule:false,
        first:true,
        today:false,
      }
    },
    created: function () {

      if(localStorage.getItem('invite')){
        this.first=false;
      }
      //返回
      var that=this;
      mui.back=function () {
        that.$router.push("/index")
      };
      //获取好友动态
      this.getfriendinfo();
      this.getfriendnum();
    },
    mounted:function(){
      this.getHeight();
    },
    methods: {
      hidetoday:function () {
        this.today=false;
      },
      yindaohide:function () {
        this.first=false;
        localStorage.setItem('invite', "ok");
      },
      back:function () {
        this.$router.push("/index");
      },

      share:function(){
        mui.init();
        var Intent = null,
          File = null,
          Uri = null,
          main = null;
        var shares = null;
        var shareImageUrl = '';
        mui.plusReady(function() {
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
        var uid=this.userId;
        var that=this;
        function shareMessage(s, ex) {
          var msg = {
            href: 'https://h5.adgame.ink/test/index.php/Activity/register/index?uid='+uid+'&from=groupmessage',
            title: '你的好友在鱼小镇等您',
            content: '我在鱼小镇等你，自从来了鱼小镇，每天福利红包，拿到手软。嘘！别人我不告诉！！！',
            thumbs: ['https://h5.adgame.ink/test/Public/Activity/images/0108/appshare.png'],
            pictures: ['https://h5.adgame.ink/test/Public/Activity/images/0108/appshare.png'],
            extra: {
              scene: ex
            }
          };
          s.send(msg, ()=> {
            var url=apicommon.apicommon+"/test/index.php/Activity/Game/shareback"
            if(s.description=="微信"){
              that.axios.post(url,that.$qs.stringify({uid:that.userId,type:1,cate:1})).then(successRes=>{
                if(successRes.data.status==1){
                  outLine("分享到"+s.description+"成功!");
                  that.hideprize=!that.hideprize;
                  that.xingbi=successRes.data.score;
                }else if(successRes.data.status==2){
                  outLine("分享到"+s.description+"成功!");
                  that.hideprize=!that.hideprize;
                  that.xingbi=successRes.data.score;
                }else if(successRes.data.status==3){
                  outLine("分享到"+s.description+"成功!");
                }
              })
            }else if(s.description=="QQ"){
              that.axios.post(url,that.$qs.stringify({uid:that.userId,type:0,cate:1})).then(successRes=>{
                if(successRes.data.status==1){
                  outLine("分享到"+s.description+"成功!");
                  that.hideprize=!that.hideprize;
                  that.xingbi=successRes.data.score;
                }else if(successRes.data.status==2){
                  outLine("分享到"+s.description+"成功!");
                  that.hideprize=!that.hideprize;
                  that.xingbi=successRes.data.score;
                }else if(successRes.data.status==3){
                  outLine("分享到"+s.description+"成功!");
                }
              })
            }

          }, (e)=> {
            outLine("分享"+s.description+"失败!");
          });
        }
        /**
         * 分享按钮点击事件
         * 注意这里的这些id值
         */
        function shareHref() {
          var ids = [
                {id: "weixin", ex: "WXSceneSession"  /*微信好友*/},
                {id: "weixin", ex: "WXSceneTimeline" /*微信朋友圈*/},
                {id: "qq"   /*QQ好友*/}],
              bts = [
                {title: "发送给微信好友"},
                {title: "分享到微信朋友圈"},
                {title: "分享到QQ"},
              ];
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
        shareHref();
      },
      getrule:function () {
        this.showrule=!this.showrule;
      },
      hiderule:function () {
        this.showrule=!this.showrule;
      },
      hidegetprize:function(){
        this.hideprize=!this.hideprize;
      },
      getfriendnum:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getfriendscore";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.status==2){
            mui.toast("您还没有邀请过好友！！");
          }else if(successRes.data.status==1){
            this.num=successRes.data.times;
          }
        })
      },
      getfriendscore:function () {
        this.friendshow=!this.friendshow;
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getfriendscore";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.status==2){
            mui.toast("您还没有邀请过好友！！")
          }else if(successRes.data.status==1){
            this.friendslist=successRes.data.data;
          }
        })
      },
      getinvitetimes:function () {
        this.libaoshow=!this.libaoshow;
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getinvitetimes";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.prize1==1){
            this.libaoone.btn=require("../../assets/img/invite/invite-no.png");
          }else if(successRes.data.prize1==2){
            this.libaoone.btn=require("../../assets/img/invite/invite-lingbtn.png");
          }else if(successRes.data.prize1==3){
            this.libaoone.btn=require("../../assets/img/invite/invite-already.png");
          }
          if(successRes.data.prize3==1){
            this.libaotwo.btn=require("../../assets/img/invite/invite-no.png");
          }else if(successRes.data.prize3==2){
            this.libaotwo.btn=require("../../assets/img/invite/invite-lingbtn.png");
          }else if(successRes.data.prize3==3){
            this.libaotwo.btn=require("../../assets/img/invite/invite-already.png");
          }
          if(successRes.data.prize5==1){
            this.libaothree.btn=require("../../assets/img/invite/invite-no.png");
          }else if(successRes.data.prize5==2){
            this.libaothree.btn=require("../../assets/img/invite/invite-lingbtn.png");
          }else if(successRes.data.prize5==3){
            this.libaothree.btn=require("../../assets/img/invite/invite-already.png");
          }
        })
      },
      lingone:function () {

        var url=apicommon.apicommon+"/test/index.php/Activity/Game/inviteprize";
        this.axios.post(url,this.$qs.stringify({uid:this.userId,type:1})).then(successRes=>{
          console.log(successRes.data);
          if(successRes.data.status==1){
            mui.toast("您无法获取该礼包,赶快邀请好友吧！");
            return;
          }else{
            if(successRes.data.prize3==1){
              this.libaoone.btn=require("../../assets/img/invite/invite-no.png");
            }else if(successRes.data.prize3==3){
              this.libaoone.btn=require("../../assets/img/invite/invite-already.png");
            }else{
              this.libaoone.btn=require("../../assets/img/invite/invite-already.png");
              this.libaoshow=!this.libaoshow;
              this.hideprize=!this.hideprize;
            }
            this.xingbi=successRes.data.status;
          }
        })
      },

      lingtwo:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/inviteprize";
        this.axios.post(url,this.$qs.stringify({uid:this.userId,type:2})).then(successRes=>{
          console.log(successRes.data);
          if(successRes.data.status==1){
            mui.toast("您无法获取该礼包,赶快邀请好友吧！")
            return;
          }else{
            if(successRes.data.prize3==1){
              this.libaotwo.btn=require("../../assets/img/invite/invite-no.png");
            }else if(successRes.data.prize3==3){
              this.libaotwo.btn=require("../../assets/img/invite/invite-already.png");
            }else{
              this.libaotwo.btn=require("../../assets/img/invite/invite-already.png");
              this.libaoshow=!this.libaoshow;
              this.hideprize=!this.hideprize;
            }
            this.xingbi=successRes.data.status;
          }
        });
      },
      lingthree:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/inviteprize";
        this.axios.post(url,this.$qs.stringify({uid:this.userId,type:3})).then(successRes=>{
          console.log(successRes.data);
          if(successRes.data.status==1){
            mui.toast("您无法获取该礼包,赶快邀请好友吧！")
            return;
          }else{
            console.log(successRes.data);
            if(successRes.data.prize5==1){
              this.libaothree.btn=require("../../assets/img/invite/invite-no.png");
            }else if(successRes.data.prize5==3){
              this.libaothree.btn=require("../../assets/img/invite/invite-already.png");
            }else {
              this.libaothree.btn=require("../../assets/img/invite/invite-already.png");
              this.libaoshow=!this.libaoshow;
              this.hideprize=!this.hideprize;
            }
            this.xingbi=successRes.data.status;
          }
        })
      },
      hidefriend:function () {
        this.friendshow=!this.friendshow;
      },
      hidelibao:function () {
        this.libaoshow=!this.libaoshow;
      },
      getfriendinfo:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getfriendinfo";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.status=="2"){
            this.today=true;
          }
          this.friendinfo=successRes.data.data;
        })
      },
      getHeight:function () {
        var bodyheight=document.body.clientHeight;
        const self = this;
        this.$refs.mybox.style.height=bodyheight-269+"px";
      },
    },
  }
</script>


<style scoped>
  .ok{
    width: 1.86rem;
    height: 0.66rem;
    position: absolute;
    bottom: 0.1rem;
    left: 50%;
    margin-left: -0.93rem;
  }
  /*/每日邀请!*********/
  .yaoqing{
    width: 4.6rem;
    height: 1.85rem;
    position: absolute;
    top: 0.3rem;
    left: 50%;
    margin-left: -2.3rem;
  }

  .invite-yindao{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left:0;
    z-index:10;
  }

  .invite{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .rule{
    width: 0.6rem;
    margin-right: 0.4rem;
    float: right;
    margin-top: 0.4rem;
  }
  .yao{
    width: 0.48rem;
    position: absolute;
    top: 0.45rem;
  }
  .title{
    width: 50%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    margin-left: 25%;
    margin-top: 0.35rem;
    float: left;
    color: #fff;
    font-weight: bold;
    font-size:0.4rem;
  }
  #back{
    width:0.6rem;
    position:absolute;
    top:0.4rem;
    left:0.4rem;
  }
  .header{
    width:100%;
    height:2.35rem;
    background-image:url("../../assets/img/invite/invite-header.png");
    background-repeat: no-repeat;
    background-size:cover;
    position:fixed;
  }
  .title-litter{
    width: 100%;
    height: 0.95rem;
    position: absolute;
    bottom: 0;
    text-align: center;
    color: #fff;
    line-height: 0.9rem;
    font-weight: bold;
    font-size: 0.34rem;
  }
  .center{
    width:100%;
    height:1.2rem;
    background: #ffd6ad;
    position: fixed;
    top: 2.35rem;
  }

  .top{
    width: 100%;
    height: 1.85rem;
    background-image: url("../../assets/img/invite/invite-top.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    top: 3.55rem;
  }
  .prize{
    width:100%;
    height:2rem;
    position: fixed;
    top:2.65rem;
    display: flex;
    justify-content: space-around;
  }
  .prize div{
    width: 1.6rem;
    height:100%;
  }
  .prize div img:first-child{
    width:1.6rem;
    height:1.6rem;
  }
  .prize div img:nth-child(2){
    width:1rem;
    height:0.35rem;
    margin-left: 0.25rem;
  }
  .prize div:nth-child(2) img:nth-child(2){
    width:1.34rem;
    height:0.35rem;
    margin-left: 0.08rem;
  }
  .footer{
    width: 94%;
    background: #f99f45;
    position: absolute;
    top: 5.38rem;
    left: 3%;
    overflow-y: auto;
    min-height: 8rem;
  }
  .footer-title{
    width: 100%;
    margin-top: 0.2rem;
    text-align: center;
    font-size: 0.5rem;
    color: #fff;
    font-weight: bold;
    -webkit-text-stroke: 1px #84130e;
  }
  .list{
    width:90%;
    margin:0 5%;
    list-style: none;
  }
  .list li{
    width:100%;
    height: 0.8rem;
    line-height:0.8rem;
    border-bottom:1px solid #fff;
    box-sizing: border-box;
    font-size:0.24rem;
    color: #fff;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .list li:nth-child(1){
    margin-top: 0.2rem;
  }
  .already-box{
    width: 100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
  }
  .already{
    width:5.2rem;
    height:5.8rem;
    position: absolute;
    top: 3.3rem;
    left:50%;
    margin-left:-2.6rem;
  }
  .already-top{
    width:5.2rem;
    height:0.89rem;
    position: absolute;
    top:0;
    background-image: url("../../assets/img/invite/invite-yi.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .already-bottom{
    width:5.2rem;
    height:0.64rem;
    position: absolute;
    bottom:0;
    background-image: url("../../assets/img/invite/invite-already-bottom.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .already-content{
    width: 100%;
    height: 4.5rem;
    background: #fff;
    position: absolute;
    top: 0.89rem;
    list-style: none;
    overflow-y: auto;
  }
  .already-content li{
    width: 90%;
    margin: 0 auto;
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #6468e7;
    text-align: center;
    background:#dce1ff;
    border-radius:5px;
    margin-top:0.1rem;
  }
  .already-content li:first-child{
    background:none;
  }
  .already-content li:last-child{
    margin-bottom:0.3rem;
  }
  .already-content li div{
    flex:1;
  }
  .close{
    width:0.8rem;
    height:0.8rem;
    position: absolute;
    bottom:-1.2rem;
    left:50%;
    margin-left:-0.4rem;
  }
  .libao-box{
    width: 100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
  }
  .libao{
    width:5.2rem;
    height:5.8rem;
    position: absolute;
    top: 3.3rem;
    left:50%;
    margin-left:-2.6rem;
  }
  .libao-top{
    width:5.2rem;
    height:0.89rem;
    position: absolute;
    top:0;
    background-image: url("../../assets/img/invite/invite-libao.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .libao-bottom{
    width:5.2rem;
    height:0.64rem;
    position: absolute;
    bottom:0;
    background-image: url("../../assets/img/invite/invite-already-bottom.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .libao-content{
    width: 100%;
    height: 4.5rem;
    background: #fff;
    position: absolute;
    top: 0.89rem;
    list-style: none;
    overflow-y: auto;
  }
  .libao-content li{
    width: 90%;
    margin: 0 auto;
    display: flex;
    height: 1.2rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #6468e7;
    text-align: center;
    background:#dce1ff;
    border-radius:5px;
    margin-top:0.2rem;
  }
  .libao-content li img:first-child{
    width:1.2rem;
    height:1.2rem;
  }
  .libao-content li span{
    margin-top:0.2rem;
    font-size: 0.24rem;
  }
  .libao-content li img.btn{
    margin: 0.3rem 0.1rem auto auto;
    width: 1.46rem;
    height: 0.66rem;
    float: right;
  }
  .libao-content li:last-child{
    margin-bottom:0.3rem;
  }
  .libao-content li div{
    flex:1;
  }

  /*获得页面*/
  .getprize-box{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
  }
  .getprize{
    width:5.2rem;
    height:4.4rem;
    position:absolute;
    top:-1rem;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    background:#fff;
    border-radius:12px;
    border:4px solid rgb(220,225,225);
    box-sizing: border-box;
  }
  .getprize-top{
    width: 2.33rem;
    height: 0.54rem;
    position: absolute;
    top: 0.4rem;
    left: 50%;
    margin-left: -1.165rem;
  }

  .getprize-bottom{
    width: 5.05rem;
    height: 0.64rem;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .getprize-xingbi2{
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 1.5rem;
    left: 1.3rem;
  }
  .getprize span{
    font-size: 0.5rem;
    color: #646ce8;
    position: absolute;
    top: 1.7rem;
    left: 2.5rem;
  }
  .getprize p{
    color: rgb(172,4,124);
    font-size: 0.3rem;
    position: absolute;
    top: 2.9rem;
    width: 100%;
    text-align: center;
  }
  /*规则*/
  .rulebox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: absolute;
    top:0;
    left:0;
    overflow-y:auto;
  }
  .rulebox div{
    width:5.6rem;
    height:6.7rem;
    position: absolute;
    top:-1rem;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    background-image: url("../../assets/img/charts/rule-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .rulebox div p{
    width:90%;
    color:#fff;
    font-size:0.24rem;
    margin:0.05rem 5%;
  }
  .rulebox div .title{
    font-size:0.32rem;
    text-align: center;
    margin:0.2rem 5%;
  }
</style>
