<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Nav.vue'
</script>

<template>
  <v-app>
    <NavBar />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

