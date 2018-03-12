<template>
  <div class="message">
    <mt-header title="个人信息">
      <mt-button @click="back" slot="left" icon="back"></mt-button>
    </mt-header>
    <ul class="mui-table-view">
      <li v-for="item in list" class="mui-table-view-cell">
        <router-link :to="item.path" class="mui-navigate-right">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.demo}}</span></router-link>
      </li>
      <li @click="exit" style="text-align: center;color: #ec5155;text-space: 2px;" class="mui-table-view-cell"> 退出登录</li>
    </ul>

  </div>
</template>
<script>
  import mui from 'mui'; // 绝对路径
  import apicommon from "../../assets/common/js/api.js";
  export default {
    data(){
      return{
        userId:localStorage.getItem('userId'),
        list:[
          {id:0,name:"昵称",demo:"游客",path:"/index/updatename"},
          {id:1,name:"性别",demo:"男",path:"/index/updatesex"},
          {id:2,name:"年龄",demo:"18",path:"/index/updateage"},
          {id:3,name:"个性签名",demo:"这个人很懒,什么都没有留下",path:"/index/updateinfo"},
        ],
      }
    },
    created:function(){
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/index");
      }
      //获取个人信息
      this.getinfo();
    },
    methods:{
      exit:function () {
        localStorage.removeItem('Token');
        localStorage.removeItem('userId');
        this.$router.push("/login/login");
      },
      back:function () {
        this.$router.push("/index");
      },
      getinfo:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/MobileList/userInfo";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          console.log(successRes.data.data)
          if(successRes.data.data.nickname==""){
            this.list[0].demo="游客";
          }else{
            this.list[0].demo=successRes.data.data.nickname;
          }
          this.list[1].demo=successRes.data.data.sex;
          this.list[2].demo=successRes.data.data.age;
          if(successRes.data.data.personal==""){
            this.list[3].demo="这个人很懒,什么都没有留下";
          }else{
            this.list[3].demo=successRes.data.data.personal;
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
  .mui-table-view{
    margin-top:0.2rem;
  }
  .mui-navigate-right{
    font-size:0.28rem;

  }
  .mui-navigate-right span{
    width: 3rem;
    display: block;
    float: right;
    margin-right: 2.3rem;
    color: #666;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }


  /*导航*/
  .mint-header-title{
    font-size:0.34rem;
  }
  .mint-header{
    color: #ec5155;
    background:#fff;
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

  .mui-ios .mui-table-view-cell {
    height: 50px;
    line-height: 28px;
  }

</style>
