<!-- LogIn.vue -->
<template>
  <v-card class="mx-auto" max-width="344" title="User Login">
    <v-container>
      <v-text-field v-model="email" color="primary" label="Email" variant="underlined" />
      <v-text-field v-model="password" color="primary" label="Password" type="password" variant="underlined" />
      <!-- <v-checkbox v-model="terms" color="secondary" label="I agree to site terms and conditions" /> -->
    </v-container>

    <v-divider />

    <v-card-actions>
      <v-spacer />
      <v-btn color="success" @click="completeLogin">
        Complete Login
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../services/auth.service'

const { login } = useAuth()

const first = ref('')
const last = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)

const router = useRouter()
const route = useRoute()

async function completeLogin() {
  // basic client-side check
  if (!email.value || !password.value) {
    return alert('Please enter email and password')
  }
  
  try {
    await login({
      email: email.value,
      password: password.value
    })
   
    // Redirect after successful login
    router.push('/welcome')
  } catch (err) {
    // Error is already handled by the auth service
    console.error('Login failed', err)
  }
}
</script>
