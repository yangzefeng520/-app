<template>
  <div>
    <ul>
      <li @click="deletex(key)" v-for="(item,key,index) in list">{{index}}.{{key}}{{item.num}}  <span>删除</span></li>
    </ul>
  </div>
</template>

<script>
  export  default {
    data(){
      return{
//        list:[
////          {id:1,num:"1"},
////          {id:2,num:"2"},
////          {id:3,num:"3"},
////          {id:4,num:"4"},
//        ]
        list:{
          yangyang:111,
          fengfeng:222,
        }
      }
    },


    methods:{
      deletex:function(index){
        console.log(index)
        this.list.splice(index,1);
      }
    }
  }
</script>

<style>

</style>
