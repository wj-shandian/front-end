## 初始化项目

`npm i magic-string acorn --save`

## magic-string

- magic-string 是一个操作字符串和生成 source-map 的工具

基础用法

```js
let MagicString = require("magic-string");
let magicString = new MagicString('export var name = "测试"');
console.log(magicString.snip, "MagicString");
// snip是一个方法 用来返回原来的magicString 的克隆对象 删除原始字符串开头和结尾 字符串之间的所有内容

console.log(magicString.snip(0, 7).toString()); // 和数组的 substr功能类似
// export

// 从开始到结束 字符串删除
console.log(magicString.remove(0, 7).toString());
// var name = "测试"

// bundle 源代码的集合

let bundleString = new MagicString.Bundle();

bundleString.addSource({
  content: 'var a = "1"',
});

console.log(bundleString.toString());
// var a = "1";
```

## AST

参考之前的文章有介绍什么是AST