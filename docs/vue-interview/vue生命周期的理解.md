- beforeCreate 在实例化之后，数据观测（data observer） 和 event/watcher 事件配置之前被调用，
  在当前阶段 data 、methods、computed 以及 watch 上的方法都不能被访问

- created 实例已经创建完成 之后被调用，在这一步 实例完成了一下配置

  - 数据观测（data observer）属性和方法的运算
  - watch/event 事件回调 这时候没有$el 不过可以使用 $nextTick 来访问 DOM

- beforeMounted 在挂载开始之前调用，相关的 render 函数首次被调用

- mounted 在挂载完成后发生，在当前阶段，真实 DOM 挂载完毕，数据完成双向绑定，可以访问 DOM 节点

- beforeUpdate 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前，可以在这个钩子进一步修改状态，不会触发附加的重渲染

- updated 发生在更新完成之后，在当前阶段组件 DOM 已完成更新，要注意避免在这个阶段更新数据，否则可能导致无限循环更新

- beforeDestroy 实例销毁之前调用，在这一步实例仍然可以使用，可以在这一步清除监听事件和定时器等

- destroyed Vue 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

- activated keep-alive 专属，组件被激活时调用

- deactivated keep-alive 专属，组件被销毁时调用

异步请求可以在 钩子函数 create beforeMount mounted 中进行异步请求。因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要操作 dom 推荐在 created 中请求，这样可以更快的获取服务端数据
