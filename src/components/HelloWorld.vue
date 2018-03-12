<template>

</template>

<script>
  export default{
    install(Vue){
      // 向Vue对象上添加方法，保存popup值
      Vue.prototype.savePopup = (value) => {
        //如果存在-新增，否则-创建
        if(sessionStorage.getItem('popupArr')){
          let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
          tempArr.push(value)
          sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
        }else{
          let arr = [value]
          sessionStorage.setItem('popupArr',JSON.stringify(arr))
        }
      },
      Vue.prototype.removePopup = () =>{
        if(sessionStorage.getItem('popupArr')){
          let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
          tempArr.pop()
          sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
        }
      }
    },

    methods:{
      open(params){
        this[params.type]=true
        this.cur_type = params.type
        //将当前弹出层的属性保存
      }
    },


    beforeRouteLeave (to, from, next) {
      if(sessionStorage.getItem('popupArr')){
        let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
          if(tempArr.length>0){
          let cur = tempArr.pop()
            this[cur] = false
            sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
            next(false)
          }else{
            next()
          }
        }else{
        next()
      }
    }


  }


</script>

<style>

</style>
