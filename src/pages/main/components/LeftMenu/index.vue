<template>
    <el-menu
        active-text-color="#589ef8"
        background-color="#202124"
        text-color="#fff"
        :default-active="activeMenuItem.catalogCode"
        unique-opened
        class="left-menu"
        @open="handleOpen"
        @close="handleClose"
    >
        <template v-for="item in menuData" :key="item.catalogCode">
            <el-sub-menu v-if="item.children" :index="item.catalogCode">
                <template #title>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.catalogName }}</span>
                </template>
                <el-menu-item
                    v-for="i in item.children"
                    :key="i.catalogCode"
                    :index="i.catalogCode"
                    @click="goToPage($event, i)"
                >{{ i.catalogName }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item
                v-else
                :index="item.catalogCode"
                @click="goToPage($event, item)"
            >{{ item.catalogName }}</el-menu-item>
        </template>
    </el-menu>
</template>
<script lang="tsx">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'LeftMenu',
    components: {},
    setup() {
        const router = useRouter()
        const store = useStore()
        const menu = store.getters['common-data/menuData']
        const acitveItem = store.getters['common-data/acitveItem']
        const activeMenuItem = ref(acitveItem)
        let menuData = reactive(menu)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const goToPage = (_, item) => {
            const { catalogCode } = item
            // 设置头部快捷导航
            store.commit('common-data/SET_ACTIVE_ITEM', item)
            // 跳转到对应路由
            router.push({ name: catalogCode })
        }
        return {
            menuData,
            activeMenuItem,
            handleOpen,
            handleClose,
            goToPage
        }
    },
})
</script>

<style lang="scss" scoped>
.left-menu {
    height: 100%;
    border: 0;
}
</style>