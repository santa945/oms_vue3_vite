<template>
    <el-container style="height: 100%;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
            <TopTabber />
            <el-main>
                <div class="main">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="tsx">
import { defineComponent } from "vue";
import LeftMenu from './components/LeftMenu/index.vue'
import TopTabber from './components/TopTabber/index.vue'
export default defineComponent({
    name: 'Main',
    components: {
        LeftMenu,
        TopTabber
    },
    setup() {
        return {

        }
    }
})
</script>
<style lang="scss" scoped>
.logo {
    height: 60px;
    font-weight: bold;
    font-size: 40px;
    background: #202124;
    color: #fff;
    margin-right: 1px;
}

.main {
    padding: 20px;
    background: #fff;
    min-height: calc(100% - 40px);
}
</style>