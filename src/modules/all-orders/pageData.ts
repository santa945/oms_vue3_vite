const buttons = [
    {
        id: 1,
        label: '查询',
        action: 'query'
    },
    {
        id: 2,
        label: '重置',
        action: 'reset'
    }
]
const formItem = [
    {
        prop: 'name',
        Component: () => import('@/components/NameSelect.vue')
    }
]

export {
    buttons,
    formItem
}