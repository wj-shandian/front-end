## JSX

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
