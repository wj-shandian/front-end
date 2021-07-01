## vue-cli2 遇到 js 内存溢出问题解决方案

直接在命令行 npm run dev 和 npm run build 命令行加上 --max_old_space_size=4096，主要是增加的 node 运行内存

## vue-cli3 遇到 js 内存溢出问题解决方案

安装 npm 包 `increase-memory-limit` 和`cross-env`
添加命令行

```js
"scripts": {
   "serve": "vue-cli-service serve",
   "build": "vue-cli-service build",
   "fix-memory-limit": "cross-env LIMIT=4096 increase-memory-limit",
},
```

安装完成后，先执行一次 npm run fix-memory-limit
之后再正常启动即可

使用安装模块 fix-memory-limit 的方式生效，其原理是修改了 node_modules 中一个叫做.bin（通常就是第一个文件夹）的文件夹内所有文件权限。

参考链接 https://www.dazhuanlan.com/2019/09/28/5d8f573b1b578/
