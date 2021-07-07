举个例子 当图片加载失败的时候展示默认图片

```js
import Vue from "vue";
// 图片失败指令,
// 全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive("error-img", async function (el) {
  // 指令名称为：real-img
  let imgURL = el.getAttribute("src"); // 获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (!exist) {
      el.setAttribute("src", "默认图片地址");
    }
  }
});

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete === true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function () {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
```

更多的指令写法 参考[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
