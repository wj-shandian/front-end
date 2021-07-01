## 静态资源拷贝

[npm 地址](https://www.npmjs.com/package/copy-webpack-plugin)  
copy-webpack-plugin 主要实现对已有的文件拷贝，不需要 webpack 打包的文件  
`npm install copy-webpack-plugin --save-dev`

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
plugins: [
    new CopyWebpackPlugin([
      {
          from: 'public/*.js',  //从public文件下把所有的js文件  当然，我们需要在模板html中手动引用文件
          to: path.resolve(__dirname, 'dist'), // 拷贝到dist目录下
          flatten: true, //设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝上
          ignore: ['1.js'], // 过滤掉自己不想拷贝过去的文件
      },
      //还可以继续配置其它要拷贝的文件
  ])
  ],
```

## ProvidePlugin

[webpack 内置的模块](https://www.webpackjs.com/plugins/provide-plugin/)
自动加载模块，而可以不用到处用 import 和 require

```js
new webpack.ProvidePlugin({
  identifier: "module1",
  // ...
});
// 或者
new webpack.ProvidePlugin({
  identifier: ["module1", "property1"],
  // ...
});
```

```js
const webpack = require("webpack");
module.exports = {
  //...
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      Component: ["react", "Component"],
      Vue: ["vue/dist/vue.esm.js", "default"],
      $: "jquery",
      _map: ["lodash", "map"],
    }),
  ],
};
// 每次使用的时候就不需要在引入文件可以直接使用，不推荐大量使用，不利于后面的人维护代码
```

## 按需加载

简单的说就是需要的时候才加载，不需要一开始就加载，有利于首屏优化

```js
document.getElementById("btn").onclick = function () {
  import("./handle").then((fn) => fn.default());
};
```

## 代码分割 splitChunks

[webpack 地址](https://webpack.js.org/plugins/split-chunks-plugin/#root)

默认配置

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {  initial 同步  all 所有的
      chunks: 'async',// 默认支持异步代码分割 import()
      minSize: 30000, // 文件超过30k就会抽离
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1, // 最少模块引用了一次
      maxAsyncRequests: 6, // 最多5个请求
      maxInitialRequests: 4, // 最多首屏加载4个请求
      automaticNameDelimiter: '~',
      cacheGroups: { //缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 //优先级
        },
        default: {
          minChunks: 2,
          priority: -20,//优先级
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

## 删除无用 css 样式

```js
    npm i purify-webpack purify-css -D
    const glob = require('glob')
    const PurifyCssPlugin = require('purifycss-webpack')
    plugins: [
      new PurifyCssPlugin ({
          paths: glob.sync(path.join(__dirname, '/*.html'))
      })
    ]
```

## 删除 console.log

`npm i babel-plugin-transform-remove-console --save-dev`

```js
// .babelrc文件 或者babel.config.js  文件 配置
{
  "plugins": [
      ["transform-remove-console",
       // 保留 console.error 与 console.warn
       { "exclude":
        [ "error", "warn"]
       }
      ]
    ]
}
```

或者 需要 webpack4 以上

```js
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  }
```

## cdn 加载文件

    Externals     https://webpack.js.org/configuration/externals/#root
    在html文件引入不想被打包的cdn 例如jquery

```js
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"
></script>
```

webpack 配置

```js
module.exports = {
  //...
  externals: {
    jquery: "jQuery",
  },
};
```

这个时候我们就可以用 es6 语法或者 commonJS 或者 AMD 规范引用

```js
import $ from "jquery";

$(".my-element").animate(/* ... */);
```

只适用于很长时间不会更改的库

## Tree-shaking && Scope-Hoisting

### tree-shaking

[地址](https://www.webpackjs.com/guides/tree-shaking/#%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E9%80%9A%E7%94%A8%E6%A8%A1%E5%9D%97)  
 webpack 在 mode 为 production,并且使用 es6 语法`import`和`export`会自动删除没有使用的代码,  
 如果使用了 `optimize-css-assets-webpack-plugin`这个插件会导致原本 webpack 内置的对 js 的压缩失效， 这个时候需要自己手动去配置对 js 的压缩才会生效`UglifyJSPlugin`
tree-shaking 的必要条件

- 使用 ES2015 模块语法（即 import 和 export
- 在项目 package.json 文件中，添加一个 "sideEffects" 入口。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

### scope-hoisting (作用域提升)

webpack3 以后的内置插件，必须使用 es6 语法引入的文件才会生效

```js
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");

module.exports = {
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
```

## DillPlugin && DillReferencePlugin

待更新

## 动态加载

待更新

## resolve

待更新

## include/exclude

待更新

## happypack

待更新
