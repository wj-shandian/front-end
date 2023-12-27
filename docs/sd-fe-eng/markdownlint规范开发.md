# 如何拥有自己的文档规范

[markdownlint官网](https://github.com/DavidAnson/markdownlint)

## 首先在项目 sd-fe-eng 初始化文件

learn create markdownlint-config

然后learn会在 packages 生成一个文件夹 里面有一些初始化的文件创建在根目录下创建index.json文件
package.json的main入口 改为index.json

```json
{
    "$schema": "https://raw.githubusercontent.com/DavidAnson/markdownlint/main/schema/markdownlint-config-schema.json",
    "default": true,
    "ul-style": {
      "style": "dash"
    },
    "no-trailing-spaces": {
      "br_spaces": 0,
      "list_item_empty_lines": false
    },
    "list-marker-space": false,
    "line-length": false,
    "no-inline-html": false,
    "no-duplicate-header": false,
    "proper-names": {
      "names": [
        "JavaScript",
        "HTML",
        "CSS",
        "AJAX",
        "JSON",
        "DOM",
        "BOM",
        "Less",
        "Sass",
        "SCSS",
        "HTTP",
        "HTTPS",
        "https",
        "WebSocket",
        "ECMAScript",
        "ECMAScript 2015",
        "ECMAScript 6",
        "ES6",
        "ES2015",
        "jQuery",
        "jQuery Mobile",
        "React",
        "React Native",
        "Bootstrap",
        "Gulp",
        "Grunt",
        "webpack",
        "Yeoman",
        "npm",
        "spm",
        "Babel",
        "Mocha",
        "Jasmine",
        "PHP",
        "Java",
        "Node.js",
        "NodeJS",
        "MySQL",
        "MongoDB",
        "Redis",
        "Apache",
        "Nginx",
        "NGINX",
        "GitHub",
        "GitLab",
        "GitCafe",
        "Chrome",
        "Firefox",
        "Safari",
        "Internet Explore",
        "IE",
        "IE 7",
        "Opera",
        "UC",
        "Android",
        "iOS",
        "Windows",
        "OS X",
        "Ubuntu",
        "Linux",
        "Debian",
        "PC",
        "Mobile",
        "H5",
        "MacBook",
        "MacBook Pro",
        "MacBook Air",
        "iMac",
        "Mac Pro",
        "iPad",
        "Mac mini",
        "iPad Air",
        "iPad Air 2",
        "iPad mini",
        "iPhone",
        "iPhone 6s",
        "iPhone 6s Plus",
        "Apple Watch",
        "Alibaba",
        "Taobao",
        "Google",
        "Alphabet",
        "Apple",
        "Microsoft",
        "Yahoo",
        "FPS",
        "UI",
        "URL",
        "URI",
        "URLs",
        "URIs",
        "Visual Studio Code"
      ],
      "code_blocks": false
    }
  }

```

这只是一个例子 你也可以根据文档规范 写成自己需要的

[文档地址](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)

## 在sd-fe-eng项目中调试

全局安装 markdownlint
在根目录创建.markdownlint.json文件
然后相对路径引入

```js
{
    "extends":"./packages/markdownlint-config/index.json"
}
```

在根目录创建 README.md 文件

输入以下内容

```md
# 前端工程化规范

## https
```

可以看出来 https的关键词是不在我们设置里的 所以我们执行 markdownlint README.md 是能够看到报错 并提示相关的错误

这里建议在vscode安装markdownlint插件 能够实时看到错误并且保存时可以自动修复

## 发布npm

首先注册npm账号 然后 执行npm login 登录账号

然后要发布的包的 publishConfig 要和当前 npm源的地址一致

登录之后 执行npm publish 发布包即可

## 具体包的使用 看查看npm包的README.md
