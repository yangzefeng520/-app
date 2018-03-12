<template>
  <div class="loginbox">
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">登录</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入手机号码" v-model="tel">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
        </div>
      </form>

      <div class="mui-content-padded">
        <button @click="login()" id='login'>登录</button>
        <div class="link-area">
          <router-link to="/login/register" id='reg'>注册账号</router-link>
          <span class="spliter">|</span>
          <router-link to="/login/forgetPassword" id='forgetPassword'>忘记密码</router-link>
        </div>
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
      }
    },
    created:function(){
      this.count();
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
    },
    methods:{
      count:function(){
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/clickuv";
        this.axios.post(url).then(successRes=>{
          console.log(successRes.data)
        })
      },
      login:function(){
        console.log(this)
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/login";
        var data={tel:this.tel,password:md5(this.password)};
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
//          console.log(successRes);
          var that=this;
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
      }
    }
  }


</script>

<style scoped>
  body {
    background: #F5F5F5;
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
