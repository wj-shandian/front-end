# 自动化部署文档以及发布 npm

## github 自动化部署

根目录添加 `.github/workflows/deploy.yml` 文件

```yaml
name: Build and Deploy
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1

      - name: Lock npm version
        uses: actions/setup-node@v3
        with:
          node-version: 16.18.0

      - name: Install and Build
        run: |
          npm i -g pnpm
          pnpm run init
          pnpm run build:doc
        env:
          NODE_OPTIONS: "--max_old_space_size=4096"

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.3
        with:
          BRANCH: gh-pages
          FOLDER: dist
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

ACCESS_TOKEN 需要添加 在文档规范一文中有详细的 介绍 可以参考，自动化部署成功以后，
打开项目的设置 然后在 pages 选项卡中 设置 分支为 gh-pages 然后点击保存, 设置 github.io 的路由 等几分钟就可以正常访问生效

## 发布 npm

关于发布 npm 需要配置哪些 参考前端编码规范工程相关文档

这里直接执行 `npm run pub` `"pub": "pnpm run build && pnpm -r --filter=./packages/* publish",`

## unpkg

为了支持 cdn 访问，我用 webpack 打包一个 umd 格式的 dist 目录，然后上传到上传到 npm 上

umd 格式的打包参考之前打包中的 webpack 代码

这样就可以支持 cdn 访问了

例如
`https://unpkg.com/sd-hooks@0.1.0/dist/sd-hooks.js`

可以直接 使用 script 引入 访问

版本号可以不带 不带默认访问最新的版本
