export default [
    {
        name: 'fallback',
        path: '/fallback',
        component: () => import('./index.vue'),
        meta: {
            permission: false,
        },
    },
]