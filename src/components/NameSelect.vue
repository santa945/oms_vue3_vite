<template>
    <el-select v-model="value" size="small" placeholder="Select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    name: 'NameSelect',
    setup() {
        return {
            options: ref([
                {
                    value: 'Option1',
                    label: 'Option1',
                },
                {
                    value: 'Option2',
                    label: 'Option2',
                },
                {
                    value: 'Option3',
                    label: 'Option3',
                },
                {
                    value: 'Option4',
                    label: 'Option4',
                },
                {
                    value: 'Option5',
                    label: 'Option5',
                },
            ]),
            value: ref(''),
        }
    },
}
</script>