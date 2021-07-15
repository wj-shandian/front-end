## vue-router 原理

vue-router 主要有两种模式 hash 和 history 模式

### hash 的实现原理

hash 模式 在路由里会有一个/#/ 改变页面中的 hash 不会引起页面的刷新

主要是通过监听 hashChange 事件监听 url 的变化

```js
// 主要代码
let routerView = routeView;
window.addEventListener("hashchange", () => {
  let hash = location.hash;
  routerView.innerHTML = hash;
});
window.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) {
    //如果不存在hash值，那么重定向到#/
    location.hash = "/";
  } else {
    //如果存在hash值，那就渲染对应UI
    let hash = location.hash;
    routerView.innerHTML = hash;
  }
});
```

### history 主要原理

history 主要提供了 pushState 和 replaceState 两个 api,通过这两个 API 可以改变 url 地址且不会发送请求

history 提供了一个 popState 事件，通过点击浏览器的前进和后退我们可以监听这个事件触发相应的路由，

```js
let routerView = routeView;
window.addEventListener("DOMContentLoaded", onLoad);
window.addEventListener("popstate", () => {
  routerView.innerHTML = location.pathname;
});
function onLoad() {
  routerView.innerHTML = location.pathname;
  var linkList = document.querySelectorAll("a[href]");
  linkList.forEach((el) =>
    el.addEventListener("click", function (e) {
      e.preventDefault();
      history.pushState(null, "", el.getAttribute("href"));
      routerView.innerHTML = location.pathname;
    })
  );
}
```

## vue-router 源码实现

```js
//myVueRouter.js
let Vue = null;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes || []; //你传递的这个路由是一个数组表
    // 改变数据结构类型 方便使用
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }
  init() {
    if (this.mode === "hash") {
      // 先判断用户打开时有没有hash值，没有的话跳转到#/
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        this.history.current = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });
    }
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
VueRouter.install = function (v) {
  Vue = v;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 如果是根组件
        this._root = this; //把当前实例挂载到_root上
        this._router = this.$options.router;
        Vue.util.defineReactive(this, "xxx", this._router.history);
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }
      // router 是一个全局的对象，里面包含了所有路由关键属性和对象信息
      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        },
      });
      // router 是一个跳转路由的对象，一个局部对象，里面会包含当前路由一些信息  例如 name path params query等
      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });
  Vue.component("router-link", {
    props: {
      to: String,
    },
    render(h) {
      let mode = this._self._root._router.mode;
      let to = mode === "hash" ? "#" + this.to : this.to;
      return h("a", { attrs: { href: to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      return h(routeMap[current]);
    },
  });
};

export default VueRouter;
```
