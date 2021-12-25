<template>
  <div class="toolbar">
    <slot name="toolbar"></slot>
  </div>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  setup() {

    return {

    }
  },
}
</script>
<style lang="scss" scoped>
.toolbar {
  text-align: left;
  padding: 10px;
  background: #eef1f5;
}
</style>