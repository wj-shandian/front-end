## 高阶组件

高阶组件不是特定的 api 而是一种基于 react 组合特性的设计模式，是一种高级技巧。

高阶组件是参数为组件，返回值为新组件的函数

高阶组件解决的问题是大量代码的复用，逻辑复用问题

![](img/hoc.png)

## 两种高阶组件

常用的两种高阶组件有属性代理和反向继承

- 属性代理

```js
function HOC(WarpComponent) {
  return class Index extends React.Component {
    state = {};
    render() {
      return <WarpComponent {...this.state} {...this.props} />;
    }
  };
}
```

属性代理，就是用组件包裹一层代理组件，在代理组件上对源组件进行加强。

优点：

1. 可以嵌套使用，多个 HOC 可以嵌套使用
2. 类组件和函数组件都可以使用
3. 完全隔离业务组件的渲染，可以完全控制业务组件是否渲染
4. 属性代理和业务组件是低耦合，对于条件渲染和 props 属性增强，适合做开源项目的 HOC

缺点：

1. 无法直接获取原始组件的状态，如果要获取 需要使用 ref
2. 无法直接继承静态属性
3. 因为产生了一个新的组件，需要配合 forwardRef 来转发 ref

- 反向继承

```js
class Index extends React.Component {
  render() {
    return <div>测试</div>;
  }
}
function HOC(Comp) {
  return class WarpComponent extends Comp {};
}
export default HOC(Index);
```

优点：

1. 可以直接获取组件内部状态 生命周期 绑定事件 等等
2. 无需对静态属性和方法进行额外的处理

缺点：

1. 函数组件无法使用
2. 和组件耦合度较高
3. 多个反向继承 HOC 嵌套，组件状态会被覆盖
