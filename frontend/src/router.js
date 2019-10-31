import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import About from '@/components/About'
import Contact from '@/components/Contact'
import GetStarted from '@/components/GetStarted'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Settings from '@/components/Settings'
import TopNav from '@/components/TopNav'

//import Files from '@/components/Files'

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
      path: '/index',
      name: 'Index',
      component: Index
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
      path: '/getstarted',
      name: 'GetStarted',
      component: GetStarted
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/topnav',
      name: 'TopNav',
      component: TopNav
    }
  ]
})
