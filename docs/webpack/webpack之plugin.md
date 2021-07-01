## 创建插件

- 一个 javascript 命名函数
- 在插件函数的 prototype 上定义一个 apply 方法
- 指定一个绑定到 webpack 自身的[事件钩子](https://www.webpackjs.com/api/compiler-hooks/)
- 处理 webpack 内部实例的特定数据
- 功能处理完调用 webpack 提供的回调

一个具有 apply 方法的函数就是一个插件，并且它要监听 webpack 的某个事件。

[webpack 4 版本的方式 ](https://www.webpackjs.com/contribute/writing-a-plugin/)

```js
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function () {
    console.log("Hello World!");
  });
};

module.exports = HelloWorldPlugin;
```

[webpack 5 编写的方式](https://webpack.js.org/contribute/writing-a-plugin/)

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(
      "Hello World Plugin",
      (
        stats /* stats is passed as an argument when done hook is tapped.  */
      ) => {
        console.log("Hello World!");
      }
    );
  }
}

module.exports = HelloWorldPlugin;
```

webpack.config.js 引入 plugin

```js
const HelloWorldPlugin = require("./src/plugin");

plugins: [new HelloWorldPlugin({ options: true })];
```

这就是一个简单的 plugin 插件，当然想要写好一个插件 还需要仔细研究文档，其中还有一些异步方式的处理
