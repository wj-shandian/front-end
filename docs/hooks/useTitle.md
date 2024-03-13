# useTitle

## 新建

在 hooks 目录下新建 src 在 src 目录下新建 useTitle 文件夹 在该文件夹下 新建 index.ts 和 index.md 以及 单元测试的目录 `__tests__` 和 文档所需要的 demo 目录

## index.ts

```ts
import { useEffect, useRef } from "react";
import isBrowser from "../utils/isBrowser";
import useUnmount from "../useUnmount";

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(isBrowser ? document.title : "");
  useEffect(() => {
    document.title = title;
  }, [title]);
  useUnmount(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}

export default useTitle;
```

## index.md

[直接查看](https://wj-shandian.github.io/sd-hooks/#/hooks/use-title)

## 测试用例

```js
import { act, renderHook } from "@testing-library/react";
import useTitle from "../index";

describe("useTitle", () => {
  it("should update document title", () => {
    // 初始化渲染 hook
    const hook = renderHook((props) => useTitle(props), {
      initialProps: "Current Page Title",
    });
    expect(document.title).toBe("Current Page Title");
    // 模仿点击事件  hook重新传参
    act(() => {
      hook.rerender("Other Page Title");
    });
    expect(document.title).toBe("Other Page Title");
  });

  it("should restore document title on unmount", () => {
    document.title = "Old Title";

    const hook = renderHook(
      (props) => useTitle(props, { restoreOnUnmount: true }),
      {
        initialProps: "Current Page Title",
      }
    );

    expect(document.title).toBe("Current Page Title");

    hook.unmount();
    expect(document.title).toBe("Old Title");
  });

  it("should not restore document title on unmount", () => {
    document.title = "Old Title";

    const hook = renderHook(
      (props) => useTitle(props, { restoreOnUnmount: false }),
      {
        initialProps: "Current Page Title",
      }
    );

    expect(document.title).toBe("Current Page Title");

    hook.unmount();
    expect(document.title).toBe("Current Page Title");
  });
});
```
