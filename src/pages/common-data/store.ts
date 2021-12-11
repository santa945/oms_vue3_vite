import api from './api'

export default {
    name: 'common-data',
    namespaced: true,
    state: {
        user: {},
        menuData: []
    },
    actions: {
        // 获取用户信息
        async getUserInfo({ commit }) {
            const data = await api.getUserInfo()
            console.log('await-data', data);
            const { permission } = data
            commit('SET_USER_INFO', data)
            commit('SET_MENU', permission)
            return data
        },
    },
    mutations: {
        SET_USER_INFO: (state: { [key: string]: any }, payload = {}) => {
            state.user = payload
        },
        SET_MENU: (state: { [key: string]: any }, payload = {}) => {
            state.menuData = payload
        }
    },
    getters: {
        menuData: (state: { [key: string]: any }) => state.menuData,
    }
}