许久未用，重温 react

## hook

一直在听说，从未在使用，随着技术栈的转变，重新学习 react，从 hook 开始，先整体熟悉使用方法，技巧。再入手原理

## useState

看个官方的 demo

```js
import React, { useState } from "react";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

useState 可能是我们使用最多的 hook，他是用来定义 state 的变量，并且包含一个更新 state 变量的方法，使用比较简单

```js
// id 是变量 updateId是更新方法，名字可以随意取 0是初始值
const [id, updateId] = useState("0");
```

## useEffect

官方 demo

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

react 函数式组件是没有生命周期的，没有 hook 的时候，函数式组件都是无状态的组件，hook 的加入让函数式组件发光发热了。

`useEffect`可以看成 `componentDidMount` `componentDidUpdate` `componentWillUnmount`三个生命周期的结合

初始化的时候我们想调用一些方法

```js
import React, { useState, useEffect } from "react";
function init() {
  const initData = () => {
    console.log("初始化加载");
  };
  useEffect(() => {
    initData();
  });
  return <div></div>;
}
```

设置了一些定时器的方法或者监听方法，需要在卸载掉时候清除掉，只需要 return 一个函数执行清除方法即可

例如

```js
import React, { useState, useEffect } from "react";
function init() {
  const initData = () => {
    console.log("初始化加载");
  };
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {}, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return <div></div>;
}
```

如果我们只想初始化只加载一次，后面数据更新不再执行方法 加空数组即可 []

```js
useEffect(() => {}, []);
```

还可以监听一些字段，如果这个字段修改了，那么就执行函数方法

```js
const [id, updateId] = useState(0);
useEffect(() => {
  console.log("id更新了");
}, [id]);
```

`useEffect` 还可以写多个

## useCallback

useCallback 是用来缓存函数的，使用 useCallback 包裹函数，那么只有当函数依赖的项改变了，那么函数才会更新

官方解释

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用

返回一个 memoized 回调函数。

```js
import React, { useState, useEffect, useCallback } from "react";
function init() {
  const [id, updateId] = useState(0);
  const initData = useCallback(() => {
    console.log("被缓存的函数");
  }, [id]); //依赖项 id
}
```

## useMemo

useMemo 和 useCallback 是很相似的

useMemo 是缓存值 而 useCallback 是缓存函数

官方解释

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

返回一个 memoized 值。

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo 和 useCallback 其实都是一种优化手段

## useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

最常用的可能就是挂载在节点上，然后操作 dom

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

并且 react 还提供了另一个方法 useImperativeHandle 可以让父组件调用子组件暴露出来的参数或者方法

看个 demo

```js
// 父组件
import React, { useRef} from 'react';
import Children from 'children'
function parent(){
    const inputRef = useRef(null)
    // 获取子组件参数方法  ref.current
    const { phone, code } = ref.current.data;
    return <Children ref={inputRef}>
}
```

```js
// 子组件
import React, { useRef, useImperativeHandle, forwardRef } from "react";
export default forwardRef((props， ref) => {
    // 暴露参数给父组件 也可以暴露方法
    useImperativeHandle(ref, () => {
    return {
      data: {
        id:'0'
      },
    };
})
```

## useReducer

当我们定义一些 state 的时候，更新方法不是简单的更新值，需要一些很复杂的方法，那么我们就可以使用 useReducer

官方 demo

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```
