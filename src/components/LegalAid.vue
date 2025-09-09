<template>
  <v-container class="py-8" max-width="900">
    <h2 class="text-h4 font-weight-bold mb-6 text-center">Legal Aid & Resources</h2>

    <!-- Rights Information -->
    <v-card class="mb-6 pa-4 rounded-xl elevation-3" color="#f5f7fa">
      <h3 class="text-h6 font-weight-bold mb-2">Know Your Rights</h3>
      <p class="mb-4 text-grey-darken-1">
        Understanding your rights is the first step to protecting yourself. 
        Select your case type below to see relevant information.
      </p>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in filteredRights" :key="i" class="rounded-lg">
          <v-expansion-panel-title class="font-weight-medium">
            {{ item.title }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            {{ item.content }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- Law Categories -->
    <h3 class="text-h6 font-weight-bold mb-4">Learn About the Law</h3>
    <v-row>
      <v-col v-for="(law, i) in filteredLaws" :key="i" cols="12" sm="6" md="4">
        <v-card outlined class="rounded-xl elevation-2 hover-elevate" color="#ffffff">
          <v-card-title class="font-weight-bold">{{ law.title }}</v-card-title>
          <v-card-text class="text-grey-darken-1">{{ law.description }}</v-card-text>
          <v-card-actions>
            <v-btn :href="law.link" target="_blank" color="primary" variant="flat" class="rounded-lg">
              Read More  
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Booking Form -->
    <v-card class="mt-8 pa-6 rounded-xl elevation-4" color="#fef6f6">
      <h3 class="text-h6 font-weight-bold mb-2">Book Legal Aid</h3>
      <p class="mb-4 text-grey-darken-1">
        Fill in the form below to request a lawyer. We’ll match you with the right professional based on your case type.
      </p>

      <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
        <v-select v-model="form.caseType" :items="store.caseTypes" label="Case Type"
          :rules="[v => !!v || 'Case type is required']" required outlined color="red-darken-1" />

        <v-text-field v-model="form.name" label="Full Name"
          :rules="[v => !!v || 'Name is required']" required outlined color="red-darken-1" />

        <v-text-field v-model="form.email" label="Email" type="email"
          :rules="[v => !!v || 'Email is required']" required outlined color="red-darken-1" />

        <v-text-field v-model="form.phone" label="Phone Number"
          :rules="[v => !!v || 'Phone is required']" required outlined color="red-darken-1" />

        <v-text-field v-model="form.date" label="Preferred Appointment Date" type="date" outlined color="red-darken-1" />

        <v-textarea v-model="form.description" label="Brief Case Description"
          :rules="[v => !!v || 'Please describe your case']" rows="4" required outlined color="red-darken-1" />

        <v-btn :disabled="!valid || store.submitting" type="submit" color="red-darken-1" class="mt-4 rounded-lg" block>
          <span v-if="!store.submitting">Submit Booking</span>
          <span v-else>Submitting…</span>
        </v-btn>
      </v-form>

      <!-- show server validation errors -->
      <v-alert v-if="submitErrorMsg" dense type="error" class="mt-4">
        {{ submitErrorMsg }}
      </v-alert>

      <v-snackbar v-model="snack.show" :color="snack.color" top>
        {{ snack.text }}
        <template #actions>
          <v-btn variant="text" @click="snack.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLegalAidStore } from '@/stores/legalAid'

const store = useLegalAidStore()
const valid = ref(false)
const formRef = ref(null)
const snack = ref({ show: false, text: '', color: 'success' })

const form = ref({
  caseType: '',
  name: '',
  email: '',
  phone: '',
  date: '',
  description: ''
})

// computed rights & laws using store getters
const filteredRights = computed(() => store.getRights(form.value.caseType))
const filteredLaws = computed(() => store.getLaws(form.value.caseType))

const submitErrorMsg = computed(() => {
  // convert server error to readable string if present
  const e = store.submitError
  if (!e) return ''
  // if validation errors exist (422)
  if (e.errors) {
    return Object.entries(e.errors).map(([k, v]) => `${k}: ${v.join(', ')}`).join(' — ')
  }
  return e.message || JSON.stringify(e)
})

const onSubmit = async () => {
  // local simple check
  if (!formRef.value) return
  const ok = await formRef.value.validate()
  if (!ok) return

  try {
    await store.submitBooking({
      caseType: form.value.caseType,
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      date: form.value.date,
      // backend expects case_description
      case_description: form.value.description
    })
    snack.value = { show: true, text: 'Booking submitted. We will contact you soon.', color: 'success' }
    form.value = { caseType: '', name: '', email: '', phone: '', date: '', description: '' }
  } catch (err) {
    // store.submitBooking sets store.submitError
    snack.value = { show: true, text: 'Failed to submit booking. See error below.', color: 'error' }
    console.error('submitBooking error', err.response?.data ?? err)
  }
}
</script>

<style scoped>
.hover-elevate:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease;
}
</style>
