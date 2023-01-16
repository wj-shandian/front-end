也算是 git 的常用命令吧 记录一下操作 方便自己以后能忘记查看

## 基本用法

git cherry-pick 的作用 是将指定的 commit 提交应用于其他分支

```js
git cherry-pick <commitHash>
```

举例来说，代码仓库有 master 和 feature 两个分支。

```js
a - b - c - d   Master
         \
           e - f - g Feature
```

我们想要把 g 提交到 master 分支

首先切换到 feature 分支
可以通过 git log --oneline 查看简写到 commitHash 值 然后复制自己想要合并到 commit hash
再切换到 master 分支
然后执行

```
git cherry-pick <commitHash>
```

这时就合并了 commit

git cherry-pick 命令的参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

`git cherry-pick feature`

这个表示合并 feature 最新的一次 commit

当然也可以一次合并多个 commit

```js
git cherry-pick <HashA> <HashB>
```

[更详细的解读建议参考阮一峰的博客](https://ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
