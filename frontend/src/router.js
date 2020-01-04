import vue from 'vue'
import router from 'vue-router'
import home from '@/components/Home'
import about from '@/components/About'
import contact from '@/components/Contact'
import signup from '@/components/SignUp'
import totrno from '@/components/Totrno'
import account from '@/components/Account'
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
			component: about,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (!errors) next('/totrno')
						else next()
					})
			}
		},
		{
			path: '/contact',
			name: 'contact',
			component: contact,
			beforeEnter: (to, from, next) => {
				store.dispatch('login/getUser')
					.then(errors => {
						if (!errors) next('/totrno')
						else next()
					})
			}
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
			path: '/account',
			name: 'account',
			component: account,
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
