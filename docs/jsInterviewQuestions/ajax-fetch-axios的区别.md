ajax 是一种技术的统称
fetch 是一个全局的 api
axios 是一个三方的库

这是三个不同纬度的东西

- 用 XMLHttpRequest 实现 ajax

```js
function ajax(url, successFn) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn(xhr.responseText);
      }
    }
  };
  xhr.send(null);
}
```

- 用 fetch 实现 ajax

```js
function ajax(url) {
  return fetch(url).then((res) => res.json());
}
```

- fetch 是和 XMLHttpRequest 一个级别
- 浏览器原生 API 用于网络请求
- fetch 语法更简单 方便使用 支持 promise

axios 就是一种网络请求的库，内部可用 XMLHttpRequest 和 fetch 来实现
