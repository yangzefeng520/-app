<template>
  <div id="app">
    <!--/***路由区域-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    methods:{
      back:function(){
        history.go(-1);
      }
    }
  }
</script>

<style>

</style>
