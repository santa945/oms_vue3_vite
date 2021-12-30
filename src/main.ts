import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import './index.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App)
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}


app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(store)
app.mount('#app');

console.log('router', router);
console.log('环境变量', import.meta.env.VITE_MODE);
console.log('store', store);
console.log('实例', app);
