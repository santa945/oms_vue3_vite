<template>
  <el-button
    type="primary"
    size="small"
    @click="createDialog"
  >创建</el-button>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { DialogFactory } from "@/scripts/DialogFactory"
import OrderTimePickerDialog from "@/components/OrderTimePickerDialog.vue"

const createDialog = () => {
  DialogFactory.createDialog(OrderTimePickerDialog, {
    propsData: {
      selected: [1, 2, 3, 4, 5],
    },
    onConfirm: (data) => {
      console.log("传出来的值", data)
    },
  })
}
</script>