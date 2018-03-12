<template>
  <div class="Jackpot">
    <!--/*******************新手引导开始-->
    <img @click="guidetwoshow" v-show="guideone" src="../../assets/img/Jackpot/index-yindao5.png" alt="" class="guide">
    <!--/*获得页面*/-->
    <div v-show="hideprize" class="getprize-box">
      <div class="getprize">
        <img src="../../assets/img/Jackpot/Jack-panda.png" alt="" class="getprize-top">
        <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
        <p>每日分享礼券三次可获得60鱼币</p>
        <span>分享礼券还有额外的奖励哦</span>
        <img @click="jumpinvite" src="../../assets/img/Jackpot/Jack-ok.png" alt="" class="ok">
      </div>
    </div>


    <!--/*******************新手引导结束-->
    <!--/*点击钱币页面*/-->
    <div v-show="clickmoney" class="getprize-box">
      <div class="getprize">
        <img src="../../assets/img/Jackpot/click-money.png" alt="" style="width: 1.88rem;height: 1.7rem;margin-left: -0.94rem;" class="getprize-top">
        <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
        <p>满20元就可以提现咯~</p>
        <span>立即分享赚鱼币抽大红包吧</span>
        <img @click="jumpinvite" src="../../assets/img/Jackpot/Jack-share.png" alt="" class="ok">
      </div>
    </div>
    <!--/*点击积分页面*/-->
    <div v-show="clickjifen" class="getprize-box">
      <div class="getprize">
        <img src="../../assets/img/Jackpot/click-jifen.png" alt="" style="width: 1.88rem;height: 1.7rem;margin-left: -0.94rem;" class="getprize-top">
        <img src="../../assets/img/invite/invite-bottom.png" alt="" class="getprize-bottom">
        <p>分享礼券获得更多鱼币</p>
        <span>投其所好会有意想不到的收入哦~</span>
        <img @click="jumpinvite" src="../../assets/img/Jackpot/Jack-share.png" alt="" class="ok">
      </div>
    </div>

    <img @click="back" src="../../assets/img/huigongxiang/huigongxiang-back.png" alt="" id="back">

    <div class="header"></div>
    <div class="edu">当前奖池额度 &nbsp;(元)</div>
    <div class="Jackpot-num">{{Jackpotnum}}</div>
    <ul class="Jacklist">
      <li class="Jack-scrolllist" v-for="item in scrollList"><span>恭喜</span> &nbsp;{{item.nickname}} &nbsp;<span>从&nbsp;</span> {{item.type}} <span>&nbsp;中抽到&nbsp;</span> {{item.money}}元</li>
    </ul>

    <div @click="showclickjifen" class="currentPrize"> <span>{{currentPrize}}</span> </div>
    <div @click="showmoney" class="currentmoney"> <span>{{currentmoney}}</span> </div>
    <div class="person">在线人数:306人</div>
    <div class="chou">
      <div v-for="(item,index) in checklist" @click="check(index)">
        <img :src="item.src" alt="">
        <img style="width: 1.8rem;height: 0.36rem;" :src="item.title" alt="">
      </div>
    </div>




    <div class="pop-fuli" v-show="WelfareHb" >
      <div v-for="(item,index) in Welfare" v-show="item.prize" class="pop-fuli-jack" :style="'backgroundImage:url('+item.Welfarebg+')'">
        <img @click="chaiWelfareHb(index)" src="../../assets/img/Jackpot/jack-chaiBtn.png" alt="" class="chaiBtn">
        <img v-show="close" @click="WelfareHbclose" src="../../assets/img/Jackpot/jack-close.png" alt="" class="jack-close">
      </div>
      <div v-show="prizelist" class="popprize">
        <div class="money">{{money}}</div>
        <img @click="WelfareHbclose" src="../../assets/img/Jackpot/jack-shouBtn.png" alt="" class="chaiBtn">
        <img @click="WelfareHbclose" src="../../assets/img/Jackpot/jack-close.png" alt="" class="jack-close">
      </div>
    </div>

    <img @click="jumptixian" src="../../assets/img/Jackpot/Jackpot-tixianBtn.png" alt="" class="tixianBtn">
    <img @click="getrule" src="../../assets/img/Jackpot/Jackpot-rule.png" alt="" class="rule">
    <!--规则页面-->
    <div class="rulebox" v-show="showrule">
      <div>
        <p class="title">红包奖池规则</p>
        <p>1.鱼粉们每天分享"鱼共享"中的活动,即可获得鱼币参与红包奖池抽奖,赢现金大红包(详情请参考鱼共享规则)。</p>
        <p>2.每成功邀请一位好友,鱼粉和好友均可获得50鱼币(详情请参考邀请好友规则)</p>
        <p>3.红包奖池设福利奖、幸运奖、惊喜奖三个等级,分别需消耗对应额度的鱼币参与抽奖,可以抽到不同档次的现金奖励。</p>
        <p>4.每日抽奖次数不设上限,有鱼币你就来吧。</p>
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
        guideone:true,
        hideprize:false,
        userId:localStorage.getItem('userId'),//用户id
        Jackpotnum:"",//
        scrollList:[],
        currentPrize:"",
        checklist:[
          {title:require("../../assets/img/Jackpot/Jacket-50.png"),src:require("../../assets/img/Jackpot/shi-static.png"),},
          {title:require("../../assets/img/Jackpot/Jacket-100.png"),src:require("../../assets/img/Jackpot/wushi-static.png"),},
          {title:require("../../assets/img/Jackpot/Jacket-200.png"),src:require("../../assets/img/Jackpot/bai-static.png"),}
        ],
        WelfareHb:false,
        prize:true,
        Welfare:[
          {prize:false,Welfarebg:require("../../assets/img/Jackpot/jack-prizebg.png"),},
          {prize:false,Welfarebg:require("../../assets/img/Jackpot/jack-prizebg.png"),},
          {prize:false,Welfarebg:require("../../assets/img/Jackpot/jack-prizebg.png"),},
        ],
        prizelist:false,
        flagJack:"",//积分不足
        flagprize:"",//奖池没钱
        money:"",//获得的奖金
        showrule:false,
        currentmoney:"0.00",
        close:false,
        clickmoney:false,
        clickjifen:false,
      }
    },

    created:function(){
      this.animation();
      if(localStorage.getItem('first')){
        this.guideone=false;
        this.close=true;
      }

      var t=setTimeout(function(){
        localStorage.setItem('first', "first");
      },100)

      //返回
      var that=this;
      mui.back = function(){
        that.$router.push("/index");
      };
      //跑马灯
      setInterval(this.scroll,1500)
      //奖池金额
      this.JackNum();
      setInterval(this.JackNum,5000)
      //获取积分
      this.getprizenum();
//      this.getmoney();
      var urlprizeinfo=apicommon.apicommon+"/test/index.php/Activity/Game/prizeinfo";
      this.axios.post(urlprizeinfo).then(successRes=>{
        this.scrollList=successRes.data.data;
      })
    },



    methods:{
      animation:function () {
        var t1=setTimeout(()=>{
          this.checklist[0].src=require("../../assets/img/Jackpot/shi.gif");
        },500);
        var t2=setTimeout(()=>{
          this.checklist[0].src=require("../../assets/img/Jackpot/shi-static.png");
          this.checklist[1].src=require("../../assets/img/Jackpot/wushi.gif");
        },1700);
        var t3=setTimeout(()=>{
          this.checklist[1].src=require("../../assets/img/Jackpot/wushi-static.png");
          this.checklist[2].src=require("../../assets/img/Jackpot/bai.gif");
        },2900);
        var t4=setTimeout(()=>{
          this.checklist[2].src=require("../../assets/img/Jackpot/bai-static.png");
        },4100);
        var t=setInterval(()=>{
          var t1=setTimeout(()=>{
            this.checklist[0].src=require("../../assets/img/Jackpot/shi.gif");
          },500);
          var t2=setTimeout(()=>{
            this.checklist[0].src=require("../../assets/img/Jackpot/shi-static.png");
            this.checklist[1].src=require("../../assets/img/Jackpot/wushi.gif");
          },1700);
          var t3=setTimeout(()=>{
            this.checklist[1].src=require("../../assets/img/Jackpot/wushi-static.png");
            this.checklist[2].src=require("../../assets/img/Jackpot/bai.gif");
          },2900);
          var t4=setTimeout(()=>{
            this.checklist[2].src=require("../../assets/img/Jackpot/bai-static.png");
          },4100);
        },4100)
      },

      showclickjifen:function () {
        this.clickjifen=!this.clickjifen;
      },
      showmoney:function () {
        this.clickmoney=!this.clickmoney;
      },
      jumpinvite:function () {
        this.$router.push("/huigongxiang/huigongxiang");
      },
      guidetwoshow:function () {
        this.guideone=!this.guideone;
        this.WelfareHb=!this.WelfareHb;
        this.Welfare[0].prize=true;
        this.flagJack=true;
        this.flagprize=true;
      },

      getrule:function () {
        this.showrule=!this.showrule;
      },
      hiderule:function () {
        this.showrule=!this.showrule;
      },
      back:function () {
        this.$router.push("/index");
      },
      jumptixian:function () {
        this.$router.push('/enchashment')
      },
      check:function (index) {
        this.WelfareHb=true;
        this.Welfare[index].prize=true;
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/lotteryjudge";
        var type=index+1;
        var that=this;
        this.axios.post(url,this.$qs.stringify({uid:this.userId,type:type})).then(successRes=>{
//          console.log(successRes.data);
          if(successRes.data.status==2){

            that.flagJack=false;
          }else if(successRes.data.status==3){
//            console.log("奖池不够");
            that.flagprize=false;
          }else if(successRes.data.status==1){
            that.flagJack=true;
            that.flagprize=true;
          }
        })
      },

      chaiWelfareHb:function(index){
        if(!this.flagJack){
//          mui.toast("很抱歉,您的积分不够");
          var that=this;
          var btnArray = ['否', '是'];
          mui.confirm('前往赚取更多积分', '您的积分不足', btnArray, function(e) {
            if (e.index == 1) {
              that.$router.push("/huigongxiang/huigongxiang");
            } else {
              that.WelfareHbclose();
              return;
            }
          })
        }else if(!this.flagprize){
          confirm("很抱歉,奖池资金不够！请等待下一批活动","提醒",function () {
            return;
          });
        }else if(this.flagprize&&this.flagJack){
          var url=apicommon.apicommon+"/test/index.php/Activity/Game/moneylottery";
          var type=index+1;
          this.axios.post(url,this.$qs.stringify({uid:this.userId,type:type})).then(successRes=>{
//            this.money="";
            console.log(successRes.data);
            if(successRes.data.status===1){
              this.money=successRes.data.money;
              this.getprizenum();
//              this.getmoney();
            }
          });
          this.prize=false;
          this.prizelist=true;
        }
      },

      WelfareHbclose:function () {
        this.WelfareHb=false;
        this.prizelist=false;
        if(!localStorage.getItem('two')){
          this.hideprize=true;
        }
        var t=setTimeout(function(){
          localStorage.setItem('two', "two");
        },100)
      },

      scroll(){
        this.animate=true;
        setTimeout(()=>{
          this.scrollList.push(this.scrollList[0]);
          this.scrollList.shift();
          this.animate=false;
        },100)
      },
      JackNum(){
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/showmoneysum";
        this.axios.post(url).then(successRes=>{
          var result=successRes.data.data;
          this.Jackpotnum=result.shiwan+result.wan+result.qian+result.bai+result.shi+result.ge;
        });
      },
      getprizenum(){
        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getnowscore";
        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
          console.log(successRes.data)
          this.currentPrize=successRes.data.scroe;
          this.currentmoney=successRes.data.nowprice;
        });
      },
