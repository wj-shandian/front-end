开始的布局方式

```css
.mask_content {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  box-sizing: border-box;
  background: #ffffff;
  margin: auto;
  width: 562px;
  height: 590px;
  border-radius: 12px;
  text-align: center;
}
```

设置固定高度，然后发现中间的文字会随着各种手机屏幕的大小导致变成多行，导致内容被撑出区域内，
此时我们的弹窗高度设置为自适应应当更好，高度随着内容变化。  
这个时候我们需要更换另一种居中的方式

```css
.mask_content {
  position: fixed;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  background: #ffffff;
  margin: auto;
  width: 562px;
  border-radius: 12px;
  text-align: center;
  transform: translate(-50%, -50%);
}
```

删除 bottom,和 top，当我们同时设置 bottom top left right,就相当于给设置了固定的宽高，此时我们的高度是不能自适应的。
