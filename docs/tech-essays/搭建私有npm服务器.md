首先在 liunx 下安装 node 环境
下载压缩包

```js
wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz
```

解压 node

```js
tar xvf node-v12.13.0-linux-x64.tar.xz
```

创建软连接 使 node npm 命令全局可以用

```js
//注意，下面的空格不是写错了，是需要有空格的
ln -s /root/node-v12.13.0-linux-x64/bin/node /usr/local/bin/
ln -s /root/node-v12.13.0-linux-x64/bin/npm /usr/local/bin/
```

产看是否安装成功

```js
node - v;
npm - v;
```

安装 verdaccio

```js
npm install -g verdaccio
```

可能会遇到的错误

```js
npm ERR! code ELIFECYCLE
npm ERR! syscall spawn
npm ERR! file sh
npm ERR! errno ENOENT
npm ERR! leveldown@5.6.0 install: `node-gyp-build`
npm ERR! spawn ENOENT
npm ERR!
npm ERR! Failed at the leveldown@5.6.0 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
```

设置

```js
npm config set user 0
npm config set unsafe-perm true
// 或者
npm i -g verdaccio unsafe-perm
```

然后再重新下载
创建软连接

```js
ln -s /root/node-v12.13.0-linux-x64/bin/verdaccio /usr/local/bin/
```

启动
verdaccio
设置 config.yaml 文件
在最后一行添加

```js
listen: 0.0.0.0:4387
//端口可以改成自己任意的开放端口
然后在浏览器输入自己服务器的域名和端口就可以成功看到页面
```

怎么修改 config.yaml(仅针对 linux 命令不熟悉的)

```js
vim /root/.config/verdaccio/config.yaml
//进入文件 按i修改文件
// 退出保存 esc:wq
//退出不保存 esc:q!
```

安装 pm2

> pm2 是一个进程管理工具,可以用它来管理你的 node 进程，并查看 node 进程的状态，当然也支持性能监控，进程守护，负载均衡等功能

```js
npm i -g pm2
// 创建软连接，使pm2全局可用
ln -s /root/node-v12.13.0-linux-x64/bin/pm2 /usr/local/bin/
//然后启动verdaccio
pm2 start which verdaccio
```

注册私用 npm 的用户

```js
npm adduser --registry http://192.168.x.x:8080 //自己服务器的域名和端口
//根据提示填写姓名密码邮箱等
```

提交 npm 包

```js
npm publish --registry http://192.168.1.x.x:8080
//在自己要发布的npm包的根目录下输入命令即可
```

下载私有域名的 npm 包

```js
npm install 包名  --registry http://192.168.1.x.x:8080
//如果经常下载觉得很麻烦，可以修改设置npm 来源就不用每次都输入地址
//也可以nrm仓库管理 ，管理这些命令
```
