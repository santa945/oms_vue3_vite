<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <el-button type="primary">Primary</el-button>
</template>

<script lang="tsx">
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const aaa = useRouter()
    console.log('aa',aaa);
  }
}
</script>
