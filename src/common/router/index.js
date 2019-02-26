import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import HomeApp from '@/components/HomeApp'
import InfoBase from './infoBase'
import InfoBusiness from './infoBusiness'
import InfoInventory from './infoInventory'
import InfoTask from './infoTask'
import PlanManage from './planManage'
import SysEvent from './sysEvent'
import SysManage from './sysManage'
import SysWindows from './sysWindows'
import App from './app'
import {sSet, sGet, getQueryString ,url} from '@/common/config/utils';
import {getUserInfoSso, LoginSso} from "@/common/config/api/basic";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: (resolve) => {
        require(['@/components/LoginSso'], resolve)
      },
      hidden: true
    },
    {
      path: '/index',
      component: (resolve) => {
        require(['@/components/LoginSso'], resolve)
      },
      hidden: true
    },
    {
      path: '*', //*号表示匹配任意内容
      component: (resolve) => {
        require(['@/components/404'], resolve)
      },
      hidden: true
    },
    {
      path: '/login',
      component: (resolve) => {
        require(['@/components/Login'], resolve)
      },
      hidden: true
    },
    {
      path: '/Loading',
      component: (resolve) => {
        require(['@/components/Loading'], resolve)
      },
      hidden: true
    },
    {
      path: '/infoBase',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: InfoBase
    },
    {
      path: '/infoBusiness',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: InfoBusiness
    },
    {
      path: '/infoInventory',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: InfoInventory
    },
    {
      path: '/infoTask',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: InfoTask
    },
    {
      path: '/planManage',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: PlanManage
    },
    {
      path: '/sysEvent',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: SysEvent
    },
    {
      path: '/sysManage',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: SysManage
    },
    {
      path: '/sysWindows',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: SysWindows
    },
    {
      path: '',
      component: Home,
      children: [{
        path: '/example',
        name: '样例',
        component: () => import('@/components/Example')
      }],
      hidden: true
    },
    {
      path: '',
      component: Home,
      children: [{
        path: '/404',
        name: 'notFound',
        component: () => import('@/components/404')
      }],
      hidden: true
    },
    {
      path: '/App',
      component: HomeApp,
      children: App
    },
  ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  let ssoUrl = url + '/Loading';
  if (to.path == "/" || to.path == "/index") {
    window.location.href = 'https://c2bapi02-cv.saicmotor.com/sso/authorize?response_type=code&scope=read&' +
      'client_id=097492ec57b544a8a9c043deb3b12756&' +
      'redirect_uri=' + ssoUrl + '&state=a5fd852f-c120-4ba1-89d0-d66dd3582bc9';
  }

  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    let user = sGet("_WHUser");
    if (user == null) {
      user = {
        token: ''
      };
    }
    if (user.token) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      sessionStorage.clear();
      next({
        path: '/index',
      })
    }
  } else {
    next()
  }
})

export default router
