js 重载

重载的概念还是在 ts 中学习到的，但是一直没有深入理解，直到偶然看到关于 js 重载的文章 决定深入了解一下

## 重载

> 重载，简单说，就是函数或者方法有相同的名称，但是参数列表不相同的情形，这样的同名不同参数的函数或者方法之间，互相称之为重载函数或者方法。

因为 js 重名函数 后面的会覆盖前面的，并且 js 不会对传入的参数限制类型 所以说 本身 js 是不支持重载的，但是我们可以模拟 js 重载的情况

## js 重载

简单的理解 重载 同样的函数 不同的参数 执行 不同的代码

看个例子

```js
function getInfo(name) {
  console.log(`我的名字是 ${name}`);
}
function getInfo(name, age) {
  console.log(`我的名字是 ${name} 我${age}岁了`);
}
function getInfo(name, age, sex) {
  console.log(`我的名字是 ${name} 我${age}岁了 性别${sex}`);
}

getInfo("章三"); // 我的名字是 章三
getInfo("章三", "32"); // 我的名字是 章三  我 32 岁了
getInfo("章三", "32", "男"); // 我的名字是 章三  我 32 岁了 性别 男

// 这是我们想要的打印结果 这就是重载 但是事实上 后面的函数会覆盖前面的，所以我们看下 怎么能实现这种
```

实现方式一

根据参数个数 然后输入对应的内容

```js
function getInfo() {
  switch (arguments.length) {
    case 1:
      var [name] = arguments;
      console.log(`我是${name}`);
      break;
    case 2:
      var [name, age] = arguments;
      console.log(`我是${name},我${age}岁`);
      break;
    case 3:
      var [name, age, sex] = arguments;
      console.log(`我是${name},我${age}岁,性别${sex}`);
      break;
  }
}
```

虽然这种方式 但是不是最优解 而且不符合开放封闭原则 如果后续要增加数量 还要修改 函数

实现方式二

```js
function addMethod(object, name, fn) {
  var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
  object[name] = function () {
    // 重写了object[name]的方法
    // 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
      // 否则，判断old是否是函数，如果是，就调用old
    } else if (typeof old === "function") {
      return old.apply(this, arguments);
    }
  };
}

addMethod(window, "fn", (name) => console.log(`我是${name}`)); // 第一次添加时 重写 window.fn 方法
addMethod(window, "fn", (name, age) => console.log(`我是${name} 我${age}岁`)); // 第二次添加时 重写 window.fn 方法 并且 old 为第一次 window.fn 参数时一个
addMethod(
  window,
  "fn",
  (name, age, sex) => console.log(`我是${name},我${age}岁,性别${sex}`) // 第三次添加 window.fn old 为第二次的 window.fn
);

/*
 * 实现效果
 */

window.fn("章三"); // 我的名字是 章三
window.fn("章三", "32"); // 我的名字是 章三  我 32 岁了
window.fn("章三", "32", "男"); // 我的名字是 章三  我 32 岁了 性别 男
```

主要是利用闭包的特性 保存 可以保存 每一步的方法 一步一步 查找 参数和函数入参相同的 函数 然后执行

## ts 重载

函数重载 ，以官方的例子 做个说明

```js
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let test = pickCard(myDeck) // 首选传入的是  myDeck 所以 定义 第一个  function pickCard(x: {suit: string; card: number; }[]): number;
let pickedCard1 = myDeck[test]; // 接着传入  test 是个一个数子 所以 定义第二个  function pickCard(x: number): {suit: string; card: number; };
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

所以本质上是检查 多种重载签名 + 函数体（执行逻辑）

简单的理解 就是把 pickCard 所有的入参和出参 类型都定义 再加上 一个函数体 执行逻辑就是重载
