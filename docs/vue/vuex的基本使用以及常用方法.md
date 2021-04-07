## 概述

这里只是对 vuex 的官网方法总结以及常用方法的总结，具体参考 vuex 官网

## 使用

使用很简单，new 一个 Vuex.Store(),然后放入 new Vue 中

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 创建store
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

// 注入 vue中
new Vue({
  el: "#app",
  store,
});
```

## state

state 是唯一的数据源，
vuex 中的数据都是具有响应式的

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
});
```

在组件中获取 vuex 中的数据

```js
computed: {
    count () {
      return this.$store.state.count
    }
  }
```

如果是分模块的的

```js
computed: {
    count () {
      return this.$store.state.[模块名称].count
    }
  }
```

以上两种是比较常用的方式，下面介绍一种 mapState(辅助函数)

mapState 可以帮我我们快速获取状态，使用较少（其实还没使用过，但是感觉比较有用，下次尝试使用）

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from "vuex";

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: (state) => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: "count",

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
};
```

## getters

getters 可以理解为 vuex 的计算属性，getters 返回的值会被缓存，只有依赖的值发生改变才会被重新计算

使用方法

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
});
```

在组件中使用

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

同样 getters 也有一个辅助函数 mapGetters 很少使用

```js
import { mapGetters } from "vuex";

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "doneTodosCount",
      "anotherGetter",
      // ...
    ]),
  },
};
```

如果你想用另一个名字

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

## Mutations

修改 state 中的数据唯一的方法是 提交一个 mutations

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++;
    },
  },
});
```

在组件中调用 mutations 方法

```js
this.$store.commit("increment");
// 如果是分模块的那么就要加上模块的名字
this.$store.commit("模块的名字/increment");
```

mutation 必须是同步函数，不能在这里处理异步操作

## Actions

actions 和 mutation 很类似，但是 action 可以处理异步操作
actions 中想要改变 state 还是需要提交一个 commit 方法

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});
```

组件中如何调用 action

```js
this.$store.dispatch("increment");
// 如果是分模块的那么就要加上模块的名字
this.$store.dispatch("模块的名字/increment");
```

## Module

模块应该算是比较重要的的一个 api

当所有状态都集中到一起，内容就会变的非常庞大和复杂，这个时候我们按照业务模块分撑单独的模块
，每个模块都有自己的状态就会比较清晰

使用方法

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如

我们的 commit 和 dispatch 都需要加上名称

```js
this.$store.commit("模块的名字/increment");
this.$store.dispatch("模块的名字/increment");
```
