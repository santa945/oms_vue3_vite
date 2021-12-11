<template>
    <el-tabs
        class="oms-top-tabber"
        v-model="myData.activeItem.catalogCode"
        type="card"
        closable
        @tab-click="clickTab"
        @tab-remove="removeTab"
    >
        <el-tab-pane
            v-for="item in myData.menu"
            :key="item.catalogCode"
            :label="item.catalogName"
            :name="item.catalogCode"
        ></el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name: 'Topbar',
    setup() {
        const store = useStore()
        const router = useRouter()
        const menu = store.getters['common-data/acitveBar']
        const activeItem = store.getters['common-data/acitveItem']
        let myData = reactive({
            menu,
            activeItem
        })
        const tabIndex = ref(2)

        const addTab = (targetName) => {
            const newTabName = `${++tabIndex.value}`
            const item = {
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content',
            }
            myData.menu.push(item)
            myData.activeItem = item
        }
        const clickTab = (tab) => {
            console.log(tab.props.name);
            const name = tab.props.name
            // 设置当前路由信息
            const item = myData.menu.find(i => i.catalogCode === name)
            store.commit('common-data/SET_ACTIVE_ITEM', item)
            router.push({ name })

        }
        const removeTab = (targetName) => {
            const tabs = myData.menu
            if (tabs.length === 1) return;
            let activeName = myData.activeItem.catalogCode
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.catalogCode === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.catalogCode
                        }
                    }
                })
            }
            store.commit('common-data/REMOVE_TOP_BAR_ITEM', targetName)
        }
        return {
            myData,
            addTab,
            clickTab,
            removeTab,
        }
    }
}
</script>
<style lang="scss" scoped>
.oms-top-tabber {
    border-top: 1px solid #efefef;
    padding: 10px 20px 0 20px;
    background: #fff;
    height: 40px;

    :deep(.el-tabs__header) {
        margin: 0;
        border: 0;
    }
    :deep(.el-tabs__nav-wrap) {
        background: #fff;
    }
    :deep(.el-tabs__nav) {
        border: 0;
        .el-tabs__item {
            border: 0;
        }
        .el-tabs__item:hover {
            color: #303133;
        }
        .el-tabs__item.is-active {
            background: #eef1f5;
            color: #303133;
        }
    }
}
</style>