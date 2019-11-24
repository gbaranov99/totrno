import timeLogService from '../services/timeLogService'

const state = {
	timeLogs: []
}

const getters = {
	timeLogs: state => {
		return state.timeLogs
	}
}

const actions = {
	getTimeLogs ({ commit }) {
		timeLogService.fetchTimeLogs()
			.then(timeLogs => {
				commit('setTimeLogs', timeLogs)
			})
	},
	addTimeLog({ commit }, timeLog) {
		timeLogService.postTimeLog(timeLog)
			.then(timeLogService.fetchTimeLogs()
				.then(timeLogs => {
					commit('setTimeLogs', timeLogs)
				}))
		//commit('addTimeLog', timeLog)
	},
	updateTimeLog({ commit }, timeLog, timeLogId) {
		timeLogService.postTimeLog(timeLog, timeLogId)
			.then(timeLogService.fetchTimeLogs()
				.then(timeLogs => {
					commit('setTimeLogs', timeLogs)
				}))
		//commit('addTimeLog', timeLog)
	},
	deleteTimeLog( { commit }, timeLogId) {
		timeLogService.deleteTimeLog(timeLogId)
			.then(timeLogService.fetchTimeLogs()
				.then(timeLogs => {
					commit('setTimeLogs', timeLogs)
				}))
		//commit('deleteTimeLog', timeLog)
	}
}

const mutations = {
	setTimeLogs (state, timeLogs) {
		state.timeLogs = timeLogs
	},
//	addTimeLog(state, timeLog) {
//		state.timeLogs.push(timeLog)
//	},
//	deleteTimeLog(state, timeLogId) {
//		state.timeLogs = state.timeLogs.filter(obj => obj.id !== timeLogId)
//	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
