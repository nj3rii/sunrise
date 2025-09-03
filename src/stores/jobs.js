import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobsStore = defineStore('jobs',  {
    state: () => {
        const jobs = ref([])
        const selectedJobs = ref(0)

        return{
            jobs,
            selectedJobs
        }
    }, 
    actions:{
        updateSelectedJobs (payload) {
            this.selectedJobs = payload
        },
        async fetchCourses() {
          const response = await api.get('getAllCourses')
            this.jobs = response.data
        }
    },
    persist: true,
})