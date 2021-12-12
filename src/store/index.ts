import { createStore } from 'vuex';
const storefiles = import.meta.globEager('./../**/store.ts')

const modules = {}
for (const key in storefiles) {
    // 注意每个模块的文件必须有name属性
    const item = storefiles[key].default
    modules[item.name] = item
}

const store = createStore({
    state: () => ({ name: 2 }),
    getters: {
        k: (state) => state.name
    },
    modules
})

export default store