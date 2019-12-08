import timeLogService from '../services/timeLogService'

const state = {
	timeLogs: [],
}

const getters = {
	timeLogs: state => {
		return state.timeLogs
	}
}

const actions = {
	//getTimeLogs ({ commit }) {
	//	timeLogService.fetchTimeLogs()
	//		.then(timeLogs => {
	//			commit('setTimeLogs', timeLogs)
	//		})
	//},
	getActiveTimeLogs ({ commit }) {
		timeLogService.fetchActiveTimeLogs()
			.then(timeLogs => {
				commit('setTimeLogs', timeLogs)
			})
	},
	addTimeLog({ commit }, timeLog) {
		timeLogService.postTimeLog(timeLog)
			.then(output => {
				commit('addTimeLog', output)
			})
	},
	updateTimeLog({ commit }, timeLog) {
		timeLogService.updateTimeLog(timeLog)
		//commit('updateTimeLog', timeLog)
		commit('deleteTimeLog', timeLog.id)
	},
	deleteTimeLog( { commit }, timeLogId) {
		timeLogService.deleteTimeLog(timeLogId)
		commit('deleteTimeLog', timeLogId)
	}
}

const mutations = {
	setTimeLogs (state, timeLogs) {
		state.timeLogs = timeLogs
	},
	addTimeLog(state, timeLog) {
		state.timeLogs.push(timeLog)
	},
	updateTimeLog(state, timeLog) {
		/*
		var i, curLog;
		for (i = 0; i < state.timeLogs.length; i++) {
			curLog = state.timeLogs[i];
			if (curLog.id === timeLog.id) {
				if (!timeLog.active) {

		*/
	},
	deleteTimeLog(state, timeLogId) {
		state.timeLogs = state.timeLogs.filter(obj => obj.id !== timeLogId)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
