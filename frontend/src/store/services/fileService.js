import api from '@/store/services/api'

export default {
  fetchFiles() {
    return api.get(`files/`)
              .then(response => response.data)
  },
  postFile(payload) {
    return api.post(`files/`, payload)
              .then(response => response.data)
              //.then(response => console.log(response))
  },
  updateFile(payload, fileId) {
    return api.patch(`allFiles/${payload.id}/`, payload)
              .then(response => response.data)
  },
  deleteFile(fileId) {
    return api.delete(`allFiles/${fileId}/`)
              .then(response => response.data)
  }
}
