## this

按照惯例，先看一段代码

## 看一段代码

```js
var name = "222";
var a = {
  name: "111",
  say: function () {
    console.log(this.name);
  },
};
var fun = a.say;
fun();
a.say();

var b = {
  name: "333",
  say: function (fn) {
    fun();
  },
};

b.say(a.say);
b.say = a.say;
b.say();

// 题目来源于网络 并非自创
```

你能一眼看出输出答案吗？如果可以那么我相信 this 概念你已经理解的很透彻了，如果你不懂输出内容，请接着向下看，相信你会有所收获

## 什么是 this

MDN 上是这样说的：在绝大多数情况下，函数的调用方式决定了 this 的值

ECMAScript 规范中这样写：his 关键字执行为当前执行环境的 ThisBinding。

按照自己的理解翻译一下：在 JavaScript 中，this 的指向是调用时决定的，而不是创建时决定的，这就会导致 this 的指向会让人迷惑，简单来说，this 具有运行期绑定的特性。

## 调用位置

首先需要理解调用位置，调用位置就是函数在代码中被调用的位置，而不是声明的位置

```js
function baz() {
  console.log("baz");
  bar();
}
function bar() {
  console.log("bar");
  foo();
}
function foo() {
  console.log("foo");
}
baz();
```

- 对于 foo()：调用位置是在 bar()中。
- 对于 bar()：调用位置是在 baz()中。
- 而对于 baz()：调用位置是全局作用域中。

可以看出，调用位置应该是当前正在执行的函数的前一个调用中

## 全局上下文 this

很好理解，全局上下文的 this 实际上就是 window

```js
console.log(window === this); // true
var a = 1;
this.b = 2;
window.c = 3;
console.log(a + b + c); // 6
```

## 函数上下文 this

在函数内部，this 的值取决于函数被调用的方式。

### 直接调用

this 指向全局变量，如果当前函数处于全局变量种

```js
function foo() {
  return this;
}
console.log(foo() === window); // true
```

### call()、apply()

this 指向绑定的对象

```js
var person = {
  name: "axuebin",
  age: 25,
};
function say(job) {
  console.log(this.name + ":" + this.age + " " + job);
}
say.call(person, "FE"); // axuebin:25
say.apply(person, ["FE"]); // axuebin:25
```

可以看到，定义了一个 say 函数是用来输出 name、age 和 job，其中本身没有 name 和 age 属性，我们将这个函数绑定到 person 这个对象上，输出了本属于 person 的属性，说明此时 this 是指向对象 person 的。

### bind()

this 将永久地被绑定到了 bind 的第一个参数。

## 作为对象的一个方法

this 指向调用函数的对象

```js
var person = {
  name: "axuebin",
  getName: function () {
    return this.name;
  },
};
console.log(person.getName()); // axuebin
```

这里有一个需要注意的地方。。。

```js
var name = "xb";
var person = {
  name: "axuebin",
  getName: function () {
    return this.name;
  },
};
var getName = person.getName;
// getName 在全局环境中，此时this指向window 所以输出 xb
console.log(getName()); // xb
```

发现 this 又指向全局变量了，这是为什么呢？

还是那句话，this 的指向得看函数调用时。

## 作为构造函数

通过构造函数创建一个对象其实执行这样几个步骤：

- 创建新对象
- 将 this 指向这个对象
- 给对象赋值（属性、方法）
- 返回 this
- 所以 this 就是指向创建的这个对象上。

```js
function Person(name) {
  this.name = name;
  this.age = 25;
  this.say = function () {
    console.log(this.name + ":" + this.age);
  };
}
var person = new Person("axuebin");
console.log(person.name); // axuebin
```

## 箭头函数

所有的箭头函数都没有 this,都是指向外层的当前函数所在的上下文的 this

## 题解分析

看过上面的几种 this 场景，对于开始的题目是不是豁然开朗了呢，来分析一下

```js
var name = "222";
var a = {
  name: "111",
  say: function () {
    console.log(this.name);
  },
};
var fun = a.say;
fun(); // 此时fun处于全局环境中，也就是全局环境调用这个方法，谁调用this指向谁，所以打印 222
// fun() === fun.call(window)  fun相当于是语法糖
a.say(); // 此时函数处于a对象中，所以 this指向 a对象 所以打印 111
// a.say() === a.say.call(a)
var b = {
  name: "333",
  say: function (fn) {
    fn(); // 此时fn执行没有其他的this 绑定，
    // fn() === fn.call(window)
    // a.say() === fn() === fn.call(window) === a.say.call(window)
  },
};

b.say(a.say); // 打印 222
b.say = a.say;
// b.say = a.say 相当于
// var b = {
//     name: '333',
//     say:function(){
//         console.log(this.name)
//     }
// }
b.say(); // 打印 333
```

ps: 有些内容来源网络，忘记

最后结果： 222 111 222 333
看到这里，你明白 this 了吗 不明白联系我
