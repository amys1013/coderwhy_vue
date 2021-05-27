import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/styles/global.css'
// 导入字体图标
// import './assets/fonts/iconfont.css'
import './assets/iconfonts/icon.css'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';

// 把这个包挂在vue的原型对象上
// 这样vue的每个组件直接可以访问到http,去发起axios请求
Vue.prototype.$http = axios


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //2.得到token
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

new Vue({
  router,
  // render函数的作用就是将App那个vue组件渲染成DOM节点。
  render: h => h(App)
}).$mount('#app')


