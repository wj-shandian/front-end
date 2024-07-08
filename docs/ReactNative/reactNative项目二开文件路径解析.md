# reactNative 项目二开解决方案

## 原因

当我们有一个标品代码，然后我们需要针对该项目进行二开定制一部分内容，这个时候我们又希望不完全改动标品代码，而且还支持标品后续的升级，
这个时候就可以采取一个方案。

不修改标品代码，如果我们需要定制某一块的内容，这个时候我们就可以复制 当前标品的内容出来修改。而不改动原有的代码，这样以后升级标品内容时，只需要更新标品内容代码即可。这样既简单实用，还不会造成代码混乱 无法升级。

## 方案

`babel-plugin-module-resolver` 没错就是这个 babel 文件解析路径插件

安装依赖

```js
npm install babel-plugin-module-resolver --save-dev
```

在根目录的 .babelrc 文件中添加该插件配置

```js
{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ['./src/components', './origin/src/components', `./src`, './origin/src'],
        "extensions": [
          ".scss",
          ".less",
          ".android.jsx",
          ".android.js",
          ".ios.jsx",
          ".ios.js",
          ".native.jsx",
          ".native.js",
          ".jsx",
          ".js",
          ".tsx",
          ".ts",
          ".json"
        ]
      }
    ]
  ]
}

```

我们把标品代码放置在根目录的 origin 目录下，如果我们需要修改某个模块的代码 ，把代码复制到 src/components/下，然后修改代码即可。

这个文件解析优化去解析 `./src/components`如果没有找到 会依次寻找 `./origin/src/components` `./src` `./origin/src` 中的文件

这样我们就可以在 src/components 中修改标品代码，而不会影响标品代码的升级。

## web

如果我们的项目还有 web 版本的 可以在 webpack 中配置 resolve 中的 alias 和 modules 即可完成上述 二开的能力

例如

```js
  resolve: {
    alias:  alias: {
     'components': path.resolve(__dirname, 'src/components')
     },
    modules: ['/src', 'origin/src', ]
     extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
```
