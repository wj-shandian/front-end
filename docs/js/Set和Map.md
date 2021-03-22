## set map

这里不会说其详细的用法，只是自己的理解数据结构，更加详细的用法参考 阮一峰 es6 文档 https://es6.ruanyifeng.com/#docs/set-map

## Set

Set 一种新型的数据结构，类似于数据，但是成员都是唯一的，没有重复值，可以存储任意类型的值
本身是一种构造函数，基本用法

```js
new Set([iterable]);
```

经典的使用场景，数组去重

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set];
// [1, 2, 3, 4]

// 去除数组的重复成员
[...new Set(array)]

// 去除重复的字符串
[...new Set('ababbc')].join('')
// "abc"

```

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map

一种只能存储键值对的数据结构，并且不会有重复的键值对
一种 hash 表的数据存储结构

```js
const m = new Map();
const o = { p: "Hello World" };

m.set(o, "content");
m.get(o); // "content"

m.has(o); // true
m.delete(o); // true
m.has(o); // false
```

## WeakMap

WeakMap 的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

```js
const e1 = document.getElementById("foo");
const e2 = document.getElementById("bar");
const arr = [
  [e1, "foo 元素"],
  [e2, "bar 元素"],
];
```

上面代码中，e1 和 e2 是两个对象，我们通过 arr 数组对这两个对象添加一些文字说明。这就形成了 arr 对 e1 和 e2 的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放 e1 和 e2 占用的内存。

```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr[0] = null;
arr[1] = null;
```

WeakMap 就是为了解决这个问题而诞生的

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。

```js
const wm = new WeakMap();

const element = document.getElementById("example");

wm.set(element, "some information");
wm.get(element); //
```

WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

## 区别

Set

- 成员唯一、无序且不重复
- [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
- 可以遍历，方法有：add、delete、has

WeakSet

- 成员都是对象
- 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏
- 不能遍历，方法有 add、delete、has

Map

- 本质上是键值对的集合，类似集合
- 可以遍历，方法很多可以跟各种数据格式转换

WeakMap

- 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
- 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
- 不能遍历，方法有 get、set、has、delete

个人认为 WeakSet 和 WeakMap 都是为了更好的垃圾回收
