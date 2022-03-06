- 高阶组件 函数接受一个组件并返回一个组件

- 函数组件 如果想实现类组件的 forceupdate 方法 可以写一个 useReducer 保证两次的值不相同 就可以出发页面重新渲染

# 基本使用方法

## 为什么要使用 react-redux

其实 react-redux 官网已经说明了。我们来总结一下。

- 首先 redux 本身是一个单独的库 可以和任何框架和 UI 层面一起使用 是不受限制的。
- `react-redux`是`react`官方绑定 reactUI，React Redux 在内部实现了许多性能优化，以便您自己的组件仅在实际需要时重新渲染。
- 通过在 React 组件树中连接多个组件，可以确保每个连接的组件仅从需要的组件中取特定的数据，这将减少一些不必要的渲染

## react-redux 的基本使用

- 首先创建一个 store

```js
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

export const store = createStore(counter);
```

- 在根组件添加 store

```js
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- class 组件想要使用 需要使用 connect
  connect 就是一个高阶组件

```js
import { connect } from "react-redux";
class ReactRedux extends React.Component {
  render() {
    console.log(this.props, "this.props");
    const { state, add, dispatch } = this.props;
    return (
      <div>
        <div>{state}</div>
        <button onClick={() => add({ type: "INCREMENT" })}>+1</button>
        <div>---------------------------</div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  state,
  ownProps,
});
export default connect(mapStateToProps, (dispatch) => {
  return {
    dispatch,
    add: () => dispatch({ type: "INCREMENT" }),
  };
})(ReactRedux);
```

- 函数组件使用方法

```js
import { connect, useSelector, useDispatch } from "react-redux";
function ReduxHook() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  return (
    <div>
      <div>{state}</div>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
}
```

# 原理

## Provider 的实现

其实这个 Provider 也是利用了 `react context`

```js
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

// 创建Context
const Context = React.createContext();

export function Provider({ store, children }) {
  // 利用context 传递参数的属性 方便组件使用数据
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
```

## connect

connect 其实是针对 class 组件使用的 函数组件有对应的 hook 使用更加方便

看下 connect 使用方法，

```js
export default connect(mapStateToProps, (dispatch) => {
  return {
    dispatch,
    add: () => dispatch({ type: "INCREMENT" }),
  };
})(ReactRedux);
```

接收两个参数 mapStateToProps ，mapDispatchToProps 还有一个组件，

```js
function useForceUpdate() {
  const [, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
}

export const connect =
  (
    mapStateToProps = (state) => state,
    mapDispatchToProps // 可能是 undefind null object function
  ) =>
  (Component) =>
  // 这个props是组件本身携带的参数
  (props) => {
    // 获取store
    const store = useContext(Context);
    const getState = store.getState;
    // 获取所有的state
    const stateProps = mapStateToProps(getState());

    let dispatchProps = {};
    const { dispatch, subscribe } = store;
    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(store.dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      dispatchProps = { ...mapDispatchToProps, dispatch };
    } else {
      dispatchProps = { dispatch };
    }
    // 触发更新
    const forceUpdate = useForceUpdate();

    // const [, forceUpdate] = useReducer(x => x + 1, 0); 也可以这样写  函数组件如果要想更新 只需要让state值改变 就会触发render
    // 虽然我们接受的组件是class，因为我们这个是高阶组件 所以 connect也是组件 函数组件 所以可以用上面的方式触发render

    // useLayoutEffect useEffect
    // useLayoutEffect 是同步的  useEffect是异步的  这里使用useLayoutEffect是防止某些异常情况导致注册或者取消注册有异常

    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [store]);

    return (
      // stateProps dispatchProps 传给组件  这样组件中就可以通过props获取到 redux中的state和dispatch
      <Component {...props} {...stateProps} {...dispatchProps}></Component>
    );
  };
```

## 看下函数组件相关 api 的实现

函数组件主要两个 api useSelector（获取 state）,useDispatch （获取 dispatch）

这两个实现也比较简单 只是简单获取 返回值即可

```js
export function useStore() {
  const store = useContext(Context);
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return store;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

export function useSelector(selector) {
  const store = useStore();
  const selectState = selector(store.getState());
  return selectState;
}
```

使用方法 可以自己新建一个文件 把上面的相关 api 相关写法 放到文件 然后 到处相关的 api 在 之前 react-redux 引用的地方替换成自己的 文件路径

当然 这里只是一些简单的实现 帮助 了解 react-redux 原理 ，不够完善 可能会有 bug 勿喷
