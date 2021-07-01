## 安装

`npm install --save-dev webpack npm install --save-dev webpack@<version>` //可以指定安装版本  
如果版本在 4 以上还需要 webpack-cli  
`npm install --save-dev webpack-cli`  
不推荐全局安装

`"scripts": { "start": "webpack --config webpack.config.js" }, `  
 修改 package.json 的命令

## 配置基本的 webpack.config.js

```js
const path = require("path"); //node自带 的模块

module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.js", //输出文件名
    path: path.resolve(__dirname, "dist"), //输出文件夹
  },
};
```

## 基本配置的 loder

loader 的概念：webpack 允许你使用 loader 来处理除了 js 之外的任何静态资源，你可以使用 nodejs 来编写自己的 loader  
 1.file-loader

```js
module.exports = {
 module: {
   rules: [
     {
       test: /\.(png|jpg|gif)$/,
       use: [
         {
           loader: 'file-loader',
           options: {
               name:'[path][name].[ext],'//为文件配置自定义的模板，//[hash]哈希值
               //[name]资源原本的名字
               //[ext]资源扩展名
               //[path]资源路径
               publicPath: 'assets/',
               //为你的文件配置自定义的发布目录
               outputPath: 'images/',
               //文件打包后的目录
               //其他不常用配置项需时参考官网loader
           }
         }
       ]
     }
   ]
 }
}
```

可以用来处理图片和字体包之类的资源
[相关的配置项:]()https://www.webpackjs.com/loaders/file-loader/)

2.style-loader css-loader url-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        //只能解析正常的css,如果你使用的是sass,还需要装sass-loader等等
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000, //配置图片的大小小于多少kb可以打包成base64
        },
      },
    ],
  },
};
```

生产环境提取 css

```js
const env = process.env.NODE_ENV;

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use:
          env === "production"
            ? ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"],
              })
            : ["style-loader", "css-loader"],
      },
    ],
  },
  plugins:
    env === "production"
      ? [
          new ExtractTextPlugin({
            filename: "[name].css",
          }),
        ]
      : [],
};
```

主要借助于 extract-text-webpack-plugin 的使用
详细使用见官网https://www.webpackjs.com/loaders/css-loader/
目前该插件不在支持 webpack4.x，新版本应该使用

mini-css-extract-plugin
对比上一个插件的优点

- 异步加载
- 不重复编译 性能好
- 只针对 css

```js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  module.exports = {
      module:{
          rules:[
          {
              test: /\.css$/,
              use:[{
                  loader:MiniCssExtractPlugin.loader,
                  options:{

                  },
                  'css-loader'
              }],
                //排除在外不需要处理的部分
                exclude: /node_modules/
          }
          ]
      },
      plugins:[
       new MiniCssExtractPlugin({
          //主文件入口生成的文件名
           filename:'[name].[hash].css',
           // 按需加载文件生成的文件名
           chunkFilename:'[id].[hash].css'
       })
      ]
  }

```

[插件使用方法 npm 地址](https://www.npmjs.com/package/mini-css-extract-plugin)

压缩 css 可以使用 optimize-css-assets-webpack-plugin 插件

```js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 普通压缩
plugins: [new OptimizeCSSAssetsPlugin()];

// 使用cssnano配置规则
// 先 npm i cssnano -D
plugins: [
  new OptimizeCSSAssetsPlugin({
    // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
    assetNameRegExp: /\.(sa|sc|c)ss$/g,
    // 指定一个优化css的处理器，默认cssnano
    cssProcessor: require("cssnano"),

    cssProcessorPluginOptions: {
      preset: [
        "default",
        {
          discardComments: { removeAll: true }, //对注释的处理
          normalizeUnicode: false, // 建议false,否则在使用unicode-range的时候会产生乱码
        },
      ],
    },
    canPrint: true, // 是否打印编译过程中的日志
  }),
];
```

这个插件不支持热更新 最好在生产环境中使用，开发环境可以用 style-lodader,使用了这个插件会影响 webpack 内置的对 js 的压缩失效，需要重新配置

```js
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      cache: true, // Boolean/String,字符串即是缓存文件存放的路径
      parallel: true, // 启用多线程并行运行提高编译速度
      sourceMap: true,
      /*
          uglifyOptions: {
            output: {
              comments: false  // 删掉所有注释
            }，
            compress: {
                warning: false, // 插件在进行删除一些无用的代码时不提示警告
                drop_console: true // 过滤console,即使写了console,线上也不显示
            }
          } */
    }),
    new OptimizeCSSAssetsPlugin({}),
  ];
}
```

css 自动添加前缀 安装 npm install postcss-loader autoprefixer --save-dev
可以创建 postcss 的配置文件 postcss.config.js

```
module.exports = {
      plugins:[
         require('autoprefixer')
      ]
    }

```

```js
//webpack的css的配置中需要加上postcss-loader
 {
                    test: /\.(sa|sc|c)ss$/,
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options:{
                                importLoaders: 1
                            }
                        },
                        "postcss-loader",
                        "sass-loader",
                    ],
                    //排除在外不需要处理的部分
                    exclude: /node_modules/
                },
```

还可以添加 .browserslistrc 来覆盖浏览器
这个配置主要是配置 autoprefixer 和 @babel/preser-env 来使用  
[npm 配置地址](https://www.npmjs.com/package/browserslist)

```js
//  常用配置
"last 1 version", "> 1%", "IE 10";
```

## 常用的插件

1.HtmlWebpackPlugin  
 `npm install --save-dev html-webpack-plugin`  
 帮助我们生成 html 文件  
 基本用法

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
 entry: 'index.js',
 output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'index_bundle.js'
 },
 plugins: [new HtmlWebpackPlugin({
      title:'OutpuManagement'//生成html文件的标题
      template: 'src/index.html'//可以使用固定的模板要是绝对路径才可以


    })]
};
```

如果你有多个 webpack 入口点， 他们都会在生成的 HTML 文件中的 script 标签内。 如果你有任何 CSS assets 在 webpack 的输出中（例如， 利用 ExtractTextPlugin 提取 CSS）， 那么这些将被包含在 HTML head 中的<link>标签内。

[详细配置参数见](https://github.com/jantimon/html-webpack-plugin#configuration)

2.clean-webpack-plugin
每次打包前帮我自动删除 dist 文件夹
`npm install clean-webpack-plugin --save-dev`

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   ...//只展示关键代码
    plugins: [
     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
  };
```

以上用法是旧版本的用法，新版本的 clean-webpack-plugin 有所改变

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   ...//只展示关键代码
    plugins: [
     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
  };
```

解构或渠道 CleanWebpackPlugin

## source map

使用 source map 映射打包后的代码在源代码错误地方

```js
module.exports = {
  entry: {
    app: "./src/index.js",
    print: "./src/print.js",
  },
  devtool: "cheap-module-eval-source-map",
  //常用配置
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

[详细配置参数地址](https://www.webpackjs.com/configuration/devtool/)
