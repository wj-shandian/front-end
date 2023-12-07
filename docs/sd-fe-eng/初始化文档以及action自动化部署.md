# 前端工程化规范 一

## 项目初始化

我们使用的lerna+pnpm来管理多包工具

创建文件夹，例如sd-fe-eng，然后使用 [lerna](https://www.lernajs.cn/) 来初始化项目, 初始化命令如下

```js
lerna init
```

执行后会生成一些文件夹，文件暂时先不用管，后续使用会再详细说明
根目录创建文件 `pnpm-workspace.yaml`, 输入一下内容

```js
packages:
  - 'packages/*'
```

初始化完成 接下来我们开始 `vuepress` 文档的初始化

## vuePress 初始化

可以参考官网 [VuePress](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85)

也可以参考以下步骤
首先使用 pnpm 安装相关插件

- 安装插件

```js
pnpm add -D vuepress@next @vuepress/client@next vue -w
// -w 意思是在根目录安装 因为我们是一个lerna 管理的多包项目
```

- 在package.json中添加脚本。

```js
    {
        "scripts": {
            "docs:dev": "vuepress dev docs",
            "docs:build": "vuepress build docs"
        }
    }
```

- 将默认的临时目录和缓存目录添加到 .gitignore 文件中。

    ```js
        echo 'node_modules' >> .gitignore
        echo '.temp' >> .gitignore
        echo '.cache' >> .gitignore
    ```

- 创建文件夹 docs
然后在 docs文件夹中创建文件夹 `.vuepress`,再创建一个 `index.md` 文件 输入以下内容 测试使用

```md
---
home: true
# heroImage: img/logo.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

在`.vuepress`文件夹中创建public文件夹用来放置一些公共资源例如 logo, 然后再在`.vuepress`文件夹中创建 `config.js`配置文件，以下内容作为参考。

```js
import { defaultTheme } from 'vuepress'


export default {
  lang: 'zh-CN',
  title: '前端规范工程化',
  description: '这是我的第一个 VuePress 站点',
  base: '/sd-fe-eng/',
  theme: defaultTheme({
    logo: '/img/logo.png',// 这个就是指public中的文件路径
  })
}
```

至此，文档已经初始化完成，可以执行 `npm run docs:dev` 启动文档。查看效果。

下一步我们要在github上能购自动化部署项目。

## action自动化部署

- 创建一个 `.github/workflows/main.yml` 文件，内容如下：

