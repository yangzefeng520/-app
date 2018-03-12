<template>
  <div class="charts">


    <div class="header">
      <img @click="back" src="../../assets/img/huigongxiang/huigongxiang-back.png" alt="" id="back">
      <img src="../../assets/img/charts/charts-title.png" alt="" class="title">
      <img @click="getrule" src="../../assets/img/huigongxiang/huigongxiang-rule.png" alt="" class="rule">
    </div>
    <!--/*规则*/-->
    <div class="rulebox" v-show="showrule">
      <div>
        <p class="rule-title">等级说明</p>
        <table border="1">
          <tr>
            <th>鱼币</th>
            <th>分享数</th>
            <th>对应称号</th>
          </tr>
          <tr>
            <td>0-1000</td>
            <td>0-100</td>
            <td>白手起家</td>
          </tr>
          <tr>
            <td>1000-3000</td>
            <td>100-300</td>
            <td>小康生活</td>
          </tr>
          <tr>
            <td>3000-10000</td>
            <td>300-1000</td>
            <td>年轻有为</td>
          </tr>
          <tr>
            <td>10000-25000</td>
            <td>1000-2500</td>
            <td>有钱任性</td>
          </tr>
          <tr>
            <td>25000-50000</td>
            <td>2500-5000</td>
            <td>财富自由</td>
          </tr>
          <tr>
            <td>50000以上</td>
            <td>5000</td>
            <td>街区首富</td>
          </tr>
        </table>
        <p>鱼币是鱼小镇的主要分数，鱼币越高不仅可以获得更好的称号勋章，还能够在全服排行榜里获得好名次。鱼币获取方法：通过分享、抽奖等方式获得数值不等的鱼币。</p>
        <img @click="hiderule" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>

    <img src="../../assets/img/charts/charts-header.png" alt="" class="sekuai">
    <div class="myself">
      <div class="headimg" :style="'backgroundImage:url('+myinfo.headimg+')'"></div>
      <img class="dengji" :src="myinfo.pic" alt="">
      <span class="nickname" style="display: block;position: absolute;top: 0.2rem;left:1.9rem;">{{myinfo.nickname}}</span>
      <img class="jifen" src="../../assets/img/index/index-prize.png" alt="">
      <span class="jifen-font">{{myinfo.experience}}</span>
      <span class="chart-font">{{myinfo.rank}}</span>
    </div>
    <ul ref="mybox">
      <li class="list" v-for="(item,index) in list">
        <img id="num" :src="item.rankpic" alt="">
        <img v-show="index==0" src="../../assets/img/charts/1.png" alt="" class="first">
        <img v-show="index==1" src="../../assets/img/charts/2.png" alt="" class="first">
        <img v-show="index==2" src="../../assets/img/charts/3.png" alt="" class="first">
        <div class="headimg-list" :style="'backgroundImage:url('+item.headimg+')'"></div>
        <img style="width: 0.48rem;position: absolute;top: 0.4rem;left: 5.2rem;" :src="item.pic" alt="">
        <span class="nickname" style="display: block;position: absolute;top: 0.44rem;left: 2rem;">{{item.nickname}}</span>
        <span style="display: block;position: absolute;top: 0.4rem;right: 0.5rem;font-size: 0.34rem;">{{item.experience}}</span>
        <img v-show="index!==list.length-1" src="../../assets/img/charts/chart1.png" alt="" class="left">
        <img v-show="index!==list.length-1" src="../../assets/img/charts/chart2.png" alt="" class="right">
      </li>
    </ul>
  </div>
</template>


<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default {
    data(){
      return{
        userId:localStorage.getItem('userId'),
        myinfo:{},
        list:[],
        showrule:false,
      }
    },

    created:function(){


//      //返回
      var that=this;
      mui.back=function () {
        that.$router.push("/index");
      };

      var url=apicommon.apicommon+"/test/index.php/Activity/Game/rank";
      this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
        this.myinfo=successRes.data.my;
        this.list=successRes.data.data;
      })
    },

    methods:{
      back:function () {
        this.$router.push("/index");
      },
      getrule:function () {
        this.showrule=!this.showrule;
      },
      hiderule:function () {
        this.showrule=!this.showrule;
      },
      getHeight:function () {
        var bodyheight=document.body.clientHeight;
        console.log(bodyheight)
        const self = this;
        this.$refs.mybox.style.height=bodyheight-280+"px";
      },
    },

  }
</script>

