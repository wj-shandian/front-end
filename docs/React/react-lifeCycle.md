先概览一下 react 的生命周期
![](img/react-lifeCycle.jpg)

react 生命周期主要有两个重要的阶段 render 阶段和 commit 阶段

## 类组件生命周期初始化阶段

1.constructor 执行

constructor 执行是在类组件创建实例时调用，而且初始化的执行一次，如果不需要初始化 state 或者不尽兴方法绑定，那么不需要为组件实现构造函数

主要的作用：

- 初始化 state
- 对类组件的一些事件做处理，比如防抖截流等

  2.getDerivedStateFromProps 执行

getDerivedStateFromProps 是第二个执行的生命周期，并且接收两个参数 props, state，它是作为类的静态属性内部事无法访问 this 的，它会犯浑一个对象更新 state，如果返回 null，则不更新任何内容，这个方法只适用一些特殊的场景，即 state 的值受到 props 的影响

主要的作用：

- 代替 componentWillMount 和 componentWillReceiveProps
- 组件初始化 映射 props 到 state 上

  3.componentWillMount 执行

如果存在 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 就不会执行生命周期 componentWillMount

在 16.3 版本之后，官方已经不建议使用 componentWillMount ，componentWillReceiveProps ， componentWillUpdate 三个生命周期，但是还没有完全废除

4.render 执行

render 函数主要是 jsx 元素被 React.createElement 创建成 React.element 对象的形式，

5.componentDidMount 执行

componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方

主要作用：

- 可以操作 DOM 或者 DOM 的事件监听
- 服务器请求数据，渲染视图

初始化流程图

![](img/initCycle.png)

## 类组件生命周期更细阶段

1.componentWillReceiveProps

首先会判断 getDerivedStateFromProps 是否存在，如果存在那么不会执行 componentWillReceiveProps

2.getDerivedStateFromProps  
3.shouldComponentUpdate
4.componentWillUpdate
5.render
6.getSnapshotBeforeUpdate
7.componentDidUpdate
