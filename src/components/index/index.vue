<template>
  <div class="index-box">
    <!--//******引导开始*******//-->
    <img @click="guidetwoshow" v-show="guideone" src="../../assets/img/index/index-yindao1.png" alt="" class="guide">
    <img @click="guidethreeshow" v-show="guidetwo" src="../../assets/img/index/index-yindao2.png" alt="" class="guide">
    <img @click="showprize" v-show="guidethree" src="../../assets/img/index/index-yindao3.png" alt="" class="guide">
    <img @click="goJack" v-show="guidefive" src="../../assets/img/index/index-yindao4.png" alt="" class="guide">
    <!--/*获得页面*/-->
    <div @click="guidefiveshow" v-show="hideprize" class="getprize-box">
      <div class="getprize">
        <img src="../../assets/img/invite/invite-get.png" alt="" class="getprize-top">
        <span style="top:1.05rem;display: block;width: 100%;text-align: center;left: 0;">新手奖励</span>
        <div class="getprize-tc">
          <img src="../../assets/img/index/index-getprize-xb.png" alt="" class="getprize-xingbi">
          <span>50</span>
        </div>
        <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
        <p>奖励将在两小时内发放</p>
        <img src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>
    <!--//******引导结束*******//-->



    <!--/***************小人-->
    <img v-show="talk" class="talk" :src="talksrc" alt="">
    <img @click="talkshow" v-show="boy" :src="personsrc" alt="" class="person-person">
    <div class="warmtitle">{{text1}}<span></span>  </div>
    <div class="warmtitle2" v-show="first">{{text2}}<span></span></div>
    <ul class="icon-href">
      <li @click="jumphui">
        <img class="icon-big" src="../../assets/img/index/index-font-huigongxiang.png" alt="">
        <img class="icon-little" src="../../assets/img/index/index-gongxiang.png" alt="">
      </li>
      <li @click="jumppai">
        <img class="icon-big" src="../../assets/img/index/index-paihang.png" alt="">
        <img class="icon-little" src="../../assets/img/index/index-font-paihang.png" alt="">
      </li>
      <li @click="jumpjiang">
        <img class="icon-big" src="../../assets/img/index/index-jiangchi.png" alt="">
        <img class="icon-little" src="../../assets/img/index/index-font-jiangchi.png" alt="">
      </li>
      <li @click="jumpyao">
        <img class="icon-big" src="../../assets/img/index/index-yaoqing.png" alt="">
        <img class="icon-little" src="../../assets/img/index/index-font-yaoqing.png" alt="">
      </li>
    </ul>

    <div class="sexbox" v-show="first">
      <div class="sex">
        <img src="../../assets/img/index/index-sex-top.png" alt="" class="sex-top">
        <div class="sex-center">
          <p>欢迎您来到娱予余世界,请选择您的角色</p>
          <div @click="checkSex(1)">阳光帅气的美男子</div>
          <div @click="checkSex(2)" style="margin-top:0.25rem;">甜美可爱的小美眉</div>
        </div>
        <img src="../../assets/img/index/index-sex-bottom.png" alt="" class="sex-bottom">
      </div>
    </div>

    <div @click="updateuserinfoshow()"  class="user-info">
      <div class="user-image" :style="'backgroundImage:url('+upimages+')'"></div>
      <span class="user-name">{{nickname}}</span>
      <span class="user-grade"><span>{{level}}</span></span>
      <div class="progress">
        <mt-progress :value="progressjindu" :barHeight="12">
          <div id="start" slot="start"></div>
          <div id="end" slot="end">{{start}}/{{end}}</div>
        </mt-progress>
      </div>
    </div>
    <section v-show="updateuserinfo" class="update-userinfobox">
      <div class="update-userinfo">
        <div class="upload">
          <div class="show">
            <div class="picture" :style="'backgroundImage:url('+upimages+')'"></div>
          </div>
          <div class="input-box">
            <input type="file" id="upload" accept="image" @change="upload">
            <label for="upload"></label>
          </div>
        </div>

        <div class="update-username">
          {{nickname}}
          <img class="update-checksex" :src="updatechecksex" alt="">
          <img class="update-levelpic" :src="levelpic" alt="">
        </div>
        <div class="update-id">
          ID: <span>{{nickid}}</span>
        </div>
        <div class="update-prize">
          <img src="../../assets/img/index/index-prize.png" alt="">
          <span class="update-prizenum">{{prize}}</span>
        </div>
        <img src="../../assets/img/index/yaoqing-friend.png" alt="" class="friend">
        <img @click="torevise" src="../../assets/img/index/index-revise.png" alt="" class="revise">
        <img @click="tomessage" src="../../assets/img/index/index-editor.png" alt="" class="ueditor">
        <img @click="updateuserinfohide()" src="../../assets/img/index/index-close.png" alt="" class="update-close">
      </div>
    </section>
  </div>
</template>


<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  import Exif from 'exif-js'
  export default {
    data(){
      return {
        boy:false,
        personsrc:require("../../assets/img/person/boy1.gif"),
        guideone:false,
        guidetwo:false,
        guidethree:false,
        guidefive:false,
        hideprize:false,
        first:false,
        userId:localStorage.getItem('userId'),
        progressjindu:5,
        start:"",
        end:"",
        nickname:"小男孩",
        level:"5",
        check:"",
        updatechecksex:"",
        nickid:"",
        prize:"",
        levelpic:"",
        updateuserinfo:false,
        upimages:"",
        picValue:'',
        talk:false,
        talksrc:require("../../assets/img/index/00.gif"),
        text1:"",
        text2:"",
      }
    },
    props:['logo'],
    created:function(){
      var talkone=setTimeout(()=>{
        this.talk=true;
      },2500);

      if(localStorage.getItem('sex')=="boy"){
        this.boy=true;
      }else if(localStorage.getItem('sex')=="girl"){
        this.personsrc=require("../../assets/img/person/girl1.gif");
        this.boy=true;
      }

      //首页返回键处理
      //处理逻辑：1秒内，连续两次按返回键，则退出应用；
      var first = null;
      mui.back = function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();
          mui.toast('再按一次退出一只大鱼');
          setTimeout(function() {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
          }
        }
      };

      //辨别是否为第一次登陆
      var url=apicommon.apicommon+"/test/index.php/Activity/Game/iffirstlogin";
      this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
        var that=this;
        if(successRes.data.status===1){
          that.first=true;
        }
      });
      //获取个人信息
      var urlinfo=apicommon.apicommon+"/test/index.php/Activity/Game/getuserinfo";
      this.axios.post(urlinfo,this.$qs.stringify({uid:this.userId})).then(successRes=>{
        console.log(this.userId);

        var info=successRes.data.info;
        if(successRes.data.info.nickname==""){
          this.nickname="游客";
        }else{
          this.nickname=successRes.data.info.nickname;
        }
        this.text1=successRes.data.text1;
        this.text2=successRes.data.text2;
        this.level=successRes.data.info.level;
        this.levelpic=successRes.data.info.levelpic;
        this.progressjindu=parseInt(parseInt(successRes.data.info.sharetimes)*100/parseInt(successRes.data.info.share));
        this.start=parseInt(successRes.data.info.sharetimes);
        this.end=parseInt(successRes.data.info.share);
        this.userImage=successRes.data.info.headimg;
        this.upimages=successRes.data.info.headimg;
        this.nickid=successRes.data.info.id;
        this.prize=successRes.data.info.nowscore;
        if(successRes.data.info.gamesex==="1"){
          this.boy=true;
          localStorage.setItem('sex', "boy");
          this.updatechecksex=require("../../assets/img/index/index-boy.png");
          this.personsrc=require("../../assets/img/person/boy1.gif");
        }else if(successRes.data.info.gamesex==="2"){
          this.boy=true;
          localStorage.setItem('sex', "girl");
          this.updatechecksex=require("../../assets/img/index/index-girl.png");
          this.personsrc=require("../../assets/img/person/girl1.gif");
        }
      });
    },
    mounted:function(){
//      console.log(333);
    },
    methods:{
      talkshow:function(){
        if(localStorage.getItem('sex')=="boy"){
          this.talk=true;
          var talkarr=[require("../../assets/img/index/01.png"),require("../../assets/img/index/02.png"),require("../../assets/img/index/03.png"),require("../../assets/img/index/04.png")];
          var index = Math.floor((Math.random()*talkarr.length));
          this.personsrc=require("../../assets/img/person/boy2.gif");
          this.talksrc=talkarr[index];
          var talktwo=setTimeout(()=>{
            this.personsrc=require("../../assets/img/person/boy1.gif");
            this.talk=false;
            clearTimeout(talkarr);
          },3500)
        }else if(localStorage.getItem('sex')=="girl"){
          this.talk=true;
          var talkarr=[require("../../assets/img/index/01.png"),require("../../assets/img/index/02.png"),require("../../assets/img/index/03.png"),require("../../assets/img/index/04.png")];
          var index = Math.floor((Math.random()*talkarr.length));
          this.personsrc=require("../../assets/img/person/girl2.gif");
          this.talksrc=talkarr[index];
          var talktwo=setTimeout(()=>{
            this.personsrc=require("../../assets/img/person/girl1.gif");
            this.talk=false;
            clearTimeout(talkarr);
          },3500);
        }
      },
      jumphui:function () {
        this.$router.push("/huigongxiang/huigongxiang");
      },
      jumppai:function () {
        this.$router.push("/charts");
      },
      jumpjiang:function () {
        this.$router.push("/Jackpot");
      },
      jumpyao:function () {
        this.$router.push("/invite");
      },
      guidetwoshow:function () {
        this.guideone=!this.guideone;
        this.guidetwo=!this.guidetwo;
      },
      guidethreeshow:function () {
        this.guidetwo=!this.guidetwo;
        this.guidethree=!this.guidethree;
      },
      showprize:function(){
        this.guidethree=!this.guidethree;
        this.hideprize=!this.hideprize;
      },
      guidefiveshow:function(){
        this.hideprize=!this.hideprize;
        this.guidefive=!this.guidefive;
      },
      goJack:function () {
        this.$router.push({ path: '/Jackpot', params: { first: 1 } });
      },
      torevise:function(){
        this.$router.push('/login/updatePassword');
      },
      tomessage:function(){
        this.$router.push('/index/message');
      },
      checkSex:function(num){
        if(num==1){
          localStorage.setItem('sex', "boy");
          this.boy=true;
        }else if(num==2){
          localStorage.setItem('sex', "girl");
          this.personsrc=require("../../assets/img/person/girl1.gif");
          this.boy=true;
        }
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/setsex";
        this.axios.post(url,this.$qs.stringify({uid:this.userId,sex:num})).then(successRes=>{
          var that=this;
//          console.log(successRes.data)
          if(successRes.data.status===1){
            that.first=false;
            that.guideone=true;
          }else{
            alert("请检查您的网络连接");
          }
        })
      },
      updateuserinfoshow:function(){
        this.updateuserinfo=true;
      },
      updateuserinfohide:function(){
        this.updateuserinfo=false;
      },

      upload (e) {
//        this.newheaderImage=this.headerImage;
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
      },
      imgPreview (file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.upimages = this.result;
              self.postImg();
            }else {
              img.onload = function () {
                let data = self.compress(img,Orientation);
                self.upimages = data;
                self.postImg();
              }
            }
          }
        }
      },
      postImg () {
        let file = this.picValue;
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        param.append('uid',this.userId);//添加form表单中其他数据
//        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        let  url=apicommon.apicommon+"/test/index.php/Activity/MobileList/headimg";
        this.axios.post(url,param,config).then(successRes=>{
//          if(succe)
//          console.log(successRes.data);
        })
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img,Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
//          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
//          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if(Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
//        console.log('压缩前：' + initSize);
//        console.log('压缩后：' + ndata.length);
//        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
    },
  }
</script>

<style>
  .talk{
    width: 3.62rem;
    height: 1.11rem;
    position: absolute;
    top: 4.8rem;
    left: 0.3rem;
  }

  /********引导******/
  .warmtitle{
    width: auto;
    padding: 0 15px;
    height: 0.5rem;
    position: absolute;
    top: 0.6rem;
    font-size: 0.26rem;
    right: 1.3rem;
    color: #fff;
    line-height: 0.5rem;
    text-align: center;
    background: #f23d18;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }
  .warmtitle span{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid red;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:50%;
    right:-10px;
    margin-top:-5px;

  }
  .warmtitle2{
    width: auto;
    padding: 0 15px;
    height: 0.5rem;
    position: absolute;
    top: 3.6rem;
    font-size: 0.26rem;
    right: 1.3rem;
    color: #fff;
    line-height: 0.5rem;
    text-align: center;
    background: #f23d18;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }
  .warmtitle2 span{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid red;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:50%;
    right:-10px;
    margin-top:-5px;

  }

  .guide{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 5;
  }
  .person-person{
    width: 3.08rem;
    height: 5rem;
    position: absolute;
    top: 5.5rem;
    left: 50%;
    margin-left: -1.54rem;
  }
  /*获得页面*/
  .getprize-box{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.6);
    z-index:5;
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
  .getprize-tc{
    width:1.28rem;
    height:1.28rem;
    position: absolute;
    top: 1.55rem;
    left:50%;
    margin-left:-0.64rem;
    background-image: url("../../assets/img/index/index-getprizebg.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .getprize-xingbi{
    width: 0.86rem;
    height: 0.86rem;
    position: absolute;
    top: -0.2rem;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .getprize span{
    font-size: 0.3rem;
    color: #646ce8;
    position: absolute;
    top: 0.88rem;
    left: 0.8rem;
  }
  .getprize p{
    color: rgb(172,4,124);
    font-size: 0.3rem;
    position: absolute;
    top: 3rem;
    width: 100%;
    text-align: center;
  }
  .close{
    width:0.8rem;
    height:0.8rem;
    position: absolute;
    bottom:-1.2rem;
    left:50%;
    margin-left:-0.4rem;
  }
  /*进度条*/
  .progress{
    width: 3rem;
    height:0.3rem;
    position: absolute;
    bottom:0.2rem;
    left:0.3rem;
  }
  #end{
    font-size:0.24rem;
    color:#ac2d7c;
  }
  .mt-progress-runway {
    background-color:#fff;
    border-radius: 15px;
    border:2px solid #ac2d7c;
  }
  .mt-progress-content .mt-progress-progress {
    background-color:#ac2d7c;
    border-radius: 15px;
    overflow: hidden;
  }


  /*upload*/
  .upload{
    position: absolute;
    top: 1.7rem;
    left: 0.7rem;
  }
  .show {
    width:1.8rem;
    height:1.8rem;
    overflow: hidden;
    position: relative;
  }
  .picture {
    width: 1.8rem;
    height: 1.8rem;
    border:2px solid rgb(153,119,225);
    box-sizing: border-box;
    border-radius:8px;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #upload{
    width:1.8rem;
    height:1.8rem;
    border-radius:50%;
  }
  .input-box{
    position: absolute;
    top: 0;
    border-radius: 50%;
    opacity: 0;
  }



  /*@font-face {*/
    /*font-family: 'SingleMaltaRegular';*/
    /*src: url('/src/font/FZY4JW.TTF');*/
    /*font-weight: normal;*/
    /*font-style: normal;*/
  /*}﻿*/

    /*修改个人信息*/
  .update-close{
    width: 0.8rem;
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    margin-left: -0.4rem;
  }
  .update-userinfobox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    position:absolute;
    top:0;
    left:0;
    z-index:5;
  }
  .update-userinfo{
    width:6.8rem;
    height:7.64rem;
    background-image:url("../../assets/img/index/index-update-userinfobg.png");
    background-size:cover;
    position:absolute;
    top:-1rem;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
  }
  .update-userimg{
    width:1.8rem;
    height:1.8rem;
    position:absolute;
    top:1.6rem;
    left:0.4rem;
    /*border:2px solid rgb(153,119,225);*/
    box-sizing: border-box;
    border-radius:8px;
    background-size:cover;
    background-repeat: no-repeat;
  }
  .update-username{
    position: absolute;
    top: 1.8rem;
    left: 3rem;
    color:#ac2d7c;
    font-size:0.3rem;
  }
  .update-checksex{
    width:0.32rem;
  }
  .update-id{
    position: absolute;
    top: 2.3rem;
    left: 3rem;
    color:#ac2d7c;
  }
  .update-prize{
    position: absolute;
    top: 2.6rem;
    left: 3rem;
  }
  .update-prizenum{
    top: 0.2rem;
    left: 1rem;
    font-size: 31px;
    /*font-family: 'SingleMaltaRegular';*/
    color: rgb(172, 45, 124);
    position: absolute;
  }
  .update-prize img{
    width: 0.48rem;
    position: absolute;
    top: 0.2rem;
  }
  .update-levelpic{
    width: 0.32rem;
  }


  /*个人信息*/
  .user-info{
    width:100%;
    height:1.5rem;
    position:absolute;
    bottom:0;
    text-shadow: white 1px 0 0, white 0 1px 0, white -1px 0 0, white 0 -1px 0;
    -webkit-text-shadow: white 1px 0 0,white 0 1px 0,white -1px 0 0,white 0 -1px 0;
    -moz-text-shadow: white 1px 0 0,white 0 1px 0,white -1px 0 0,white 0 -1px 0;
    color:#fff;
  }
  .user-image{
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: 0.3rem;
    float:left;
    margin-top: 0.1rem;
  }
  .user-name{
    width:80%;
    display: block;
    font-size: 0.3rem;
    float: left;
    margin-top: 0.1rem;
    margin-left: 0.2rem;
    color:#ac2d7c;
  }
  .user-grade{
    width: 50%;
    display: block;
    float: left;
    margin-left: 0.2rem;
    color:#ac2d7c;
  }

  .index-box{
    width:100%;
    height:100%;
    overflow: hidden;
    position:fixed;
    background-image: url(../../assets/img/index/index-bg.png);
    background-size:cover;
    background-repeat: no-repeat;
  }
  .back{
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }
  .icon-href{
    width:0.8rem;
    height:auto;
    position:absolute;
    top:0.46rem;
    right:0.2rem;
    list-style: none;
  }
  .icon-href li{
    width:100%;
    height:1.5rem;
    float:left;
    position:relative;
  }
  .icon-big{
    width:0.8rem;
    position:absolute;
    top:0;
    left:0;
  }
  .icon-little{
    width: 1.2rem;
    position: absolute;
    top: 0.9rem;
    left: -0.2rem;
  }

  /*性别*/
  .sexbox{
    width:100%;
    height:100%;
    position:relative;
    background:rgba(0,0,0,.6);
    z-index:5;
  }
  .sex{
    width: 5.2rem;
    height: 5.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .sex-top{
    width: 5.2rem;
    position: absolute;
    top: 0;
  }
  .sex-bottom{
    width: 5.2rem;
    position: absolute;
    bottom: 0;
  }
  .sex-center{
    width: 100%;
    height: 4.4rem;
    position: absolute;
    top: 0.85rem;
    background: #ffffff;
  }
  .sex-center p{
    font-size: 0.3rem;
    padding: 15px 10px;
    color: #646ce7;
  }
  .sex-center div{
    width: 4.8rem;
    margin-left: 0.2rem;
    height: 0.8rem;
    background: #dbd9ff;
    border-radius: 5px;
    line-height: 0.8rem;
    font-size: 0.3rem;
    text-indent: 0.2rem;
    color: #646ce7;
  }
  .revise{
    width: 2.56rem;
    position: absolute;
    bottom: 0.2rem;
    right: 0.6rem;
  }
  .ueditor{
    width: 2.56rem;
    position: absolute;
    bottom: 0.2rem;
    left: 0.6rem;
  }
  .friend{
    width:5.76rem;
    position:absolute;
    top: 4.15rem;
    left:50%;
    margin-left:-2.88rem;
  }
  </style>
