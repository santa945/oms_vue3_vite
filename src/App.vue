<template>
  <div style="height: 100%;">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      // 获取菜单等数据详情
      store.dispatch('common-data/getUserInfo')
    })

    return {
    }
  }
}
</script>
