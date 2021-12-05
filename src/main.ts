import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import './index.scss'
import Comp from './plugin/element-comp'

const app = createApp(App)
for (let key in Comp) {
    app.component(key, Comp[key])
}
app.use(router)
app.use(store)
app.mount('#app');

console.log('router', router);
console.log('环境变量', import.meta.env.VITE_MODE);
console.log('store', store);
console.log('实例', app);
