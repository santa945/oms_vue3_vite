<template>
    <PageLayout>
        <template #toolbar>
            <QueryForm
                :formModel="formModel"
                :formItem="formItem"
                :buttons="buttons"
                @btnClick="handleQuery"
            />
        </template>
        <Table :column="column" :data="tableData" @handleClick="say" />
    </PageLayout>
</template>
<script lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import QueryForm from '@/components/QueryForm.vue'
import Table from '@/components/base/Table.vue'
import { formItem, buttons } from '../pageData'
import { reactive, toRefs } from 'vue'
export default {
    name: 'AllOrders',
    components: { PageLayout, QueryForm, Table },
    setup() {
        const say = () => {
            console.log('子组件触发');
        }
        const handleQuery = (query: string) => {
            console.log('查询', query, formModel);
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
        const formModel = {
            name: ''
        }
        const data = reactive({
            column,
            tableData,
            formModel
        })
        return {
            ...toRefs(data),
            formItem,
            buttons,
            handleQuery,
            say
        }
    }

}
</script>