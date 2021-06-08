## computed 的实现原理

> 计算属性的初始化是发生在 Vue 实例初始化阶段的 initState 函数中，执行了 if (opts.computed) initComputed(vm, opts.computed)，initComputed 的定义在 src/core/instance/state.js 中

computed 本质上是一个惰性求值的观察者 computed watcher(每使用一个 computed 会分发一个 watcher(观察者))

- computed 在创建一个新的 watcher 的时候会传入一个参数 Lazy 保存在 this.dirty,把计算结果缓存起来 并且是缓存的控制是通过 `dirty`控制的

- 当 computed 的状态依赖发生改变时，会通知这个惰性的 watcher，computed watcher 会判断收集数组内 有没有订阅者

- 如果有订阅者，会重新计算 判断新旧值有没有变化，如果有变化会重新渲染，没有就不会重新渲染

- 没有订阅者 会把`this.dirty = true` 只有当下次再次访问这个计算属性才会重新求值

<!-- 解析来 具体看下代码中的实现 -->

<!-- 首先时初始化的时候

```js
const computedWatcherOptions = { computed: true };
function initComputed(vm: Component, computed: Object) {
  // 创建一个空对象给watchers
  const watchers = (vm._computedWatchers = Object.create(null));
  const isSSR = isServerRendering();

  for (const key in computed) {
    // 获取计算属性userDef和getter 求值函数
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    if (process.env.NODE_ENV !== "production" && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }

    if (!isSSR) {
      // 创建watcher 并收集  （这里存放了每个计算属性的观察者实例）
      watchers[key] = new Watcher(
        vm, //实例
        getter || noop, // getter 求值函数  noop空函数
        noop,
        computedWatcherOptions // 常量对象  { computed: true } 标识这是计算属性的watcher 而不是普通的watcher
      );
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== "production") {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(
          `The computed property "${key}" is already defined as a prop.`,
          vm
        );
      }
    }
  }
}
``` -->

## watch

侦听属性的初始化也是发生在 Vue 的实例初始化阶段的 initState 函数中，在 computed 初始化之后，执行了：

```js
if (opts.watch && opts.watch !== nativeWatch) {
  initWatch(vm, opts.watch);
}
```

watch 是没有缓存，更多的是观察作用，我们可以在 watch 做一些异步操作，设置 deep 可以深度监听（对对象每一项都进行监听），所以本质上 watch 也是基于 watcher 实现的 是一个 User watcher

watcher 一共有四种类型：deep watcher / user watcher / computed watcher / sync watcher

## 应用场景

模板渲染的时候比较使用使用计算属性

监听属性适合观测某个值的变化 然后完成一些复杂业务的逻辑
