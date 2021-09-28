## ref 的基本概念和使用

### ref 的创建

ref 的创建主要是通过 React.createRef 或者 React.useRef 来创建一个对象

一个标准的 ref 对象是 `{current:null}` current 指向 ref 对象获取到的实际内容

- 类组件 React.createRef 创建

```js
class ref extends React.Component {
  constructor(props) {
    super(props);
    this.currentDom = React.createRef(null);
  }
  render() {
    return <div ref={this.currentDom}></div>;
  }
}
```

- 函数组件 React.useRef 创建

```js
export default () => {
  const currentDom = React.useRef(null);
  return <div ref={currentDom}></div>;
};
```

### ref 的使用
