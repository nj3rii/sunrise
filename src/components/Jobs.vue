<template>
  <v-container>
    <v-card flat>
      <!-- Title and Search Bar -->
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-briefcase-search" class="me-2" /> Find Jobs
        <v-spacer />
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
        />
      </v-card-title>

      <v-divider />

      <!-- Job Listings Table -->
      <v-data-table
        v-model:search="search"
        :items="jobsStore.jobs"
        :headers="headers"
        class="elevation-1"
      >
        <!-- Apply Button Column -->
        <template v-slot:item.actions="{ item }">
          <v-btn
            size="small"
            color="primary"
            :to="`/apply/`"   
            router
          >
            Apply
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useJobsStore } from '@/stores/jobs'

const search = ref('')
const jobsStore = useJobsStore()

const headers = [
  { title: ' Title', value: 'title' },   // ✅ should match backend field
  { title: 'Company', value: 'company' },
  { title: 'Location', value: 'location' },
  { title: 'Type', value: 'type' },
  { title: 'Duration', value: 'duration' },
  { title: 'Description', value:'description'},

  
  
// fixed value
  { title: 'Action', value: 'actions', sortable: false }
]

onMounted(() => {
  jobsStore.fetchJobs()   // ✅ load jobs from backend
})
</script>
