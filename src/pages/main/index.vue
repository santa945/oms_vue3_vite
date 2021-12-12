<template>
    <el-container style="height: 100%;">
        <el-aside width="200px" style="background-color: #202124">
            <div class="logo">
                <img src="@/assets/logo.png" alt="logo" />
            </div>
            <LeftMenu />
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <el-icon style="margin-right: 15px">
                        <setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>View</el-dropdown-item>
                            <el-dropdown-item>Add</el-dropdown-item>
                            <el-dropdown-item>Delete</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span>Tom</span>
            </el-header>
            <Topbar />
            <el-main>
                <div class="main">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="tsx">
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import LeftMenu from './components/LeftMenu/index.vue'
import Topbar from './components/Topbar/index.vue'
export default defineComponent({
    name: 'Main',
    components: {
        LeftMenu,
        Topbar
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const flattenMenu = store.getters['common-data/flattenMenu']
        const path = route.path
        onBeforeMount(() => {
            let item
            // 如果当前路由是main,重定向到第一个路由
            if (path === '/main') {
                item = flattenMenu.find(i => i.catalogUrl)
            } else {
                item = flattenMenu.find(i => i.catalogUrl === path)
            }
            store.commit('common-data/SET_ACTIVE_ITEM', item)
            router.push({ name: item.catalogCode })
        })
        return {

        }
    }
})
</script>
<style lang="scss" scoped>
.logo {
    height: 60px;
}

.main {
    padding: 20px;
    background: #fff;
    min-height: calc(100% - 40px);
}
</style>