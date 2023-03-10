import { createApp } from 'vue'
import { myStore } from './store/store.js'
import App from './App.vue'
import router from './router'

import './assets/style/main.scss'

const app = createApp(App)

app.use(router)
app.use(myStore)

app.mount('#app')
