# 关于eslint-config规范开发

可以阅读下 [eslint官网](https://zh-hans.eslint.org/docs/latest/use/core-concepts) 了解一下 eslint功能 以及能实现哪些东西

## 首先在项目 sd-fe-eng 初始化文件

learn create eslint-config

然后learn会在 packages 生成一个文件夹 里面有一些初始化的文件创建在根目录下创建index.js
package.json的main入口 改为index.js

```js
module.exports = {
  extends: [
    // 引入一些基础的配置
    './rules/base/best-practices',
    './rules/base/possible-errors',
    './rules/base/style',
    './rules/base/variables',
    './rules/base/es6',
    './rules/base/strict',
    './rules/imports',
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },
  root: true,
};

```

提供了多套配置文件以支持 `JavaScript`、`TypeScript`、`React`、`Vue`、`Node.js` 等多种项目类型。

多套配置需要分别建立对应的文件规则。

所以这里就不再把配置一一写在这里，相关的配置文件在可以查看 [github](https://github.com/wj-shandian/sd-fe-eng)

这里并没有创造一些新的规则 只是引用常用的 规则 然后可以根据自己团队 搭配出一套适合自己的方案形成规则

## 在 sd-fe-eng 项目中调试

在 __tests__ 文件下 写了一些测试用例
具体 查看 github 下 eslint-config 文件夹下的测试用例
