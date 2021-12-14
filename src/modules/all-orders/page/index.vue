<template>
    <PageLayout>
        <template #toolbar>
            <p>我就是具名插槽啦</p>
            <el-button @click="search">查询</el-button>
            <el-button>重置</el-button>
        </template>
        <Table :column="data.column" :data="data.tableData" @handleClick="say" />
    </PageLayout>
</template>
<script lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import Table from '@/components/base/Table.vue'
import { reactive } from 'vue'
export default {
    name: 'AllOrders',
    components: { PageLayout, Table },
    setup() {
        const say = () => {
            console.log('子组件触发');
        }
        const search = () => {
            console.log('查询');
        }
        const column = [
            {
                prop: 'name',
                label: '名称',
                columnProps: {
                    width: 150
                }
            },
            {
                prop: 'tag',
                label: '状态',
                type: 'tag',
                columnProps: {
                    width: 180
                }
            },
            {
                prop: 'date',
                label: '日期',
                type: 'date',
                columnProps: {
                    width: 180
                }
            },
            {
                prop: 'address',
                label: '地址',
            }
        ]
        const tableData = [
            {
                date: 1639503096067,
                name: 'Tom',
                tag: '1',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: 1639503096067,
                name: 'Tom',
                tag: '2',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: 1631399990000,
                name: 'Tom',
                tag: '3',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: 1639503096067,
                name: 'Tom',
                tag: '4',
                address: 'No. 189, Grove St, Los Angeles',
            }
        ]
        const data = reactive({
            column,
            tableData
        })
        return {
            data,
            search,
            say
        }
    }

}
</script>