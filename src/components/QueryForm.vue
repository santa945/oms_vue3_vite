<template>
    <div>
        <!-- <template v-for="item in formItem" :key="item.prop">{{ item.prop }}</template> -->
        <NameSelect style="margin-right:10px;" v-model="formModel.name" />
        <el-button
            type="primary"
            size="small"
            v-for="i in buttons"
            :key="i.id"
            @click="handleEmit(i.action)"
        >{{ i.label }}</el-button>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import NameSelect from './NameSelect.vue';
export default {
    name: "QueryForm",
    props: ["formModel", "formItem", "buttons"],
    setup(props: any, context: any) {
        console.log(context, 111);

        const formModel = ref(props.formModel);
        const formItem = ref(props.formItem);
        const buttons = ref(props.buttons);
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