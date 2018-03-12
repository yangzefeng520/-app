<template>
  <div class="loginbox">
    <header class="mui-bar mui-bar-nav">
      <div @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></div>
      <h1 class="mui-title">找回密码</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>手机号码</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入手机号码" v-model="tel">
        </div>
        <div class="mui-input-row">
          <label>重置密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
        </div>
        <div class="mui-input-row">
          <label>获取验证码</label>
          <input id='accountsure' type="text" class="mui-input-clear mui-input" placeholder="请输入验证码" v-model="code">
          <span @click="getcode()"class="font" style="width:1.4rem;display:block;height:80%;text-align: center;line-height:50px;">{{codeBtn}}</span>
        </div>
      </form>

      <div class="mui-content-padded">
        <button @click="resetting()" id='login'>找回密码</button>
      </div>
      <!--<div class="mui-content-padded oauth-area">-->

    </div>
  </div>

</template>

<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default{
    data(){
      return{
        tel:"",
        password:"",
        code:"",
        codeBtn:"获取验证码",
      }
    },
    created:function(){
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/login/login")
      }
    },
    methods:{
      back:function () {
        this.$router.push("/login/login")
      },
      resetting:function(){
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/resetpwd";
        var data={tel:this.tel,password:this.password,code:this.code};
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
          var that=this;
          if(successRes.data.status=="1"){
            that.$router.push('/login/login');
          }else if(successRes.data.status=="2"){
            mui.toast("很抱歉,您填写的内容为空,请重新修改");
          }else if(successRes.data.status=="3"){
            mui.toast("很抱歉,您的验证码为空");
          }else if(successRes.data.status=="4"){
            mui.toast("很抱歉,您的验证码已过期")
          }else if(successRes.data.status=="5"){
            mui.toast("很抱歉,您的账号不存在")
          }else if(successRes.data.status=="6"){
            mui.toast("新旧密码不能一致")
          }
        })
      },

      getcode:function(){
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/findpwdgetcode";
        var data={tel:this.tel};
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
          if(successRes.data.status===1){
            this.codeBtn=60;
            var that=this;
            var t=setInterval(function(){
              that.codeBtn--;
            },1000);
            if(this.codeBtn==0){
              that.codeBtn=="获取验证码";
              clearInterval(t);
            }
          }else if(successRes.data.status===2){
            mui.toast("您的手机号码码为空哟");
          }else if(successRes.data.status===3){
            mui.toast("您的手机号码还没有注册哟,请您先去注册哟");
          }
        });
      }
    }
  }
</script>

<style scoped>
  body {
    background: #F5F5F5;
  }
  .mui-pull-left{
    color:#ec5155;
  }
  .mui-bar-nav ~ .mui-content {
    padding-top: 60px;
    font-size:14px;
  }
  .mui-input-row label ~ input{
   font-size:14px;
  }
  .mui-btn-block {
    padding: 8px 0;
    font-size: 16px;
  }
  .link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
  }


  .spliter {
    color: #bbb;
    padding: 0px 8px;
  }

  .oauth-area {
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }

  .oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
  }

  .oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
  }

  .oauth-area .oauth-btn.disabled {
    background-color: #ddd;
  }
  #login{
    color: #fff;
    background: #ec5155;
    border: none;
    border-radius: 8px;
    width:95%;
    padding:10px;
    margin:0 2.5%;
    font-size: 0.3rem;
  }

  .font{
    width: 1.4rem;
    display: block;
    height: 80%;
    text-align: center;
    line-height: 0.88rem;
    position: absolute;
    right: 0.2rem;
    color: #666;
    font-size: 12px;
  }
  .mui-input-row label {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    line-height: 28px;
    float: left;
    width: 35%;
    padding: 11px 15px 11px 20px;
  }
  .mui-input-group .mui-input-row {
    height: 50px;
  }
  select, textarea, input[type='text'], input[type='search'], input[type='password'], input[type='datetime'], input[type='datetime-local'], input[type='date'], input[type='month'], input[type='time'], input[type='week'], input[type='number'], input[type='email'], input[type='url'], input[type='tel'], input[type='color']{
    height:50px;
  }
</style>
