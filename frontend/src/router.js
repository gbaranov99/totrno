import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Files from '@/components/Files'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/files',
      name: 'files',
      component: Files
    }
  ]
})
