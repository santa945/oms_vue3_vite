<template>
    <div>project-mgn</div>
    <p>{{ num }}</p>
</template>
<script lang="tsx">
import { ref } from 'vue'
export default {
    name: 'ProjectMgn',
    setup() {
        const say = () => {
            console.log(124);
        }
        const num = ref(123)
        return {
            num,
            say
        }
    }

}
</script>