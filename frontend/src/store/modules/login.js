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
}

const getters = {
	login: state => {
		return state.login
	}
}

const actions = {
	registerUser ({ commit }, login) {
		//console.log(login)
		return loginService.postRegister(login)
			.then(() => {
				commit('registerUser', login)
			})
			.catch(errors => {
				return errors
			})
	},
	loginUser ({ commit }, login) {
		return loginService.postLogin(login)
			.then(() => {
				commit('loginUser', login)
			})
			.catch(errors => {
				return errors
			})
	},
	logoutUser ({ commit }, login) {
		loginService.postLogout()
			.then(() => {
				commit('logoutUser', login)
			})
	},
	getUser ({ commit }) {
		return loginService.getUser()
			.then(login => {
				commit('getUser', login)
			})
			.catch(errors => { 
				return errors
			})
	}
}

const mutations = {
	registerUser(state, login) {
		router.push('/totrno')
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
	//setErrors(state, error_msg) {
	//	state.errors.error_msg = error_msg
	//}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
