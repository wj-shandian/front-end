## 什么是 treeShaking

tree shaking 是基于 ES module 规范的 Dead Code Elimination 技术，它是在运行过程中，对静态模块的导入和导出进行分析，确定 ES module 哪些模块导出的值没有被使用，并将其删除，由此来实现打包产物的优化

在 webpack 中开启 treeShaking

```js
// webpack.config.js
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // 开启 usedExports  收集 Dead code 相关的信息
    // sideEffects和usedExports是两种不同的优化方式。
    // usedExports: true, // 识别无用代码 未使用的导出内容不会被生成 usedExports 依赖于 terser 去检测语句中的副作用。
    // sideEffects: true,  // 开启副作用标识功能 sideEffects更为有效是因为它允许跳过整个模块/文件和整个文件子树。
  },
};
```

sideEffects 允许我们不检测某些模块或者文件 我们可以在 package.json 中配置

```js
{
  "name": "project-name",
  // ... 忽略一些配置
  "sideEffects": ["*.css"] // 比如 不检测css文件
}
```

> Dead Code

dead code 也叫无用代码 死码

```js
// foo.js
function foo() {
  console.log('foo');
}
export default foo;

// bar.js
function bar() {
  console.log('bar');
}
export default bar;

// index.js
import foo from './foo.js';
import bar from './bar.js';
foo();

// 这里入口文件虽然引用了模块 bar，但是没有使用，模块 bar 也可以被看作死码

```

> 为什么 tree shaking 都是基于 ES module 的呢？

js 模块化历史中出现过很多的规范 AMD CMD Commonjs ES module
在前三个模块规范中，导入和导出都是高度动态的 运行时加载 难以预测 而 ES module 不同

ES module 导入必须在模块的顶层 模块都是静态化的 在编译的时候就可以确定模块之间的依赖关系 以及导入和导出值，这样所有模块的依赖关系都和代码运行时无关，

所以 tree shaking 都是基于 ES module

而 tree shaking 实现的基本思路都是通过 编译静态分析找出没有被引用的模块打上标记，然后删除这些无用的代码

## 关于 tree shaking 的优化

首先我们在写代码的时候避免 无意义的赋值

```js
import { a, b } from "./index";

const c = a; // 如果我们把a赋值给了c 但是我们代码里并没有使用c 这个时候 tree shaking是不能把模块a删除掉的
```

尽量使用支持 tree shaking 的插件 例如现在的 antd js 代码是支持 tree shaking 的 早期版本是通过 babel-plugin-import 插件实现按需加载的
所以 如果插件不支持 tree shaking 看是否有相关的 babel 插件支持
