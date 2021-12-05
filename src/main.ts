import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import './index.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app');

console.log('router', router);
console.log('store', store);
console.log('实例', app);
