- 设备物理像素
  设备物理像素简称 pt 等于屏幕宽度/分辨率 每一小份就是 1pt
- css 像素
  px: px 是基本单位
  pc 屏幕显示器，1px 约等于 0.76 个物理像素
  在移动端上 以 iphone6 为例 设备宽度/分辨率 750/375 所以 1px = 2pt
  由此看 px 也是一个相对单位 但是变化不是很频繁

- rem
  以网页根元素`<html>`元素上设置的默认字体大小为 1rem 默认情况下 1rem=16px 但是这个值是可以修改的
  好处是可以实现响应式布局，元素大小能根据屏幕大小随时变化 因为所有以 rem 为单位的位置，大小都跟着根元素字体大小而变化

- em
  em 是相对当前元素的 font-size
  很多文章说 em 是相对父级 其实是错误的 看个例子

```html
<style>
  body {
    font-size: 16px;
  }
  div {
    font-size: 32px;
    padding-bottom: 2em;
  }
</style>
<body>
  <div></div>
</body>
```

此时 padding-bottom 的值是 64px 而不是 32px 由此可以确定 em 单位是相对当前元素的 当然 如果你当前元素不设置 font-size 那么当前元素会继承父级的 font-size

但是如果 font-size 设置为 em 那么这个 em 是相对父级的 但是 其他属性还是相对 当前元素的 看个例子

```html
<style>
  body {
    font-size: 16px;
  }
  div {
    font-size: 2em; // 32
    padding-bottom: 2em; // 64
  }
</style>
<body>
  <div></div>
</body>
```

只有 font-size 是个特例

如果 根元素设置为 em 那么 1em 默认是 16px

```html
<style>
  html {
    font-size: 2em; // 2*16 32px
  }
  div {
    font-size: 2em; // 2*32 64
    padding-bottom: 2em; // 2*64 128
  }
</style>
<body>
  <div></div>
</body>
```

- vh
  css3 新特性
  无论窗口多高 都将视口高度均分为 100 份 视窗高度的百分比（1vh 代表视窗的高度为 1%）
- vw
  css3 新特性
  无论窗口多宽 都将视口宽均分为 100 份 视窗宽度的百分比（1vw 代表视窗的宽度为 1%）

  vmax 是取 vh 和 vw 中的最大值
  vmin 是取 vh 和 vw 中的最小值
  本质上 vw/vh 就是%

- %：

  百分比是相对父元素的宽度比例
  通常认为子元素的百分比完全相对于直接父元素 但是 不总是这样的 也有一些特例

  一下就是关于 百分比的一些分析
  （1）子元素 height 和 width 的百分比

子元素的 height 或 width 中使用百分比，是相对于子元素的直接父元素，width 相对于父元素的 width，height 相对于父元素的 height。

（2）top 和 bottom 、left 和 right
子元素的 top 和 bottom 如果设置百分比，则相对于直接非 static 定位(默认定位)的父元素的高度，
同样
子元素的 left 和 right 如果设置百分比，则相对于直接非 static 定位(默认定位的)父元素的宽度。

（3）padding
子元素的 padding 如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的 width，而与父元素的 height 无关。

（4）margin
跟 padding 一样，margin 也是如此，子元素的 margin 如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的 width。

（5）border-radius，translate，background-size 相对于自身的宽度
