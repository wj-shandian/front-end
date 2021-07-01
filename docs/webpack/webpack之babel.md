简单的说就是把浏览器还不能够识别的高级语法解析成浏览器可以正常识别的语法  
webpack 关于 [babel-loader](https://webpack.js.org/loaders/babel-loader/#root)  
npm install -D babel-loader @babel/core @babel/preset-env  
基本配置

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ];
}
```

也可以在根目录创建按.babelrc 文件

```js
{
  "presets": [
    ["@babel/preset-env"，{
        {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    }]
  ],
  plugins:[
  //相关插件的配置
  ]
}
```

- 核心库 @babel/core 必须安装 作用：把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。

- @babel/preset-env 预设插件，可以根据配置智能转化所需要的配置场景语法，只能转化语法例如（let const），一些内置的方法不能成功转化 例如（map）,如果需要进一步转化内置对象和实例方法，就需要用 polyfill，“useBuiltins”,这个参数可以帮我们控制 preset-env 使用什么方式帮我们导入 polyfill 的核心
  1. entry 入口导入方式 //覆盖面积广 包很大 会参考目标浏览器（browserslist）
  2. useage 会参考目标浏览器（browserslist） 和 代码中所使用到的特性来按需加入 polyfill 此时还需要 corejs 插件的支持
  3. false 默认不导入
- babel-loader 处理 es6 语法，解析成浏览器可识别的语法

npm i -D @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3

- @babel/plugin-transform-runtime
- @babel/runtime
- @babel/runtime-corejs3（corejs3）

  这种方式会借助 helper function 来实现特性的兼容， 并且利用 @babel/plugin-transform-runtime 插件还能以沙箱垫片的方式防止污染全局， 并抽离公共的 helper function , 以节省代码的冗余
  也就是说 @babel/runtime 是一个核心， 一种实现方式， 而 @babel/plugin-transform-runtime 就是一个管家， 负责更好的重复使用@babel/runtime  
  @babel/plugin-transform-runtime 插件也有一个 corejs 参数需要填写

  ```js
  {
  "presets": [
    ["@babel/preset-env"]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 3
      }
    ]
  ]
  }
  ```

  entry 和@babel/runtime 不能一起使用，否则包会很大  
  useage 和@babel/runtime 可以一起使用

总结：  
1.@babel/preset-env 拥有根据 useBuiltIns 参数的多种 polyfill 实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用
entry 的覆盖面积全， 但是打包体积自然就大，
useage 可以按需引入 polyfill, 打包体积就小， 但如果打包忽略 node_modules 时如果第三方包未转译则会出现兼容问题

2.@babel/runtime 在 babel 7.4 之后大放异彩， 利用 corejs 3 也实现了各种内置对象的支持， 并且依靠 @babel/plugin-transform-runtime 的能力，沙箱垫片和代码复用， 避免帮助函数重复 inject 过多的问题， 该方式的优点是不会污染全局， 适合在类库开发中使用
上面 1， 2 两种方式取其一即可， 同时使用没有意义, 还可能造成重复的 polyfill 文件
