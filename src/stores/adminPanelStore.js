// /src/stores/adminPanelStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8000/api'

// If you use auth tokens later, set them like:
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

export const useAdminPanelStore = defineStore('adminPanel', {
  state: () => ({
    jobs: [],
    loading: false,
    saving: false,
    error: null
  }),

  actions: {
    _setError(e) {
      let msg = 'Unknown error'
      if (e && e.response && e.response.data) {
        msg =
          e.response.data.message ||
          e.response.data.error ||
          e.message ||
          msg
      } else if (e && e.message) {
        msg = e.message
      }
      this.error = msg
    },

    async fetchJobs() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(API_BASE + '/jobs')
        // Expect either an array or { data: [...] }
        this.jobs = Array.isArray(res.data)
          ? res.data
          : (res.data && res.data.data) ? res.data.data : []
      } catch (e) {
        this._setError(e)
        this.jobs = []
        throw e
      } finally {
        this.loading = false
      }
    },

    async createJob(payload) {
      this.saving = true
      this.error = null
      try {
        await axios.post(API_BASE + '/createJob', payload)
        await this.fetchJobs()
      } catch (e) {
        this._setError(e)
        throw e
      } finally {
        this.saving = false
      }
    },

    async updateJob(id, payload) {
      this.saving = true
      this.error = null
      try {
        await axios.put(API_BASE + '/jobupdate/' + id, payload)
        await this.fetchJobs()
      } catch (e) {
        this._setError(e)
        throw e
      } finally {
        this.saving = false
      }
    },

    async deleteJob(id) {
      this.error = null
      try {
        await axios.delete(API_BASE + '/jobdelete/' + id)
        // Optimistic local update
        this.jobs = this.jobs.filter(function (j) {
          return j.id !== id
        })
      } catch (e) {
        this._setError(e)
        throw e
      }
    }
  }
})