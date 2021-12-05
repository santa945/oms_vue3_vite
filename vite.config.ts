import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default (({ mode }) => {
    console.log('环境变量', mode);
    console.log('环境变量里的文件对象', loadEnv(mode, process.cwd()));

    return defineConfig({
        server: {
            open: true,
            host: '127.0.0.1',
            port: 2021,
            proxy: {
                '/api': {
                    target: '127.0.0.1:3434',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            }
        },
        build: {
            sourcemap: loadEnv(mode, process.cwd()).VITE_MODE !== 'prod' // 生产环境不要源码文件
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            }
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ]
    })
})
