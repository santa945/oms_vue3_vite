<template>
    <div class="query-form">
        <el-form ref="form" inline :model="formModel">
            <template v-for="item in formItem" :key="item.prop">
                <el-form-item>
                    <component
                        :is="item.ctrlComponent"
                        v-model="formModel[item.prop]"
                        v-bind="item.ctrlProps"
                    />
                </el-form-item>
            </template>
            <el-form-item v-for="i in buttons" :key="i.id">
                <el-button type="primary" size="small" @click="handleEmit(i.action)">{{ i.label }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { computed } from 'vue'
import NameSelect from './NameSelect.vue';
export default {
    name: "QueryForm",
    props: ["formModel", "formItem", "buttons"],
    setup(props: any, context: any) {
        console.log(context, 111);
        const formModel = computed(() => props.formModel);
        const formItem = computed(() => props.formItem);
        const buttons = computed(() => props.buttons);
        const handleEmit = (type: string) => {
            console.log("handleEmit", type);
            context.emit("btnClick", type)
        };
        const comp = () => import("@/components/Test.vue");
        return {
            formModel,
            formItem,
            buttons,
            handleEmit,
            comp
        };
    },
    components: { NameSelect }
}
</script>
<style lang="scss" scoped>
.query-form {
    :deep(.el-form-item) {
        margin-bottom: 10px;
    }
    :deep(.el-input) {
        width: 200px;
    }
}
</style>