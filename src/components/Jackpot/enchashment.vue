<template>
  <div class="enchashment">
    <img @click="back" src="../../assets/img/huigongxiang/huigongxiang-back.png" alt="" id="back">

    <div class="money">当前金额: <span>{{money}}元</span> </div>
    <div class="input">
      <input type="text" v-model="user" placeholder="请输入您的支付宝账号">
      <input type="text" v-model="phone" placeholder="请输入您的手机号码">
      <input type="text" v-model="num" placeholder="请输入体现金额">
      <p><img src="../../assets/img/Jackpot/enchashment-tishi.png" alt="">每笔体现金额不得超过1000元</p>
      <img @click="getcash" src="../../assets/img/Jackpot/enchashment-btn.png" alt="" class="btn">
    </div>
    <img @click="getrule" src="../../assets/img/Jackpot/Jackpot-rule.png" alt="" class="rule">

    <div class="rulebox" v-show="showrule">
      <div>
        <p class="title">提现规则</p>
        <p>1.余额满20元可提现。</p>
        <p>2.申请提现后,请先填写审核信息,一定要仔细核对,以免打错款哦。</p>
        <p>3.鱼粉申请提现之后,请耐心等待人工审核,72小时内我们会把红包金额奉上。</p>
        <p>4.未满20元的鱼粉们,加把劲快去分享赚鱼币吧~</p>
        <p>此活动最终归属权归本公司所有</p>
        <img @click="hiderule" src="../../assets/img/index/index-close.png" alt="" class="close">
      </div>
    </div>
  </div>

</template>

<script>
  import apicommon from "../../assets/common/js/api.js";
  import mui from 'mui'; // 绝对路径
  export default {
    data(){
      return{
        userId:localStorage.getItem('userId'),//用户id
        money:"0",
        user:"",
        phone:"",
        num:"",
        showrule:false,
      }
    },
    created:function(){
      this.getmoney();
//      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/Jackpot")
      }
    },
    methods:{
      back:function () {
        this.$router.push("/Jackpot")
      },
      getmoney:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getnowprice";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          if(successRes.data.status===1){
            this.money=successRes.data.nowprice;
          }
        })
      },
      getcash:function () {
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getcash";
        var data={uid:this.userId,zfbid:this.user,phone:this.phone,num:this.num};
        if(this.userId==""){
          mui.toast('支付宝账号不能为空');
          return;
        }else if(this.phone==""){
          mui.toast('手机号不能为空');
          return;
        }else if(this.num==""){
          mui.toast('提现金额不能为空');
          return;
        }
        this.axios.post(url,this.$qs.stringify(data)).then(successRes=>{
          console.log(successRes.data.status);
          if(successRes.data.status==1){
            mui.toast('提现成功');
          }else if(successRes.data.status==2){
            mui.toast('余额不足,赶快分享给好友一起赚钱吧！');
          }else if(successRes.data.status==3){
            mui.toast('提现金额不能小于20哦!');
          }else if(successRes.data.status==4){
            mui.toast('提现金额超过余额！')
          }else if(successRes.data.status==5){
            mui.toast('数据不全')
          }
        })
      },
      getrule:function () {
        this.showrule=!this.showrule;
      },
      hiderule:function () {
        this.showrule=!this.showrule;
      },

    },
  }
</script>

<style scoped>
  .enchashment{
    width: 100%;
    height:100%;
    background-image: url("../../assets/img/Jackpot/enchashment-newnewbg.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    top:0;
    left:0;
  }
  .input img.btn{
    width: 1.98rem;
    height: 0.82rem;
    position: absolute;
    margin-top: 0.2rem;
    left: 50%;
    margin-left: -0.99rem;
  }
  #back{
    width:0.6rem;
    position:absolute;
    top:0.4rem;
    left:0.4rem;
  }
  .input{
    width:6.4rem;
    height:5.78rem;
    background-image: url("../../assets/img/Jackpot/enchashment-juanzhou.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top:3rem;
    left:50%;
    margin-left:-3.2rem;
    padding-top:0.5rem;
  }
  .input input{
    width:80%;
    margin: 0 10% 10px 10%;
    background: none;
    border:none;
    outline: none;
    border-bottom:2px solid #b1742e;
    box-sizing: border-box;
    color: #b1742e;
  }


  input::placeholder{
    color: #b1742e;
    font-size:0.3rem;
  }
  .input p{
    height: 0.4rem;
    line-height: 0.4rem;
    color: #b1742e;
    font-size:0.3rem;
    text-indent:0.1rem;
  }
  .input img{
    width:0.32rem;
    height: 0.32rem;
    margin-top: 0.04rem;
    margin-left:0.7rem;
    float: left;
  }

  .money{
    width: 3.34rem;
    height: 0.82rem;
    background-image: url("../../assets/img/Jackpot/Jacket-currentjifen.png");
    background-size: cover;
    background-repeat: no-repeat;
    text-indent: 0.2rem;
    line-height: 0.8rem;
    position: fixed;
    bottom: 0.6rem;
    left: 0.8rem;
    font-size: 0.3rem;
    color: #451206;
  }

  .money span{
    margin-left: 0.05rem;
  }
  .rule{
    width: 0.8rem;
    height: 0.82rem;
    position: fixed;
    bottom: 0.6rem;
    left: 5.5rem;
  }
  .rulebox{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.3);
    position: absolute;
    top:0;
    left:0;
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
    font-size:0.26rem;
    margin:0.05rem 5%;
  }
  .rulebox div .title{
    font-size:0.32rem;
    text-align: center;
    margin: 0.2rem 5% 0.4rem 5%;
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
