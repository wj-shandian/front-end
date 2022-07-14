## 为什么需要测试

- 软件测试是一种实际输出与预期输出之间的审核或者比较的过程
- 测试可以提前发现 bug
- 测试可以提高代码质量

### 手工测试

```js
function add(a, b) {
  return a + b;
}

// 手工测试

console.log(add(2, 3));
```

写一个函数自己去手动执行校验结果

### 断言

```js
function add(a, b) {
  return a + b;
}

// 手工断言 测试
// assert 接两个参数  判断条件  以及提示语言
console.assert(add(2, 3) === 5, "2+3!=5");
```

使用 console.assert 可以直接看出结果是否正确 只是比上一步方便一点

### 测试框架

- 测试用例可以用来测试程序是否正确工作
- 通常把一组相关的测试称为一个测试套件

看一下 手工测试和测试框架的对比

- 手工测试

  - 污染源代码 需要手动删除
  - 散落在各个文件中
  - 没有办法保持持久化
  - 手动执行比较麻烦

- 测试框架
  - 可以分离测试代码和源代码
  - 测试代码可以集中存放
  - 放置到单独的文件中
  - 可以自动运行 显示测试结果

## jest

初始化一个项目

安装 jest`npm install --save-dev jest`

在 package 中添加命令 添加 test 命令 `"test": "jest",`
新建 match.js 和 match.test.js 文件

match.js

```js
function add(a, b) {
  return a + b;
}

module.exports = {
  add,
};
```

match.test.js

```js
let { add } = require("./math");

describe("测试相加函数", () => {
  test("测试1+1", () => {
    expect(add(1, 1)).toBe(2);
  });
});
```

测试覆盖率 在 package 中添加命令 `"cov": "jest --coverage"` 执行这个命令 可以看到 测试执行的表格参数

`npm install babel-jest @babel/core @babel/preset-env @types/jest @babel/preset-react @babel/preset-typescript typescript --save-dev`

### jest.config.js 的常用基础配置释义

- testMatch 用来检测测试文件 glob 模式
- testRegex 用来检测测试文件的正则表达式或者正则表达式的数组
- testEnvironment 用来跑测试的测试环境 可以选择 jsdom 或者 node
- rootDir jest 用来描述测试文件或者模块的根目录 默认是 package.json 的目录
- moduleFileExtensions 使用的模块文件扩展名数组
- clearMocks 在每次测试的时候自动清除 mock 调用
- coverageDirectory 输出代码覆盖率的目录

### 常用匹配器的用法 Matchers

#### 相等性

- toBe 测试一个值是否相等

```js
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
```

- toEqual 对对象或者数组进行递归检查 深比较

```js
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

#### 真实性

在测试中，您有时需要区分 undefined、null 和 false，但有时您不想区别对待。Jest 包含帮助器，可让您明确说明您想要什么。

- toBeNull 仅匹配 null
- toBeUndefined 仅匹配 undefined
- toBeDefined 是相反的 toBeUndefined
- toBeTruthy 匹配 if 语句视为真实的任何内容
- toBeFalsy 匹配任何被 if 语句视为假的东西

```js
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

#### 数组和迭代

您可以使用以下方法检查数组或可迭代对象是否包含特定项 toContain：

```js
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk");
  expect(new Set(shoppingList)).toContain("milk");
});
```

更多匹配器等使用 参考官网 https://www.jestjs.cn/docs/expect

### 如何测试异步代码

- callback

```js

```
