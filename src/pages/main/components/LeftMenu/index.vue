<template>
    <el-menu
        active-text-color="#589ef8"
        background-color="#202124"
        text-color="#fff"
        default-active="2"
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
                    @click="goToPage($event, i.catalogUrl)"
                >{{ i.catalogName }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item
                v-else
                :index="item.catalogCode"
                @click="goToPage($event, item.catalogUrl)"
            >{{ item.catalogName }}</el-menu-item>
        </template>
    </el-menu>
</template>
<script lang="tsx">
import { defineComponent, reactive } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'LeftMenu',
    components: {},
    setup() {
        const router = useRouter()
        const store = useStore()
        const menu = store.getters['auth/menuData']
        let menuData = reactive(menu)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const goToPage = (_, path) => {
            router.push(path)
        }
        return {
            menuData,
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
}
</style>