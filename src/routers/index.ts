import { createRouter, createWebHashHistory } from "vue-router";
const files = import.meta.globEager('./../pages/**/routes.ts')
console.log('file-page', files);

let modules: any[] = [];

for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules = [...modules, ...files[key].default]
    }
}



const routers = createRouter({
    history: createWebHashHistory(),
    routes: [...modules]
})

routers.beforeEach((to, from, next) => {
    console.log('from', from);
    next()
})
export default routers