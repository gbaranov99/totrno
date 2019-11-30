import Vue from 'vue'
import Vuex from 'vuex'
import files from '@/store/modules/files'
import login from '@/store/modules/login'
import timeLogs from '@/store/modules/timeLogs' 

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		files,
		login,
		timeLogs
	}
})

export default store
