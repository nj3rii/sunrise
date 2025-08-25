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
      <v-form v-model="valid" @submit.prevent="submitBooking">
        <v-select v-model="form.caseType" :items="caseTypes" label="Case Type"
          :rules="[v => !!v || 'Case type is required']" required outlined color="red-darken-1"></v-select>

        <v-text-field v-model="form.name" label="Full Name"
          :rules="[v => !!v || 'Name is required']" required outlined color="red-darken-1"></v-text-field>

        <v-text-field v-model="form.email" label="Email" type="email"
          :rules="[v => !!v || 'Email is required']" required outlined color="red-darken-1"></v-text-field>

        <v-text-field v-model="form.phone" label="Phone Number"
          :rules="[v => !!v || 'Phone is required']" required outlined color="red-darken-1"></v-text-field>

        <v-text-field v-model="form.date" label="Preferred Appointment Date" type="date" outlined color="red-darken-1"></v-text-field>

        <v-textarea v-model="form.description" label="Brief Case Description"
          :rules="[v => !!v || 'Please describe your case']" rows="4" required outlined color="red-darken-1"></v-textarea>

        <v-btn :disabled="!valid" type="submit" color="red-darken-1" class="mt-4 rounded-lg" block>
          Submit Booking
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      caseTypes: [
        'Criminal Law',
        'Family Law',
        'Civil Litigation',
        'Employment Law',
        'Property Law',
        'Other'
      ],
      rightsData: {
        'Criminal Law': [
          { title: 'Right to Legal Representation', content: 'You have the right to a lawyer during questioning and trial.' },
          { title: 'Right to Remain Silent', content: 'You cannot be forced to incriminate yourself.' }
        ],
        'Family Law': [
          { title: 'Right to Custody Hearing', content: 'Both parents have the right to a fair custody hearing.' },
          { title: 'Right to Maintenance', content: 'Spouses may be entitled to financial support during separation.' }
        ],
        'Employment Law': [
          { title: 'Right to Fair Wages', content: 'You must be paid at least the legal minimum wage.' },
          { title: 'Right to Safe Workplace', content: 'Employers must provide safe working conditions.' }
        ]
      },
      lawsData: {
        'Criminal Law': [
          { title: 'Understanding Criminal Charges', description: 'What to know about criminal procedures and penalties.', link: 'https://example.com/criminal-law' }
        ],
        'Family Law': [
          { title: 'Divorce Process', description: 'Learn the legal steps for ending a marriage.', link: 'https://example.com/family-law' }
        ],
        'Employment Law': [
          { title: 'Employee Rights', description: 'Know your rights at work and how to claim them.', link: 'https://example.com/employment-law' }
        ]
      },
      form: {
        caseType: '',
        name: '',
        email: '',
        phone: '',
        date: '',
        description: ''
      }
    }
  },
  computed: {
    filteredRights() {
      return this.rightsData[this.form.caseType] || []
    },
    filteredLaws() {
      return this.lawsData[this.form.caseType] || []
    }
  },
  methods: {
    submitBooking() {
      console.log('Booking Request:', this.form)
      alert('Your booking request has been submitted. We will contact you soon.')
      this.form = { caseType: '', name: '', email: '', phone: '', date: '', description: '' }
    }
  }
}
</script>

<style scoped>
.hover-elevate:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease;
}
</style>
