书接上文 上一篇文章提到了 node 打包 C++ ,

electron 是可以直接引用 addon.node 的模块

```js
require("electron").remote.require("addon.node");
```

由于需要分别引用 32 位和 64 位的的文件，但是需要的动态的库名字是相同的，所以这个时候需要区分文件夹

由于引入了 dll 的动态库 ，所以 dll 是不能被正确打包

这个时候需要主动把文件移动到根目录下面，配置写 package.json 的 build 下面

```js
 extraResources: [
    {
        from: './public/addon64/',
        to: 'addon64',
        filter: ['**/*'],
    },
    {
        from: './public/addon32/',
        to: 'addon32',
        filter: ['**/*'],
    },
],
```

同时 electron 引入的方式也需要改变

```js
require("electron").remote.require(
  process.arch === "x64"
    ? path.join(path.dirname(__dirname), "addon64", "addon.node")
    : path.join(path.dirname(__dirname), "addon32", "addon.node")
);
```
