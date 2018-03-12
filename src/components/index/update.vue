<template>
  <div class="message">
    <mt-header title="个人信息">
      <mt-button @click="back" slot="left" icon="back"></mt-button>
    </mt-header>


    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          Item 1
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          Item 2
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          Item 3
        </a>
      </li>
    </ul>



    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>昵称</label>
        <input type="text" class="mui-input-clear" placeholder="" v-model="nickname">
      </div>
      <div class="mui-input-row">
        <label>性别</label>
        <input type="text" class="mui-input-clear" placeholder="aaa" v-model="sex">
      </div>
      <div class="mui-input-row">
        <label>年龄</label>
        <input type="text" class="mui-input-clear" placeholder="aaa" v-model="age">
      </div>
      <div class="mui-input-row">
        <label>个性签名</label>
        <textarea class="mui-input-clear" name="" id="text" cols="30" rows="10">{{introduction}}</textarea>
      </div>
    </form>
  </div>
</template>



<script>
  import mui from 'mui'; // 绝对路径
  export default {
    data(){
      return{
        nickname:"游客",
        sex:"男",
        age:"18",
        introduction:"这个人很懒,什么都没有留下",
      }
    },
    created:function(){
//      //返回
//      mui.back = function(){
//        history.go(-1);
//      }

      //mui
      mui.init();
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
      mui.plusReady(function() {
        initNativeObjects();
        showSoftInput();
      });
    },
    methods:{
      back:function () {
        history.go(-1);
      },
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
  input[type='submit'], .mui-btn-primary, .mui-btn-blue {
    color: #fff;
    background:#ec5155;
    border:none;
    border-radius:8px;
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

  /*导航*/
  .mint-header-title{
    font-size:0.34rem;
  }
  .mint-header{
    background: #ec5155;
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
  .mui-input-row:last-child{
    height:2rem;
    border:none;
  }
  #text{
    font-size:0.28rem;
  }
</style>

