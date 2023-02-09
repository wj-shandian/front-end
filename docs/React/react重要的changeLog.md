# 18.0.0 (March 29, 2022)

下面是所有的新功能、API、弃用和突破性变化的列表。
阅读 [React 18 release post](https://reactjs.org/blog/2022/03/29/react-v18.html) 和 [React 18 upgrade guide](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html) 了解更多信息。

### New Features

### React

- `useId`是一个新的钩子，用于在客户端和服务器上生成唯一的 ID，同时避免水化不匹配。它主要适用于与需要唯一 ID 的可访问性 API 集成的组件库。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更加重要，因为新的流媒体服务器渲染器是如何不按顺序地提供 HTML 的。
- `startTransition`和`useTransition`让你把一些状态更新标记为不紧急。其他状态更新在默认情况下被认为是紧急的。React 将允许紧急的状态更新（例如，更新一个文本输入）打断非紧急的状态更新（例如，渲染搜索结果的列表）。
- `useDeferredValue`让你推迟重新渲染树的非紧急部分。它与 debouncing 类似，但与之相比有一些优势。没有固定的时间延迟，所以 React 会在第一次渲染反映在屏幕上后立即尝试延迟渲染。延迟渲染是可中断的，不会阻止用户输入。
- `useSyncExternalStore`是一个新的钩子，它允许外部存储支持并发读取，强制对存储的更新是同步的。在实现对外部数据源的订阅时，它消除了对`useEffect'的需求，并推荐给任何与 React 外部状态集成的库。
- `useInsertionEffect`是一个新的钩子，允许 CSS-in-JS 库解决渲染中注入样式的性能问题。除非你已经建立了一个 CSS-in-JS 库，否则我们不希望你使用这个。这个钩子将在 DOM 被突变后运行，但在布局效果读取新的布局之前。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更为重要，因为 React 在并发渲染时向浏览器让步，使其有机会重新计算布局。

### React DOM Client

这些新的 API 现在从`react-dom/client`导出。

- `createRoot`: 新的方法来创建一个根，以`render`或`unmount`。使用它代替`ReactDOM.render`。没有它，React 18 的新功能就不能工作。
- `hydrateRoot`: 为服务器渲染的应用程序提供水化的新方法。使用它代替`ReactDOM.hydrate`，与新的 React DOM 服务器 API 结合使用。没有它，React 18 的新功能就不能工作。

`createRoot`和`hydrateRoot`都接受一个新的选项，叫做`onRecoverableError`，以防你想在 React 在渲染或水化过程中恢复错误时得到通知，以便记录。默认情况下，React 将使用[`reportError`](https://developer.mozilla.org/en-US/docs/Web/API/reportError)，或在旧的浏览器中使用`console.error`。

## All Changes

## React

- 增加`useTransition`和`useDeferredValue`，以区分紧急更新和过渡。
- 增加`useId`用于生成唯一的 ID。
- 增加`useSyncExternalStore`以帮助外部存储库与 React 集成。
- 增加`startTransition`作为`useTransition`的一个版本，不需要等待反馈。
- 为 CSS-in-JS 库增加`useInsertionEffect`。
- 使 Suspense 在内容重新出现时重新安装布局效果。
- 使`<StrictMode>`重新运行效果以检查可恢复的状态。
- 假设符号总是可用的。
- 移除 `object-assign` polyfill.
- 删除不支持的 `unstable_changedBits` API。
- 允许组件渲染未定义。
- 同步冲刷由离散事件（如点击）产生的`useEffect`。
- 悬念 `fallback={undefined}`现在的行为与`null`相同，不会被忽略。
- 考虑所有`lazy()`解析到同一组件的等价物。
- 在第一次渲染时不要修补控制台。
- 提高内存使用率。
- 改进如果字符串胁迫抛出的信息（Temporal.\*, Symbol, etc.）
- 当通过 "MessageChannel "可用时，使用 "setImmediate"。
- 修复上下文在悬浮树内传播失败的问题。
- 修复`useReducer`通过移除急切的保释机制观察到不正确的道具。
- 修复在 Safari 中追加 iframe 时，`setState`被忽略的问题。
- 修复在树中渲染`ZonedDateTime`时的崩溃。
- 修正在测试中文档被设置为`null'时的崩溃。
- 修正`onLoad`在并发功能开启时不触发的问题。
- 修正选择器返回`NaN`时的警告。
- 修正生成的许可证头。
- 增加`package.json`作为入口点之一。
- 允许在暂停边界外暂停。
- 在水合失败时记录一个可恢复的错误。

### React DOM

- 增加 "createRoot "和 "hydrateRoot"。
- 增加选择性水化。
- 在已知的 ARIA 属性列表中增加`aria-description`。
- 为视频元素增加`onResize`事件。
- 增加`imageSizes`和`imageSrcSet`到已知道具。
- 如果提供 "value"，允许非字符串的"<option>"子女。
- 修复`aspectRatio'样式不被应用。
- 在调用`renderSubtreeIntoContainer'时发出警告。

# 17.0.0 (October 20, 2020)

今天，我们将发布 React 17!

### React

- 添加`react/jsx-runtime`和`react/jsx-dev-runtime`用于[new JSX transform]（https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154-https-githubcom-babel-babel-pull-11154）。([@lunaruan](https://github.com/lunaruan) in [#18299](https://github.com/facebook/react/pull/18299))
- 从本地错误框架建立组件堆栈。([@sebmarkbage](https://github.com/sebmarkbage) in [#18561](https://github.com/facebook/react/pull/18561))
- 允许在上下文中指定`displayName'，以改进堆栈。([@eps1lon](https://github.com/eps1lon) in [#18224](https://github.com/facebook/react/pull/18224))
- 防止`'use strict'在 UMD 捆绑包中泄漏。([@koba04](https://github.com/koba04) in [#19614](https://github.com/facebook/react/pull/19614))
- 停止使用`fb.me`进行重定向。([@cylim](https://github.com/cylim) in [#19598](https://github.com/facebook/react/pull/19598))

### React DOM

- 将事件委托给根部而不是`document`。
- 在运行任何下一个效果之前清理所有效果。
- 异步运行`useEffect`清理函数。
- 在`onFocus`和`onBlur`中使用浏览器的`focusin`和`focusout`。
- 使所有的`Capture`事件使用浏览器的捕获阶段。
- 不要模仿 "onScroll "事件的冒泡。
- 如果`forwardRef`或`memo`组件返回`undefined`则抛出。
- 删除事件池。
- 停止暴露那些 React Native Web 不需要的内部结构。
- 当根节点挂载时，附加所有已知的事件监听器。
- 在 DEV 模式双倍渲染的第二次渲染过程中禁用`console`。
- 废除无文件记录和误导性的`ReactTestUtils.SimulateNative` API。
- 重命名内部使用的私有字段名。
- 不要在开发中调用用户计时 API。
- 在严格模式下重复渲染时禁用控制台。
- 在严格模式下，对没有 Hooks 的组件也进行重复渲染。
- 允许在生命周期方法中调用`ReactDOM.flushSync`（但要警告）。
- 为键盘事件对象增加`code`属性。
- 为`video`元素添加`disableRemotePlayback`属性。
- 为`input`元素增加`enterKeyHint`属性。
- 当没有向`<Context.Provider>提供`value'时发出警告。
- 当`memo'或`forwardRef'组件返回`undefined'时发出警告。
- 改进无效更新的错误信息。
- 将 forwardRef 和 memo 排除在堆栈框架之外。
- 改进在受控和非受控输入之间切换时的错误信息。
- 保持`onTouchStart`、`onTouchMove`和`onWheel`的被动性。
- 修复`setState`在开发中挂在封闭的 iframe 内。
- 修复 "defaultProps "的懒惰组件的渲染跳出。
- 修正当`dangerouslySetInnerHTML`为`undefined`时的错误警告。
- 修复非标准的 "require "实现的 Test Utils。
- 修正`onBeforeInput`报告错误的`event.type`。
- 修复`event.relatedTarget`在 Firefox 中报告为`undefined`。
- 修复 IE11 中的 "未指定的错误"。
- 修复渲染到影子根的问题。
- 修复`movementX/Y` polyfill 与捕获事件。
- 对`onSubmit`和`onReset`事件使用授权。
- 改善内存使用。

### Concurrent Mode (Experimental) 并行模式

- 改造优先级批处理启发式方法。、
- 在实验性 API 前添加`unstable_`前缀。
- 删除 `unstable_discreteUpdates` 和 `unstable_flushDiscreteUpdates`。
- 删除`timeoutMs'参数。
- 禁用`<div hidden />` prerendering，支持未来不同的 API。
- 为 CPU 绑定的树添加`unstable_expectedLoadTime`到 Suspense。
- 添加一个实验性的`unstable_useOpaqueIdentifier` Hook。
- 添加一个实验性的`unstable_start Transition` API。
- 在测试渲染器中使用 `act` 不再刷新 Suspense 后退。
- 对 CPU Suspense 使用全局渲染超时。
- 在挂载前清除现有的根内容。
- 修正了一个错误边界的问题。
- 修复了一个导致暂停的树中的更新丢失的 bug。
- 修复了一个导致渲染阶段更新丢失的 bug。
- 修复 SuspenseList 中的一个 bug。
- 修复了一个导致 Suspense 回退过早显示的 bug。
- 修复了 SuspenseList 中类组件的一个 bug。
- 修复了一个输入的 bug，可能会导致更新被放弃。(
- 修复了一个导致 `Suspense` 回退卡住的 bug。
- 如果水化，不要切掉 `SuspenseList` 的尾巴。
- 修复`useMutableSource`中的一个 bug，当`getSnapshot`改变时可能会发生。
- 修复`useMutableSource`中的一个撕裂的 bug。
- 如果在渲染之外但在提交之前调用 `setState`，会有警告。

# 16.8.0 (February 6, 2019)

### React

- 添加[Hooks](https://reactjs.org/docs/hooks-intro.html) — a way to use state and other React features without writing a class. ([@acdlite](https://github.com/acdlite) et al. in [#13968](https://github.com/facebook/react/pull/13968))
- 改进`useReducer`Hook 懒惰初始化 API ([@acdlite](https://github.com/acdlite) in [#14723](https://github.com/facebook/react/pull/14723))

# 16.6.0 (October 23, 2018)

### React

- 增加`React.memo()`作为`PureComponent`的替代函数。([@acdlite](https://github.com/acdlite) in [#13748](https://github.com/facebook/react/pull/13748))
- 增加`React.lazy()`用于代码分割组件。([@acdlite](https://github.com/acdlite) in [#13885](https://github.com/facebook/react/pull/13885))
- `React.StrictMode`现在对传统的上下文 API 发出警告。([@bvaughn](https://github.com/bvaughn) in [#13760](https://github.com/facebook/react/pull/13760))
- `React.StrictMode`现在对`findDOMNode`提出警告。([@sebmarkbage](https://github.com/sebmarkbage) in [#13841](https://github.com/facebook/react/pull/13841))
- 将`unstable_AsyncMode`更名为`unstable_ConcurrentMode`。([@trueadm](https://github.com/trueadm) in [#13732](https://github.com/facebook/react/pull/13732))
- 将`unstable_Placeholder`更名为`Suspense`，`delayMs`更名为`maxDuration`。([@gaearon](https://github.com/gaearon) in [#13799](https://github.com/facebook/react/pull/13799) and [@sebmarkbage](https://github.com/sebmarkbage) in [#13922](https://github.com/facebook/react/pull/13922))

# 16.3.0 (March 29, 2018)

### React

- 增加一个新的官方支持的语境 API。(@acdlite in #11818)
- 增加一个新的 React.createRef()API，作为回调引用的一个人体工程学替代方案。(@trueadm in #12162)
- 增加一个新的 React.forwardRef()API，让组件将其引用转发给子代。(@bvaughn 在 #12346)
- 修正在 IE11 中使用 React.Fragment 时出现的误报。(@XaveScor 在 #11823)
- 用 React.unstable_AsyncComponent 替换 React.unstable_AsyncMode。(@acdlite 在 #12117)
- 改进在未安装的组件上调用 setState()时的错误信息。(@sophiebits 在 #12347)

### React DOM

- 增加一个新的 getDerivedStateFromProps()生命周期和 UNSAFE\_别名，用于传统的生命周期。(@bvaughn in #12028)
- 增加一个新的 getSnapshotBeforeUpdate()生命周期。(@bvaughn in #12404)
- 增加一个新的`<React.StrictMode>`包装器，以帮助应用程序为异步渲染作准备。(@bvaughn 在 #12083)
- 在`<link>`标签上增加对 onLoad 和 onError 事件的支持。(@roderickhsiao 在 #11825)
- 在`<script>`标签上增加对 noModule 布尔属性的支持。(@aweary 在 #11900)
- 修复 IE 和 Safari 中的小 DOM 输入错误。(@nhunzaker 在 #11534)
- 在更多的浏览器中正确地检测到 onKeyPress 中的 Ctrl + Enter。(@nstraub 在 #10514)
- 修复包含元素在 SSR 标记不匹配时被聚焦的问题。(@koba04 在 #11737)
- 修复 value 和 defaultValue 忽略符号值的问题。(@nhunzaker 在 #11741)
- 修正当属性被删除时，对类组件的引用没有被清理。(@bvaughn 在 #12178)
- 修复在不同窗口中渲染输入时的 IE/Edge 问题。(@M-ZubairAhmed 在 #11870)
- 如果组件在 jsdom 被销毁后运行，抛出一个有意义的消息。(@gaearon 在 #11677)
- 如果有一个名为 opera 的全局变量的值为空，则不会崩溃。(@alisherdavronov 在 #11854)
- 不要检查旧版本的 Opera。(@skiritsis 在 #11921)
- 重复关于<选择的选项>的警告信息。 (@watadarkstar 在 #11821)
- 重复关于无效回调的警告信息。(@yenshih 在 #11833)
- 废弃 ReactDOM.unstable_createPortal()，改用 ReactDOM.createPortal()。(@prometheansacrifice 在 #11747)
- 不要为上下文类型发射用户计时条目。(@abhaynikam 在 #12250)
- 改进上下文消费者子代不是函数时的错误信息。(@raunofreiberg 在 #12267)
- 改进向功能组件添加引用时的错误信息。(@skiritsis 在 #11782)

# 16.0.0 (September 26, 2017)

添加 fiber
