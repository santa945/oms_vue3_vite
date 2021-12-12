import { createRouter, createWebHashHistory } from "vue-router";
const files = import.meta.globEager('./../pages/**/routes.ts');

let modules: any[] = [];
for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules = [...modules, ...files[key].default]
    }
}

modules.push(
    {
        path: '/:catchAll(.*)', // 找不到的会自己跳到fallback
        redirect: '/fallback'
    }
)


const routers = createRouter({
    history: createWebHashHistory(),
    routes: [...modules]
})

routers.beforeEach((to, from, next) => {
    next()
})
export default routers