import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lib-flexible/flexible.js'
import './assets/style/reset.css'
import { Toast,Dialog } from 'vant'
import 'vant/lib/index.css';
import 'animate.css';
Vue.use(Toast)
Vue.use(Dialog)
import Common from './assets/js/common'
Vue.use(Common,{ axios: axios })
axios.defaults.timeout = 10000;//请求超时
Vue.prototype.rootUrl = window.myConfig.rootUrl
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
