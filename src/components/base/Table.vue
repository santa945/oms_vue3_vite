<template>
    <el-table :data="tableData" style="width: 100%">
        <template v-for="(item,index) in column" :key="index">
            <el-table-column v-bind="item.columnProps" :prop="item.prop" :label="item.label">
                <template
                    #default="scope"
                    v-if="item.type === 'date'"
                >{{ dateFilter(scope.row[item.type]) }}</template>
                <template #default="scope" v-else-if="item.type === 'tag'">
                    <el-tag
                        :type="tagFilter(scope.row[item.type]).type"
                    >{{ tagFilter(scope.row[item.type]).desc }}</el-tag>
                </template>
            </el-table-column>
        </template>
    </el-table>
    <div class="pagination" v-if="pageInfo.total">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            :total="pageInfo.total"
            @current-change="handlePageChange"
        ></el-pagination>
    </div>
</template>

<script lang="ts">
import { ref, computed } from "vue"
import { timestamp2date } from '@/scripts/utils'
export default {
    props: ['column', 'data', 'pagination'],
    emits: ['pageChange'],
    setup(props, context) {
        console.log(props, context);
        const obj: any = {
            '0': {},
            '1': {
                type: 'success',
                desc: '成功'
            },
            '2': {
                type: 'info',
                desc: '优秀'
            },
            '3': {
                type: 'warning',
                desc: '待定'
            },
            '4': {
                type: 'danger',
                desc: '不通过'
            },
        }
        const column = ref(props.column)
        const tableData = computed(() => props.data)
        const pageInfo = computed(() => props.pagination)

        const handlePageChange = (page: number) => {
            console.log(page);
            context.emit('pageChange', page)
        }
        const dateFilter = (date: number) => {
            return timestamp2date(date, 'YYYY-MM-DD hh:mm:ss')
        }
        const tagFilter = (num: number | string) => {
            return obj[num || '0']
        }
        return {
            column,
            tableData,
            pageInfo,
            dateFilter,
            tagFilter,
            handlePageChange
        }
    },
}
</script>
<style lang="scss" scoped>
.pagination {
    overflow: hidden;
    :deep(.el-pagination) {
        float: right;
        margin-top: 10px;
    }
}
</style>