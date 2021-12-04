<template>
    <el-menu
        active-text-color="#589ef8"
        background-color="#202124"
        text-color="#fff"
        default-active="2"
        class="left-menu"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1" @click="goToFallback($event, 'all-orders')">全部订单</el-menu-item>
                <el-menu-item index="1-2" @click="goToFallback($event, 'order-details')">订单详情</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon>
                <icon-menu />
            </el-icon>
            <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon>
                <document />
            </el-icon>
            <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <span>Navigator Four</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="tsx">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'
import {
    Location,
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons'
export default defineComponent({
    name: 'LeftMenu',
    components: {
        Location,
        Document,
        Setting,
        IconMenu
    },
    setup() {
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const router = useRouter()
        const goToFallback = (e, str) => {
            console.log('d', e, str);
            router.push(`/main/${str}`)
        }
        return {
            handleOpen,
            handleClose,
            goToFallback
        }
    },
})
</script>

<style lang="scss" scoped>
.left-menu {
    height: 100%;
}
</style>