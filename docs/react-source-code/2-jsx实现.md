## jsx

jsx 转化 在 17 版本 之前是 react createElement 方法
在 17 之后是调用 jsx 的一个方法

本质了上没有什么区别

[babel 测试网站](https://babeljs.io/repl#?browsers=defaults&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwEwlgbgfAUABHAhvOwDOAHRA7KAjYAekx1iPGiA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react%2Cstage-1&prettier=false&targets=&version=7.22.5&externalPlugins=&assumptions=%7B%7D)

侧边栏的 options 选择 react runtime 可以看到 jsx 和 createElement

```js
<div>
  a<span>b</span>
</div>;
/*#__PURE__*/ React.createElement(
  "div",
  null,
  "a",
  /*#__PURE__*/ React.createElement("span", null, "b")
);
```

```js
import { jsx as _jsx } from "react/jsx-runtime";
/*#__PURE__*/ _jsx("div", {
  children: "a",
});
```

[react 官网介绍了一些关于新的 jsx 转换](https://zh-hans.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

## jsx 转化

jsx 转化主要分为 编译时 和运行时

编译是由 babel 来实现的

所以我们来实现运行时的 jsx 转化

1. 实现 jsx
2. 实现打包流程
3. 调试打包结果

## 开始写 jsx 方法

新建文件

1. packages/shared/ReactTypes.ts 主要是定义一些类型变量
2. packages/shared/ReactSymbols.ts 判断是否支持 symbol
3. init 初始化产生一个 package.json 文件

新建文件

1. packages/react/src/jsx.ts 主要是实现 jsx 方法的文件

```js
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import {
  Type,
  Key,
  Ref,
  Props,
  ReactElementType,
  ElementType,
} from "shared/ReactTypes";

const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };
  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === "key") {
      if (val !== undefined) {
        key = "" + val;
      }
      continue;
    }
    if (prop === "ref") {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      // 剩下的参数如果不是原型上的 都给props
      props[prop] = val;
    }
  }
  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;
```

在 react 的 packagejson 文件中添加 因为我们用到了 shared 方法 这个是 monrepo 到写法
"dependencies": {
"shared": "workspace:\*"
},
