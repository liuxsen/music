import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import index from '@/components/index/index'
import songSheet from '@/components/songSheet/songSheet'
import play from '@/components/play/play'
import recommend from '@/components/recommend/recommend'
import mv from '@/components/mv/mv'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/songSheet/:id',
      name: 'songSheet',
      component: songSheet
    },
    {
      path: '/play', // 音乐id
      name: 'play',
      component: play
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/mv',
      name: 'mv',
      component: mv
    }
  ]
})
