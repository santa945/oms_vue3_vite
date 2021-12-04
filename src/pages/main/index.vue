<template>
    <div>
        <p>
        main
        </p>
        <el-button type="primary" @click="goToFallback">Primary</el-button>
    </div>
</template>

<script lang="tsx">
import { defineComponent } from "vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default defineComponent({
    name: 'Main',
    setup() {
        const router = useRouter()
        const store = useStore()
        console.log('store.a',store.state['all-orders'])
        console.log('store.b',store.state['order-details'])
        console.log('store.b',store.getters['all-orders/list'])
        console.log('store.b',store.getters['order-details/isRish'])
        const goToFallback = ()=>{
            router.push('/fallback')
        }
        return {
            goToFallback
        }
    }
})
</script>