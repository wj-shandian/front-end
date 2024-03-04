# useUnmount

## 新建

在 hooks 目录下新建 src 在 src 目录下新建 useUnmount 文件夹 在该文件夹下 新建 index.ts 和 index.md 以及 单元测试的目录 `__tests__` 和 文档所需要的 demo 目录

## index.ts

```ts
import { useEffect } from "react";
import useLatest from "../useLatest";

export default function useUnmount(fn: () => void) {
  if (typeof fn !== "function") {
    console.error(
      `useUnmount expected parameter is a function, got ${typeof fn}`
    );
  }
  const fnRef = useLatest(fn); // 使用 useLatest 可以保证函数是最新函数 而不是旧函数 避免出现一些意外情况
  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
}
```

## index.md

[直接查看](https://wj-shandian.github.io/sd-hooks/#/hooks/use-unmount)

## 测试用例

```js
import { renderHook } from "@testing-library/react";
import useUnmount from "../index";
describe("useUnmount", () => {
  it("useUnmount should work", async () => {
    const fn = jest.fn(); // jest创建一个函数
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0); // toBeCalledTimes 检测函数被调用的次数
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount(); // 执行写在
    expect(fn).toBeCalledTimes(1); // 执行一次 符合预期
  });
});
```
