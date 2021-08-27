## JSX 写法

```js
const element = <h1>hello,world</h1>;
```

这就是 jsx，一种新的标签语法

我们来看看在 React 中 jsx 的写法

```js
class List extends React.Component {
  render() {
    return (
      <div>
        <div>hello world</div>
        <button
          onClick={() => {
            console.log(this.render());
          }}
        ></button>
      </div>
    );
  }
}
```

## JSX 编译后的样子

```js
// 组件
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>;

// 编译后
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");

// dom节点
<div className="sidebar" />;
//编译后
React.createElement("div", { className: "sidebar" });
```

实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖

- component 如果是组件，那么传对应的组件或者函数，如果是 dom 元素，那么传入对应的标签 例如 div
- props 一个对象，在 dom 类型中为标签属性，在组件类型中为 props 。
- 其他参数

由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内

例如，在如下代码中，虽然 React 和 CustomButton 并没有被直接使用，但还是需要导入

```js
import React from "react";
import CustomButton from "./CustomButton";

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

## 可控的 render

```js
import React from "react";

const toLearn = ["react", "vue", "webpack", "nodejs"];

const TextComponent = () => <div> hello , i am function component </div>;
class App extends React.Component {
  controlRender = () => {
    const reactElement = (
      <div>
        {/* element 元素类型 */}
        <div>hello,world</div>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map((item) => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );
    console.log(reactElement, "reactElement");
    const { children } = reactElement.props;
    // 扁平化数组   React.Children.toArray 可以扁平化、规范化 React.element 的 children 组成的数组， 并且可以深层次的flat
    const flatArray = React.Children.toArray(children);
    console.log(flatArray);
    // 删除文本节点  React.isValidElement 这个方法可以用来检测是否为 React element 元素，接收一个参数——待验证对象，如果是返回 true ， 否则返回 false
    const newChildren = [];
    React.Children.forEach(flatArray, (item) => {
      if (React.isValidElement(item)) newChildren.push(item);
    });
    // 插入新的节点
    const lastChildren = React.createElement(
      "div",
      { className: "last" },
      "say goodbay"
    );
    newChildren.push(lastChildren);
    // 修改容器节点  cloneElement 的作用是以 element 元素为样板克隆并返回新的 React element 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
    const newReactElement = React.cloneElement(
      reactElement,
      {},
      ...newChildren
    );
    return newReactElement;
  };
  render() {
    return this.controlRender();
  }
}

export default App;
```

React.createElement 和 React.cloneElement 区别 前者用来创建 element 后者用来修改 element 并且返回一个新的 element 对象

## 参考文献

- react 官网
- react 进阶实践指南小册
