## 什么是 BFC

Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。  
那么 BFC 是什么呢？  
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。  
通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何变化，都不会影响到外部。

## 如果触发 BFC

- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

```js
<style>
 .father{
     float:left;
     position:absolute | fixed ;
     display:inline-block | flex;
     overflow:hidden;
     // 这些属性随意设置一个就会形成BFC
 }
 .son{ float:left;width:300px;height:300px}
 // 当我们的子集元素浮动的时候，并且父级元素没有设置任何元素，我们发现父级元素并没有被撑开，那么如果撑开父级元素呢，形成一个BFC就可以
</style>

<body>
   <div class="father">
      <div class="son"></div>
   </div>
</body>
```

## BFC 可以解决那些问题

来看一些例子

margin 高度塌陷问题

```js
<div class="father">
   <div class="son">
   </div>
</div>

<style>
   .father{
       width:200px;
       height:300px;
       background:red
   }
   .son{
       width:100px;
       height:100px;
       background:pink;
       margin-top:50px;
   }
</style>
// 这个时候我们在子集上设置了一个margin-top,我们会发现父级元素会向下走，并没有出现son距离father上边距
// 这个时候我们只要给father设置overflow:hidden 形成一个BFC就可以解决这个问题
```
