import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SignUp from '@/components/SignUp'
import Totrno from '@/components/Totrno'
import Logout from '@/components/Logout'
import store from '@/store'
//import Tree1 from '@/components/Tree1'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(() => {
						if (store.state.login.login.username !== '') next('/totrno')
						else next('/home')
					})
			}
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(() => {
						store.state.login.errors.error_msg = ''
						if (store.state.login.login.username !== '') next('/totrno')
						else next()
					})
			}
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
			component: SignUp,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(() => {
						store.state.login.errors.error_msg = ''
						if (store.state.login.login.username !== '') next('/totrno')
						else next()
					})
			}
		},
		{
			path: '/logout',
			name: 'Logout',
			component: Logout,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(() => {
						store.state.login.errors.error_msg = ''
						if (store.state.login.login.username === '') next('/home')
						else next()
					})
			}
		},
		{
			path: '/totrno',
			name: 'Totrno',
			component: Totrno,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(() => {
						store.state.login.errors.error_msg = ''
						if (store.state.login.login.username === '') next('/home')
						else next()
					})
			}
		},
		//{
		//	path: '/search',
		//	name: 'Tree1',
		//	component: Tree1
		//}
	]
})
