import api from '@/store/services/api'

export default {
  postLogin(payload) {
    return api.post(`rest-auth/login/`, payload)
              .then(response => response.data)
  },
  postRegister(payload) {
    return api.post(`rest-auth/registration`, payload)
              .then(response => response.data)
  }, 
  postLogout() {
    return api.post(`rest-auth/logout/`)
  }
}
