## 安装

`npm install --save redux`

本文只写 redux 关于 react-redux 后面的文章会单独去写

## 概念

![](img/redux.png)

先看这张图，按照步骤先解释一下 然后有个概念

- 首先用户发起一个 action（使用 dispatch）

- 然后 store 掉起一个 reducer 传入两个参数 当 state 接收到 action 然后会返回一个新的 state

- 一但产生新的 state 那么我们需要及时去通知 监听者

## API

- store 是保存数据的地方 我们可以看成一个容器 整个应用只能有一个 store。

store 是靠 redux 提供的 createStore 生成的

```jsx
import { createStore } from "redux";

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter);
```

- store.dispatch 是触发 action 的唯一方法

- store.subscribe 是用来注册监听 一旦 state 发生变化 那么我们要更新页面数据

- action 是一个对象 其中 type 属性是必须的，代表 action 的名字

```js
const action = {
  type: "INCREMENT",
  payload: 1,
};
```

- reducer 是一个纯函数 ，纯函数的一个特征 同样的输入 一定会有同样的输出

## 看个例子 学习 redux 的基本用法

看不懂的也可以去官方的 demo 学习理解

```jsx
import React from "react";
import { createStore } from "redux";

// 创建一个reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
// 创建一个store
let store = createStore(counter);

class ReduxDemo extends React.Component {
  add = () => {
      // 触发action
    store.dispatch({ type: "INCREMENT" });
  };
  componentDidMount() {
      // 注册监听
    this.unsubscribe = store.subscribe(() => {
        // 更新render
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
      // 销毁注册
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  render() {
    return (
      <div>
         {// 获取state}
        <div>{store.getState()}</div>
        <button onClick={this.add}>这是+1的按钮</button>
      </div>
    );
  }
}

```

## 实现一个自己的 redux

先实现基本的功能 然后再逐渐完善

- 第一步 创建一个 `createStore` 函数

createStore 函数 返回一个对象 分别是 getState dispatch subscribe

```js
export function createStore(reducer) {
  let currentState;
  let currentListeners = [];

  function getState() {}

  function dispatch(action) {}
  function subscribe(listener) {}

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

然后我去实现函数的功能 getState 是获取当前 state 所以我们直接返回当前定义的 currentState 即可

- getState

```js
function getState() {
  return currentState;
}
```

注册是收集监听者 注意有注册就要有解绑

- subscribe

```jsx
currentListeners.push(listener);
return () => {
  const index = currentListeners.indexOf(listener);
  currentListeners.splice(index, 1);
};
```

触发 action

- dispatch

```js
// reducer是createStore接收的一个reducer
function dispatch(action) {
  currentState = reducer(currentState, action);
  currentListeners.forEach((item) => item()); // 通知监听者
}
```

这样一个简易的 redux 就写好了

代码汇总

```js
function createStore(reducer) {
  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    console.log(reducer, action, "reducer");
    currentState = reducer(currentState, action);
    currentListeners.forEach((item) => item());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }
  // 这一步是为了让当前的state有初始值 type可以随意设置  只要保证不会和外部冲突即可
  dispatch({ type: "redux/1235" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

感兴趣的可以自己试试

未完待续。。。
