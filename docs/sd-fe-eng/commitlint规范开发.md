
# 如何拥有自己的定制的commit规范

[commitlint官网](https://commitlint.js.org/#/)

## 首先在项目 sd-fe-eng 初始化文件

learn create commintlint-config

然后learn会在 packages 生成一个文件夹 里面有一些初始化的文件创建在根目录下创建index.js文件
package.json的main入口 改为index.js

```js
module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits', // 预设解析 注意我们需要用到这个npm包 所以需要安装
  // 提交的一些规则
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert']],
  },
};

```

这些规则也是参考当前的主流方案，当然你也可以根据自己一些特殊要求定制一些特殊规则

在sd-fe-eng项目的根目录下 创建commitlint.config.js文件
在文件里引入我们创建包的路径

```js
module.exports = {
   extends: ['./packages/commitlint-config/index.js'],
};
  
```

然后安装 @commitlint/cli 包

## 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

然后执行添加`commit-msg`:

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

然后可以测试发现 每次提交的时候都会校验规则 如果不按照规则来 那么就会报错 无法提交

## conventional-changelog-conventionalcommits

为什么要用这个预设解析的包，是为了我们生成changelog的时候 能够根据commit自动生成，也是为了规范changelog

## changelog的生成

全局安装 `npm install -g conventional-changelog-cli` changelog的cli

然后在package.json里添加 `"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"`

执行 changelog 命令，会根据当前的提交生成自动生成 changelog
