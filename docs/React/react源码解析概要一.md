虚拟 dom

用 js 对象表示 dom 信息和结构 当状态变更的时候 重新渲染 js 的对象结构 这个 js 对象成为虚拟 dom

为什么要用虚拟 dom

dom 操作很慢，轻微的操作可能导致页面重新排版，非常耗费性能，相对于 dom 对象 js 对象处理起来更快 而且更简答，
通过 diff 算法 对比新旧 vdom 之间的差异 可以批量的 最小化的执行 dom 的操作 从而提升性能

react 中用 jsx 语法描述视图，该函数将生成 vdom 来描述真是的 dom 如果状态变化 vdom 将作出相应的变化，再通过 diff 算法对比新老 vdom 区别 从而作出最终的 dom 操作

jsx

## 什么是 jsx

语法糖
react 使用 jsx 来代替常规的 jsx
jsx 是一个看起来很像 xml 的 js 语法扩展

## 为什么需要 jsx

- 开发效率 使用 jsx 编写模版 效率更快
- 执行效率 jsx 编译为 js 后进行了优化执行更快
- 类型安全 在编译过程就可以发现错误

- react16 的原理 babel-loader 会与变异 jsx 为 React.createElement()
- react17 原理 react17 中 jsx 转换不会将 jsx 转化为 react.createElement 而是自动从 react 的 package 中引入新的入口函数调用 这次的升级不会改变 jsx 的语法 旧的 jsx 也可以继续使用

和 vue 的不同点

- react 中的虚拟 dom+jsx 点设计一开始就有 vue 则是更新过程才出现的
- jsx 本身是 js 的扩展，转译过程相对简单，vue 是把 template 模版编译为 render 函数的过程 需要复杂的编译器转化字符串 ast-js 函数字符串

## 如何判断是类组件还是函数组件

`Component.prototype.isReactComponent = {}` 是否存在

# fiber

fiber 就是链表结构的 js 对象

## 为什么你需要 fiber

对于大型项目，组件树会很大，这个递归遍历都成本就会很高，造成主线成持续被占用，结果就是主线程上的布局 动画等周期性的任务无法立刻得到处理，造成视觉上的卡顿，影响用户体验

## 分解的意义

解决主线程被占用 无法释放的的问题

## 增量渲染 把渲染拆分成块 分到多帧上

## 更新时可以暂停和终止 复用渲染任务

## 给不同类型的更新赋予优先级

## 并发新的基础能力

## 更加流畅
