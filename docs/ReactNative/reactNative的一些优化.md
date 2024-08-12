# react-native 性能优化

## 1. 点击事件响应速度提升

有些时候在使用 TouchableX 等点击事件的 view 时，直观感受点击事件响应不灵敏。特别是 onPress 内部有耗时操作 如 setState 等，会造成卡顿现象（丢帧），通常可以采用以下方式进行优化

```javascript
handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

## 2. 使用 FlatList 替换 ListView

由于 React-Native 一开始的 ListView 是基于 ScrollView 扩展的，数据量大的时候会导致渲染慢，内存占用高，因此官方后续推出 FlatList，FlatList 性能远高于 ListView，因为 FlatList 在渲染时只渲染屏幕可见范围内的内容，因此渲染速度快，内存占用底。

## 3. 生产环境移除 console.\*

开发时，会有很多`console.*`  指令来帮助调试。并且一些依赖库也会有`console.*`  这些语句对 JavaScript 线程来说是一个极大的消耗。可以通过 Babel 在生产环境中移除掉`console.*`。

## 4. InteractionManager

在 react-native 中的一些动画反馈，比如`TouchableOpacity` 在触摸时会响应 `onPress` 并且 自身的透明度会发生变化，这个过程中如果 `onPress` 中有复杂的操作，很可能会导致组件的透明反馈卡顿，这时可以将`onPress` 中的操作包裹在 `requestAnimationFrame` 中。

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
Interactionmanager 可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证 JavaScript 动画的流畅运行。
例如以下操作可以安排一个任务在交互和动画完成之后执行

```javascript
InteractionManager.runAfterInteractions(() => {
  // ...耗时较长的同步的任务...
});
```

Interactionmanager 还有其他操作

- static runAfterInteractions(callback: Function)

安排一个函数在所有交互合动画完成之后运行

- static createInteractionHandle()

通知管理器有摸个动画或者交互开始了。

- static clearInteractionhandle(handle: Handle)

通知管理器有某个动画或者交互结束了。

- setDeadline(dealine: number)

设置延迟时间，使用 setTimeout 来挂起所有尚未执行的任务

## 5. 尽量避免多级 view 嵌套

React-Native 是将前端的页面布局处理成 native 端的 view 后再进行渲染的，如果 view 层级过高或者过于复杂会影响页面性能，导致一帧(1000/60)无法在 16ms 内完成，就会出现卡顿的现象。
在开发的时候可以通过 debug 工具辅助查看是否有复杂的 view 或者耗时计算

- 过度绘制区域

android 设置->系统->开发者选项->调试 GPU 过度绘制->显示过度绘制区域，如图
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573694702829-2f26659c-d525-4f06-ac79-813de7c5005d.png#align=left&display=inline&height=537&name=image.png&originHeight=1570&originWidth=880&size=349010&status=done&width=301)

红色代表过度绘制区域，颜色越深表示过度绘制程度越高，一般情况超过 4 级，就会变红，或者每级 view 都指定
background 样式也会提示变红。
通过该种方式定位问题并处理前后对比
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573696544469-0452183c-43dd-4c87-9fc8-6f54d522db44.png#align=left&display=inline&height=557&name=image.png&originHeight=1568&originWidth=884&size=456901&status=done&width=314)![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573696564462-96490d6f-074d-4a07-81e6-6af65d67c964.png#align=left&display=inline&height=555&name=image.png&originHeight=1564&originWidth=882&size=468700&status=done&width=313)

- 耗时计算

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1573695266495-79263e05-6012-4506-82b6-dfb55fa14230.png#align=left&display=inline&height=579&name=image.png&originHeight=1396&originWidth=784&size=516196&status=done&width=325)

超过 baseline 就已经出现卡顿的现象了，柱状条越高，卡顿越明显

## header 背景无故丢失

检查当前页面或者上级页面是否在样式里面使用了 overflow: hidden

## iOS 端 TextInput 组件无法通过长按唤起复制、粘贴等操作

检查 rn-debug 是否使用的是最新版本
