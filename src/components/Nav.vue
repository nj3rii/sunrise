<template>
  <v-card>
      <!-- Sidebar Navigation Drawer -->
      <v-navigation-drawer
        expand-on-hover
        permanent
        rail
      >
        <!-- App Logo and Home -->
        <v-list>ccc
          <v-list-item
            prepend-avatar="public/images/Orange Yellow icon Badge Home Decor Logo.png"
            subtitle="legalNet"
            title="Dashboard"
            to="/"
            router
          />
        </v-list>

        <v-divider></v-divider>

        <!-- Navigation Links -->
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-check"
            title="Ex-Convict Support"
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
            title="user profile"
            to="/user"
            router
          />

        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
  </v-card>
</template>
