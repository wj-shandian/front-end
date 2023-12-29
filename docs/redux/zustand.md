# zustand

## 基本使用

安装

`npm i zustand`

创建 store

```js
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```

绑定组件

```js
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

异步操作

```js
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))
```

中间件的使用

```js
// Log every time state is changed
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api,
  )

const useBeeStore = create(
  log((set) => ({
    bees: false,
    setBees: (input) => set({ bees: input }),
  })),
)
```

zustand与redux的比较

1. 状态更新的方式：在zustand中，状态更新是通过直接修改状态对象来实现的，而在redux中，状态更新是通过派发action来实现的。这使得zustand在使用上更加简单直观，而redux则更加严格遵循了单向数据流的原则。

2. 状态容器的管理：zustand中的状态容器是通过闭包来创建的，而redux中的状态容器是通过创建一个单一的store来实现的。这使得zustand在多个状态之间的切换和管理上更加灵活，而redux则更加适用于大型和复杂的应用程序。

3. 中间件的扩展性：zustand支持使用中间件函数来扩展状态管理的功能，这使得我们可以轻松地实现日志记录、持久化等功能。而redux则通过使用中间件来实现对action的拦截和处理，具有更高的灵活性和可扩展性。

结论：
zustand作为一种新兴的状态管理库，通过其简单直观的使用方式、灵活的状态管理和可扩展的中间件机制，为我们提供了一种全新的状态管理方案。相比之下，redux则更加注重遵循严格的单向数据流原则和可预测的状态管理。根据具体的项目需求和团队实际情况，我们可以选择适合的状态管理库来提高开发效率和代码质量。

## 分析一下源码的实现

zustand是基于发布订阅模式的响应式

```js
import { useSyncExternalStore } from "react";

const createStore = (createState) => {
    let state;
    const listeners = new Set();
  
    const setState = (partial, replace) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial

      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  
    const subscribe= (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  
    const api = { setState, getState, subscribe, destroy }

    state = createState(setState, getState, api)

    return api
}

function useStore(api, selector) {
    function getState() {
        return selector(api.getState());
    }
    
    return useSyncExternalStore(api.subscribe, getState)
}

export const create = (createState) => {
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}


/**
 * 以这里例子描述下 流程
const useBearStore = create((set,get,api) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

1. 首先create传入一个函数 然后 把函数传入 createStore 然后函数接受  setState, getState, api 三个参数 上面的 set get api 就是指这三个参数
2. 然后把这个对象保存在 state  上 
{
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}

3. 然后把 api 返回出去 

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

4. useBoundStore 是一个函数 在这里可以看作是 useBearStore 然后我传入一个函数  (state) => state.bears

5. (state) => state.bears 对应代码中的 selector  把  selector函数 和 api传入  useStore

6. api.getState() 获取当前的 state ，selector === (state) => state.bears  所以 api.getState() 实际上就是 state 参数 

7. useSyncExternalStore会执行api.subscribe，并传入一个函数，当store中状态发生变更时，执行这个函数，便可以触发组件的更新。

8. 通过 useSyncExternalStore 触发更新并且返回当前的 state

9. 所以 可以获得 bears 参数

以上就是 zustand的 大致流程。
*/

```
