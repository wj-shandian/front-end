react 中所有的事件都是自己模拟的，react 为了考虑浏览器的的兼容问题，react 中的事件和原生事件不完全相同

## 先看一下 React 事件

冒泡和捕获阶段

```js
class App extends React.Component {
  hand = () => {
    console.log("冒泡");
  };
  capture = () => {
    console.log("捕获");
  };
  render() {
    return (
      <div onClick={this.hand} onClickCapture={this.capture}>
        这是一个按钮
      </div>
    );
  }
}
```

- 冒泡阶段：正常添加 onClick onChange 事件 默认是在冒泡阶段执行
- 捕获阶段：正常添加 onClickCapture onChangeCapture 事件 是在捕获阶段执行

### 阻止冒泡和阻止默认行为

react 的阻止冒泡和原生用法是一样的 都是 `e.stopPropagation()`

阻止默认行为稍有不同，原生事件可以用 `return false 和 e.preventDefault()`来阻止默认行为，而 react 中只能用 `e.preventDefault()`

虽然用法上和原生都是一样的 但是 react 中的`e.stopPropagation()`和`e.preventDefault()`都是自己模拟的，

## 事件合成
