<template>
  <div class="regbox">
    <header class="mui-bar mui-bar-nav">
      <router-link to="/login/login" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>手机号码</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="tel">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
        </div>
        <div class="mui-input-row">
          <label>获取验证码</label>
          <input id='accountsure' type="text" class="mui-input-clear mui-input" placeholder="请输入验证码" v-model="code">
          <span @click="getcode()"class="font" style="width:1.4rem;display:block;height:100%;text-align: center;line-height:50px;">{{codeBtn}}</span>
        </div>
        <div class="mui-input-row">
          <label>邀请码</label>
          <input id='accountyaoqing' type="text" class="mui-input-clear mui-input" placeholder="请输入邀请码(选填)" v-model="yaoqing">
        </div>
      </form>

      <div class="mui-content-padded">
        <button @click="reg()" id='login'>注册</button>

      </div>
      <!--<div class="mui-content-padded oauth-area">-->

    </div>
  </div>

</template>

<script>
  import apicommon from "../../assets/common/js/api.js";
  import md5 from 'js-md5';
  import mui from 'mui';
  export default{
    data(){
      return{
        tel:"",
        password:"",
        code:"",
        codeBtn:"获取验证码",
        yaoqing:"",
      }
    },
    created:function(){
      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/login/login")
      }
    },
    methods:{

      login:function(){
        console.log(this)

      },
      reg:function(){
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/register";
        var data={tel:this.tel,password:this.password,code:this.code,invitation_code:this.yaoqing,system:2};
        if(this.tel==""){
          mui.toast("手机号为空");
          return;
        }else if(this.password==""){
          mui.toast("密码不能为空");
          return;
        }else if(this.code==""){
          mui.toast("验证码不能为空");
          return;
        }


        //注册
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
          var that=this;
          if(successRes.data.status=="1"){
//            that.$router.push('/login/login');
            mui.toast("注册成功,已为您自动登录！");
            //login
            var urllogin=apicommon.apicommon+"/test/index.php/Activity/MobileList/login";
            var datalogin={tel:that.tel,password:md5(that.password)};
            this.axios.post(urllogin,that.$qs.stringify(datalogin)).then(successRes=>{
//          console.log(successRes);
              if(successRes.data.status=="0"){
                mui.toast("账号或密码错误");
              }else if(successRes.data.status=="-1"){
                mui.toast("数据为空,不可登录");
              }else{
                localStorage.setItem('Token', "login");
                localStorage.setItem('userId',successRes.data.status );
                that.$router.push('/index');
              }
            })
          }else if(successRes.data.status=="2"){
            mui.toast("数据为空,不可注册");
          }else if(successRes.data.status=="3"){
            mui.toast("验证码错误");
          }else if(successRes.data.status=="4"){
            mui.toast("验证码过期");
          }else if(successRes.data.status=="5"){
            mui.toast("手机号码已注册,不可重复注册");
          }

        })
      },
      getcode:function(){
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/registergetcode";
        var data={tel:this.tel};
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
          if(successRes.data.status===1){
            this.codeBtn=60;
            var that=this;
            var t=setInterval(function(){
              that.codeBtn--;
              if(that.codeBtn==0){
                clearInterval(t);
              }
            },1000);
            var tt=setTimeout(function(){
              that.codeBtn=="获取验证码";
            },60000)

          }else if(successRes.data.status===2){
            mui.toast("手机号码为空");
          }else if(successRes.data.status===3){
            mui.toast("手机号码已存在");
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
