import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

export default (({ mode }) => {
    console.log('环境变量里的文件对象', loadEnv(mode, process.cwd()));
    return defineConfig({
        server: {
            open: true,
            host: '127.0.0.1',
            port: 2023,
            proxy: {
                '/api': {
                    target: '127.0.0.1:3434',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            }
        },
        build: {
            sourcemap: loadEnv(mode, process.cwd()).VITE_MODE !== 'prod',// 生产环境不要源码文件
            assetsDir: 'static/',
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: (assetInfo) => {
                        const fileName = assetInfo.name
                        //获取最后一个.的位置
                        var index = fileName.lastIndexOf(".");
                        //获取后缀
                        var ext = fileName.substr(index + 1);
                        var reg = /(png|jpg|gif|jpeg|webp)$/;
                        if (ext.toLowerCase() === 'css') {
                            return 'css/[name]-[hash].[ext]'
                        } else if (reg.test(ext.toLowerCase())) {
                            return 'images/[name]-[hash].[ext]'
                        } else {
                            return 'static/[ext]/[name]-[hash].[ext]'
                        }
                    }
                },
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            }
        },
        plugins: [
            vue(),
            ElementPlus()
        ]
    })
})
