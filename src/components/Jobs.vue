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
        :items="jobs"
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
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Job Title', value: 'name' },
  { title: 'Company', value: 'company' },
  { title: 'Location', value: 'location' },
  { title: 'Type', value: 'type' },
  { title: ' duration'},
  { title: 'Action', value: 'actions', sortable: false }
]

const jobs = [
  {
    id: 1,
    name: 'Cleaner',
    company: 'Cleanco',
    location: 'Nairobi',
    type: 'Full-time'
  },
  {
    id: 2,
    name: 'Kitchen Assistant',
    company: 'Hope Kitchens',
    location: 'Nairobi',
    type: 'Part-time'
  },
  {
    id: 3,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 4,
    name: 'Hairdresser',
    company: 'Bestlady Hair Salon',
    location: 'buruburu',
    type: 'Short Contract'
  },

  {
    id: 5,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 6,
    name: 'Supervisor',
    company: 'Building and Constructions agency',
    location: 'Ruai',
    type: 'Short Contract'
  },


  {
    id:7,
    name: 'Driver',
    company: '',
    location: '',
    type: ''
  },

  {
    id: 8,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 8,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 8,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 8,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  },

  {
    id: 8,
    name: 'Manager',
    company: 'Bidco',
    location: 'Mombasa',
    type: 'Short Contract'
  }
]
</script>
