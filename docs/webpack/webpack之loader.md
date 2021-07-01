loader 是什么？loader 其实就是一种转换器，  
比如 babel-loader 可以将 es6 的代码转化为 es5 的代码
比如 sass-loader 可以将 sass 语法的 css 转化为 css

本文将带你实现一个简单的 loader 体会一下 loader 的大致流程

一个 loader 的实现是有一套自己的规则流程 [详见官网](https://www.webpackjs.com/contribute/writing-a-loader/)

```js
//初始化项目
npm init -y
// 安装webpack webpack-cli
npm i webpack webpack-cli --save-dev
```

新建 src 文件夹 新建 index.js 文件和 loader.js 文件

在根目录新建 webpack.config.js 文件

配置 webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve("./src/loader.js"),
          },
        ],
      },
    ],
  },
};
```

修改 package.json 的配置命令

```js
 "scripts": {
    "test": "webpack"
  },
```

loader 是导出一个函数的 node 模块，该函数在 loader 转换资源的时候调用

比如 我想把全局的 var 替换成 let

index.js

```js
var a = 1;
var b = 2;
```

loader.js

```js
module.exports = function (source) {
  return source.replace(/var/g, "let");
};
```

执行打包，然后看打包后的文件

```js
eval(
  "let a = 1;\r\nlet b = 2;\n\n//# sourceURL=webpack://webpackLoader/./src/index.js?"
);
```

var 成功的被转化成了 let
