import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import 'common/font/iconfont.css'
import postHttp from 'plugin/postHttp'
import vueLazyload from 'vue-lazyload'
import loadingImage from '../static/imgs/loading.gif'
Vue.use(postHttp)
Vue.use(vueLazyload, {
  preLoad: 1.3,
  error: loadingImage,
  loading: loadingImage,
  attempt: 1
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
