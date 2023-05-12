## patch-package

有时候 我们 需要改源码，但是无法及时联系作者 或者 团队负责人不能及时修改，那我们可以自己修改

当我们修改源码之后 然后使用以下命令 见会生成一个文件 patches 里面就会有打包的补丁文件

使用 npx patch-package 包名

同时 package.json 文件还需要添加一个命令 "postinstall": "patch-package",
在安装依赖包 会自动执行 postinstall
