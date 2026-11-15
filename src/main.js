import './assets/main.css'

import { createApp } from 'vue'
import App from '@/articles/ArticleApp.vue' //REPLACE 1

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import router from '@/articles/router/index.js' //REPLACE 2

import { createPinia } from 'pinia'
import { useArticleStore } from './articles/stores/articleStore'

const app = createApp(App)
const pinia = createPinia()

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
.use(pinia)

const articleStore = useArticleStore(pinia)

articleStore.loadArticles()

app
.mount('#app')