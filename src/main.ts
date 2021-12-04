import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import './index.scss'

const app = createApp(App)
app.use(router)
app.mount('#app');

console.log('实例', app);
