const files = import.meta.globEager('./../../modules/**/routes.ts')
console.log('file-children', files);

let children: any[] = [];
for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        children = [...children, ...files[key].default]
    }
}

export default [
    {
        path: '/',
        redirect: { name: 'main' }
    },
    {
        name: 'main',
        path: '/main',
        component: () => import('./index.vue'),
        children,
        meta: {
            permission: true
        },
    },
]