# useToggle

## 新建

在 hooks 目录下新建 src 在 src 目录下新建 useToggle.ts 和 index.md 以及 单元测试的目录 `__tests__` 和 文档所需要的 demo 目录

## index.ts

代码较少 直接添加一些注释即可

useToggle 功能描述：主要的功能是两个状态值之前的切换

可以传参数 也可以不传参数

```ts
import { useState, useMemo } from "react";

// 定义Action的接口
export interface Action<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

// 这三个函数的定义是 TS的重载，定义函数接收参数的类型和返回值的类型
function useToggle<T = Boolean>(): [boolean, Action<T>];

function useToggle<T>(defaultValue: T): [T, Action<T>];

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U
): [T | U, Action<T | U>];

// 类型断言的方式将一个值从 unknown 类型转换为 D 类型，并将默认值设为 false 。
function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R
) {
  const [state, setState] = useState<D | R>(defaultValue);
  const reverseValueOrigin = (
    reverseValue === undefined ? !defaultValue : reverseValue
  ) as D | R;
  const actions = useMemo(() => {
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);
    const set = (value: D | R) => setState(value);
    const toggle = () =>
      setState((preState) =>
        preState === defaultValue ? reverseValueOrigin : defaultValue
      );

    return { setLeft, setRight, set, toggle };
  }, []);

  return [state, actions];
}

export default useToggle;
```

在 demo 目录下新建一些测试文件 来测试 hooks 是否正常，以及文档中引入的 demo

## index.md

```
---
title: useToggle
nav: hooks
---

# useToggle

用于在两个状态值之间的切换

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx"></code>

### 高级用法

<code src="./demo/demo2.tsx"></code>

## 参数

| 参数         | 说明 | 类型 | 默认值 |
| ------------ | ---- | ---- | ------ |
| defaultValue | 可选 | T    | false  |
| reverseValue | 可选 | U    | 无     |

## result

| 参数   | 说明     | 类型    |
| ------ | -------- | ------- |
| state  | 状态值   | -       |
| action | 操作集合 | Actions |

## Actions

| 参数     | 说明                                                                      | 类型                 |
| -------- | ------------------------------------------------------------------------- | -------------------- |
| toggle   | 切换 state                                                                | ()=>void             |
| set      | 修改 state                                                                | (state:T ｜ U)=>void |
| setLeft  | 设置值为默认值                                                            | ()=>void             |
| setRight | 如果传入了 reverseValue, 则设置为 reverseValue。 否则设置为 默认值 的反值 | ()=>void             |

```

然后引入单元测试来进一步完善 hooks 的正确性

看下一节 单元测试
