## unstated-next

这是一个 react 的轻状态管理库

`npm install --save unstated-next`

## demo

看个 demo

```js
import { createContainer } from "unstated-next";

function useCounter() {
  let [count, setCount] = useState(0);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

let Counter = createContainer(useCounter);

function CounterDisplay() {
  let counter = Counter.useContainer();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <p>You clicked {counter.count} times</p>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

function App() {
  return (
    <Counter.Provider>
      <CounterDisplay />
      <CounterDisplay />
    </Counter.Provider>
  );
}
```

本质上，unstated-next 把 hook 的数据包裹成一个数据对象，提供了注入（Provider）和 包裹（useContainer）两个 api
任何地方想要这个数据都可以引入这个包裹后的数据，从而做到数据共享
