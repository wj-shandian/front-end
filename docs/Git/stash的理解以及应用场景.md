# 概念

stash 意思是存放，在 git 中，可以理解为保存当前工作进度，会把暂存区和工作区的改动进行报存，这些修改会保存在一个栈上
后续你可以在任何时候任何分支重新将某次的修改推出来，重新应用这些更改的代码

默认情况下，git stash 会缓存

1. 添加到暂存区的修改
2. git 跟踪但是没有添加到暂存区的修改

以下情况下不回被缓存

1. 新增的文件
2. 被忽略的文件

## 参数

当使用 git stash 命令时，可以搭配一些参数来实现不同的功能。以下是常用的参数及其用法：

- git stash save "message" 或 git stash push -m "message"

这个命令将工作目录中的修改暂时保存起来，并添加一条自定义的消息描述。消息描述可以帮助你更容易地识别保存的不同状态。

- git stash list

查看当前所有的 stash 列表，包括 stash 编号、stash 保存时的消息描述以及 stash 所在的分支。

- git stash apply [stash_id]

将最近的 stash 应用到工作目录，但并不删除 stash。如果不提供 stash_id，将默认应用最新的 stash。这个命令会应用最近一次的 stash，但不会删除 stash 中的内容。

- git stash pop [stash_id]

类似于 git stash apply，但它会将应用的 stash 从 stash 列表中移除。如果不提供 stash_id，将默认应用最新的 stash。

- git stash drop [stash_id]

删除指定的 stash。如果不提供 stash_id，将删除最新的 stash。这个命令用于清理 stash 列表中不再需要的 stash。

- git stash clear

删除所有的 stash，清空 stash 列表。这个命令会彻底清除所有 stash，慎用！

- git stash show [stash_id]

查看指定 stash 中的修改内容。如果不提供 stash_id，将默认显示最新的 stash。

- git stash branch <branch_name> [stash_id]

创建一个新的分支，并将指定的 stash 应用到这个分支上。如果不提供 stash_id，默认应用最新的 stash。

当然最常用的 就是 git stash 以及 取出 git stash pop

## 应用场景

当你正在开发一个功能，但是需要紧急修复一个 bug 时，你可以使用 git stash 来保存当前的工作进度，然后切换到另一个分支来修复 bug。修复 bug 后，再使用 git stash pop 命令将之前的工作进度重新应用到当前分支上。

当然你也可以直接 commit 再修改 但是这样可能会污染你的 commit 信息 此时你的 commit 或许是还未完成的
