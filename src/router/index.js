import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/components/PageTransition'
import login from '@/components/login/login'
import reg from '@/components/login/reg'
import forgetPassword from '@/components/login/forgetPassword'
import updatePassword from '@/components/login/updatePassword'
import index from '@/components/index/index'
import message from '@/components/index/message'
import updatename from '@/components/index/updatename'
import updatesex from '@/components/index/updatesex'
import updateage from '@/components/index/updateage'
import updateinfo from '@/components/index/updateinfo'
import huigongxiang from '@/components/huigongxiang/huigongxiang'
import charts from '@/components/charts/charts'
import Jackpot from '@/components/Jackpot/Jackpot'
import enchashment from '@/components/Jackpot/enchashment'
import invite from '@/components/invite/invite'
import activity from '@/components/huigongxiang/activity'
import quan from '@/components/huigongxiang/quan'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   component: PageTransition,
    //   children: [
        {path: '/', redirect: '/index', component: index},
        {path: '/login/login',name: 'login', component: login},
        {path: '/login/register', name: 'register', component: reg},
        {path: '/login/forgetPassword', name: 'forgetPassword', component: forgetPassword},
        {path: '/login/updatePassword', name: 'updatePassword', component: updatePassword},

        {path: '/index', name: 'index', component: index},
        {path: '/index/message', name: 'message', component: message},
        {path: '/index/updatename', name: 'updatename', component: updatename},
        {path: '/index/updatesex', name: 'updatesex', component: updatesex},
        {path: '/index/updateage', name: 'updateage', component: updateage},
        {path: '/index/updateinfo', name: 'updateinfo', component: updateinfo},

        {path: '/huigongxiang/huigongxiang', name: 'huigongxiang', component: huigongxiang},
        {path: '/activity/:id', name: 'activity', component: activity},
        {path: '/quan/:id', name: 'quan', component: quan},

        {path: '/charts', name: 'charts', component: charts},

        {path: '/Jackpot', name: 'Jackpot', component: Jackpot},
        {path: '/enchashment', name: 'enchashment', component: enchashment},

        {path: '/invite', name: 'invite', component: invite},

      // ],
    // },
  ]
})

router.beforeEach((to, from, next)=> {
  if (to.name === 'login' || to.name === 'register' ||to.name === 'forgetPassword' ||to.name=='updatePassword') {
    next();
  } else {
    //
    if (localStorage.Token) {
      next();
    } else {
      router.push({path: '/login/login'});
    }
  }
});
export default router;
