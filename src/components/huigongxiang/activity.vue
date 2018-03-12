<template>
  <div class="activity">
    <mt-header :title="activitylist.title">
      <mt-button @click="back" slot="left" icon="back">返回</mt-button>
      <!--<mt-button slot="right">分享</mt-button>-->
    </mt-header>
    <iframe ref="mybox" :src="activitylist.link" id="id"  width="100%" height="100%" frameborder=0 scrolling=auto ></iframe>

  </div>
</template>

<script>
  import mui from 'mui'; // 绝对路径
  import apicommon from "../../assets/common/js/api.js";
  export default {
    data(){
      return{
        activitylist:[
//          {id:"42",link:"https://h5.adgame.ink/test/index.php/Activity/Active/index?member_id=&active_id=42",}
        ]
      }
    },

    created:function () {

      this.getinfo();
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/huigongxiang/huigongxiang");
      }
    },
    mounted:function(){
      this.getHeight();
    },
    methods:{
      fetchDate:function(){
        let path = this.$router.path;
        console.log(path)
      },
      getHeight:function () {
        var bodyheight=document.body.clientHeight;
        console.log(bodyheight)
        const self = this;
        this.$refs.mybox.style.height=bodyheight-40+"px";
      },
      back:function () {
        this.$router.push("/huigongxiang/huigongxiang");
      },

      getinfo:function(){
        var id=this.$route.params.id;
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getactive";
        this.axios.post(url).then(successRes=>{
          console.log(successRes.data.data)
          var result=successRes.data.data;
          for(var i=0;i<result.length;i++){
            if(i==id){
              this.activitylist=result[i];
            }
          }
        });
      },
    }
  }
</script>

<style scoped>
  .activity{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .mint-header{
    background: #ec5155;
    height:45px;
    line-height: 45px;
  }
  .mint-button-text{
    line-height: 45px;
  }
  .mint-button{
    line-height: 45px;
  }

</style>





