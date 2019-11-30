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
			.then(output => {
				file.id = output.id
				file.file_set = []
				commit('addFile', file)
			})
	},
	updateFile({ commit }, file) {
		fileService.updateFile(file)
		commit('updateFile', file)
	},
	deleteFile( { commit }, fileId) {
		fileService.deleteFile(fileId)
		commit('deleteFile', fileId)
	}
}

const mutations = {
	setFiles (state, files) {
		state.files = files
	},
	fileHelper(state, file) {
		console.log(file)
	},
	addFile(state, file) {
		console.log(file)
		if (file.parent === "" || file.parent === null) {
			state.files.push(file);
		}
		else {
			var i
			for (i = 0; i < state.files.length; i++) {
				var curFile = state.files[i];
				if (String(curFile.id) === file.parent) {
					curFile.file_set.push(file);
					break;
				}
				var done = false;
				while (curFile.file_set.length > 0) {
					for (i = 0; i < curFile.file_set.length; i++) {
						curFile = curFile.file_set[i];
						if (String(curFile.id) === file.parent) {
							done = true;
							curFile.file_set.push(file);
							break;
						}
					}
					if (done) {
						break;
					}
				}
				if (done) {
					break;
				}
			}
		}
	},
	updateFile(state, file) {
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
