# 概念

两者都是用来撤销修改提交记录，但是有所有不同的是

reset 会删除掉 commit 记录 revert 是增加一个 commit 的记录 不会删除之前的记录

## reset

例子

```
A -- B -- C -- D (HEAD)
```

如果你想撤销提交 C，D 可以使用：

`git reset --hard <commit>`
此时 会删除 C D 的提交 并且不再保留

`git reset --soft <commit>`
将 HEAD 移动到指定的提交，暂存区和工作区不变, 之前的提交依然保留在历史记录中，可以通过重新提交来修改历史记录

`git reset --mixed <commit>`
将 HEAD 移动到指定的提交，取消暂存区的更改，但保留工作区的更改。
可以使用 git add 将需要提交的更改重新添加到暂存区。
之前的更改不会出现在暂存区，但会保留在工作区。

## revert

例子

```
A -- B -- C (HEAD)
```

如果你想要撤销提交 B 引入的更改，但保留提交历史，可以使用：

git revert B

这将会创建一个新的提交 D，其中包含了对提交 B 的更改的撤销。提交历史将变为：

```
A -- B -- C -- D (HEAD)
```
