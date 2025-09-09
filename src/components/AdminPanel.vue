<template>
  <v-container class="py-6">
    <v-card elevation="2" rounded="xl">
      <!-- Title + Actions -->
      <v-card-title class="d-flex align-center">
        <div class="text-h6">Job Listings</div>
        <v-spacer />
        <v-text-field
          v-model="q"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search jobs…"
          class="mr-3"
          hide-details
          style="max-width: 280px"
        />
        <v-btn color="green" prepend-icon="mdi-plus" @click="openCreate">
          Create Job
        </v-btn>
      </v-card-title>

      <v-divider />

      <!-- Table -->
      <v-data-table
        :headers="headers"
        :items="filteredJobs"
        :loading="store.loading"
        item-key="id"
        class="elevation-0"
        :items-per-page="10"
        hover
      >
        <template #loading>
          <div class="pa-6 text-center">
            <v-progress-circular indeterminate />
            <div class="mt-2 text-medium-emphasis">Loading jobs…</div>
          </div>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            size="small"
            color="blue"
            class="me-2"
            variant="flat"
            @click="openEdit(item)"
          >
            Update
          </v-btn>
          <v-btn
            size="small"
            color="red"
            variant="flat"
            :loading="isDeletingId === item.id"
            @click="onDelete(item.id)"
          >
            Delete
          </v-btn>
        </template>

        <template #no-data>
          <div class="pa-8 text-center text-medium-emphasis">
            No jobs found.
          </div>
        </template>
      </v-data-table>
    </v-card>

    v-card

    <!-- Create / Edit Dialog -->
    <v-dialog v-model="dialog" max-width="700" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center">
          <span class="text-h6">{{ isEdit ? 'Update Job' : 'Create Job' }}</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-form ref="formRef" @submit.prevent="onSubmit" v-model="formValid">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="form.title"
                  label="Title"
                  :rules="[rRequired]"
                  variant="outlined"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="form.company"
                  label="Company"
                  :rules="[rRequired]"
                  variant="outlined"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="form.location"
                  label="Location"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="form.type"
                  label="Type (e.g., Full-time)"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="form.duration"
                  label="Duration"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model.trim="form.description"
                  label="Description"
                  auto-grow
                  variant="outlined"
                  rows="4"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="green"
            :loading="store.saving"
            @click="onSubmit"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminPanelStore } from '@/stores/adminPanelStore' // adjust path if needed

const store = useAdminPanelStore()

// local UI state
const dialog = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const formValid = ref(false)
const isDeletingId = ref(null)
const q = ref('')

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

const filteredJobs = computed(() => {
  if (!q.value) return store.jobs
  const term = q.value.toLowerCase()
  return store.jobs.filter(j =>
    [j.title, j.company, j.location, j.type, j.duration]
      .filter(Boolean)
      .some(v => String(v).toLowerCase().includes(term))
  )
})

const rRequired = v => (!!v && String(v).trim().length > 0) || 'Required'

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

const openCreate = () => {
  resetForm()
  isEdit.value = false
  dialog.value = true
}

const openEdit = (job) => {
  form.value = { ...job }
  isEdit.value = true
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})
const notify = (text, color = 'success') => {
  snackbar.value = { show: true, text, color }
}

const onSubmit = async () => {
  // validate
  const ok = await formRef.value?.validate()
  if (!ok) return

  try {
    if (isEdit.value && form.value.id) {
      await store.updateJob(form.value.id, form.value)
      notify('Job updated')
    } else {
      await store.createJob(form.value)
      notify('Job created')
    }
    dialog.value = false
  } catch (e) {
    notify(store.error || 'Failed to save job', 'error')
  }
}

const onDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this job?')) return
  try {
    isDeletingId.value = id
    await store.deleteJob(id)
    notify('Job deleted')
  } catch (e) {
    notify(store.error || 'Failed to delete job', 'error')
  } finally {
    isDeletingId.value = null
  }
}

onMounted(async () => {
  await store.fetchJobs()
})
</script>