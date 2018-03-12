// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
new Vue({
  router,
})
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
//引入qs
import qs from 'qs'
Vue.prototype.$qs = qs
//md5
//引入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import "mint-ui/lib/style.min.css"
//引用mui的样式
import "./assets/mui/dist/css/mui.css"
import "./assets/mui/examples/hello-mui/css/icons-extra.css"
//引用自己的样式
import "./assets/common/js/common.js"
import "./assets/common/css/common.css"




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
