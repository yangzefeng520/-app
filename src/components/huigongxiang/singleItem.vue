<template>
  <ul class="single">
    <li v-for="(item,index) in list" :style="'backgroundImage:url('+item.pic+')'">
      <div @click="share(index) " class="btn">
        <transition name="bounce">
          <span v-if="show"></span>
        </transition>
      </div>
      <router-link v-bind="{to:'/quan/'+item.id}">
        <img class="kuang" src="../../assets/img/huigongxiang/huigongxiang-kuang.png" alt="">
        <div class="name">{{item.title}}</div>
      </router-link>
    </li>
  </ul>
</template>
<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default {
    data(){
      return{
        list:[],
        userId:localStorage.getItem('userId'),
        show:true,
      }
    },
    created:function(){
      var url=apicommon.apicommon+"/test/index.php/Activity/Game/cartlist";
      this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
        this.list=successRes.data.data;
        console.log(this.list)
      });
    },
    methods:{
      share:function(index){
        mui.init();
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
        var uid=this.userId;
        var that=this;
        function shareMessage(s, ex) {
          var msg = {
            href: that.list[index].link,
            title: that.list[index].title,
            content: that.list[index].name,
            thumbs: [that.list[index].icon],
            pictures: [that.list[index].pic],
            extra: {
              scene: ex
            }
          };
          s.send(msg, ()=> {
            var url=apicommon.apicommon+"/test/index.php/Activity/Game/shareback"
            if(s.description=="微信"){
              that.axios.post(url,that.$qs.stringify({uid:that.userId,type:1,cate:3})).then(successRes=>{
                if(successRes.data.status==1){
                  outLine("分享到"+s.description+"成功!获得"+successRes.data.score+"鱼币");
                }else if(successRes.data.status==2){
                  outLine("分享到"+s.description+"成功!获得"+successRes.data.score+"鱼币");
                }else if(successRes.data.status==3){
                  outLine("分享到"+s.description+"成功!");
                }
              });
            }else if(s.description=="QQ"){
              that.axios.post(url,that.$qs.stringify({uid:that.userId,type:0,cate:3})).then(successRes=>{
                if(successRes.data.status==1){
                  outLine("分享到"+s.description+"成功!获得"+successRes.data.score+"鱼币");
                }else if(successRes.data.status==2){
                  outLine("分享到"+s.description+"成功!获得"+successRes.data.score+"鱼币");
                }else if(successRes.data.status==3){
                  outLine("分享到"+s.description+"成功!");
                }
              })
            }
            //传递给父组件
            this.$emit("listenChild","1");

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
    }

  }
</script>

<style scoped>
  /******动画***********/
  @keyframes bounce-in {
    0% {
      transform: translateX(0) rotate(30deg);
    }
    100% {
      transform: translateX(1.86rem) rotate(30deg);
    }
  }
  .btn{
    width:1.86rem;
    height:0.65rem;
    position:absolute;
    bottom:-0.22rem;
    right:0.85rem;
    background-image: url("../../assets/img/huigongxiang/huigongxiang-btn.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 3;
    overflow: hidden;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  .btn span{
    display: block;
    width:3px;
    height:100%;
    background:#fff;
    background: -webkit-linear-gradient(#fff, rgba(255,255,255,0.3)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#fff, rgba(255,255,255,0.3)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#fff, rgba(255,255,255,0.3)); /* Firefox 3.6 - 15 */
    background: linear-gradient(#fff, rgba(255,255,255,0.3)); /* 标准的语法 */
    transform:rotate(30deg);
    animation: bounce-in 1.5s  infinite;
  }
  .name{
    position:absolute;
    bottom:-0.1rem;
    left:1.2rem;
    font-size:0.28rem;
    color:rgb(51,51,51);
  }
  .single{
    width:100%;
    height:auto;
    overflow: auto;
  }
  .single img.kuang{
    width:7.1rem;
    height:3.86rem;
    position:absolute;
    left:50%;
    margin-left:-3.55rem;
  }
  .single li{
    width: 7rem;
    border-radius: 15px;
    height: 3.6rem;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    left: 50%;
    margin-left: -3.55rem;
    margin-bottom:0.5rem;
  }
</style>
