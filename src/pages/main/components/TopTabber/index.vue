<template>
    <el-tabs
        class="oms-top-tabber"
        v-model="activeItem.name"
        type="card"
        closable
        @tab-remove="removeTab"
    >
        <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
        ></el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
export default {
    name: 'TopTabber',
    setup() {
        let activeItem = reactive({ name: '2' })
        let editableTabs = reactive([
            {
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content',
            },
            {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content',
            },
        ])
        const tabIndex = ref(2)

        const addTab = (targetName) => {
            const newTabName = `${++tabIndex.value}`
            const item = {
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content',
            }
            editableTabs.push(item)
            activeItem = item
        }
        const removeTab = (targetName) => {
            const tabs = editableTabs
            let activeName = activeItem.name
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }

            editableTabs = tabs.filter((tab) => tab.name !== targetName)
        }
        return {
            editableTabs,
            activeItem,
            addTab,
            removeTab
        }
    }
}
</script>
<style lang="scss" scoped>
.oms-top-tabber {
    border-top: 1px solid #efefef;
    padding: 10px 20px 0 20px;
    background: #fff;

    :deep(.el-tabs__header) {
        margin: 0;
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