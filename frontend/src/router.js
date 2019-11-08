import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SignUp from '@/components/SignUp'
import Totrno from '@/components/Totrno'
import Logout from '@/components/Logout'
import store from '@/store'

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
			component: Home,
			//beforeEnter: (to, from, next) => {
			//	store.dispatch('login/getUser')
			//	if (store.state.login.login.username !== '') next('/totrno')
			//	else next()
			//}
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
			path: '/logout',
			name: 'Logout',
			component: Logout
		},
		{
			path: '/totrno',
			name: 'Totrno',
			component: Totrno
		}
	]
})
