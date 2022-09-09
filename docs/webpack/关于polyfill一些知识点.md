## polyfill

- @babel/preset-env 会根据预设的浏览器兼容列表从 stage-4 选取必须的 plugin 意思是 如果不引入别的 stage-x @babel/preset-env 只支持到 stage-4

- 最新的 ES 语法 比如 箭头函数
- 最新的 ES API 比如 Promise
- 最新的 ES 实例方法 比如 String.prototype.includes

## babel-polyfill

- babel 默认只转化新的 js 语法 而不转化 新的 API 比如 Promise Set Map Symbol 等等全局对象，以及一些在全局对象上的方法（比如 Object.assign）都不会转化

- 比如 ES6 在 Array 对象新增一个 Array.form 方法，babel 就不会转化这个方法，如果想让这个方法正常运行，需要使用 babel-polyfill 来转换
- @babel/polyfill 它是通过向全局对象和内置对象的 prototype 添加方法来实现的，比如当前运行环境不支持 Array.prototype.find 方法，引入 polyfill 我们就可以正常使用了。 但是缺点是会污染全局空间
- @babel/preset-env 为每一个环境的预设
- @babel/preset-env 默认支持语法转化，需要开启 useBuiltIns 配置才能转化 API 和实例 方法
- useBuiltIns 可选值包括 ‘usage’ ｜ ‘entry’ ｜ false 默认为 false 表示不对 polyfill 处理

## useBuiltIns

### useBuiltIns:false

如果设置 false 此时不对 polyfill 做任何操作 如果引入 @babel/polyfill 则无视配置的浏览器兼容，引入所有的 polyfill

```js
import "@babel/polyfill";
```

```js
{
    test:'\.jsx?$',
    exclude:/node_modules/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[{'@babel/preset-env',{
                useBuiltIns:false
            }},'@babel/preset-react'],
            plugins:[]
        }
    }
}
```

### useBuiltIns:'entry'

- 在项目入口引入一次，多次引入会报错
- 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill 需要在入口文件手动添加 `import '@babel/polyfill'` 会自动根据 browserslist 替换成版浏览器不兼容的所有 polyfill
- 这里需要制定 core-js 版本 如果 corejs:3 则`import '@babel/polyfill'` 需要改成 `import 'core-js/stable';import 'regenerator-runtime/runtime'`
- corejs 默认是 2 配置 3 的话需要单独安装 core-js@3

```js
import "@babel/polyfill";
```

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

```js
{
    test:'\.jsx?$',
    exclude:/node_modules/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[{'@babel/preset-env',{
                useBuiltIns:'entry',
                'corejs':2
            }},'@babel/preset-react'],
            plugins:[]
        }
    }
}

```

### useBuiltIns:'usage'

- 当配置 usage 会根据配置的浏览器兼容，以及代码里用到的 API 进行 polyfill 实现了按需添加 不需要手动引入
- usage 的行为类似 babel-transform-runtime 不会造成全局污染。

```js
{
    test:'\.jsx?$',
    exclude:/node_modules/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[{'@babel/preset-env',{
                useBuiltIns:'usage'
            }},'@babel/preset-react'],
            plugins:[]
        }
    }
}
```

## babel-runtime

- babel 为例解决全局空间污染的问题，单独提供了一个 babel-runtime 用来提供编译模块的工具函数
- 简单的说 babel-runtime 更像是一种按需加载的实现 比如 你需要使用 Promise 则只要在这个文件头部引入下面代码

```js
import Promise from "babel-runtime/core-js/promise";
```

## babel-plugin-transform-runtime

@babel/plugin-transform-runtime 插件是为了解决

- 多个文件重复饮用相同的辅助函数 -> 提取运行时
- 新 API 全局污染 -> 局部引入

1. 如果启动插件，那么 babel 就会使用 babel-runtime 下的工具函数
2. babel-plugin-transform-runtime 插件可以将这些工具函数的代码转成 require 语句 指向为 babel-runtime
3. babel-plugin-transform-runtime 就是可以在我们使用新 API 自动 import 'babel-runtime' 里的 polyfill
   - 当我们使用 async/await 自动引入 babel-runtime/regenerator
   - 当我们使用 ES6 的静态事件或者内置对象 自动引入 babel-runtime/core-js
   - 移除内联 babel helpers 并使用 babel-runtime/helpers 来替换
4. corejs 默认是 3 配置 2 需要安装 @babel/runtime-corejs2

```js
{
    test:'\.jsx?$',
    exclude:/node_modules/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[{'@babel/preset-env'},'@babel/preset-react'],
            plugins:[
                '@babel/plugin-transform-runtime':{
                    corejs:3,
                    helpers:false,
                    regenerator:false
                }
            ]
        }
    }
}
```

## 最佳实践

babel-runtime 适合在组件和类库中使用，而 babel-polyfill 适合在业务中使用

## polyfill-service

- polyfill.io 自动化的 js polyfill 服务
- polyfill.io 通过分析请求通信息中的 UserAgent 实现自动加载浏览器所需的 polyfill

```js
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```
