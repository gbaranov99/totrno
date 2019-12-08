import api from '@/store/services/api'

export default {
  fetchTimeLogs() {
    return api.get(`logs/`)
              .then(response => response.data)
  },
  fetchActiveTimeLogs() {
    return api.get(`activeLogs/`)
              .then(response => response.data)
  },
  postTimeLog(payload) {
    return api.post(`logs/`, payload)
              .then(response => response.data)
  },
  updateTimeLog(payload) {
    return api.patch(`logs/${payload.id}/`, payload)
              .then(response => response.data)
  },
  deleteTimeLog(logId) {
    return api.delete(`logs/${logId}/`)
              .then(response => response.data)
  }
}
