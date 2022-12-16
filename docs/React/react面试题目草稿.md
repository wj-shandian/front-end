react 主要做两件事情 页面 UI 渲染 响应事件

- react 虚拟 dom fiber 原理解析 生命周期 diff

虚拟 dom 就是 json 对象
虚拟 dom 的缺点（循环时间上有天然的 时间复杂缺陷）

树结构 （循环+递归 不能被打断）一次循环树结构 时间复杂度 O(n^3)

react 16.0 之前的版本 虚拟 dom 更新是采用 循环和递归
（

任务一旦开始 无法结束 直到任务结束 主线程一直被占用

）

fiber 特性
（
利用浏览器空闲时间执行 不会长时间占用主线程 requestIdleCallback 是浏览器提供的 api 其利用浏览器空闲时间执行任务 当前任务可被终止 优先执行更高级别的任务

将对比更新 dom 的操作碎片化
碎片化的任务 可以根据需要被暂停
）

虚拟 dom 还在 只是不需要 diff 了 diff fiber 链表结构

fiber 对象

虚拟 dom 对象 需要专成 fiber 对象 形成链表

fiber 链表 循环 时间复杂度 O(n)

- redux flux mobx 状态管理

- hooks 解析
