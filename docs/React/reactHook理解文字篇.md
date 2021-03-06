## react-hook 理解文字篇

### 作用

- 让 React 更好的拥抱函数式
- 更好的解决组合问题

### 原理

原理上他们都是钩子（hook）当 react 生命周期发生变化的时候 会触发他们

Hook 的作用是从系统外部监听系统内部的变化，并和某种特定的事件挂钩，比如 Git 的 Web Hooks 看到 Git 有提交，就会触发一个 HTTP 请求，操作系统的进程 Hook，看到有新的进程，就会创建发送一条消息。
所以 Hook 的实现有两个方面

- 被监听的实体在特定的情况下发送消息给 Hook
- Hook 对象收到这种消息完成某个具体的工作

ReactHook 是在某种特定的状态下发生变化的时候会通知 Hook，然后 Hook 再去完成某个特定的行为

比如说`useEffect`当 React 渲染的时候会触发 Hook，如果这个 hook 的依赖发生变化，就会执行这个 Hook 上关联的函数，useState 是一个反向的 Hook，当用户设置状态变更的时候，会反向触发 React 的更新，

所以 Hooks 是一种通知机制

## 问答

- reactHook 出现解决了什么问题？

首先 reactHook 出现以后 我们把组件可以看成一个函数。组件是一个用来渲染函数 纯函数：不再关注生命周期，不需要理解生命周期，更加接近 React 对组件的一个定义

其次 reactHook 解决了用户的一些痛点：针对状态/作用/上下文/缓存等方面，为用户制定了一些 hook 函数，而不是像之前那样都需要在自己的类中去实现

最后，让用户以最小的代价去关注分离点

- 说说你对 Hooks 的理解？

参考上面原理部分的理解
