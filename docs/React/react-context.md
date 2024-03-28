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

## Context 的缺点

Context 本质上是一个很大的对象，只要数据变更 以下所有的内容有可能都会重新渲染

怎么解决呢

1. 细化拆分 Context
2. 通过定义 xxxProvider 将数据更新局限在 children 层 不再是 PageContext.Provider
   简单的说就是重新封装 Provider + props.children

代码示例

```js
/** 主题 */
const ThemeContext = React.createContext({ theme: "red" });
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState({ theme: "red" });
  console.log("ThemeProvider-----", theme.theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const Son1 = function (props) {
  const { setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme({ theme: "blue" })}>改变主题</button>;
};

const Son2 = function (props) {
  const { theme } = useContext(ThemeContext);
  console.log("Son2----", theme.theme);
  return <div>主题----{theme.theme}</div>;
};

const Son4 = function (props) {
  console.log("Son4---没有使用上下文");
  return <div>没有使用上下文</div>;
};

export default class ContextChildren extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <Son1 />
        <Son2 />
        <Son4 />
      </ThemeProvider>
    );
  }
}

```

为什么这样就 Son4 就不会重新渲染了，主要是 props.children

props.children指向一个对象,这个对象中存放着<Son1 />、<Son2 />、<Son4 />执行的结果，ThemeProvider执行的时候，props.children指向的对象没有发生变化，只有当ContextChildren组件重新渲染的时候，<Son1 />、<Son2 />、<Son4 />才会重新执行，由于我们将状态放置于ThemeProvider组件中，所以ContextChildren组件不会重新渲染，<Son1 />、<Son2 />、<Son4 />也就不会重新执行，所以Son4---没有使用上下文没有打印。
