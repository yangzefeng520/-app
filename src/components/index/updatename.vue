<template>
  <div class="message">
    <mt-header title="修改昵称">
      <mt-button @click="back" slot="left" icon="back"></mt-button>
      <mt-button @click="save" slot="right">保存</mt-button>
    </mt-header>

        <form class="mui-input-group">
          <div class="mui-input-row">
            <label>昵称</label>
            <input type="text" class="mui-input-clear" placeholder="" v-model="nickname">
          </div>
        </form>
  </div>
</template>

<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default {
    data(){
      return{
        nickname:"",
        userId:localStorage.getItem('userId'),
      }
    },
    created:function(){
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/index/message")
      };
      this.muiinit();
      this.getinfo();
    },
    methods:{
      getinfo:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/userInfo";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.data.nickname==""){
            this.nickname="游客";
          }else{
            this.nickname=successRes.data.data.nickname;
          }
        })
      },
      save:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/changeInfo";
        this.axios.post(url,this.$qs.stringify({uid:this.userId,status:0,title:this.nickname})).then(successRes=>{
          if(successRes.data.status==1){
            this.$router.push("/index/message");
          }else if(successRes.data.status==0){
            mui.toast("未成功修改");
            this.$router.push("/index/message");
          }
        })
      },
      back:function () {
        this.$router.push("/index/message")
      },
      muiinit:function(){
        mui.init();
        mui.plusReady(function() {
          initNativeObjects();
          showSoftInput();
        });

        var nativeWebview, imm, InputMethodManager;
        var initNativeObjects = function() {
          if (mui.os.android) {
            var main = plus.android.runtimeMainActivity();
            var Context = plus.android.importClass("android.content.Context");
            InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
            imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
          } else {
            nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
          }
        };
        var showSoftInput = function() {
          if (mui.os.android) {
            imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
          } else {
            nativeWebview.plusCallMethod({
              "setKeyboardDisplayRequiresUserAction": false
            });
          }
          setTimeout(function() {
            var inputElem = document.querySelector('input');
            inputElem.focus();
            inputElem.parentNode.classList.add('mui-active'); //第一个是search，加上激活样式
          }, 200);
        };

      }
    }
  }
</script>

<style scoped>
  body {
    background: #F5F5F5;
  }
  .mui-input-row{
    font-size:0.28rem;
    margin-top:0.2rem;
    line-height: 0.8rem;
  }
  .mui-input-clear{
    font-size:0.28rem;
  }
  .mui-input-row label {
    width: 20%;
    line-height: 0.4rem;
  }
  .mui-input-row label ~ input, .mui-input-row label ~ select, .mui-input-row label ~ textarea{
    width:75%;
  }
  /*导航*/
  .mint-header-title{
    font-size:0.34rem;
  }
  .mint-header{
    background: #fff;
    color: #ec5155;
    height:45px;
    line-height: 45px;
    font-size:0.34rem;
  }
  .mint-button-text{
    line-height: 45px;
    font-size:0.26rem;
  }
  .mint-button{
    line-height: 45px;
    font-size:0.26rem;
  }
  .mui-input-group .mui-input-row {
    height: 50px;
  }
  .mui-input-row label[data-v-c04e49e4] {
    width: 20%;
    line-height: 28px;
  }
  select, textarea, input[type='text'], input[type='search'], input[type='password'], input[type='datetime'], input[type='datetime-local'], input[type='date'], input[type='month'], input[type='time'], input[type='week'], input[type='number'], input[type='email'], input[type='url'], input[type='tel'], input[type='color'] {
    height: 48px;
  }



</style>

