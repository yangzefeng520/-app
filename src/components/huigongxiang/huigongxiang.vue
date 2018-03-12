<template>
    <div class="huigongxiang">
      <!--/***********新手引导开始-->
      <img @click="guideonehide" v-show="guideone" src="../../assets/img/index/index-yindao6.png" alt="" class="guide">
      <!--/***********新手引导结束-->

      <div class="header">
        <img @click="back" src="../../assets/img/huigongxiang/huigongxiang-back.png" alt="" id="back">
        <div class="title">共享</div>
        <img @click="getrule" src="../../assets/img/huigongxiang/huigongxiang-rule.png" alt="" class="rule">
        <div class="list">
          <div v-for="(item,index) in list" @click="isActive(index)" :class="{active:item.isactive}">{{item.name}}</div>
        </div>
      </div>
      <div id="list" ref="mybox">
        <singleItem  v-on:listenChild="showchild" v-show="fu"> </singleItem>
        <fuItem v-on:listenChild="showchild" v-show="single"> </fuItem>
      </div>
      <!--规则页面-->
      <div class="rulebox" v-show="showrule">
        <div>
          <p class="title">惠共享规则</p>
          <p>惠共享是鱼币的主要获取途径。</p>
          <p>1.鱼币是鱼小镇的主要分数，鱼币越高不仅可以获得更好的称号勋章，还能够在全服排行榜里获得好名次。</p>
          <p>2.除此之外，鱼币可以用于参加各类活动的抽奖及兑换。</p>
          <p>3.每日首次共享可获得10个鱼币，之后共享10次随机获得2-5个鱼币。</p>
          <p>（小惠的秘密：每次共享的链接都会带有意想不到的收入哦~）</p>
          <img @click="hiderule" src="../../assets/img/index/index-close.png" alt="" class="close">
        </div>
      </div>
      <!--/*获得页面*/-->
      <div v-show="showprize" class="getprize-box">
        <div class="getprize">
          <img src="../../assets/img/invite/invite-get.png" alt="" class="getprize-top">
          <span style="top:1.05rem;display: block;width: 100%;text-align: center;left: 0;">共享奖励</span>
          <div class="getprize-tc">
            <img src="../../assets/img/index/index-getprize-xb.png" alt="" class="getprize-xingbi">
            <span>20</span>
          </div>
          <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
          <p>奖励将在两小时内发放</p>
          <img @click="hideprize" src="../../assets/img/index/index-close.png" alt="" class="close">
        </div>
      </div>

    </div>
</template>

<script>
  import mui from 'mui'; // 绝对路径
  import singleItem from '@/components/huigongxiang/singleItem'
  import fuItem from '@/components/huigongxiang/fuItem'
  export default {
    data(){
      return{
        guideone:true,
        list:[
          {name:"集合礼包",isactive:true,},
          {name:"精品礼券",isactive:false,},
        ],
        single:true,
        fu:false,
        showrule:false,
        showprize:false,
      }
    },
    created:function(){
      var that=this;
      mui.back=function () {
        that.$router.push("/index");
      };
      if(localStorage.getItem('three')){
        this.guideone=false;
      }
      var t=setTimeout(function(){
        localStorage.setItem('three', "three");
      },100)
    },
    mounted:function(){
      this.getHeight();
    },

    methods:{
      showchild:function(data){
        if(data=="1"){
          this.showprize=true;
        }
      },
      hideprize:function () {
        this.showprize=false;
      },
      guideonehide:function(){
        this.guideone=!this.guideone;
      },
      back:function () {
        this.$router.push("/index");
      },
      getrule:function () {
        this.showrule=!this.showrule;
      },
      hiderule:function () {
        this.showrule=!this.showrule;
      },
      isActive:function(index){
        for(var i=0;i<this.list.length;i++){
          this.list[i].isactive=false;
          if(i==index){
            this.list[index].isactive=true;
          }
          if(index==0){
            this.single=true;
            this.fu=false;
          }else if(index==1){
            this.single=false;
            this.fu=true;
          }
        }
      },
      getHeight:function () {
        var bodyheight=document.body.clientHeight;
        console.log(bodyheight)
        const self = this;
        this.$refs.mybox.style.height=bodyheight-118+"px";
      },
    },

    components:{
      singleItem,
      fuItem,
    }
  }

</script>

<style scoped>
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
  /********引导******/
  .guide{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 5;
  }
  #list{
    width:100%;
    height:auto;
    overflow: auto;
    margin-top: 2.35rem;
    background: #ffd6ad;
    padding-top: 0.2rem;
  }
  .list div{
    width: 2rem;
    text-align: center;
    position: relative;
  }

  .list .active{
    color:rgb(251,194,46);
    text-shadow: #000 1px 1px 1px;
  }
  .list .active:after{
    content: "";
    width: 2rem;
    height: 2px;
    background: #fff;
    position: absolute;
    bottom: 0.05rem;
    left:0;
  }
  .list{
    width: 80%;
    height: 0.9rem;
    position: absolute;
    bottom: 0;
    left: 10%;
    display: flex;
    justify-content: space-around;
    line-height: 0.85rem;
    font-size: 0.34rem;
    color: #fff;
    font-weight: 600;
  }
  .rule{
    width: 0.48rem;
    margin-right: 0.4rem;
    float: right;
    margin-top: 0.4rem;
  }
  .title{
    width: 50%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    margin-left: 25%;
    margin-top: 0.35rem;
    float: left;
    color: #fff;
    font-weight: bold;
    font-size:0.4rem;
  }
  #back{
    width:0.6rem;
    position:absolute;
    top:0.4rem;
    left:0.4rem;
  }
  .header{
    width:100%;
    height:2.35rem;
    background-image:url("../../assets/img/huigongxiang/huigongxiang-title.png");
    background-repeat: no-repeat;
    background-size:cover;
    position:absolute;
  }
  .huigongxiang{
    width:100%;
    height:100%;
    overflow: hidden;
  }
  /*规则*/
  .rulebox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: absolute;
    top:0;
    left:0;
    overflow-y:auto;
    z-index:4;
  }
  .rulebox div{
    width:5.6rem;
    height:6.7rem;
    position: absolute;
    top:-1rem;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    background-image: url("../../assets/img/charts/rule-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .rulebox div p{
    width:90%;
    color:#fff;
    font-size:0.24rem;
    margin:0.05rem 5%;
  }
  .rulebox div .title{
    font-size:0.32rem;
    text-align: center;
    margin:0.2rem 5%;
  }
  .close{
    width:0.8rem;
    height:0.8rem;
    position: absolute;
    bottom:-1.2rem;
    left:50%;
    margin-left:-0.4rem;
  }
</style>
