当用户指定了 watch 中的 deep 属性为 true 时，如果当前监控的值时数组类型，会对对象每一项进行求职

此时会将当前 watcher 存入到对应的属性依赖中，这样数组中对象发生变化也会通知数据更新

## 代码原理

```js
    get () {
    pushTarget(this) // 先将当前依赖放到 Dep.target上
    let value
    const vm = this.vm
    try {
        value = this.getter.call(vm, vm)
    } catch (e) {
        if (this.user) {
             handleError(e, vm, `getter for watcher "${this.expression}"`)
        } else {
            throw e
        }
    } finally {
        if (this.deep) { // 如果需要深度监控
           traverse(value) // 会对对象中的每一项取值,取值时会执行对应的get方法
        }
           popTarget()
    }
    return value
}
    function _traverse (val: any, seen: SimpleSet) {
    let i, keys
    const isA = Array.isArray(val)
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode)
    {
       return
    }
if (val.__ob__) {
    const depId = val.__ob__.dep.id
    if (seen.has(depId)) {
       return
    }
       seen.add(depId)
    }
    if (isA) {
       i = val.length
       while (i--) _traverse(val[i], seen)
    } else {
        keys = Object.keys(val)
        i = keys.length
        while (i--) _traverse(val[keys[i]], seen)
    }
}
```
