import Vue from 'vue'
import App from './App'
import less from 'less'
import router from './router'
import ElementUI from 'element-ui'; //UI框架
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/element-#0C3052/index.css'; //自定义主题
import './assets/css/font-awesome-4.7.0/css/font-awesome.min.css'; //字体图标库
import BaiduMap from 'vue-baidu-map' //百度地图
import VueCookies from 'vue-cookies'

Vue.use(BaiduMap, {
  ak: 'hj2N4Kob8xdPDIu8bxlyYhbbEdOfwBXz'
})

Vue.use(less)
Vue.use(ElementUI)
Vue.use(VueCookies)

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$ajax = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://api.ehonge.com/api'
axios.interceptors.request.use((config) => {
  if (config.method === 'get') {
    var querystring = require('querystring');
    config.data = querystring.encode(config.data);
  }
  if (config.method === 'post') {
    var querystring = require('querystring');
    config.data = querystring.encode(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
