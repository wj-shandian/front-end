<!-- ## 一道睡不着的面试题

这是再掘金看到的一道面试题目，开始看了半天没有看明白，最后终于看明白了

这段代码输出什么

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
console.log(-1);
``` -->

<!-- - 开始 第一个 promise.resolve().the()微任务 进入队列
- 然后第二个 promise.resolve().the()微任务 进入队列
- 打印 -1 这个时候已经没有同步代码了，则需要执行微任务
- 执行微任务，打印第一个 0 (在 then return 会返回一个 promise,所以 `return Promise.resolve(4);`返回会再包裹一层 promise)
- 执行第二个微任务 打印 1，此时微任务都执行结束
- 接着执行第一个 Promise.resolve 第二个 then，也是一个微任务 压入队列,接着执行官 第二个 Promise.resolve 第二个 then 也压入队列，
- 执行现在队列中的第一个微任务，此时会遇到 promise 形成一个新的微任务队列 ，第二个微任务打印 2，这个时候队列为空

- 第一个 Promise.resolve 已经没有 then 但是第二个 Promise.resolve 还有 then,于是第三个 then 进入微任务队列 -->

## Promise 检测图片

检测图片是否加载成功，成功就正常显示，失败就展示默认图片

```js
import Vue from "vue";
// 图片失败指令, 因为口袋贵金属用户有些头像无法显示
// 全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive("gkoudai-avatar-img", async function (el) {
  // 指令名称为：real-img
  let imgURL = el.getAttribute("src"); // 获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (!exist) {
      el.setAttribute("src", "url");
    }
  }
});

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete === true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function () {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
```

休眠的实现方法

```js
function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}
// 用法
async function one2FiveInAsync() {
  for (let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}
one2FiveInAsync();
```

## 基本用法

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

new Promise 的时候会立即执行 executor 函数 「同步」

- resolve 执行：修改 promise 实例的状态 fulfilled/resolved，成功的结果就是传递的实参信息
- reject 执行：修改 promise 实例的状态 rejected，失败的原因也是传递的实参信息

执行 then 方法只是把 onfulfilled/onrejected 函数保存起来 「同步」，但是此时还没有执行，当 promise 状态变为成功或者失败的时候，才会去触发执行对应的函数 「异步->微任务」

有一点需要注意，如果是 new Promise 那么是立刻执行里面的代码 resolve 和 reject 才是微任务

## async/await

async:修饰函数，最后默认让函数返回一个 promise 实例（函数执行报错，实例状态是失败，结果是报错原因；否则实例状态是成功，结果是 return 后面的值） ->一般都是配合 await 的「函数中使用 await，则必须基于 async 修饰才可以」

await 后面的代码都是异步微任务

await “promise 实例”：如果设置的不是 promise 实例

- 正常的值 await 10 -> await Promise.resolve(10)
- 函数执行 await xxx() -> 首先立即执行 xxx 函数，接收它的返回值 -> await 返回值

本身是异步微任务：把当前上下文中 await 下面要执行的代码整体存储到异步的微任务中，当 await 后面的 promise 实例状态为成功后，再去执行下面的代码(也就是那个异步的微任务)

```js
function computed() {
  console.log(1);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}
console.log(3);
async function fn() {
  console.log(4);
  let result = await computed();
  console.log(result);
  console.log(5);
}
fn();
console.log(6);
```

async/await 的错误需要设置 try/catch 来捕获

```js
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error("出错了");
    });
  } catch (e) {}
  return await "hello world";
}
```

如果 await 执行的代码一直死循环或者占用主线程 那么后面的代码将无法执行，一直等待 await 执行完才可以执行后面的代码

## Promise.prototype.finally()

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
 }；
```

不管最后是成功还是失败都会执行 finally 中的 callback 这个我们可以把成功或者失败后需要操作的代码都拿到 finally 中去写

## Promise.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
`const p = Promise.all([p1, p2, p3]);`
p1,p2，p3 的状态都成功了，那么 p 的状态才成功，否则有一个失败了那么 p 的状态就会失败

## Promise.race()

和 Promise.all()很相似，不同点是，接受多个 promise 实例，有一个成功那么 p 的状态就是成功的，率先成功的，会把结果传递给 p 的回调函数

## Promise.allSettled()

这个是 ES2020 新添加的属性，接受一组 Promise 实例，等待所有实例都完成，那么 p 的状态才会改变，有时候我们只关系我们的操作是否结束，不关心结果，all()就不太好用，那么 allSettled 就会比较符合场景

## Promise.any()

接收一组 promise 实例，只要有一个实例 成功了那么 p 状态就是成功的，只有当所有状态都失败了，那么 p 的状态才会失败

## Promise.try()

让同步函数同步，让异步函数异步，更好的处理结果和错误，不用管自己代码是异步还是同步

```Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

try catch 无法捕获 promise reject 抛出的错误
