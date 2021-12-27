import { defineAsyncComponent } from 'vue'
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
        ctrlComponent: defineAsyncComponent(() => import('@/components/NameSelect.vue'))
    },
    {
        prop: 'creator',
        ctrlComponent: 'ElInput',
        ctrlProps: {
            placeholder: '请输入创建人',
            size: "small"
        }
    },
    {
        prop: 'sqa',
        ctrlComponent: 'ElInput',
        ctrlProps: {
            placeholder: '请输入SQA',
            size: "small"
        }
    },
    {
        prop: 'createTime',
        ctrlComponent: 'ElDatePicker',
        ctrlProps: {
            type: "daterange",
            rangeSeparator: "至",
            size: "small",
            valueFormat: 'YYYY/MM/DD'
        }
    },

]

export {
    buttons,
    formItem
}