export default {
    name: 'project-mgn',
    namespaced: true,
    state: {
        list: [1, 2, 3, 4, 5]
    },
    mutations: {},
    getters: {
        list: (state: { [key: string]: any; }) => state.list
    }
}