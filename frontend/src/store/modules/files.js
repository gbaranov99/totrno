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
	deleteFile( { commit }, file) {
		fileService.deleteFile(file.id)
		commit('deleteFile', file)
	}
}

const mutations = {
	setFiles (state, files) {
		state.files = files
	},
	fileHelper(state, file) {
		//console.log(file)
	},
	addFile(state, file) {
		//console.log(file)
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
					var j
					for (j = 0; j < curFile.file_set.length; j++) {
						curFile = curFile.file_set[j];
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
	deleteFile(state, file) {
		if (file.parent === "" || file.parent === null) {
			state.files = state.files.filter(obj => obj.id !== file.id)
		}

		var i
		for (i = 0; i < state.files.length; i++) {
			var curFile = state.files[i];
			var done = false;
			while (curFile.file_set.length > 0) {
				var j
				for (j = 0; j < curFile.file_set.length; j++) {
					var tempFile = curFile.file_set[j];
					//console.log(tempFile.id);
					//console.log(file.id);
					if (tempFile.id === file.id) {
					//console.log("wow");
						done = true;
						curFile.file_set = curFile.file_set.filter(obj => obj.id !== file.id)
						break;
					}
					curFile = tempFile;
					//console.log(curFile);
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
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
