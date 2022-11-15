## Promise/A+ 规范概要

英文官网：https://promisesaplus.com/

- promise 必须要有三个状态 pending(等待)\fulfilled(成功)\rejected(失败)
- new promise 时需要传递一个 executor()执行器，执行器立即执行
- executor 接收参数，分别时 resolve 和 reject
- promise 的默认状态是 pending
- promise 有一个 value 保存成功状态的值 可以是 undefined/thenable/promise
- promise 有一个保存 reason 保存失败的状态
- promise 只能从等待状态变成成功状态或者失败状态，状态一旦确定不可以修改
- promise 必须有一个 then 方法 then 接受两个参数，分别是成功回调和失败的回调
- 如果 then 出现了异常，那么这个异常会传递给下一个 then 的是失败回调

## 实现基础功能的版本

```js
const pending = "pending"; // 等待状态
const fulfilled = "fulfilled"; // 成功
const rejected = "rejected"; // 失败
class PromiseA {
  constructor(executor) {
    // 默认状态
    this.status = pending;
    // 保存成功状态
    this.value = undefined;
    // 保存失败状态
    this.reason = undefined;

    // 调用成功方法
    let resolve = (value) => {
      if (this.status === pending) {
        this.status = fulfilled;
        this.value = value;
      }
    };

    // 调用失败的方法

    let reject = (value) => {
      if (this.status === pending) {
        this.status = rejected;
        this.reason = value;
      }
    };
    try {
      console.log(executor);
      // (resolve, reject) => {resolve("成功");}
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }
  // then 方法
  then(onFulfilled, onRejected) {
    if (this.status === fulfilled) {
      onFulfilled(this.value);
    }
    if (this.status === rejected) {
      onRejected(this.reason);
    }
  }
}
const promise = new PromiseA((resolve, reject) => {
  resolve("成功");
}).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

基础版本只处理了同步代码，遇到异步的代码就歇菜了，基础版本代码也比较容易理解，不明白跟着敲一遍相信会有所领悟

## 处理异步状态

```js
const pending = "pending"; // 等待状态
const fulfilled = "fulfilled"; // 成功
const rejected = "rejected"; // 失败
class PromiseA {
  constructor(executor) {
    // 默认状态
    this.status = pending;
    // 保存成功状态
    this.value = undefined;
    // 保存失败状态
    this.reason = undefined;
    // 保存成功的回调
    this.onResolveCallBack = [];
    // 保存失败的回调
    this.onRejectCallBack = [];

    // 调用成功方法
    let resolve = (value) => {
      if (this.status === pending) {
        this.status = fulfilled;
        this.value = value;
        this.onResolveCallBack.forEach((fn) => fn());
      }
    };

    // 调用失败的方法

    let reject = (value) => {
      if (this.status === pending) {
        this.status = rejected;
        this.reason = value;
        this.onRejectCallBack.forEach((fn) => fn());
      }
    };
    try {
      console.log(executor);
      // (resolve, reject) => {resolve("成功");}
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }
  // then 方法
  then(onFulfilled, onRejected) {
    if (this.status === fulfilled) {
      onFulfilled(this.value);
    }
    if (this.status === rejected) {
      onRejected(this.reason);
    }
    if (this.status === pending) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolveCallBack.push(() => {
        onFulfilled(this.value);
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectCallBack.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
const promise = new PromiseA((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 1000);
}).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

这一版本理解也比较容易，让我执行 then 的时候 我们遇到异步任务 ，就把异步任务存贮起来，
执行成功操作或者失败操作，再执行相应的函数即可

## 链式调用

```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};

class PromiseA {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // 增加一个catch捕获错误
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  then(onFulfilled, onRejected) {
    //解决 onFufilled，onRejected 没有传值的问题
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new PromiseA((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}
const promise = new PromiseA((resolve, reject) => {
  resolve("失败");
})
  .then(
    (res) => {
      console.log("第一次调用", res);
      return res;
    },
    (err) => {
      console.log("error:", err);
    }
  )
  .then(
    (res) => {
      console.log("第二次调用", res);
      return res;
    },
    (err) => {
      console.log("err", err);
    }
  )
  .then(
    (res) => {
      console.log("第三次调用", res);
    },
    (err) => {
      console.log("err", err);
    }
  );
```

链式调用没看明白，记录一下 ，慢慢研究，难过

现在看懂了 -- 2022 年

## promise.all 的实现

实现并发，获取多个异步结果，有一个失败则都失败

```js
Promise.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values;
    return new TypeError(`TypeError: ${type} ${values} is not iterable`);
  }
  return new Promise((resolve, reject) => {
    let resultArr = [];
    let orderIndex = 0;
    const processResultByKey = (value, index) => {
      resultArr[index] = value;
      if (++orderIndex === values.length) {
        resolve(resultArr);
      }
    };
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then((value) => {
          processResultByKey(value, i);
        }, reject);
      } else {
        processResultByKey(value, i);
      }
    }
  });
};
```

测试

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok1");
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("ok2");
  }, 1000);
});

Promise.all([1, 2, 3, p1, p2]).then(
  (data) => {
    console.log("resolve", data);
  },
  (err) => {
    console.log("reject", err);
  }
);
```

## promise.race

谁先完成用谁的

```js
Promise.race = function (promises) {
  promises = Array.isArray(promises) ? promises : [];
  return new Promise((resolve, reject) => {
    // 一起执行就是for循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i];
      if (val && typeof val.then === "function") {
        val.then(resolve, reject);
      } else {
        // 普通值
        resolve(val);
      }
    }
  });
};
```

## promise.any

```js
// 只要有一个成功就成功 全部失败才失败
Promise.any = function (values) {
  values = Array.isArray(values) ? values : [];
  return new myPromise((resolve, reject) => {
    let length = values.length;
    const err = [];
    if (length === 0)
      return reject(new AggregateError("all promise is reject"));
    values.forEach((item) => {
      if (item && typeof item.then === "function") {
        item.then(
          (res) => {
            resolve(res);
          },
          (error) => {
            length--;
            err.push(error);
            if (length === 0) {
              reject(new AggregateError(error));
            }
          }
        );
      } else {
        resolve(item);
      }
    });
  });
};
```

## promise.allSettled

```js
// 全部结束才结束
Promise.allSettled = function (values) {
  values = Array.isArray(values) ? values : [];
  let length = values.length;
  const result = [];
  if (length === 0) return reject(new AggregateError("promise array is empty"));
  return new myPromise((resolve, reject) => {
    values.forEach((item) => {
      if (item && typeof item.then === "function") {
        item.then(
          (res) => {
            result.push(res);
            length--;
            if (length === 0) resolve(result);
          },
          (err) => {
            result.push(err);
            length--;
            if (length === 0) resolve(result);
          }
        );
      } else {
        result.push(item);
        length--;
        if (length === 0) resolve(result);
      }
    });
  });
};
```

## promise.resolve

```js
Promise.resolve = function (value)=>{
  return new myPromise((resolve,reject)=>{
    resolve(value)
  })
}
```

## promise.reject

```js
Promise.reject = function (value)=>{
  return new myPromise((resolve,reject)=>{
    reject(value)
  })
}
```

## promise.finally

```js
Promise.finally = function (fn) {
  return this.then(
    (value) => {
      fn();
      return value;
    },
    (reason) => {
      fn();
      throw reason;
    }
  );
};
```

## 参考文章

https://zhuanlan.zhihu.com/p/183801144  
https://promisesaplus.com/
