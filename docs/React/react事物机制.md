# react 中的 Transaction 机制

给目标函数添加一系列的前置和后置函数，对目标函数进行功能增强或者代码环境报错

源码位置 react/lib/Transaction.js

> Transaction 就是給要执行的方法 fn 用 wrapper 封裝了 initialize 和 close 方法。且支持多次封裝。再经过 Transaction 提供的 perform 方法执行。 perform 执行前，调用全部 initialize 方法。perform 方法执行后，调用全部 close 方法。

在 react 执行点击事件或者生命周期函数执行时，会使用一个 Transaction 对象将整个执行过程包裹成一个事务

原理图看下

```js
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+

```

从图中可以看出来，我们对 anyMethod 进行切片包裹，每个 wrapper 可以实现自己的 initialize 和 close，也可以嵌套使用

执行步骤说明

1. react 中用事务执行方法，就是用 wrapper 把方法包裹起来
2. 然后每个 wrapper 中都提供一个 initialize 方法和一个 close 方法
3. 当需要使用事务调用一个方法，例如上图中的 anyMethod 时，使用事务提供的 perform 方法，将需要执行的方法传入，
4. 这个时候就会按顺序执行 wrapper.initialize, anyMethod, wrapper.close
5. 而且，事务还支持多个事务的嵌套，当执行方法被多个 wrapper 包裹时，事务会先按顺序执行所有的 initialize 方法，再执行 anyMethod ，最后按顺序执行所有的 close 函数

代码执行顺序

```js
  1. wrapper1.initialize,
  2. wrapper2.initialize,
  3. anyMethod,
  4. wrapper1.close,
  5. wrapper2.close;
```

简单的概括流程 就是 初始化 执行 清理

看下 setState 批量更新流程 其实就是用到了事务

```js
initialize  设置 isBatchingUpdates = true // 开启批量更新

anyMethod    执行生命周期函数或者点击事件的setState

close      设置 isBatchingUpdates = false // 关闭批量更新 然后更新渲染

```

总结

React 的更新是基于 Transaction（事务）的，Transacation 就是给目标执行的函数包裹一下，加上前置和后置的 hook （有点类似 koa 的 middleware），在开始执行之前先执行 initialize hook，结束之后再执行 close hook，这样搭配上 isBatchingUpdates 这样的布尔标志位就可以实现一整个函数调用栈内的多次 setState 全部入 pending 队列，结束后统一 apply 了。
但是 setTimeout 这样的方法执行是脱离了事务的，react 管控不到，所以就没法 batch 了。
