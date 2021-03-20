Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

现在布局基本上都可以选择 Flex 布局，兼容较好，相比普通方式布局更加简单，灵活方便维护

## flex-direction (控制方向)

<pre>flex-direction: column | column-reverse | row | row-reverse </pre>

![image](https://upload-images.jianshu.io/upload_images/13691851-2b57a9ba4aa50435.png!thumbnail?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

对应图中的两个方向和四个起点，默认值 是 row，比较常用

## flex-wrap（控制换行）

使用次数不多

主要控制当一行放不下内容是否换行

<pre>flex-wrap: nowrap | wrap | wrap-reverse;</pre>

nowrap 不换行，wrap 换行 第一行上面 wrap-reverse 换行 第一行在下面一次向上排列

## flex-flow

是 flex-direction 和 flex-wrap 的简写，不常用

<pre>flex-flow: <flex-direction> || <flex-wrap>;</pre>

默认值分别取对应的默认值

## justify-content (控制一行元素排列方式)

比较常用

<pre>justify-content: flex-start | flex-end | center | space-between | space-around;</pre>

![image](https://upload-images.jianshu.io/upload_images/13691851-455d37d390374c9d.png!thumbnail?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

常用 center space-around

## align-items (控制内容垂直方向对齐方式)

<pre>align-items: flex-start | flex-end | center | baseline | stretch;</pre>

常用 center

![image](https://upload-images.jianshu.io/upload_images/13691851-a7cbe6278b0ef52d.png!thumbnail?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## align-content (控制多行 垂直方向对齐方式 只有一行不起作用)

<pre>align-content: flex-start | flex-end | center | space-between | space-around | stretch;</pre>

## 分割线

以上属性使用次数较多 ，相对比较熟悉，以下内容相对是学习的重点，使用次数较少

## 单个项目设置属性

### order (设置单个项目排列的位置)

<pre>.item {
  order: <integer>;
}</pre>

数值越小 排列越靠前 默认是 0

### flex-grow（设置是否被拉伸）

flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大

<pre>.item {
  flex-grow: <number>; /* default 0 */
}</pre>

![1614239860(1).jpg](https://upload-images.jianshu.io/upload_images/13691851-0ec33e921d7edb12.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果不设置 或者设置为 0 那么 剩余空间不会被瓜分，

如果都设置为 1 那么剩余空间会被三个共同瓜分，

如果其中一个设置为 2 其他两个设置为 1 那么设置为 2 的占据的空间是设置为 1 的一倍

### flex-shrink(设置是否被压缩)

flex-grow 是拉伸属性，那么 flex-shrink 是压缩属性

<pre>.item {
  flex-shrink: <number>; /* default 1 */
}</pre>

该属性默认是 1 当空间不足的时候都将等比例缩小，如果没有设置换行

如果我们给其中一个属性设置 0 那么该属性不会被压缩，其他属性会被压缩 设置负值无效

### flex-basis（设置占据空间大小）

<pre>.item {
  flex-basis: <length> | auto; /* default auto */
}</pre>

可以设置具体数值 例如 350px 那么将占据 350px 宽度 auto 项目本身大小

要注意其中的优先级关系

max-width/min-width > flex-basis > width > box（盒子大小）

### flex (上面三个属性的简写)

一般都使用这个属性，不单独设置上面三个属性

flex 属性是 flex-grow, flex-shrink  和  flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

<pre>.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}</pre>

### align-self(设置单个属性垂直方向对齐方式)

<pre>.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}</pre>

和 align-items 类似

## 常见面试题目

### flex:1

当  `flex`  取值为一个非负数字，则该数字为  `flex-grow`  值，`flex-shrink`  取 1，`flex-basis`  取 0%，如下是等同的：

<pre>.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}</pre>

### flex:0%

当  `flex`  取值为一个长度或百分比，则视为  `flex-basis`  值，`flex-grow`  取 1，`flex-shrink`  取 1，有如下等同情况（注意 0% 是一个百分比而不是一个非负数字）：

<pre>.item-1 {flex: 0%;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.item-2 {flex: 24px;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}</pre>

### flex: 2 3;

当  `flex`  取值为两个非负数字，则分别视为  `flex-grow`  和  `flex-shrink`  的值，`flex-basis`  取 0%，如下是等同的：

<pre>.item {flex: 2 3;}
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}</pre>

### flex: 2333 3222px;

当  `flex`  取值为一个非负数字和一个长度或百分比，则分别视为  `flex-grow`  和  `flex-basis`  的值，`flex-shrink`  取 1，如下是等同的：

<pre>.item {flex: 2333 3222px;}
.item {
    flex-grow: 2333;
    flex-shrink: 1;
    flex-basis: 3222px;
}</pre>

### flex:0%

参考：[https://www.cnblogs.com/zhus/p/7161702.html](https://www.cnblogs.com/zhus/p/7161702.html)

对 flex-basis 做了详细的解释

## 参考文章

[https://www.cnblogs.com/zhus/p/7161702.html](https://www.cnblogs.com/zhus/p/7161702.html)

[https://juejin.cn/post/6844904016439148551#heading-1](https://juejin.cn/post/6844904016439148551#heading-1)

[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
