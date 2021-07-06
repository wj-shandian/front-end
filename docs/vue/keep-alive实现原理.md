keep-alive 可以实现组件的缓存，当组件切换时不会对当前组件进行卸载，常用的两个属性 include exclude

两个生命周期 activated deactivated 内部采用 LRU 算法 最近最久未使用算法

原理代码：core/components/keep-alive.js

```js
export default {
  name: "keep-alive",
  abstract: true, // 抽象组件
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },
  created() {
    this.cache = Object.create(null); // 创建缓存列表
    this.keys = []; // 创建缓存组件的key列表
  },
  destroyed() {
    // keep-alive销毁时 会清空所有的缓存和key
    for (const key in this.cache) {
      // 循环销毁
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted() {
    // 会监控include 和 include属性 进行组件的缓存处理
    this.$watch("include", (val) => {
      pruneCache(this, (name) => matches(val, name));
    });
    this.$watch("exclude", (val) => {
      pruneCache(this, (name) => !matches(val, name));
    });
  },
  render() {
    const slot = this.$slots.default; // 会默认拿插槽
    const vnode: VNode = getFirstComponentChild(slot); // 只缓存第一个组件
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions); // 取出组件的名字
      const { include, exclude } = this;
      if (
        // 判断是否缓存
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }
      const { cache, keys } = this;
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key; // 如果组件没key 就自己通过 组件的标签和key和cid 拼接一个key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // 直接拿到组件实例;
        // make current key freshest
        remove(keys, key); // 删除当前的 [b,c,d,e,a] // LRU 最近最久未使用法
        keys.push(key); // 并将key放到后面[b,a]
      } else {
        cache[key] = vnode; // 缓存vnode
        keys.push(key); // 将key 存入
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          // 缓存的太多超过了max 就需要删除掉;
          pruneCacheEntry(cache, keys[0], keys, this._vnode); // 要删除第0个 但是现在渲染的就是第0个;
        }
      }
      vnode.data.keepAlive = true; // 并且标准keep-alive下的组件是一个缓存组件
    }
    return vnode || (slot && slot[0]); // 返回当前的虚拟节点
  },
};
```

主要是缓存虚拟 dom 并且缓存是有数量限制的，一旦超过缓存的最大数，就会采用 LRU 算法删除之前缓存的
