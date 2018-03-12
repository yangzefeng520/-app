<template>
  <div class="message">
    <mt-header title="修改个性签名">
      <mt-button @click="back" slot="left" icon="back"></mt-button>
      <mt-button @click="save" slot="right">保存</mt-button>
    </mt-header>

    <form class="mui-input-group">
      <div class="mui-input-row" style="margin: 10px 5px;">
        <textarea id="textarea" rows="5" v-model="introduction"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
  import mui from 'mui'; // 绝对路径
  import apicommon from "../../assets/common/js/api.js";
  export default {
    data(){
      return{
        introduction:"这个人很懒,什么都没有留下",
        userId:localStorage.getItem('userId'),
      }
    },
    created:function(){
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/index/message");
      };
      this.getinfo();
    },
    methods:{
      back:function(){
        this.$router.push("/index/message");
      },
      getinfo:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/userInfo";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.data.personal==""){
            this.introduction="这个人很懒,什么都没有留下";
          }else{
            this.introduction=successRes.data.data.personal;
          }
        })
      },
      save:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/changeInfo";
        console.log(this.userId)
        console.log(this.introduction)
        this.axios.post(url,this.$qs.stringify({uid:this.userId,status:3,title:this.introduction})).then(successRes=>{
          console.log(successRes.data);
          if(successRes.data.status==1){
            this.$router.push("/index/message");
          }else if(successRes.data.status==0){
            mui.toast("未成功修改");
            this.$router.push("/index/message");
          }
        })
      },
    }
  }
</script>

<style scoped>
  body {
    background: #F5F5F5;
  }
  .message{
    width:100%;
    height: 100%;
    overflow: hidden;
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
  .mui-input-row{
    width:100%;
    height:2rem;
  }
  textarea{
    font-size:0.28rem;
    color: #666;
    height:2rem;
    width:100%;
  }

</style>

