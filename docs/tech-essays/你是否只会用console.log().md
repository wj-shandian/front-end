## console.assert()

在浏览器中当 console.assert()方法接受到一个值为假断言的时候，会向控制台输出传入的内容，但是并不会中断代码的执行

> console.assert(assertion, obj1 [, obj2, ..., objN]);

如果 assertion 为 false ,那么将打印后面的内容，assertion 是一个布尔表达式。

## console.clear()

清空控制台的内容

## console.count()

输出 count() 被调用的次数。此函数接受一个可选参数 label。
语法

> console.count([label]);

```js
console.count(); // it will be counted as default
function greet(msg) {
      console.count(msg);
      return msg
}
greet('hi');
greet('hello');
console.count('hello');
// 打印
default: 1
hi: 1
hello: 1
hello: 2
```

## console.warn()

打印警告信息，内容以黄色文本显示

## console.error()

打印错误信息，内容以红色文本显示

## console.table()

打印内容以表格显示

```js
const first = ["hi", "hello"];
const second = { firstName: "Darsh", lastName: "Shah" };
console.table(first);
console.table(second);
// 显示内容可以复制代码到控制台查看
```

## console.trace()

```js
function foo() {
      function bar() {
           console.trace();
      }
      bar();
}
foo();
//打印
VM59:3 console.trace
bar @ VM59:3
foo @ VM59:5
(anonymous) @ VM59:7

```

## console.time() and console.timeEnd()

console.time() and console.timeEnd()：只要我们想知道特定代码块所花费的时间，就可以使用 javascript 控制台对象给定的 time（）和 timeEnd（）方法。它们带有必须相同的标签，并且里面的代码可以是任何东西（函数，对象，特定的控制台等）。
语法

> console.time(label);
> // Your code goes here.
> console.timeEnd(label);

```js
console.time('execution');
let fun = function(){
    console.log('fun is running');
}
let fun2 = function(){
    console.log('fun2 is running..');
}
fun(); // calling fun();
fun2(); // calling fun2();
console.timeEnd('execution');
//打印
fun is running
fun2 is running..
execution: 0.157958984375 ms
```
