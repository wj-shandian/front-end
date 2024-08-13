# 相关 API 解释

babel 的编译流程分为三步 parse transform generate

## parse

parse 的作用是将代码字符串解析成 AST，babel 使用 babylon 来解析代码

使用 `@babel/parser`

## transform

transform 阶段有 @babel/traverse, 可以遍历 AST 并调用 visitor 函数来修改 AST，修改 AST 就涉及到 AST 的判断 创建 修改等，这个时候就需要@babel/types，当需要批量创建 AST 的时候可以使用@babel/template

## generate

generate 的作用是将新的 AST 转换成代码字符串，同时生成 sourcemap
需要@babel/generator

## 其他

@babel/code-frame 可以生成错误提示的代码片段

babel 的整体功能通过 @babel/core 提供，基于上面说的包完成 babel 的整体编译流程，并应用 plugin 和 preset

具体每个包的使用用法 可以查看[官网文档](https://www.babeljs.cn/docs/babel-parser)
