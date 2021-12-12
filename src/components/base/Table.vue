<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
    <el-button @click="aaa"></el-button>
</template>

<script lang="ts">
import { reactive, ref } from "vue"
export default {
    props: ['column', 'data'],
    emits: ['handleClick'],
    setup(props, context) {
        console.log(props, context);

        const tableData = ref(props.data)
        const aaa = () => {
            context.emit('handleClick')
        }
        return {
            tableData,
            aaa
        }
    },
}
</script>