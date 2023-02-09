## react 生命周期函数

react 生命周期 16 到 18 是没有变化的 变化的是生命周期函数

16.3 之前的生命周期函数 也称老的生命周期

- Intialization (初始化)
  初始化阶段主要用到 `constructor` 函数
- Mounting (挂载)

  1. componentWillMount 组件挂载到 dom 前调用
  2. render 渲染
  3. componentDidMount 组件挂载到 dom 后调用

- update （更新）

  1. componentWillReceiveProps props 发生变化 引起调用 只是 state 发生变化 则不会调用
  2. shouldComponentUpdate(nextProps, nextState) 性能优化点 通过比较 nextProps 和 nextState,来判断当前组件是否有必要继续执行更新过程。
  3. componentWillUpdate(nextProps, nextState) 组件更新前调用
  4. render
  5. componentDidUpdate(prevProps, prevState) 组件更新后调用

- UnMounting(卸载)

  1. componentWillUnmount 组件卸载前调用 （清除定时器 注册事件等等）

---

16.3 以及之后的生命周期函数 也称新的生命周期 新的生命周期图片[参考官网](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![](img/react_cycle_1.jpg)

新增了一些 生命周期函数 并且同时取消了一些生命周期函数

新增函数

- getDerivedStateFromProps
- getSnapshotBeforeUpdate

取消的生命周期函数

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

getDerivedStateFromProps 在 React v16.3 中，在创建和更新时，只能是由父组件引发才会调用这个函数，在 React v16.4 改为无论是 Mounting 还是 Updating，也无论是什么引起的 Updating，全部都会调用。

在 17.0 的版本，官方彻底废除 componentWillMount、componentWillReceiveProps、componentWillUpdate
如果还想使用的话可以使用：UNSAFE_componentWillMount()、UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate()

为什么 官方取消了这些生命周期函数呢

在 fiber 之前 react 更新是不可以中断的，但是在 fiber 架构下 react 更新是可以中断都，我们可以发现 被废弃的生命周期都是 render 前的，因为 render 前 有可能会因为 fiber 的中断 而导致函数的多次执行

componentWillMount（） 完全可以用 componentDidMount 和 constructor 来代替

getDerivedStateFromProps 是静态方法 这里不能使用 this 为了约束开发者 开发者不能写出副作用代码

## 组件通信

- 父子通信 props
- 子父通信 props+回调
- 跨层级通信 context redux 自定义通信 Event

## react-router 实现原理

- history 路由
  改变 url 可以通过 history.pushState 和 resplaceState 等，会将 URL 压入堆栈，同时能够应用 history 等 api 来操作路由
- hash 路由
  通过监听 hashchange 事件 来感知 hash 变化

react-router 是基于 history 库 来实现不同客户端等 能够保存历史记录，磨平浏览器之前的差异，通过维护列表，在 url 发生变化的时候 通过配置的路由路径去匹配到组件 展示对应的组件

## fiber

## Redux

## Hooks
