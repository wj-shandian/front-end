## react 控制 render 的方法

- memo

  父组件隔断子组件的渲染，使用 memo 缓存 element 对象

有些情况下父组件更新了，但是子组件不必要更新，这个时候我们就可以使用 mem 隔断子组件的渲染
看个 demo

```js
function Child({ numberA }) {
  return <div>{numberA}</div>;
}
/* 父组件 */
export default class Index extends React.Component {
  state = {
    numberA: 0,
    numberB: 0,
  };
  render() {
    return (
      <div>
        <Children number={this.state.numberA} />
        <button
          onClick={() => this.setState({ numberA: this.state.numberA + 1 })}
        >
          改变numberA -{this.state.numberA}{" "}
        </button>
        <button
          onClick={() => this.setState({ numberB: this.state.numberB + 1 })}
        >
          改变numberB -{this.state.numberB}
        </button>
      </div>
    );
  }
}
```

只有当 numberA 改变的时候我才需要更新子组件 看下 memo 的

```js
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  返回 true 组件不渲染 ， 返回 false 组件重新渲染
  */
}
export default React.memo(MyComponent, areEqual);
```

如果不传第二个参数，默认是对 props 浅比较，此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。

React.memo 其实就是高阶组件。

```js
function TextMemo(props){ / /子组件
    console.log('子组件渲染')
    return <div>hello,world</div>
}
const controlIsRender = (pre,next)=>{
   return pre.number === next.number   // number不改变->不渲染组件 | 否则渲染组件
}
const NewTexMemo = memo(TextMemo,controlIsRender)
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            number:1,
            num:1
        }
    }
    render(){
        const { num , number }  = this.state
        return <div>
            <div>
                改变num：当前值 { num }
                <button onClick={ ()=>this.setState({ num:num + 1 }) } >num++</button>
                <button onClick={ ()=>this.setState({ num:num - 1 }) } >num--</button>
            </div>
            <div>
                改变number： 当前值 { number }
                <button onClick={ ()=>this.setState({ number:number + 1 }) } > number ++</button>
                <button onClick={ ()=>this.setState({ number:number - 1 }) } > number -- </button>
            </div>
            <NewTexMemo num={ num } number={number}  />
        </div>
    }
}
```

- useMemo

函数组件推荐使用 useMemo

```js
const res = useMemo(function,deps)

// function 是一个函数 函数的返回值作为返回值，
// deps 是数组，是依赖项，在函数组件下一次执行的时候，会对比依赖项状态是否改变，如果改变，那么重新执行函数，否则取缓存
// res 返回值

// demo
export default function Index(){
    const [ numberA , setNumberA ] = React.useState(0)
    const [ numberB , setNumberB ] = React.useState(0)
    return <div>
        { useMemo(()=> <Children number={numberA} />,[ numberA ]) }
        <button onClick={ ()=> setNumberA(numberA + 1) } >改变numberA</button>
        <button onClick={ ()=> setNumberB(numberB + 1) } >改变numberB</button>
    </div>
}
```

useMemo 的原理：useMemo 会记录上一次执行 create 的返回值，并把它绑定在函数组件对应的 fiber 对象上，只要组件不销毁，缓存值就一直存在，但是 deps 中如果有一项改变，就会重新执行 create ，返回值作为新的值记录到 fiber 对象上。

- shouldComponentUpdate

shouldComponentUpdate 一种更灵活点控制渲染的方案，开发者可以跟根据自己的需求决定是否更新组件

- React.PureComponent 纯组件

React.PureComponent 和 React.Component 很相似，他们的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

注意：。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，如果对象中包含复杂的数据结构，那么可能无法深层次检查，产生错误的结果
，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。

此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

- 避免使用箭头函数

不要给是 PureComponent 子组件绑定箭头函数 ,因为父组件每一次 render,都会重新生成一个新的箭头函数， PureComponent 对比新老 props 时候，因为是新的函数，所以会判断不相等，而让组件直接渲染，PureComponent 作用终会失效

```js
class Index extends React.PureComponent {}

export default class Father extends React.Component {
  // bad
  render = () => <Index callback={() => {}} />;
}
```

- PureComponent 的父组件是函数组件的情况，绑定函数要用 useCallback 或者 useMemo 处理。

```js
class Index extends React.PureComponent {}
export default function () {
  // bad
  const callback = function handerCallback() {};
  /* 每一次函数组件执行重新声明一个新的callback，PureComponent浅比较会认为不相等，促使组件更新  */
  // good
  const callback = React.useCallback(function handerCallback() {}, []);
  return <Index callback={callback} />;
}
```

## 浅比较

浅比较再react中用 得非常频繁，比如 props 和 state 的对比，新旧 fiber 对比的对比，浅比较就是只比较一层，如果一层比较不出来，那么就会继续比较下去，直到比较出来为止。
memo useMemo useCallback shouldComponentUpdate 都会用到浅比较。

分析一下react中的浅比较 是如何比较的，直接看源码实现

```js
/**
 * is()方法对两个函数参数进行比较，这个借助于===实现的is()内部方法实际上是Object.is()的polyfill。那为啥不直接使用===呢？
 * Object.is()和===虽然基本相同，但是有两个例外：

Object.is将+0和-0当作不相等，而===把他们当作相等
Object.is把 Number.NaN和Number.NaN当作相等，而===把他们当作不相等

所以，的is方法就是对+0,-0,Number.NaN进行了特殊处理。

 */
function is(x: mixed, y: mixed): boolean {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}

```

```js
function shallowEqual(objA: mixed, objB: mixed): boolean {
    //----第1部分----
    if (is(objA, objB)) {
      return true;
    }
    
    //----第2部分---- 判断是否是对象
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
      return false;
    }
  
    //----第3部分---- 判断对象的长度 如果长度不相等 返回false
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    //----第4部分---- 循环遍历keysA 判断key是否在objB中，并且对应的值是否相等
    for (let i = 0; i < keysA.length; i++) {
      if (
        !hasOwnProperty.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])
      ) {
        return false;
      }
    }
  
    return true;
  }
  
```
