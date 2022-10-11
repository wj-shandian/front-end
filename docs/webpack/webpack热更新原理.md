## 什么是热更新（HMR）

Hot Module Replacement 是指当我们对代码修改并保存后，webpack 将会对代码进行重新打包，并将新的模块发送到浏览器端，浏览器会用新的模块替换旧的模块，在实现不刷新浏览器的前提下更新页面

## 基本的使用

新建一个项目 安装 一些插件

```js
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin socket.io --save-dev
```

webpack.config.js

```js
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
};
```

index.js

```js
let input = document.createElement("input");
document.body.appendChild(input);

let div = document.createElement("div");
document.body.appendChild(div);

let render = () => {
  let title = require("./title");
  div.innerHTML = title;
};
render();

// 如果当前模块支持热更新的话
if (module.hot) {
  // 注册回调，当前index.js模块 可以接受 title.js 的变更 当title.js变更后 可以重新调用render方法
  module.hot.accept(["./title.js"], render);
}
```

title.js

```js
module.exports = "title";
```

这就是基本的用法，当我们开发的时候 修改 title 文件内容 可以发现 浏览器并没有刷新 内容也发生了变更

## 一些基础知识

1. module（模块）和 chunk

- 在 webpack 里有很多模块 一个文件就是一个模块
- 一般一个入口会依赖多个模块
- 一个入口一般会对应一个 chunk，这个 chunk 包含这个入口依赖的所有模块

2. HotModuleReplacementPlugin

- webpack/lib/HotModuleReplacementPlugin.js
- 它会生成两个补丁文件
  - 上一次编译生成的 hash.hot-update.json 说明从上次到现在哪些模块改变了
  - chunk 名称，上一次编译生成的 hash.hot-update.js 存放此代码块最新的模块定义 里面会调用 webpackHotUpdate 方法
  - 向代码块中注入 HMR runtime 代码 热更新的逻辑，比如：拉取代码 执行代码 执行 accept 回调都是它注入到 chunk 中的

3. hash.hot-update.json

![](img/webpack-hot-1.png)
