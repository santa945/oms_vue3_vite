export default {
    name: 'auth',
    namespaced: true,
    state: {
        menuData: [
            {
                catalogName: '非商店订单',
                icon: 'location',
                catalogCode: 'brand-orders',
                children: [
                    {
                        catalogName: '所有订单',
                        icon: null,
                        catalogCode: 'all-orders',
                        catalogUrl: '/main/all-orders',
                    },
                    {
                        catalogName: '小组订单',
                        icon: null,
                        catalogCode: 'team-orders',
                        catalogUrl: '/main/team-orders',
                    },
                    {
                        catalogName: '我的代办',
                        icon: null,
                        catalogCode: 'my-pending-orders',
                        catalogUrl: '/main/my-pending-orders',
                    }
                ]
            }
        ]
    },
    getters: {
        menuData: (state: { [key: string]: any }) => state.menuData
    },
    mutations: {},
}