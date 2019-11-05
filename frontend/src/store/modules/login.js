import loginService from '../services/loginService'

const state = {
	login: {
		pk:'',
		username:'',
		email:'',
		first_name:'',
		last_name:''
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
  },
  loginUser ({ commit }, login) {
    loginService.postLogin(login)
    .then(() => {
      commit('loginUser', login)
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
    state.login = login
  },
  logoutUser(state, login) {
    state.login = login
  },
  getUser(state, login) {
    state.login = login
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
