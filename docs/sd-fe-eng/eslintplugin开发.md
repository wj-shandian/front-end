# eslint 插件开发

[eslint官网关于插件开发的部分](https://eslint.org/docs/latest/extend/plugins)

## 首先在项目 sd-fe-eng 初始化文件

learn create eslint-plugin

所有eslint插件都要以 eslint-plugin 为开头

然后learn会在 packages 生成一个文件夹 里面有一些初始化的文件创建在根目录下创建index.js
package.json的main入口 改为index.js

index.js

```js
const path = require('path');
const requireAll = require('require-all');

// 导出规则
exports.rules = requireAll({
  dirname: path.resolve(__dirname, 'rules'),
});

// 导出默认配置
exports.configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
});

// 添加json文件的eslint校验
exports.processors = {
    // 识别json文件 
  '.json': {
    preprocess(text) {
      // As JS file
      return [`module.exports = ${text}`];
    },
  },
};
```

最终导出一个这样的对象

```js
{
  rules: {
    'no-broad-semantic-versioning': {
      name: 'no-broad-semantic-versioning',
      meta: [Object],
      create: [Function: create]
    },
    'no-http-url': { name: 'no-http-url', meta: [Object], create: [Function: create] },
  },
  configs: { recommended: { plugins: [Array], rules: [Object] } },
  processors: { '.json': { preprocess: [Function: preprocess] } }
} 
```

## no-http-url

在rules文件夹下创建no-http-url.js

```js
const RULE_NAME = 'no-http-url';

module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null, // 是否修复
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  create(context) {
    return {
        // Literal 抽像语法树中的节点类型
      Literal: function handleRequires(node) {
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
            // 抛出错误
            context.report({
            node,
            messageId: 'noHttpUrl',
            data: {
              url: node.value,
            },
          });
        }
      },
    };
  },
};

```

`Property`和`Literal`是ESLint中的两种不同的抽象语法树（AST）节点类型，用于表示不同的代码结构。

`Property`节点用于表示对象字面量中的属性，而`Literal`节点用于表示字面量值，比如字符串、数字、正则表达式等。它们在语义上有不同的作用和用途。

一般情况下，当你需要处理对象字面量中的属性时，应使用`Property`节点。例如，你可能想要检查对象字面量中属性的命名规范、值的类型或数量等。

而当你需要处理字面量值本身时，应使用`Literal`节点。例如，你可能想要检查字符串字面量是否符合特定的格式、数字字面量是否在指定的范围内等。

总之，根据你的具体需求，选择适合的节点类型进行处理。如果你需要处理对象字面量中的属性，使用`Property`节点；如果你需要处理字面量值本身，使用`Literal`节点。

## no-broad-semantic-versioning

在rules中 创建 no-broad-semantic-versioning 文件

```js
const path = require('path');

const RULE_NAME = 'no-broad-semantic-versioning';

module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'problem',
    fixable: null,
    messages: {
      noBroadSemanticVersioning:
        'The "{{dependencyName}}" is not recommended to use "{{versioning}}"',
    },
  },

  create(context) {
    if (path.basename(context.getFilename()) !== 'package.json') {
      return {};
    }

    const cwd = context.getCwd();

    return {
      Property: function handleRequires(node) {
        if (
          node.key &&
          node.key.value &&
          (node.key.value === 'dependencies' || node.key.value === 'devDependencies') &&
          node.value &&
          node.value.properties
        ) {
          node.value.properties.forEach((property) => {
            if (property.key && property.key.value) {
              const dependencyName = property.key.value;
              const dependencyVersion = property.value.value;
              if (
                // *
                dependencyVersion.indexOf('*') > -1 ||
                // x.x
                dependencyVersion.indexOf('x') > -1 ||
                // > x
                dependencyVersion.indexOf('>') > -1
              ) {
                context.report({
                  loc: property.loc,
                  messageId: 'noBroadSemanticVersioning',
                  data: {
                    dependencyName,
                    versioning: dependencyVersion,
                  },
                });
              }
            }
          });
        }
      },
    };
  },
};

```

rules和configs是必须要导出的配置

rules很好理解就定义的规则
configs是配置规则的参数

`configs` 则是必须导出的一个对象，它包含了插件中定义的配置。每个配置都是一个键值对，键是配置的名称，值是一个对象，其中包含了配置的具体内容。配置对象通常包含 `rules` 属性，用于定义配置下的规则和启用状态。

配置可以在 ESLint 的配置文件中使用，通过配置文件中的 `extends` 或 `plugins` 来引用插件提供的配置。这样可以方便地使用插件提供的默认配置，或者为特定项目定制配置。

在根目录下创建configs文件夹 添加文件 recommended.js

```js
module.exports = {
  plugins: ['eslint-plugin-sd'],
  rules: {
    'eslint-plugin-sd/no-http-url': 'warn',
    'eslint-plugin-sd/no-broad-semantic-versioning': 'error',
  },
};

```

`processors` 不是必须导出的，它是可选的导出项。`processors` 是用于定义插件中支持的自定义处理器（processors）的对象。
`Processor` 的主要作用是从其他类型的文件中提取 JavaScript 代码，从而让ESLint有处理其他类型文件的能力。
主要原理也是解析`.json`文件内容内容生成AST，从AST中提取JavaScript内容，然后交给ESLint进行处理。根据规则是否抛出错误。

例如 no-broad-semantic-versioning 规则需要判断package.json中的版本号是否符合规范，就需要使用processors来处理package.json文件

```js
exports.processors = {
  '.json': {
    preprocess(text) {
      // As JS file
      return [`module.exports = ${text}`];
    },
  },
};
```

## 调试

参考代码中的 _test_ 写测试用例
[地址](https://github.com/wj-shandian/sd-fe-eng/packages/eslint-plugin/__tests__)

## npm用法

### 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/)

```shell
npm install eslint-plugin-sd eslint --save-dev
```

### 使用

#### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugin: ['eslint-config-sd'],
  rules: {
    'eslint-plugin-sd/no-http-url': 'warn',
  },
};
```

#### 使用 presets

```js
// .eslintrc.js
module.exports = {
  extends: 'plugin:eslint-plugin-encode/recommended',
};
```

### 支持的规则

- [`no-broad-semantic-versioning`](https://encode-studio-fe.github.io/fe-spec/plugin/no-broad-semantic-versioning.html) 不要指定宽泛的版本范围
- [`no-http-url`](https://encode-studio-fe.github.io/fe-spec/plugin/no-http-url.html) 使用 HTTPS 协议头的 URL，而不是 HTTP

只是举例子 更多的规则 可以根据自己的业务需求开发
