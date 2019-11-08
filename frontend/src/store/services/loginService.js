import api from '@/store/services/api'

export default {
	postLogin(payload) {
		return api.post(`rest-auth/login/`, payload)
			.then(response => response.data)
			//.catch(error => console.warn('woah'))
	},
	postRegister(payload) {
		return api.post(`rest-auth/registration`, payload)
			.then(response => response.data)
	}, 
	postLogout() {
		return api.post(`rest-auth/logout/`)
			.then(response => response.data)
	},
	getUser() {
		return api.get(`rest-auth/user/`)
			.then(response => response.data)
	}
}