<style scoped>
  /*@font-face {*/
  /*font-family: 'SingleMaltaRegular';*/
  /*src: url('../../assets/font/FZY4JW.TTF');*/
  /*font-weight: normal;*/
  /*font-style: normal;*/
  /*}﻿*/

  .jifen-font{
    display: block;position: absolute;top: 0.73rem;left: 1.9rem;font-size: 0.5rem;font-weight: bold;
    color: #f0a03c;
    text-shadow: yellow 1px 0 0, yellow 0 1px 0, yellow -1px 0 0, yellow 0 -1px 0;
    -webkit-text-shadow: yellow 1px 0 0,yellow 0 1px 0,yellow -1px 0 0,yellow 0 -1px 0;
    -moz-text-shadow: yellow 1px 0 0,yellow 0 1px 0,yellow -1px 0 0,yellow 0 -1px 0;
  }
  .chart-font{
    display: block;position: absolute;top: 0.4rem;right: 0.5rem;font-size: 0.5rem;
    font-weight:bold;color: #f0a03c;
    text-shadow: yellow 1px 0 0, yellow 0 1px 0, yellow -1px 0 0, yellow 0 -1px 0;
    -webkit-text-shadow: yellow 1px 0 0,yellow 0 1px 0,yellow -1px 0 0,yellow 0 -1px 0;
    -moz-text-shadow: yellow 1px 0 0,yellow 0 1px 0,yellow -1px 0 0,yellow 0 -1px 0;
  }

  table{
    width: 90%;
    height: auto;
    color: #fff;
    font-size: 0.24rem;
    border: 1px solid #2538be;
    border-radius: 5px;
    margin: 0.3rem 5% 0.1rem 5%;
  }
  tr{
    height:0.5rem;
    line-height: 0.5rem;
  }
  td{
    text-align: center;
  }
  .charts{
    width:100%;
    height:100%;
    position: absolute;
    background:rgb(247,188,130);
  }
  .rule{
    width: 0.48rem;
    margin-right: 0.3rem;
    float: right;
    margin-top: 0.3rem;
  }



  #back{
    width:0.6rem;
    position:absolute;
    top:0.25rem;
    left:0.3rem;
  }
  .title{
    width:1.58rem;
    height:0.58rem;
    position:absolute;
    top:0.2rem;
    left:50%;
    margin-left:-0.79rem;
  }

  .left,.right{
    width:0.33rem;
    height:0.88rem;
    position: absolute;
    top:1.05rem;
    z-index:3;
  }
  .left{
    left:0.1rem;
  }
  .right{
    right: 0.1rem;
  }
  .header{
    width:100%;
    height:1.64rem;
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    background:#ffd876;
  }
  .sekuai{
    width: 100%;
    height: 1.37rem;
    position: fixed;
    top: 1.5rem;
    z-index: 5;
  }
  .myself{
    width:7.21rem;
    height:1.35rem;
    background-image:url("../../assets/img/charts/charts-list.png");
    background-size:cover;
    background-repeat: no-repeat;
    position: fixed;
    top: 0.9rem;
    left: 50%;
    margin-left: -3.605rem;
    z-index:10;
    color: rgb(100,58,16);
  }
  .my-charts{
    width:0.56rem;
    height:0.56rem;
    background:#f0a03c;
    border-radius:50%;
  }
  .headimg{
    width:0.8rem;
    height:0.8rem;
    position:absolute;
    top:0.28rem;
    left:0.28rem;
    border:1px solid #fff;
    box-sizing: border-box;
    border-radius:50%;
    background-position: center;
    background-size:cover;
  }
  .dengji{
    width: 0.48rem;
    position: absolute;
    top: 0.2rem;
    left: 1.3rem;
  }
  .jifen{
    width: 0.48rem;
    position: absolute;
    top: 0.7rem;
    left: 1.3rem;
  }
  ul{
    width:100%;
    height:auto;
    overflow-y: auto;
    padding-bottom:0.2rem;
    position: absolute;
    top:2.8rem;
    background: rgb(247,188,130);
    color: rgb(100,58,16);
  }

  ul .list{
    width:7.21rem;
    height:1.35rem;
    background-image:url("../../assets/img/charts/charts-list.png");
    background-size:cover;
    background-repeat: no-repeat;
    position: relative;
    margin:0.2rem auto auto auto;
  }
  .headimg-list{
    width:0.8rem;
    height:0.8rem;
    position:absolute;
    top:0.28rem;
    left:1rem;
    border:1px solid #fff;
    box-sizing: border-box;
    border-radius:50%;
    background-position: center;
    background-size: 100% 100%;
  }
  #num{
    width: 0.56rem;
    position: absolute;
    top: 0.35rem;
    left: 0.3rem;
  }
  .first{
    width: 0.48rem;
    position: absolute;
    top: 0.1rem;
    left: 0.8rem;
    z-index: 2;
  }
  /*规则*/
  .rulebox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: fixed;
    top:0;
    left:0;
    z-index:11;
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
  .rulebox div .rule-title{
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
