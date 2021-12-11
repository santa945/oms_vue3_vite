import api from './api'

export default {
    name: 'common-data',
    namespaced: true,
    state: {
        user: {},
        menuData: [],
        acitveBar: [],
        acitveItem: {}
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
        },
        REMOVE_TOP_BAR_ITEM: (state: { [key: string]: any }, payload = '') => {
            const fn = (item) => {
                return item.catalogCode === payload
            }
            const index = state.acitveBar.findIndex(fn)
            state.acitveBar.splice(index, 1)
            // 如果删除的是当前activeItem,则跳转到第一个
            if (state.acitveItem.catalogCode === payload) {
                Object.assign(state.acitveItem, state.acitveBar[0])
            }
            // 如果删除的是其他item，则不跳转

        },
        SET_ACTIVE_ITEM: (state: { [key: string]: any }, payload = {}) => {
            const item = state.acitveBar.find(i => i.catalogCode === payload.catalogCode)
            if (!item) {
                state.acitveBar.push(payload)
            }
            Object.assign(state.acitveItem, { ...payload })
        }
    },
    getters: {
        menuData: (state: { [key: string]: any }) => state.menuData,
        acitveBar: (state: { [key: string]: any }) => state.acitveBar,
        acitveItem: (state: { [key: string]: any }) => state.acitveItem,
    }
}