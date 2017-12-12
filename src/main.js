import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import 'common/font/iconfont.css'
import postHttp from 'plugin/postHttp'
Vue.use(postHttp)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
