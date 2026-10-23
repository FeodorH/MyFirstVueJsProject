import './assets/main.css'

import { createApp } from 'vue'
import App from '@/articles/ArticleApp.vue' //TODO 1

const app = createApp(App)

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import router from '@/articles/router/index.js' //TODO 2

// app.component('BaseInput', BaseInput)
// app.component('BaseButton',BaseButton)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.light-mode', 
        }
    },
    license: import.meta.env.VITE_PRIMEVUE_LICENSE
})

app
.use(router)
.mount('#app')