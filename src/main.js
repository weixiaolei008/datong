import Vue from 'vue'
import router from './common/router'
import App from './App'
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import mixin from './common/mixin/mixIn'
Vue.mixin(mixin)

import './common/style/common.css'
import './common/style/group.css'
import less from 'less'
Vue.use(less);

import store from './common/store/index'
// 导入api
// import api from './common/config/index'
// Vue.use(api)

import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})

