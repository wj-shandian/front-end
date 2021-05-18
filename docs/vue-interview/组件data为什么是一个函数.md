组件 data 为什么是一个函数，为什么根实例可以不是一个函数

源码位置 vue/src/core/instance/state.js

```js
function initData (vm: Component) {
  let data = vm.$options.data
  // 判断是否是个函数
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
```

- vue 组件可能存在多个实例，如果使用对象定义 data,则会导致他们公用一个 data 对象，那么状态变更将会影响所有的组件实例
- 采用函数定义 在 initData 时会将其作为工厂函数返回全新的 data 对象，有效的规避了多个实例之间的状态污染。
- 根实例中则不存在这个问题，因为根实例只会创建一次，
