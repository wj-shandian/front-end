效果图
![效果图](img/css_01.jpg)
随着数字的增加，左边的文字越来越少，并且需要自适应，需要省略。。。效果

```js
<div class="detail_desc">
  <div class="desc">哈哈哈哈哈哈</div>
  <div>100000000000</div>
</div>
```

css 部分

```css
.detail_desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
