# sd-hooks 初始化

## 安装

用之前的我们开发的基础的脚手架 然后创建一个基础的 ts 项目

```js
npm i sd-fe-lint -g
sd-fe-lint create sd-hooks
```

染后根据提示 创建一个项目

还是用 pnpm 来管理这个项目
根目录创建 pnpm-workspace.yaml

```js
prefer-workspace-packages: true
packages:
  - 'packages/*'

```

## 接入 dumi 文档

安装 dumi

```js
pnpm i dumi -D
```

创建 dumi 配置文件
在根目录创建 .dumirc.ts 文件

这里我用的版本是 2.x

文件基本配置 一些常规的配置 更多的定制化 参考官方文档

```ts
import { defineConfig } from "dumi";

export default defineConfig({
  resolve: {
    atomDirs: [{ type: "hooks", dir: "./packages/hooks/src" }], // 定义识别文档的路径
  },
  hash: true,
  alias: {
    sdHooks: process.cwd() + "/packages/hooks/src/index.ts",
    ["sd-hooks"]: process.cwd() + "/packages/hooks/src/index.ts",
  },
  themeConfig: {
    name: "sd-hooks",
    logo: "/logo.png",
    favicon: "/logo.png",

    nav: [
      { title: "指南", link: "/guid" },
      {
        title: "Hooks",
        link: "/hooks",
      },
    ],
    sidebar: {
      "/hooks": [
        {
          title: "状态",
          children: [{ title: "useToggle", link: "/hooks/use-toggle" }],
        },
      ],
    },
  },
});
```

在根目录创建 docs
创建 index.md 首页的一些介绍信息

在 package.json 添加

```js
    "dev": "dumi dev",
    "build:doc": "dumi build",
```

至此 dumi 接入完 可以运行查看 基本的样式

接下来我们来实现项目的打包功能 请看下一小节
