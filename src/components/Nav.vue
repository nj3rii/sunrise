<template>
  <v-card>
    <!-- Sidebar Navigation Drawer -->
    <v-navigation-drawer expand-on-hover permanent rail>
      <!-- App Logo and Home -->
      <v-list>
        <v-list-item
          prepend-avatar="public/images/Orange Yellow icon Badge Home Decor Logo.png"
          subtitle="legalNet"
          title="Dashboard"
          to="/"
          router
        />
      </v-list>

      <v-divider />

      <!-- Navigation Links -->
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-check"
          title="Legal Aid"
          to="/legalAid"
          router
        />
        <v-list-item
          prepend-icon="mdi-briefcase-search"
          title="Job Listings"
          to="/jobs"
          router
        />
        <v-list-item
          prepend-icon="mdi-handshake"
          title="Partners"
          to="/partners"
          router
        />
        <v-list-item
          prepend-icon="mdi-account-cog"
          title="Admin Panel"
          to="/admin"
          router
        />
        <v-list-item
          prepend-icon="mdi-account"
          title="User Profile"
          to="/user"
          router
        />
        <v-list-item
          prepend-icon="mdi-user-cog"
          title="Sign Up"
          to="/signup"
          router
        />

        <!-- Logout item: use @click to call logout() -->
        <v-list-item
          :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
          :title="isAuthenticated ? 'Logout' : 'Login'"
          @click="handleAuthAction"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import TokenService from "@/services/token.service";
import { useRouter } from 'vue-router';

const isAuthenticated = ref(TokenService.isAuthenticated());
const router = useRouter()

function handleAuthAction() {
  if (isAuthenticated.value) {
    logout();
  } else {
    login();
  }
}

function login() {
  console.log("Redirecting to login...");  
  router.push("/login");
}

function logout() {
  console.log("Logging out...");
  TokenService.removeToken();
  isAuthenticated.value = false;
}
</script>

<style scoped>
.logout-item {
  cursor: pointer;
}
</style>
