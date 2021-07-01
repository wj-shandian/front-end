### 前沿

因接手一个 vue 多页面 webpack 打包项目，因页面较多，每次修改内容，热更新加载非常缓慢，非常耗时，遂寻找解决办法，于是看到有一插件可用`html-webpack-plugin-for-multihtml`,因项目 webpack 的版本是 3.x,并清楚在 4.x 下是否可用，在以后有时间会加以测试。于是记录下这篇知识点。
首先下载包 ` npm install html-webpack-plugin-for-multihtml -D`
代码部分

```js
const HtmlWebpackPluginMutihtml = require("html-webpack-plugin-for-multihtml");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 多页面输出配置
// https://github.com/ampedandwired/html-webpack-plugin
exports.htmlPlugin = function () {
  const arr = [];
  filesArray.forEach((item) => {
    const { filePath, fileDir, fileName } = item;
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: fileDir + ".html",
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ["manifest", "vendor", fileName],
      inject: true,
      multihtmlCache: true, //解决多页面热更新的关键
    };
    if (process.env.NODE_ENV === "production") {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        chunksSortMode: "dependency",
      });
      arr.push(new HtmlWebpackPlugin(conf));
    } else {
      arr.push(new HtmlWebpackPluginMutihtml(conf));
    }
  });
  return arr;
};
```

因尚不可知这一插件在正式环境打包生成 html 文件是否会有问题，因为也只是为了解决热更新缓慢的问题，所以使用了两个版本的插件生成 html 文件。
主要是在 conf 中配置` multihtmlCache: true`，这是解决热更新缓慢的关键。其他代码可自行忽视。
以上代码仅是多页面配置部分内容，仅供参考。
