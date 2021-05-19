- 路由懒加载
- keep-alive 缓存页面

```js
<keep-alive>
  <router-view />
</keep-alive>
```

- v-if 和 v-show  
  频繁切换用 v-show 否则用 v-if

- v-for 遍历避免同时使用 v-if
- 长列表性能优化

  - 列表是纯显示，不会有任何变化 不需要做响应式

  ```js
    export default {
        data(){
            return {
                data:[]
            }
        }
        async create(){
            const users = await axios('api/user')
            this.data = Object.freeze(users) // 冻结失去响应式
        }
    }
  ```

  - 大数据列表采用虚拟滚动列表 只展示可视窗口的内容

- 事件即时销毁（定时器以及事件监听）
- 图片懒加载 参考（vue-lazyload）  
  图片到可视区域再加载图片
- 第三方插件按需引入（ui 库）
- 无状态组件标记为函数式组件

```js
// 如果只是展示性组件可以标记为函数式组件
<template functional></template>
```

- 子组件分割
- 变量本地化
- SSR
