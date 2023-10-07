## new

在原型的的一篇中，我们介绍过 new，这篇我们主要看一下怎么实现 new 过程

```js
function Dog(name){
    this.name = name
}

Dog.prototype.bark = function (){
    console.log('wangwang')
}
Dog.prototype.sayName = function () {
    console.log(this.name)
}

function _new(){

}

let aDog = _new(Dog,'nameA')
aDog.brak() // wangwang
aDog.sayName() // nameA
console.log(aDog instance Dog) // true
```

题目已经给出，那么怎么实现呢，有兴趣的可以先自己尝试写一下看看。

手写过程分析

```js
// 首先我们要创建一个实例对象
// 像普通函数一样执行，让其this指向实例对象
// 没有返回值或者返回的时基本值，那么返回实例对象

function _new(Ctor, ...params) {
  let obj = {};
  obj.__proto__ = Ctor.prototype;
  // 以上这两步也可以用 let obj = Object.create(Ctor.prototype) 代替
  // Object.create([proto]):创建一个空对象，并且让创建的这个空对象的.__proto__指向[proto]  “把[proto]作为创建对象的原型”
  let result = Ctor.call(obj, ...params);
  if (
    result !== null ||
    typeof result === "object" ||
    typeof result === "function"
  )
    return result;
  return obj;
}
```

另一种写法

```js
function new1() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  var obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
```

## call 与 apply

call 和 apply 用法相似，都是用来改变函数的 this 指向
唯一不同点 apply 接受的参数是一个数组，call 是参数列表

```js
// apply语法
func.apply(thisArg, [argsArray])
// call语法
function.call(thisArg, arg1, arg2, ...)
```

### call

```js
let foo = {
  value: 1,
};
function bar() {
  console.log(this.value);
}
bar.call(foo); // 1
//本质上和下面的代码是一个效果
let foo = {
  value: 1,
  bar: function () {
    console.log(this.value);
  },
};
// 因为谁调用 this执行谁 所以这里bar中的this指向 foo
foo.bar();
// 所以我们只需要实现步骤可以分为
// 把 bar放到 foo中
// 执行 bar
// 因为foo中没有bar 还需要删除 bar
// 看下伪代码
/**
 * foo.someFn = bar
 * foo.someFn()
 * delete foo.someFn
 * **/
```

`thisArg`: 是指在`function`运行时指定的`this`

- 不传或者传 null/undefined 函数的的`this`执向 window
- 传递一个对象，函数中的 this 指向这个对象
- 值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象，如 String、Number、Boolean
- 传递另一个函数的函数名，函数中的 this 指向这个函数的引用，并不一定是该函数执行时真正的 this 值

```js
// 示例
function a() {
  //输出函数a中的this对象
  console.log(this);
}
//定义函数b
function b() {}

var obj = { name: "1231" }; //定义对象obj
a.call(); //window
a.call(null); //window
a.call(undefined); //window
a.call(1); //Number
a.call(""); //String
a.call(true); //Boolean
a.call(b); // function b(){}
a.call(obj); //Object
```

