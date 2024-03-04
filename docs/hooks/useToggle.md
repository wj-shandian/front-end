# useToggle

## 新建

在 hooks 目录下新建 src 在 src 目录下新建 useToggle 文件夹 在该文件夹下 新建 index.ts 和 index.md 以及 单元测试的目录 `__tests__` 和 文档所需要的 demo 目录

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

[直接查看](https://wj-shandian.github.io/sd-hooks/#/hooks/use-toggle)

## 单元测试

```js
import { renderHook, act } from "@testing-library/react";
import useToggle from "../index";

//  renderHook 渲染 hook act 模拟用户点击

describe("useToggle", () => {
  it("test on init", async () => {
    const hooks = renderHook(() => useToggle());
    expect(hooks.result.current[0]).toBe(false);
  });
  it("test on methods", async () => {
    const hook = renderHook(() => useToggle("Hello"));
    expect(hook.result.current[0]).toBe("Hello");
    act(() => {
      hook.result.current[1].toggle();
    });
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe("Hello");
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });

  it("test on optional", () => {
    const hook = renderHook(() => useToggle("Hello", "World"));
    act(() => {
      hook.result.current[1].toggle();
    });
    expect(hook.result.current[0]).toBe("World");
    act(() => {
      hook.result.current[1].set("World");
    });
    expect(hook.result.current[0]).toBe("World");
    act(() => {
      hook.result.current[1].toggle();
    });
    expect(hook.result.current[0]).toBe("Hello");
  });
});
```

然后引入单元测试来进一步完善 hooks 的正确性

看下一节 单元测试
