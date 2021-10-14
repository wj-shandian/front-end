## React 组件

什么是 React 组件？ React 组件主要分为两种类组件和函数组件

```js
// 类
class index {}

// 类组件

class Index extends React.Component {
  render() {
    return <div></div>;
  }
}

// 函数

function index() {}

// 函数组件

function Index() {
  return <div></div>;
}
```

组件本质就是类和函数，但是和类和函数又有所不同，组件负责渲染视图以及更新视图。
