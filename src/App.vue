<template>
  <el-config-provider :locale="locale">
    <div style="height: 100%;">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      // 获取菜单等数据详情
      store.dispatch('common-data/getUserInfo')
    })

    return {
      locale: zhCn,

    }
  }
}
</script>
