[官方文档](https://jestjs.io/zh-Hans/docs/getting-started)

单元测试可以帮助我们更好的规避 bug，发现问题，解决问题

场景： 比如某个某个业务需要写做一个计算问题，例如（简单加法问题 js 是存在精度问题的）那么你怎么能保证你写的方法是多的，或者说这些问题在测试的时候可以发现，那么能不能在此之前就规避这些问题呢，如果我门写一个用单元测试测试一下 是不是就提前发现很多问题，并解决，大大提高了效率 减少了 bug

## 安装 jest

```js
npm init -y // 初始化项目
// 安装jest
npm install --save-dev jest
```

## 创建文件

add.js

```js
// 写入你的方法 并导出
function accAdd(arg1, arg2) {
  let r1;
  let r2;
  let m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const max = Math.max(r1, r2);
  // eslint-disable-next-line prefer-const
  m = Math.pow(10, max);
  return ((arg1 * m + arg2 * m) / m).toFixed(max);
}

module.exports = { accAdd };
```

创建 add.test.js 文件

```js
const { accAdd } = require("./sum");

// 编写测试用例
test("0.1+0.2=0.3", () => {
  expect(accAdd(0.1, 0.2)).toBe("0.3");
});
```

配置 package.json

```js
{
  "name": "jestTest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.0.6"
  }
}
```

然后运行 就可以查看结果测试用例是否通过，这就是一个简单的单元测试，为了测试函数的健壮，还可以写多个不同场景的用例

## 代码覆盖率

有的时候我们写的方法是有很多判断的，但是测试用例的时候 并不是每个判断都可以覆盖，如果有的人不清楚，那么就可以会遗漏，所以测试的时候 添加代码覆盖率，可以很好的支持哪一行没有被覆盖到，然后编写新的用例

看个 demo

修改一下上面添加函数

```js
function accAdd(arg1, arg2) {
  // 添加一个判断
  if (arg1 === 0) {
    console.log(0);
  }
  let r1;
  let r2;
  let m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const max = Math.max(r1, r2);
  // eslint-disable-next-line prefer-const
  m = Math.pow(10, max);
  return ((arg1 * m + arg2 * m) / m).toFixed(max);
}

module.exports = { accAdd };
```

然后执行单元测试，依然可以正常执行，但是其中的判断是没有被覆盖的

这个时候我们可以执行

```js
npm test -- --coverage
```

```js
 PASS  ./sum.test.js
  √ two plus two is four (2 ms)
  √ 0.1+0.2=0.3 (1 ms)
  √ 0+0.2=0.2 (19 ms)

  console.log
    0

      at accAdd (sum.js:7:13)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   84.62 |      100 |      50 |   84.62 |
 sum.js   |   84.62 |      100 |      50 |   84.62 | 2,20
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.6 s, estimated 1 s
Ran all test suites.
```

可以看到哪行代码没有被覆盖测试到

也可以在 package.json 配置 不用每次执行都添加

```js
"scripts": {
  "test": "jest"
},
"jest": {
  "collectCoverage": true,
  // 添加这个命令可以生成一个html文件查看信息  也可以不添加
   "coverageReporters": ["html"]
},
```
