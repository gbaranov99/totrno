import loginService from '../services/loginService'
import router from '@/router'

const state = {
	login: {
		pk:'',
		username:'',
		email:'',
		first_name:'',
		last_name:''
	},
	errors: {
		error_msg:''
	}
}

const getters = {
	login: state => {
		return state.login
	}
}

const actions = {
	registerUser ({ commit }, login) {
		loginService.postRegister(login)
			.then(() => {
				commit('registerUser', login)
			})
			.catch(() => {
				commit('setErrors', 'Please fill out all forms correctly');
			})
	},
	loginUser ({ commit }, login) {
		loginService.postLogin(login)
			.then(() => {
				commit('loginUser', login)
			})
			.catch(() => {
				commit('setErrors', 'Please enter a valid login');
			})
	},
	logoutUser ({ commit }, login) {
		loginService.postLogout()
			.then(() => {
				commit('logoutUser', login)
			})
	},
	getUser ({ commit }) {
		loginService.getUser()
			.then(login => {
				commit('getUser', login)
			})
	}
}

const mutations = {
	registerUser(state, login) {
		state.login = login
	},
	loginUser(state, login) {
		router.push('/totrno')
		state.login = login
	},
	logoutUser(state, login) {
		router.push('/home')
		state.login.pk = '',
			state.login.username = ''
		state.login.email = ''
		state.login.first_name = ''
		state.login.last_name = ''
	},
	getUser(state, login) {
		state.login = login
	},
	setErrors(state, error_msg) {
		state.errors.error_msg = error_msg
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
