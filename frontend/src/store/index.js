import Vue from 'vue'
import Vuex from 'vuex'
import files from '@/store/modules/files'
import login from '@/store/modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    files,
	login
  }
})

export default store
