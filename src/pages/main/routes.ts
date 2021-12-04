export default [
    {
        path: '/',
        redirect: { name: 'main' }
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('./index.vue'),
        meta: {
            permission: true
        },
    },
]