```js
// 模拟实现call
// 第一步 简单实现了this的指向
Function.prototype.call2 = function (context) {
  // this是指b这个函数 因为是b调用的call2
  context.fn = this;
  context.fn();
  delete context.fn;
};

var f = {
  value: 2,
};

function b() {
  console.log(this.value);
}

b.call2(b);

// 第二步实现接受参数
// call 接受的参数是一个列表，我们不清楚有多少，这个时候我们可以用arguments去接收参数

Function.prototype.call2 = function (context) {
  context.fn = this;
  var args = []; // 定义一个数组用来接收传进来的参数
  // 0的位置上是函数，所以从1的位置开始循环遍历
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]"); // argument[i]代表位置上的参数
  }
  eval("context.fn(" + args + ")"); // eval主要用来执行函数
  delete context.fn;
};

// 测试一下
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar.call2(foo, "kevin", 18);

// 模拟第三步
// this 参数可以传 null 或者 undefined，此时 this 指向 window
// this 参数可以传基本类型数据，原生的 call 会自动用 Object() 转换
// 函数是可以有返回值的

// 第三版
Function.prototype.call2 = function (context) {
  context = context ? Object(context) : window; //  增加了对this的判断
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result; // 增加了返回值
};

// 测试一下
var value = 2;
var obj = {
  value: 1,
};
function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}
function foo() {
  console.log(this);
}

bar.call2(null); // 2
foo.call2(123); // Number {123, fn: ƒ}
bar.call2(obj, "kevin", 18);
// 1
// {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

强烈建议自己手动敲一遍增加理解，不懂的地方可以打印一下，看看

汇总

```js
//es3
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};
//es6
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;

  let args = [...arguments].slice(1);
  let result = context.fn(...args);

  delete context.fn;
  return result;
};
```

### apply

apply 和 call 不同的就是接收参数的问题，所以我们基于之前 call 模拟实现来分析 apply 怎么接收参数就可以了

```js
// es3
Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;

  var result;
  // 判断arr参数是否存在，不存在直接执行函数，
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
// es6
Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;
  let result;
  if (!arr) {
    result = context.fn();
  } else {
    result = context.fn(...arr);
  }
  delete context.fn;
  return result;
};
```

以上的模拟实现，我需要注意一个问题我们都是默认 context 没有这个 fn 的属性，所以我们必须保证 fn 的唯一性

```js
// es6
// Symbol 可以完美解决这个问题
var fn = Symbol(); // 添加代码
context[fn] = this; // 添加代码
// es3
//循环遍历判断自身是否存在如果存在给随机数，不存在直接返回
function fnFactory(context) {
  var unique_fn = "fn";
  while (context.hasOwnProperty(unique_fn)) {
    unique_fn = "fn" + Math.random(); // 循环判断并重新赋值
  }

  return unique_fn;
}
====================================
var fn = fnFactory(context); // 修改代码
context[fn] = this; // 修改代码
```

## bind

概念：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。  
demo 主要的作用还是绑定 this

```js
this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

bind 方法与 call / apply 最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数。

想要实现一个 bind,我们要来看一下 bind 主要的功能

- 接收一个 this
- 返回一个函数
- 接收参数
- 柯里化

### 模拟实现

```js
// 绑定this 并且返回函数 第一版
Function.prototype.bind1 = function (context) {
  // this是指下面demo的bar函数
  // context 是指 foo 对象
  var self = this;
  return function () {
    return self.apply(context); // 绑定foo的this
  };
};
// 测试案例
var value = 1;
var foo = {
  value: 2,
};
function bar() {
  return this.value;
}

var ab1 = bar.bind1(foo);
console.log(ab1()); // 2
```

```js
// 接收参数 柯里化
Function.prototype.bind1 = function (context) {
  if (typeof this !== "function") {
    throw new Error("调用bind必须是一个函数");
  }
  var self = this;
  // 实现第3点，因为第1个参数是指定的this,所以只截取第1个之后的参数
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    // 实现第4点，这时的arguments是指bind返回的函数传入的参数
    // 即 return function 的参数
    // 这个arguments代表下面测试的20
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};
// 测试用例
var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  return {
    value: this.value,
    name: name,
    age: age,
  };
}
var bindFoo = bar.bind1(foo, "Jack");
console.log(bindFoo(20)); //{ value: 1, name: 'Jack', age: 20 }
```

使用 bind 绑定的函数，依然可以使用 new 去构造函数，这个时候 this 就无效了，但是参数可以
正常的使用传给函数
看下如何实现

```js
Function.prototype.bind1 = function (context) {
  if (typeof this !== "function") {
    throw new Error("调用bind必须是一个函数");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
```

另一个版本参考

```js
/*
 * 重写内置BIND：柯理化思想「预处理思想」
 */
Function.prototype.bind = function bind(context, ...outerArgs) {
  // this->fn context->obj outerArgs->[10,20]
  let self = this;
  return function (...innerArgs) {
    // innerArgs->[ev]
    self.call(context, ...outerArgs.concat(innerArgs));
  };
};

function fn(x, y, ev) {
  console.log(this, x, y, ev);
}
let obj = {
  name: "zhufeng",
};

/* document.body.onclick = function (ev) {
    fn.call(obj, 10, 20, ev);
}; */
document.body.onclick = fn.bind(obj, 10, 20);
```

参考文献：

- https://muyiy.cn/blog/3/3.3.html#call-%E5%92%8C-apply
- https://github.com/mqyqingfeng/Blog/issues/11
