## TS 和 JS 的区别，以及优势

TS 是 JS 的超集,是存在类型的脚本语言，JS 没有类型约束,TS 有明确的类型

TS 的优势：

- 类型约束 开发更加严谨 减少低级 bug
- 类型约束提高了代码可读性
- 添加了 接口 枚举等 js 不具备的功能

## any unknown never void 的区别

- any
  any 很好理解 就是任意类型，不做任何约束，编译时会跳过检查

- unknown
  unknown 表示未知类型 unknown 其实是 any 的一种替代品，他可以把影响的范围收敛到自身 因为 unknown 不可以分配给其他类型，所以这个值会比 any 要安全一些，影响范围只有自身 所以推荐使用 unknown 而不是 any

- never
  表示永远不存在的值
  常见一些报错函数的返回值定义 例如
  ```TS
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
  throw new Error(message);
  }
  ```
- void
  any 是任意类型 void 是没有类型 常用于函数不返回值或者返回 undefined
  ```TS
  function warnUser(): void {
  console.log("This is my warning message");
  }
  ```
