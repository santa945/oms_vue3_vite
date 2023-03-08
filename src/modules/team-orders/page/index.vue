<template>
  <div>team-orders</div>
  <DatePicker
    v-model="selectDate"
    :disabled="false"
  />
  <div>
    <p
      v-for="i in selectDate"
      :key="i"
    >{{i}}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import DatePicker from "@/components/base/DatePicker.vue"

const selectDate = ref(["2023/03/16"])
</script>