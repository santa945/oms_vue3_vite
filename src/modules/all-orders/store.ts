import api from "./api"

export default {
    name: 'all-orders',
    namespaced: true,
    state: {
        orderList: [],
        pagination: {}
    },
    actions: {
        async getOrderList({ commit }, payload) {
            console.log('payload', payload);
            const res = await api.getOrderList(payload)
            const { data, pagination } = res;
            commit('SET_ORDER_LIST', data.map(i => ({ ...i, name: payload.name || 'default' })))
            commit('SET_PAGINATION', { ...pagination, page: payload.page || 1 })
        }
    },
    mutations: {
        SET_ORDER_LIST: (state: { [key: string]: any }, payload = []) => {
            state.orderList = payload

        },
        SET_PAGINATION: (state: { [key: string]: any }, payload = {}) => {
            state.pagination = payload
        },
    },
    getters: {
        orderList: (state: { [key: string]: any; }) => state.orderList,
        pagination: (state: { [key: string]: any; }) => state.pagination
    }
}