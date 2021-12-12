<template>
    <PageLayout>
        <template v-slot:toolbar>
            <p>我就是具名插槽啦</p>
            <el-button @click="search">查询</el-button>
            <el-button>重置</el-button>
        </template>
        <Table column="xxx" :data="data.tableData" @handleClick="say" />
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
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }
        ]
        const data = reactive({
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