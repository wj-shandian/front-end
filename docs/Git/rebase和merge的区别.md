# 概念

merge 和 rebase 有相同的作用，都是将一个分支的代码提交合并到另一个分支上，但是原理是不同的

## 分析

### merge

将当前分支合并到执行分支

```js
git merge <branch>
```

非破坏性的操作，对现有分支不会以任何方式更改，但是会导致历史记录相对复杂

### rebase

将当前分支移植到指定分支或者 执行的 commit 之上

```js
git rebase -i <commit>
```

将分支移动到另一个分支上，有效的整合了所有分支的提交
好处是历史记录清晰，在原有提交的基础上将差异内容反映进去，消除了 merge 不必要的合并提交

常见的参数有 --continue 用于解决冲突之后，继续执行 rebase

```js
git rebase --continue
```

## 区别

### merge

例子 1

合并前

```
 A---B---C  (master)
           \
            D---E---F  (feature)
```

如果 feature 基于 master 切出分支后 修改，但是 master
没有产生新的提交

合并后

```
      A---B---C
               \
                D---E---F  (feature, master)
```

可以看到 只是把指针执向了 feature 最新的分支上 完成了合并

例子 2

合并前

```
A---B---C  (master)
    \
     D---E---   (feature)

```

如果 切出分支后 master 产生了新的分支 那么 结果和例子是不一样的 看下示例

合并后

```
A---B---C---H  (master)
    \      /
     D---E---   (feature)

```

会把 DE 合并 产生一个新 提交记录 H

### rebase

合并前

```
      A---B---C  (master)
           \
            D---E---F  (feature)
```

合并后

```
A---B---C---D---E---F  (master)
```

可以看到 rebase 会把 feature 上的修改 移植到 master 分支上

在移植的过程中 如果 发生冲突 需要一步一步解决
