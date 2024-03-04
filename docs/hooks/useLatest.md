# useLatest

## 新建

在 hooks 目录下新建 src 在 src 目录下新建 useLatest 文件夹 在该文件夹下 新建 index.ts 和 index.md 以及 单元测试的目录 `__tests__` 和 文档所需要的 demo 目录

## index.ts

```ts
import { useRef } from "react";

export default function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

/**解析
 *  useRef 创建的是一个普通 Javascript 对象，
 *  而且会在每次渲染时返回同一个 ref 对象，
 *  当我们变化它的 current 属性的时候，
 *  对象的引用都是同一个，所以不会有闭包问题
 */

/**问题一 为什么要用useLatest 而不是直接在代码使用 useRef
 * 问题二 初始化已经把value 传给 useRef了，为什么还需要重新 赋值给 ref.current
 * 解析：首先函数每次render之后 整个函数是从头到尾执行一遍的 useRef 也会重新执行，只不过执行的结果是返回的对象没有变化，
 * 还是返回之前已经生成的对象，
 * 在第一次执行的时候已经把value传给useRef 此时 ref.current的值已经是value，这个时候看 第二步的赋值是多余的
 * 但是函数是可能会多次render的，当再次重新渲染的时候，此时 useRef 虽然执行了 但是返回的是上一次的对象，所以我们需要把最新的value 赋值给
 * ref.current 来保持最新值
 */
```

## index.md

[直接查看](https://wj-shandian.github.io/sd-hooks/#/hooks/use-latest)

## 测试用例

```js
import { renderHook, act } from "@testing-library/react";
import useLatest from "../index";

const setState = (val) =>
  renderHook((state) => useLatest(state), { initialProps: val });

describe("useLatest", () => {
  it("带有基本变量的useLatest可以工作", async () => {
    const { result, rerender } = setState(0);
    rerender(1); // 重新渲染 接收一个值
    expect(result.current.current).toBe(1);
    rerender(2);
    expect(result.current.current).toBe(2);
    rerender(3);
    expect(result.current.current).toBe(3); // toBe 是
  });

  it("带有引用变量的 useLatest 应该可以工作", async () => {
    const { result, rerender } = setState({});
    rerender({});
    expect(result.current.current).toEqual({}); // toEqual 等同于
    rerender([]);
    expect(result.current.current).toEqual([]);
  });
});
```
