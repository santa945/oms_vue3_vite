import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'
export default defineConfig({
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
    resolve: {
        alias: {
            '/@/': resolve(__dirname, 'src'),
        }
    },
    plugins: [
        vue(),
        // 按需倒入element-plus组件
        ViteComponents({
            customComponentResolvers: [ElementPlusResolver()]
        }),
        // 按需倒入element-plus样式
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: name => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    }
                }
            ]
        })
    ]
})