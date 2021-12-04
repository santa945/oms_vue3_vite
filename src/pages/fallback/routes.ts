export default [
    {
        path: '/fallback',
        component: () => import('./index.vue'),
        meta: {
            permission: false,
        },
    },
]