import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Core App and Routing
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// AOS (Animate On Scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

// Create and configure Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create the app
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

// Mount the app
app.mount('#app')

// Initialize AOS after mount
AOS.init()
