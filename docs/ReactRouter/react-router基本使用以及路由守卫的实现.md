分析版本 V6 react-router

[官网地址](https://reactrouter.com/docs/en/v6/api#navigate)

# 基本概念

## 安装

`npm i react-router-dom`

- react-router 包含 React Router 的大部分核心功能，包括路由匹配算法和大部分核心组件和钩子
- react-router-dom 包括所有内容 react-router 并添加了一些特定于 DOM 的 API，我们所有需要的组件 都从 react-router-dom 文件中获取

## 经常使用到的组件

- `<BrowserRouter>` 就是以 H5 的 history 模式运行（这种方式居多）
- `<HashRouter>` Hash 模式 url 上面有#号
- `<Link>` 路由跳转
- `<Routes>` 查找所有的子元素 在 v6 版本之前 这个 应该是 `<Switch>`
- `<Route>` 找到最佳匹配的组件 然后展示组件元素

## 一个基本的 demo 的实现

```js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Home() {
  return <div className="com">这是home</div>;
}
function User() {
  return <div className="com">这是user</div>;
}

function Page404() {
  return <div className="com">这是404</div>;
}

function Login() {
  return <div className="com">这是登陆页面</div>;
}
function ReactRouter() {
  return (
    <div className="main">
      <BrowserRouter>
        <nav className="header">
          <Link to="/">
            <div className="home">home</div>
          </Link>
          <Link to="/user">
            <div className="home">user</div>
          </Link>
          <Link to="/login">
            <div className="home">登陆</div>
          </Link>
          <Link to="/app/add">
            <div className="home">404Page</div>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default ReactRouter;
```

## 嵌套路由

嵌套路由需要用到一个新的 api `<Outlet>`,并且嵌套的路由需要写到 Route 组件内

以上面的代码为例 只写关键代码

```js
function Home() {
  return (
    <div className="com">
      这是home
      <div>
        <Link to="/">默认路由</Link>
        <Link to="homeChildren">嵌套路由1</Link>
      </div>
      {/* 注意要加上这个属性*/}
      <Outlet></Outlet>
    </div>
  );
}
function HomeChildren() {
  return <div>我是home的嵌套路由</div>;
}
function HomeDefault() {
  return <div>我是home的嵌套路由 默认页面</div>;
}

....

 <Route path="/" element={<Home />}>
    <Route path="/" element={<HomeDefault />}></Route>
    <Route path="homeChildren" element={<HomeChildren />}></Route>
</Route>
```

如果需要默认打开一个嵌套的路由 那么内部的 path 可以设置为`/`,注意嵌套的父元素 要加上 `<Outlet></Outlet>`这个位置就是渲染嵌套组件的未知

## 匹配 404

当我们路由跳转到一些没有定义的路由时 这个时候我们想要匹配 404 页面 那么我们可以把 path 设置为`*`

```js
<Route path="*" element={<Page404 />} />
```

这个没有只要放在 Routes 内部就可以 没有顺序要求

## 动态路由

利用 url 传递参数，匹配对应的格式找到对应的组件

```js
<Route path=":id" element={<DynamicComponent />}></Route>
```

## 路由守卫

看一下 v6 版本的路由守卫的写法

```js
import { Navigate } from "react-router-dom";

function GuardsRouter(props) {
  const isLogin = false;
  return isLogin ? (
    <>{props?.children}</>
  ) : (
    <div>
      <Navigate to="/login"></Navigate>
    </div>
  );
}

<Route
  path="user"
  element={
    <GuardsRouter>
      <User />
    </GuardsRouter>
  }
/>;
```

基本使用方法就是这样，可以根据自己的实际项目的需求然后进行改造
