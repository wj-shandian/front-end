## ref 的基本概念和使用

### ref 的创建

ref 的创建主要是通过 React.createRef 或者 React.useRef 来创建一个对象

一个标准的 ref 对象是 `{current:null}` current 指向 ref 对象获取到的实际内容

- 类组件 React.createRef 创建

```js
class Ref extends React.Component {
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

类组件获取 ref 的三种方式

- ref 属性是一个字符串

```js
class Index extends React.Component {
  componentDidMount() {
    console.log(this.refs);
  }
  render() {
    return <div ref="index"></div>;
  }
}
```

- ref 是一个函数

```js
class Index extends React.Component {
  currentDom = null;
  componentDidMount() {
    console.log(this.currentDom);
  }
  render() {
    return <div ref={(node) => (this.currentDom = node)}></div>;
  }
}
```

- ref 属性是一个 ref 对象

```js
class Index extends React.Component {
  currentDom = React.createRef(null);
  componentDidMount() {
    console.log(this.currentDom);
  }
  render() {
    return <div ref={this.currentDom}></div>;
  }
}
```

### ref 场景应用

- 跨层级获取

爷爷组件获取孙子组件 dom 元素

```js
// 孙组件
function Son(props) {
  const { grandRef } = props;
  return (
    <div>
      <div> i am alien </div>
      <span ref={grandRef}>这个是想要获取元素</span>
    </div>
  );
}
// 父组件
class Father extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Son grandRef={this.props.grandRef} />
      </div>
    );
  }
}
const NewFather = React.forwardRef((props, ref) => (
  <Father grandRef={ref} {...props} />
));
// 爷组件
class GrandFather extends React.Component {
  constructor(props) {
    super(props);
  }
  node = null;
  componentDidMount() {
    console.log(this.node); // span #text 这个是想要获取元素
  }
  render() {
    return (
      <div>
        <NewFather ref={(node) => (this.node = node)} />
      </div>
    );
  }
}
```

forwardRef 把 ref 变成了可以通过 props 传递和转发。

- 合并转发
  简单的说子组件接受 ref 并且可以修改 ref 然后传递给 孙子组件

```js
// 孙组件
function Son(props) {
  const { grandRef } = props;
  return (
    <div>
      <div> i am alien </div>
      <span ref={grandRef}>这个是想要获取元素</span>
    </div>
  );
}
// 父组件
class Father extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { forwardRef } = this.props;
    forwardRef.current = {
      form: this.form, // 给form组件实例 ，绑定给 ref form属性
      button: this.button, // 给button dom 元素，绑定给 ref button属性
    };
  }
  form = null;
  button = null;
  render() {
    return (
      <div>
        <Son grandRef={(form) => (this.form = form)} />
      </div>
    );
  }
}
const NewFather = React.forwardRef((props, ref) => (
  <Father grandRef={ref} {...props} />
));
// 爷组件
class GrandFather extends React.Component {
  constructor(props) {
    super(props);
  }
  node = null;
  componentDidMount() {
    console.log(this.node); // span #text 这个是想要获取元素
  }
  render() {
    return (
      <div>
        <NewFather ref={(node) => (this.node = node)} />
      </div>
    );
  }
}
```

- 高阶组件转发

高阶组件使用 ref 的问题，如果我们给传入高阶组件添加 ref 没有转发的话，因为 props 是不能传递 ref 所以原始组件上的 ref 会被转移到 高阶组件返回的组件上去，所以这个时候可以使用 React.forwardRef 转发 ref

```js
function HOC(Component) {
  class Wrap extends React.Component {
    render() {
      const { forwardedRef, ...otherprops } = this.props;
      return <Component ref={forwardedRef} {...otherprops} />;
    }
  }
  return React.forwardRef((props, ref) => (
    <Wrap forwardedRef={ref} {...props} />
  ));
}
class Index extends React.Component {
  render() {
    return <div>hello,world</div>;
  }
}
const HocIndex = HOC(Index);

export default () => {
  const node = useRef(null);
  useEffect(() => {
    console.log(node.current); /* Index 组件实例  */
  }, []);
  return (
    <div>
      <HocIndex ref={node} />
    </div>
  );
};
```
