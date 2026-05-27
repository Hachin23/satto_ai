import { createApp } from 'vue'
import App from '../App.vue'
import router from '../src/router'
import { createPinia } from 'pinia' 
import '../assets/css/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')