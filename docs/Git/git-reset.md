# reset

重置

主要有三种模式 --hard --soft --mixed

工作区是指没有add之前的修改代码 暂存区是指 add 之后的代码

## --hard

重置指定的commit 会舍弃之前所有的提交 包括暂存区以及工作区

git reset --hard HEAD^
或者
git reset  xxxx --hard

## --soft

会保留工作目录，并把重置 HEAD 所带来的新的差异放进暂存区  这个时候可以重新提交生成新的commit记录

一般用来清除一些无效的commit记录 或者 查看某次记录之后所有的 文件变动 推荐用fork工具查看

1-2-3-4

这个时候我们把 head 从 4 reset 到 3 如果这个时候我们暂存区或者工作区 没有提交 所以这个时候reset是可能带来差异，这个就是新的差异，为了避免一些问题 建议都commit之后再操作。

git reset --soft HEAD^
或者
git reset  xxxx --soft

## --mixed

把目标commit以及暂存区的内容 以及由reset所导致的新的文件差异全部被放到 工作目录去

git reset --mixed HEAD^
或者
git reset  xxxx --mixed
