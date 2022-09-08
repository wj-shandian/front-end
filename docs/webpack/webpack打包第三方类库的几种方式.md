## 直接引入

```js
import _ from "lodash";
```

这种方式引入 需要每个模块使用都需要 import 一下 并且整个模块都会被打包

## 插件引入

- webpack 配置 ProvidePlugin 后，不需要再 import 引入可以直接使用
- \_函数会自动添加到模块 无需主动生命使用

```js
new webpack.ProvidePlugin({
  _: "lodash",
});
```

整个模块也都会被打包 优点是不需要手动引入

## expose-loader

expose-loader 可以把模块添加到全局上 不需要配置任何插件 只需要添加 loader 以及对应的参数即可

```js
module:{
    rules:[
        {
            test:require.resolve('lodash),
            loader:'expose-loader',
            options:{
                expose:{
                    globName:'_',
                    override:true
                }
            }
        }
    ]
}
```

## externals

如果我们想引入一个库，但是又不想被打包，并且不影响我们的在 AMD CMD 或者 window 等方式引用 我们可以配置 externals 来实现

首先手动在 html 添加这个库等 CDN

```js
<script src="https://cdn.bootcss.com/jquery.js"></script>
```

webpack 中配置

```js
externals: {
  jquery: "$";
}
```

在代码模块直接使用

```js
import $ from "jquery";
```

## watch

启动 watch webpack 将监听任何已经解析文件的更改

```js
module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300, // 延迟重新构建时间 功能类似一个防抖
    poll: 1000, // 每秒检查一次变动
    ignored: /node_modules/, //忽略监听的文件
  },
};
```

## 拷贝静态文件

copy-webpack-plugin 可以拷贝源文件到目标目录

```js
npm i copy-webpack-plugin -D

```

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/static"),
          to: path.resolve(__dirname, "dist/static"),
        },
      ],
    }),
  ],
};
```
