## 第一种

git reset 会滚到某次提交 之后的 commit 都会被删除

git reset --soft：此次提交之后的修改会被退回到暂存区。
git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的。

```git
git log --oneline // 查询需要会滚到某次的 commit hash值
git reset --hard commit_id // HEAD 就会指向此次的提交记录
git push -f //强制推送远端仓库
```

误操作删除 回复

```git
1. git relog // 复制要恢复操作的前面的 hash 值
2. git reset --hard hash // 将 hash 换成要恢复的历史记录的 hash 值
```

## 第二种

删除文件

- 被提交到仓库的某个文件需要删除，可以使用 git rm 命令：

```git
1. git rm <file> // 从工作区和暂存区删除某个文件
2. git commit -m "" // 再次提交到仓库
```

- 如果只想从暂存区删除文件，本地工作区不做出改变，可以：

```git
git rm --cached <file>
```

- 如果在工作区不小心删错了某个文件，可以用 git checkout 将暂存区的文件覆盖工作区的文件，从而把误删的文件恢复：

```git
git checkout -- <file>
```

## 第三种

git rebase

1. 撤销提交

```js
1. git log // 查找要删除的前一次提交的 commit_id
2. git rebase -i commit_id // 将 commit_id 替换成复制的值
3. 进入 Vim 编辑模式，将要删除的 commit 前面的 `pick` 改成 `drop`
4. 保存并退出 Vim
```

2. 解决冲突

该操作很容易发生冲突，可以通过一下方式解决冲突

```js
1. git diff // 查看冲突内容
2. // 手动解决冲突（冲突位置已在文件中标明）
3. git add <file> 或 git add -A // 添加
4. git rebase --continue // 继续 rebase
5. // 若还在 rebase 状态，则重复 2、3、4，直至 rebase 完成出现 applying 字样
6. git push
```
