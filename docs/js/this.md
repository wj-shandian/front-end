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

## 事件绑定

不论是 DOM0 还是 DOM2 事件绑定，给元素 e 的某个事件行为绑定方法，当前事件触发方法执行，方法种的 this 是当前元素 e 本身

特殊情况:

- IE6-8 基于 attachEvent 实现 DOM2 事件绑定，事件触发方法执行，方法中的 this 不是元素本身，大部分情况是 window
- 如果使用 call/apply/bind 强制改变 this 指向，我们以改变的为主

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

- 普通函数  
  普通函数执行，看函数前面是否有点。有点 ，点前面是谁 this 就是谁，没有点 this 就是 window (严格模式是 undefined)

  fn() -> this： window/undefined  
  obj.fn() -> this:obj  
  xxx._proto_.fn() -> this:xxx._proto_

  自执行函数：this 一般是 window/undefined
  回调函数中的 this 一般也是 window/undefined

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

- 所有的箭头函数都没有 this,都是指向外层的当前函数所在的上下文的 this

- 为什么箭头函数没有自己的 this,因为箭头函数中的 this 在编译的时候会被变量替代

- 没有 arguments

- 不能被 call bind apply 改变 this 指向

```js
// 编译前书写的箭头函数
let test = {
  foo: "apple",
  getFoo() {
    return () => {
      return this.foo;
    };
  },
};

// 编译后
let test = {
  foo: "apple",
  getFoo() {
    let _this = this;
    return function () {
      return _this.foo;
    };
  },
};
```

- 为什么箭头函数内部可以使用 this,因为它会从自己的作用域链的上一层继承 this

说到箭头函数，哪些场景下是不适合用箭头函数呢？

1. 对象方法

```js
const obj = {
  name: "测试",
  getName: () => {
    // 如果要在对象方法里 使用this获取对象的某些属性 那么 不能用箭头函数 因为这个this是外层的this不是对象的this
    return this.name;
  },
};
```

2. 原型方法

```js
const obj = {
  name: "测试",
};
obj.__proto__.getName = () => {
  // 同样 这个this也不是指向obj对象
  return this.name;
};
```

3. 构造函数

```js
const Fun = (name) => {
  this.name = name;
};
new Fun("测试");
// 箭头函数不能作为构造函数
```

4. 动态上下文中的回调函数

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // 如果要在回调函数中使用 this 那么不能使用箭头函数 如果不使用 可以使用
  this.innerHTML = "测试";
});
```

5. Vue 生命周期和 method

这个就不举例了，因为写了代码就会报错

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
看到这里，你明白 this 了吗，不明白做点题目吧

## this 相关面试题

### 第一题

```js
let obj = {
  fn: (function () {
    return function () {
      console.log(this);
    };
  })(),
};
obj.fn();
let fn = obj.fn;
fn();
```

### 第二题

```js
var fullName = "language";
var obj = {
  fullName: "javascript",
  prop: {
    getFullName: function () {
      return this.fullName;
    },
  },
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());
```

### 第三题

```js
var name = "window";
var Tom = {
  name: "Tom",
  show: function () {
    console.log(this.name);
  },
  wait: function () {
    var fun = this.show;
    fun();
  },
};
Tom.wait();
```

### 第四题

```js
window.val = 1;
var json = {
  val: 10,
  dbl: function () {
    this.val *= 2;
  },
};
json.dbl();
var dbl = json.dbl;
dbl();
json.dbl.call(window);
alert(window.val + json.val);
```

### 第五题

```js
(function () {
  var val = 1;
  var json = {
    val: 10,
    dbl: function () {
      val *= 2;
    },
  };
  json.dbl();
  alert(json.val + val);
})();
```

## 答案

```js
// 第一题
obj.fn(); // this指向的是obj ,所以输出 {fn：function(){}}
let fn = obj.fn;
fn(); // 此时的fn 属于全局，相当于把函数赋值给全局变量，所以 this 是window

// 第二题
console.log(obj.prop.getFullName());
//=>this:obj.prop  =>obj.prop.fullName  =>undefined
var test = obj.prop.getFullName;
console.log(test());
//=>this:window =>window.fullName =>'language' */

// 第三题
var Tom = {
  name: "Tom",
  show: function () {
    // this->window
    console.log(this.name); //=>'window'
  },
  wait: function () {
    // this->Tom
    var fun = this.show;
    fun();
    // 此时fn执行没有其他的this 绑定，
    // fn() === fn.call(window)
  },
};

// 第四题
json.dbl();
//->this:json  ->json.val=json.val*2  ->json.val=20
var dbl = json.dbl;
dbl();
//->this:window ->window.val=window.val*2 ->window.val=2
json.dbl.call(window);
//->this:window ->window.val=window.val*2 ->window.val=4
alert(window.val + json.val); //=>"24"

// 第五题
(function () {
  var val = 1; //->2
  var json = {
    val: 10,
    dbl: function () {
      // this->json
      val *= 2; //val=val*2  此处的val是变量  json.val是对象的属性
    },
  };
  json.dbl();
  alert(json.val + val); //=>"12"
})();
```
