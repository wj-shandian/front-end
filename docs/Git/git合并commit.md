## 只和上一次 commit 合并

```js
git add
git commit --amend
// git commit --amend 将当前status中的修改与上一个commit进行合并，且可以编辑上一个提交的注释作为合并后的注释。
git push -u origin 分支名 -f
```

`-u` 简单说 就是本地分支与远程的分支无任何联系，git push 无法推上去，用-u（--up-stream）来建立本地分支与远程某个分支的关联，形成一个管道，之后 git push 可以直接沿着管道 到达关联的分支 无需在加-u 参数了
`-f`强制推送

## git reset --soft

使用 git reset --soft 回退到需要合并的 commit 点,然后再次 commit

```
git reset --soft HEAD^1
git commit --amend
i编辑:wq保存并退出
git push -u origin 分支名 -f

```

`--soft`表示，丢弃该提交但是保存这个提交的内容
`--hard` 会丢弃该提交与该提交的内容
HEAD^1 表示最近的 1 个 以此倒推

## git rebase

```js
git log -10 // 显示最近10次提交
git rebase -i HEAD~4 // 将最近的四个commit压缩成一个
git add -u // add已经追踪的文件
git commit -m ""
git push -f // 强制提交

```

log 之后会出现一些 commitId 可以使用 `git rebase -i HEAD^4`具体几个 或者 `git rebase -i 具体的id`

`-i` 表示进入 vim 编辑器 列出最近 n 次 commit 按 i 编辑 修改 4 个 commit 的 pick 为你想要的 合并 （可以使用 s 或者 f）

- pick：保留该 commit（缩写:p）
- reword：保留该 commit，但我需要修改该 commit 的注释（缩写:r）
- edit：保留该 commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
- squash：将该 commit 和前一个 commit 合并（缩写:s）
- fixup：将该 commit 和前一个 commit 合并，但我不要保留该提交的注释信息（缩写:f）
- exec：执行 shell 命令（缩写:x）
- drop：我要丢弃该 commit（缩写:d）
