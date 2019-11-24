import api from '@/store/services/api'

export default {
  fetchTimeLogs() {
    return api.get(`allLogs/`)
              .then(response => response.data)
  },
  postTimeLog(payload) {
    return api.post(`allLogs/`, payload)
              .then(response => response.data)
  },
  updateTimeLog(payload, logId) {
    return api.patch(`allLogs/${logId}/`, payload)
              .then(response => response.data)
  },
  deleteTimeLog(logId) {
    return api.delete(`allLogs/${logId}/`)
              .then(response => response.data)
  }
}
