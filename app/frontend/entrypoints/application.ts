import { createApp } from 'vue'
import App from '../App.vue'
import router from '../src/router'
import { createPinia } from 'pinia'
import VConsole from 'vconsole'
import '../assets/css/main.css'

const params = new URLSearchParams(window.location.search)
if (params.get('debug') === 'true' && /iPhone/i.test(navigator.userAgent)) {
  new VConsole()
}

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')