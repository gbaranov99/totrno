import vue from 'vue'
import router from 'vue-router'
import home from '@/components/Home'
import about from '@/components/About'
import contact from '@/components/Contact'
import signup from '@/components/SignUp'
import totrno from '@/components/Totrno'
import logout from '@/components/Logout'
import store from '@/store'

vue.use(router)

export default new router({
	routes: [
		{
			path: '/',
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						//console.log(errors)
						if (errors) next('/home')
						else next('/totrno')
					})
			}
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (!errors) next('/totrno')
						else next()
					})
			}
		},
		{
			path: '/about',
			name: 'about',
			component: about
		},
		{
			path: '/contact',
			name: 'contact',
			component: contact
		},
		{
			path: '/signup',
			name: 'signup',
			component: signup,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (!errors) next('/totrno')
						else next()
					})
			}
		},
		{
			path: '/logout',
			name: 'logout',
			component: logout,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (errors) next('/home')
						else next()
					})
			}
		},
		{
			path: '/totrno',
			name: 'totrno',
			component: totrno,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (errors) next('/home')
						else next()
					})
			}
		},
	]
})
