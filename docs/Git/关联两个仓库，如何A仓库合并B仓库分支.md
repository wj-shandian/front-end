## 第一步添加关联仓库

```js
git remote add  B(仓库名称) 仓库地址 //(仓库名称)是注释

git remote -v  // 查看已经关联仓库的地址列表
```

## 拉取新关联分支的信息

```js
git fetch B
```

## 创建一个新的分支 并切换

```js
git checkout -b feature/test
```

## 合并另一个仓库的分支

```js
git merge B/develop
```
