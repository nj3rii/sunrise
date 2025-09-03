<template>
  <v-container>
    <v-card flat>
      <!-- Title and Create Button -->
      <v-card-title class="d-flex align-center">
        Job Listings
        <v-spacer />
        <v-btn color="green" @click="openCreateDialog">Create Job</v-btn>
      </v-card-title>

      <v-divider />

      <!-- Jobs Table -->
      <v-data-table
        :headers="headers"
        :items="jobs"
        class="elevation-1"
      >
        <!-- Action Buttons -->
        <template v-slot:item.actions="{ item }">
          <v-btn size="small" color="blue" class="me-2" @click="openEditDialog(item)">
            Update
          </v-btn>
          <v-btn size="small" color="red" @click="deleteJob(item.id)">
            Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create / Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ isEdit ? 'Update Job' : 'Create Job' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.title" label="Title" required />
          <v-text-field v-model="form.company" label="Company" required />
          <v-text-field v-model="form.location" label="Location" required />
          <v-text-field v-model="form.type" label="Type" required />
          <v-text-field v-model="form.duration" label="Duration" />
          <v-textarea v-model="form.description" label="Description" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="green" @click="saveJob">{{ isEdit ? 'Update' : 'Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jobs = ref([])
const dialog = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  title: '',
  company: '',
  location: '',
  type: '',
  duration: '',
  description: ''
})

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Company', value: 'company' },
  { title: 'Location', value: 'location' },
  { title: 'Type', value: 'type' },
  { title: 'Duration', value: 'duration' },
  { title: 'Actions', value: 'actions', sortable: false }
]

// Fetch jobs from backend
const fetchJobs = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/jobs')
    jobs.value = res.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
}

// Open dialog for creating a job
const openCreateDialog = () => {
  resetForm()
  isEdit.value = false
  dialog.value = true
}

// Open dialog for editing a job
const openEditDialog = (job) => {
  form.value = { ...job }
  isEdit.value = true
  dialog.value = true
}

// Save (create or update)
const saveJob = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`http://127.0.0.1:8000/api/jobs/${form.value.id}`, form.value)
    } else {
      await axios.post('http://127.0.0.1:8000/api/jobs', form.value)
    }
    fetchJobs()
    closeDialog()
  } catch (error) {
    console.error('Error saving job:', error)
  }
}

// Delete job
const deleteJob = async (id) => {
  if (confirm('Are you sure you want to delete this job?')) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}`)
      jobs.value = jobs.value.filter(job => job.id !== id)
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    company: '',
    location: '',
    type: '',
    duration: '',
    description: ''
  }
}

const closeDialog = () => {
  dialog.value = false
}

onMounted(fetchJobs)
</script>
