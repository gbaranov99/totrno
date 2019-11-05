import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SignUp from '@/components/SignUp'

import Files from '@/components/Files'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/files',
      name: 'Files',
      component: Files
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
