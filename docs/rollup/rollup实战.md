## rollup

- rollup 是下一代 ES 模块捆绑器

- webpack 打包比较繁琐 打包体积大
- rollup 主要用来打包 js 库
- vue/react/angular 都在用 rollup 作为打包工具

安装依赖

```js
npm i @babel/core @babel/preset-env  @rollup/plugin-commonjs  @rollup/plugin-node-resolve  @rollup/plugin-typescript lodash postcss rollup rollup-plugin-babel rollup-plugin-livereload  rollup-plugin-postcss  rollup-plugin-server  rollup-plugin-terser --save-dev
```

rollup.config.js

```js
export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "cjs", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
};
```

- Asynchronous Module Definition 异步模块定义
- es module 是 es6 提出的新的模块方案
- IIFE 即立即执行函数表达式 所谓立即执行 就是生命一个函数 生命完了 立即执行
- UMD 全称 Universal Module Definition 也就是通用模块定义
- cjs 是 nodejs 采用的模块化标准 commonjs 使用方法 require 来引入模块 这里的 require() 接受的参数是模块名或者模块文件的路径

## 支持 babel

为了使用新的语法 可以使用 babel 来进行编译输出

安装 babel 依赖

- @babel/core 是 babel 的核心包
- @babel/preset-env 是预设
- rollup-plugin-babel 是 babel 插件

`npm i @babel/core @babel/preset-env rollup-plugin-babel --save-dev`

.babelrc

```js
{
    "presets":[
        [
            "@babel/env",
            {
                "modules":false
            }
        ]
    ]
}
```

rollup.config.js 引入

```js
import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
  ],
};
```

然后我们可以正常大使用 es6 语法 都可以正常打包

## tree-shaking

- tree-shaking 的本质是消除无用的 js 代码
- rollup 只处理函数和顶层的 import/export 变量

## 使用第三方模块

- rollup 编译源码中的模块 默认只支持 es6+的模块方式 import/export

如果我使用第三方的库 比如 lodash 是要安装插件才可以正常打包

`npm i @rollup/plugin-node-resolve @rollup/plugin-commonjs --save-dev`

rollup.config.js

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(), // 因为 rollup 默认不知道怎么读取 node_modules 中的模块
    commonjs(),
  ],
};
```

## 使用 ts

`npm i tslib typescript @rollup/plugin-typescript --save-dev`

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
};
```

## 压缩 js

`npm i @rollup-plugin-terser --save-dev`

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
  ],
};
```

## 打包 css

`npm i rollup-plugin-postcss --save-dev`

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    postcss(),
  ],
};
```

## 开启本地服务 预览页面

`npm i rollup-plugin-server --save-dev`

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import server from "rollup-plugin-server";

export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    postcss(),
    server({
      open: true,
      port: 8080,
      contentBase: "./dist",
    }),
  ],
};
```

package 配置开发命令

```js
 "scripts": {
    "build": "rollup --config",
    "dev": "rollup --config -w"
  },
```

-w 是监听的意思

## 自动重启

`npm i rollup-plugin-livereload --save-dev`

```js
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import server from "rollup-plugin-server";
import livereload from "rollup-plugin-livereload";
export default {
  input: "./src/index.js", // 打包的输入文件 类似于webpack entry
  output: {
    // 对应webpack output
    file: "./dist/bundle.js",
    format: "iife", // 一共有五种输出格式  amd /  es / iife / umd /cjs / system
    name: "calculator", // 输出格式为 iife 或者umd 的时候必须提供 将会为一个全局变量维持在window上
  },
  plugins: [
    babel({
      exclude: /nude_modules/,
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    postcss(),
    server({
      open: true,
      port: 8080,
      contentBase: "./dist",
    }),
    livereload(), // 文件修改后 会自动打包重启 类似热更新
  ],
};
```