//      getmoney:function () {
//        var url=apicommon.apicommon+"/test/index.php/Activity/Game/getnowprice";
//        this.axios.post(url,this.$qs.stringify({uid:this.userId})).then(successRes=>{
//          if(successRes.data.status===1){
////            console.log(successRes.data);
//            this.currentmoney=successRes.data.nowprice;
//          }
//        })
//      },
    },


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
    width: 1.18rem;
    height: 1.7rem;
    position: absolute;
    top: 0.4rem;
    left: 50%;
    margin-left: -0.59rem;
  }

  .getprize-bottom{
    width: 5.05rem;
    height: 0.64rem;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .getprize-xingbi{
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 1.5rem;
    left: 1.3rem;
  }
  .getprize span{
    width: 100%;
    font-size: 0.26rem;
    left: 0;
    text-align: center;
    top: 2.8rem;
    color: rgb(100, 108, 232);
    position: absolute;
  }
  .getprize p{
    color: rgb(172,4,124);
    font-size: 0.3rem;
    position: absolute;
    top: 2.3rem;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
  .close{
    width:0.8rem;
    height:0.8rem;
    position: absolute;
    bottom:-1.2rem;
    left:50%;
    margin-left:-0.4rem;
  }
  .ok{
    width: 1.86rem;
    height: 0.66rem;
    position: absolute;
    top: 3.35rem;
    left: 50%;
    margin-left: -0.93rem;
  }
  /********引导******/
  .guide{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 5;
  }
  #back{
    width:0.6rem;
    position:absolute;
    top:0.4rem;
    left:0.4rem;
  }
  /*红包奖池*/
  .pop-fuli{
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: absolute;
    top:0;
    z-index: 5;
  }
  .pop-fuli-jack{
    width: 7.5rem;
    height:10.14rem;
    position: absolute;
    top:1.3rem;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .popprize{
    width: 7.5rem;
    height:10.14rem;
    position: absolute;
    top:1.3rem;
    background-image: url("../../assets/img/Jackpot/jack-prize2.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .chaiBtn{
    width:3.46rem;
    height:0.8rem;
    position: absolute;
    top:6.5rem;
    left:50%;
    margin-left:-1.73rem;
  }
  .jack-close{
    width:0.4rem;
    height:0.4rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    margin-left: -0.2rem;
  }
  /*动画*/
  .fadetransition{
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .fade-enter-active, .fade-leave-active {
    -webkit-transform: translate(0px, 50px);
    transform: translate(0px, 50px);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    -webkit-transform: translate(0,-50px);
    transform: translate(0,-50px);
  }

  .money{
    position: absolute;
    top: 3.1rem;
    width: 100%;
    text-align: center;
    font-size: 0.65rem;
    text-indent: -0.5rem;
    color: #cdab67;
  }
  .edu{
    font-size: 0.24rem;
    color: #fff;
    position: absolute;
    top: 2.65rem;
    width: 100%;
    text-align: center;
  }

  .Jackpot{
    width:100%;
    height:100%;
    background-image:url("../../assets/img/Jackpot/jacket-newnewbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .header{
    width:6.16rem;
    height:6.32rem;
    position: absolute;
    top: 2.3rem;
    left:50%;
    margin-left:-3.13rem;
    background-image:url("../../assets/img/Jackpot/Jackpot-header.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .Jackpot-num{
    width: 100%;
    height: 0.5rem;
    font-size: 0.48rem;
    color: rgb(255,247,31);
    letter-spacing: 0.27rem;
    position: absolute;
    top: 3.3rem;
    line-height: 0.5rem;
    text-align: center;
    text-indent: 0.24rem;
  }
  .Jacklist{
    width: 5.8rem;
    height: 2rem;
    position: absolute;
    top: 6.2rem;
    left: 0.8rem;
    list-style: none;
    padding-top:0.05rem;
    overflow: hidden;
  }
  .Jacklist li{
    width: 90%;
    margin-left: 5%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    /*border-top: 1px dashed #fff;*/
    font-size: 0.26rem;
    color:red;
  }
  .Jacklist li span{
    color:#fff;
  }

  /*当前积分*/
  .currentPrize{
    width:1.88rem;
    height:0.82rem;
    background-image: url("../../assets/img/Jackpot/Jacket-currentyubi.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    text-indent: 0.2rem;
    line-height: 0.8rem;
    position: absolute;
    bottom: 0.3rem;
    left: 0.25rem;
    font-size: 0.3rem;
    color: #451206;
  }
  .currentmoney{
    width:1.88rem;
    height:0.82rem;
    background-image: url("../../assets/img/Jackpot/Jacket-current-money.png");
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    text-indent: 0.2rem;
    line-height: 0.8rem;
    position: absolute;
    bottom: 0.3rem;
    left: 2.3rem;
    font-size: 0.3rem;
    color: #451206;
  }

  .currentmoney span{
    float: left;
    margin-left: 0.5rem;
  }
  .currentPrize span{
    float: left;
    margin-left: 0.5rem;
  }
  /*福利活动场*/
  .chou{
    width: 100%;
    height: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    bottom: 1.3rem;
  }

  .chou div{
    flex: 1;
    text-align: center;
  }
  .chou img{
    width:1.88rem;
    height:2.08rem;
  }
  .chou p{
    width: 100%;
    text-align: center;
    margin-top: -0.15rem;
    color: #fff;
  }

  .tixianBtn{
    width: 1.98rem;
    height: 0.82rem;
    position: absolute;
    bottom: 0.3rem;
    left: 4.3rem;
  }
  .rule{
    width: 0.8rem;
    height: 0.82rem;
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
  }
  .person{
    color: #fff;
    font-size: 0.24rem;
    position: absolute;
    top: 4.2rem;
    text-align: center;
    width: 100%;
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
