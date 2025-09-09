import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'   // make sure this exists

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    selectedJobs: 0,
    loading: false,
    error: null,
  }),

  actions: {
    updateSelectedJobs(payload) {
      this.selectedJobs = payload
    },

    async fetchJobs() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/jobs')  // ✅ correct API endpoint
        this.jobs = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || [])
      } catch (e) {
        this.error = e.message || 'Failed to fetch jobs'
        this.jobs = []
      } finally {
        this.loading = false
      }
    },
  },

  persist: true,
})
