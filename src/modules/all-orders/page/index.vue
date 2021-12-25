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
        <Table
            :column="column"
            :data="tableData"
            :pagination="pagination"
            @pageChange="pageChange"
        />
    </PageLayout>
</template>
<script lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import QueryForm from '@/components/QueryForm.vue'
import Table from '@/components/base/Table.vue'
import { formItem, buttons } from '../pageData'
import { reactive, onBeforeMount, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'AllOrders',
    components: { PageLayout, QueryForm, Table },
    setup() {
        const store = useStore()
        const tableData = computed(() => {
            return store.getters['all-orders/orderList']
        })
        const pagination = computed(() => {
            return store.getters['all-orders/pagination']
        })
        const pageChange = (page: number) => {
            console.log('子组件触发', page);
            const params = {
                page
            }
            query(params)
        }
        const handleQuery = (action: string) => {
            console.log('查询', action, formModel);
            query()

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
        const query = (params = {}) => {
            store.dispatch('all-orders/getOrderList', { ...formModel, ...params })
        }
        const formModel = {
            name: ''
        }
        const data = reactive({
            column,
            tableData,
            pagination,
            formModel,
        })
        onBeforeMount(() => {
            query()
        })
        return {
            ...toRefs(data),
            formItem,
            buttons,
            handleQuery,
            pageChange,
            query
        }
    }

}
</script>