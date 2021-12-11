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
    console.log('store', store);

    onBeforeMount(() => {
      const user = store.dispatch('common-data/getUserInfo')
      console.log('user', user);

    })

    return {
    }
  }
}
</script>
