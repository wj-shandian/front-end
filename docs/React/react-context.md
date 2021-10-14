在这里我们不讨论旧的 context

## 为什么会有 context

在 react 中 数据都是自上而下 通过 props 传递的 但是这个方法对于一些某些类型属性是比较麻烦的，比如主题颜色，想要控制需要一层一层传递，
Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

## 基本用法

- createContext

```js
const ThemeContext = React.createContext(null);
const ThemeProvider = ThemeContext.Provider; // 提供者
const ThemeConsumer = ThemeContext.Consumer; // 消费者
```

createContext 接受一个参数，作为初始化 context 的内容，返回一个 context 对象，Context 对象上的 Provider 作为提供者，Context 对象上的 Consumer 作为消费者。

- 提供者 Provider

```js
const ThemeProvider = ThemeContext.Provider;
function Provider() {
  const [contextValue, updateContextValue] = React.useState({ color: "red" });
  return (
    <div>
      // 传递value给消费者
      <ThemeProvider value={contextValue}>
        <Son />
      </ThemeProvider>
    </div>
  );
}
```

- 消费者 Consumer

消费者获取 有三种方式

1. 函数组件获取方式

```js
const ThemeContext = React.createContext(null);
function Son() {
  const contextValue = React.useContext(ThemeContext);
  const { color } = contextValue;
  return <div style={{ color }}></div>;
}
```

2. 类组件获取方式

```js
const ThemeContext = React.createContext(null);

class Son extends React.Component {
  render() {
    const { color } = this.context;
    return <div style={{ color }}></div>;
  }
}
Son.contextType = ThemeContext;
```

类组件的静态属性上的 contextType 属性，指向需要获取的 context,这种方式只适合用在类组件上

3. 订阅者 Consumer 方式

```js
const ThemeContext = React.createContext(null);
function Consumer(props) {
  const { color } = props;
  return <div style={{ color }}></div>;
}
const Son = () => {
  <ThemeContext.Consumer>
    {(value) => <Consumer {...value} />}
  </ThemeContext.Consumer>;
};
```

## 注意事项

因为 context 会根据引用标识来决定何时进行渲染（本质上是 value 属性值的浅比较），所以这里可能存在一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：

```js
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: "something" }}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: "something" },
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

更多技巧参考官网
