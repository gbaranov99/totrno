import fileService from '../services/fileService'

const state = {
	files: []
}

const getters = {
	files: state => {
		return state.files
	}
}

const actions = {
	getFiles ({ commit }) {
		fileService.fetchFiles()
			.then(files => {
				commit('setFiles', files)
			})
	},
	addFile({ commit }, file) {
		fileService.postFile(file)
			.then(fileService.fetchFiles()
				.then(files => {
					commit('setFiles', files)
				}))
		//commit('addFile', file)
	},
	deleteFile( { commit }, fileId) {
		fileService.deleteFile(fileId)
			.then(fileService.fetchFiles()
				.then(files => {
					commit('setFiles', files)
				}))
		//commit('deleteFile', file)
	}
}

const mutations = {
	setFiles (state, files) {
		state.files = files
	},
	addFile(state, file) {
		state.files.push(file)
	},
	deleteFile(state, fileId) {
		state.files = state.files.filter(obj => obj.id !== fileId)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
