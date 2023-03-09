## 项目初始化

npm create vite@latest shan-dian-draw-board --template react-ts

基于这个模版开始的

## 添加 eslint

npm init @eslint/config

eslint 初始化

## 添加 Prettier

npm i prettier -D

根目录添加 .prettierrc.cjs 文件

文件内容模版

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true,
};
```

## 添加 ESLint + Prettier

npm i eslint-config-prettier eslint-plugin-prettier -D

修改 eslint 配置

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "no-undef": 0,
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};

// cjs 表示 commonjs
```

配置 package.json 的 lint 命令 检查代码

"lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./"

## 引入 vite 的 eslint 插件

npm i vite-plugin-eslint -D

在 vite.config.ts 文件中引入

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      failOnError: false,
    }),
  ],
});
```

## 添加 husky

`npm i husky -D`

在 package.json 中添加命令

`"prepare": "husky install"`

然后 执行 `npm run prepare` 会生成一个.husky 文件

再给 husky 添加一个 hook

`npx husky add .husky/pre-commit "npm run lint"`

这样每次提交之前都会先执行 lint 检查代码再提交

## lint-staged

表示只对暂存区的代码检查

`npm i lint-staged -D`

package.json 中添加内容

```js
  "lint-staged": {
    "*.{js,jsx,tsx,ts}": [
      "npm run lint"
    ]
  }
```

并在 .husky/pre-commit 中替换 npm run lint 为 npx lint-staged。现在我们每次提交代码前都会对改动的文件进行 Lint 检查。

## commitlint

对 commit 内容进行规范校验

`npm i @commitlint/cli @commitlint/config-conventional -D`

创建文件 .commitlintrc.cjs 添加内容

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

执行 hook
`npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"`

[规范](https://github.com/conventional-changelog/commitlint#what-is-commitlint)
