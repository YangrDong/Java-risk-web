import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

//echarts导入
Vue.prototype.$echarts = echarts;
import *as echarts from 'echarts'


import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.use(Element)
Vue.config.productionTip = false

//axios导入
import request from './api/axios.js'
Vue.prototype.$axios = request

// require("./mock") //引入mock数据，关闭则注释该行

import global from './mixin'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
