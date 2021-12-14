import api from './api'
import { flatten } from '@/scripts/utils'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/routers'
export default {
    name: 'common-data',
    namespaced: true,
    state: {
        user: {},
        menuData: [],
        flattenMenu: [],
        acitveBar: [],
        acitveItem: {}
    },
    actions: {
        // 获取用户信息
        async getUserInfo({ commit }) {
            const data = await api.getUserInfo()
            console.log('await-data', data);
            const { permission } = data
            const flattenMenu = flatten(cloneDeep(permission))
            commit('SET_USER_INFO', data)
            commit('SET_MENU', permission)
            commit('SET_FLAT_MENU', flattenMenu)
            return data
        },
    },
    mutations: {
        SET_USER_INFO: (state: { [key: string]: any }, payload = {}) => {
            state.user = payload
        },
        SET_MENU: (state: { [key: string]: any }, payload = []) => {
            state.menuData = payload
        },
        SET_FLAT_MENU: (state: { [key: string]: any }, payload = []) => {
            state.flattenMenu = payload
        },
        REMOVE_TOP_BAR_ITEM: (state: { [key: string]: any }, payload = '') => {
            const fn = (item) => {
                return item.catalogCode === payload
            }
            const index = state.acitveBar.findIndex(fn)
            const item = state.acitveBar[index - 1] || state.acitveBar[index + 1]
            state.acitveBar.splice(index, 1)
            // 如果删除的是当前activeItem,则跳转到相邻那个tab
            if (state.acitveItem.catalogCode === payload) {
                Object.assign(state.acitveItem, item)
                router.push(item.catalogUrl)
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
        user: (state: { [key: string]: any }) => state.user,
        menuData: (state: { [key: string]: any }) => state.menuData,
        flattenMenu: (state: { [key: string]: any }) => state.flattenMenu,
        acitveBar: (state: { [key: string]: any }) => state.acitveBar,
        acitveItem: (state: { [key: string]: any }) => state.acitveItem,
    }
}