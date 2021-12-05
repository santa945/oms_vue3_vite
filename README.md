# oms_vue3_vite
使用vue3+vite+ts开发的OMS下单系统

## 技术问题
### vite.config.ts
* 出现import { defineConfig } from 'vite' 结构不出来？
  * 原因：vite版本1.0.0-rc.13 太低，使用`npm i -D vite@latest`安装最新的vite

* path模块都找不到？
  * 原因：需要安装`@type/node`

* types的文件中，声明vue模块都会找不到vue？
  * 3.0版本太低，需要升级到3.2版本

## 报错

#### 按需引入的问题

```bash
[ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './package.json' is not defined by "exports" in /**/node_modules/element-plus/package.json

at __require (/Users/**/node_modules/vite-plugin-components/dist/index.js:27:12)
at getPkgVersion (/Users/**/node_modules/vite-plugin-components/dist/index.js:634:12)
```
* 解决方式：
  * 使用手动按需引入的方法代替自动按需引入的方法，不要装`unplugin-vue-components`和`unplugin-auto-import`
  * 安装`unplugin-element-plus`, 在`vite.config.ts`中配置Plugin。
  * 全局引入比手动按需引入多800k左右，手动按需引入比自动按需引入多3k而已