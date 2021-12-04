export default {
    name: 'order-details',
    namespaced: true,
    state: {
        isRish: true
    },
    mutations: {},
    getters: {
        isRish: (state: { [key: string]: any; }) => state.isRish
    }
}