import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
        vue()
    ]
})