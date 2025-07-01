import './assets/main.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog, Notify } from 'quasar'

import App from './App.vue'
import router from './router'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import 'quasar/src/css/index.sass'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueEasyLightbox)
app.use(Quasar, {
  plugins: { Dialog, Notify },
})

app.mount('#app')
