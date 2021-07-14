## 一、Git、Github、Gitlab的区别

Git是版本控制系统，Github是在线的基于Git的代码托管服务。 GitHub是2008年由Ruby on Rails编写而成。GitHub同时提供付费账户和免费账户。这两种账户都可以创建公开的代码仓库，只有付费账户可以创建私有的代码仓库。 Gitlab解决了这个问题, 可以在上面创建免费的私人repo。 2018年GitHub被微软收购后，为免费用户也开启了创建私人repo。

## 二、Git 介绍

Git是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。

------

### 1、Git 与 SVN 区别

GIT不仅仅是个版本控制系统，它也是个内容管理系统(CMS),工作管理系统等。

如果你是一个具有使用SVN背景的人，你需要做一定的思想转换，来适应GIT提供的一些概念和特征。

Git 与 SVN 区别点：

- 1、GIT是分布式的，SVN不是：这是GIT和其它非分布式的版本控制系统，例如SVN，CVS等，最核心的区别。
- 2、GIT把内容按元数据方式存储，而SVN是按文件：所有的资源控制系统都是把文件的元信息隐藏在一个类似.svn,.cvs等的文件夹里。
- 3、GIT分支和SVN的分支不同：分支在SVN中一点不特别，就是版本库中的另外的一个目录。
- 4、GIT没有一个全局的版本号，而SVN有：目前为止这是跟SVN相比GIT缺少的最大的一个特征。
- 5、GIT的内容完整性要优于SVN：GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

### 2、Git工作流程

git工作流程

　　一般工作流程如下：

- 克隆 Git 资源作为工作目录。
- 在克隆的资源上添加或修改文件。 
- 如果其他人修改了，你可以更新资源。
- 在提交前查看修改。
- 提交修改。
- 在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

 　　Git 的工作流程示意图：

![img](assets/805129-20160710102658467-1520443599.png)

git的工作区、暂存区和版本库

　　基本概念：

- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫stage, 或index。一般存放在"git目录"下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **版本库：**工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

　　工作区、版本库中的暂存区和版本库之间的关系的示意图：

![img](assets/805129-20160710103123608-1172715931.jpg)

　　图中左侧为工作区，右侧为版本库。在版本库中标记为 "index" 的区域是暂存区（stage, index），标记为 "master" 的是 master 分支所代表的目录树。 

　　图中我们可以看出此时 "HEAD" 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。 

　　图中的 objects 标识的区域为 Git 的对象库，实际位于 ".git/objects" 目录下，里面包含了创建的各种对象及内容。 

　　当对工作区修改（或新增）的文件执行 "git add" 命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。 

　　当执行提交操作（git commit）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。 

　　当执行 "git reset HEAD" 命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。 

　　当执行 "git rm --cached <file>" 命令时，会直接从暂存区删除文件，工作区则不做出改变。 

　　当执行 "git checkout ." 或者 "git checkout -- <file>" 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。 

　　当执行 "git checkout HEAD ." 或者 "git checkout HEAD <file>" 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。

## 三、Git 常用方法

### 1、 客户端安装 git

##### 1、CentOS7 yum安装 Git

如果你使用的系统是 Centos/RedHat 安装命令为：

```
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum -y install git-core

git --version
git version 1.7.1
```

##### 2、CentOS7源码安装

我们也可以在官网下载源码包来安装，最新源码包下载地址：<https://git-scm.com/download>

安装指定系统的依赖包：

```
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
```

解压安装下载的源码包：

```
tar -zxf git-1.7.2.2.tar.gz
cd git-1.7.2.2
make prefix=/usr/local all
make prefix=/usr/local install
```

------

##### 3、Windows 平台上安装

在 Windows 平台上安装 Git 同样轻松，有个叫做 msysGit 的项目提供了安装包，可以到 GitHub 的页面上下载 exe 安装文件并运行：

安装包下载地址：<https://gitforwindows.org/>

![20140127131250906](assets/20140127131250906.jpg)

完成安装之后，就可以使用命令行的 git 工具（已经自带了 ssh 客户端）了，另外还有一个图形界面的 Git 项目管理工具。

在开始菜单里找到"Git"->"Git Bash"，会弹出 Git 命令窗口，你可以在该窗口进行 Git 操作。

------

##### 4、Mac 平台上安装

在 Mac 平台上安装 Git 最容易的当属使用图形化的 Git 安装工具，下载地址为：

<http://sourceforge.net/projects/git-osx-installer/>

安装界面如下所示：

![18333fig0107-tn](assets/18333fig0107-tn.png)



------

### 2、Git 配置

Git 提供了一个叫做 git config 的工具，专门用来配置或读取相应的工作环境变量。

这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。这些变量可以存放在以下三个不同的地方：

- `/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置。若使用 `git config` 时用 `--system` 选项，读写的就是这个文件。
- `~/.gitconfig` 文件：用户目录下的配置文件只适用于该用户。若使用 `git config` 时用 `--global` 选项，读写的就是这个文件。
- 当前项目的 Git 目录中的配置文件（也就是工作目录中的 `.git/config` 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。

在 Windows 系统上，Git 会找寻用户主目录下的 .gitconfig 文件。主目录即 $HOME 变量指定的目录，一般都是 C:\Documents and Settings\$USER。

此外，Git 还会尝试找寻 /etc/gitconfig 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。

### 3、Git 用户信息

配置个人的用户名称和电子邮件地址：

```
git config --global user.name "runoob"
git config --global user.email test@runoob.com
```

如果用了 **--global** 选项，那么更改的配置文件就是位于你用户主目录下的那个，以后你所有的项目都会默认使用这里配置的用户信息。

如果要在某个特定的项目中使用其他名字或者电邮，只要去掉 --global 选项重新配置即可，新的设定保存在当前项目的 .git/config 文件里。

### 4、文本编辑器

设置Git默认使用的文本编辑器, 一般可能会是 Vi 或者 Vim。如果你有其他偏好，比如 Emacs 的话，可以重新设置：:

```
git config --global core.editor emacs
```

### 5、差异分析工具

还有一个比较常用的是，在解决合并冲突时使用哪种差异分析工具。比如要改用 vimdiff 的话：

```
git config --global merge.tool vimdiff
```

Git 可以理解 kdiff3，tkdiff，meld，xxdiff，emerge，vimdiff，gvimdiff，ecmerge，和 opendiff 等合并工具的输出信息。

当然，你也可以指定使用自己开发的工具，具体怎么做可以参阅第七章。

### 6、查看配置信息

要检查已有的配置信息，可以使用 git config --list 命令：

```
$ git config --list
http.postbuffer=2M
user.name=runoob
user.email=test@runoob.com
```

有时候会看到重复的变量名，那就说明它们来自不同的配置文件（比如 /etc/gitconfig 和 ~/.gitconfig），不过最终 Git 实际采用的是最后一个。

这些配置我们也可以在 **~/.gitconfig** 或 **/etc/gitconfig** 看到，如下所示：

```
vim ~/.gitconfig 
```

显示内容如下所示：

```
[http]
    postBuffer = 2M
[user]
    name = git
    email = test@git.com
```

也可以直接查阅某个环境变量的设定，只要把特定的名字跟在后面即可，像这样：

```
$ git config user.name
git
```

### 2、客户机连接gitlab的方式

#### 1、ssh链接

```
客户机上产生公钥上传到gitlab的SSH-Keys里，git clone下载和git push上传都没问题，这种方式很安全
```

#### 2、http链接（两种方式实现）

##### (1) 修改代码里的.git/config文件添加登录用户名密码

```
cd .git
cat config
[core]
repositoryformatversion = 0
filemode = true
bare = false
logallrefupdates = true
[remote "origin"]
fetch = +refs/heads/*:refs/remotes/origin/*
url = http://username:password@git@172.17.0.39:sauser/ansible.git
[branch "master"]
remote = origin
merge = refs/heads/master
```

##### (2) 执行命令设置登录用户和密码

```
1.cd到根目录，执行git config --global credential.helper store命令
  执行之后会在.gitconfig文件中多添加以下选项
  [credential]         helper = store
2.之后cd到项目目录，执行git pull命令，会提示输入账号密码。
  输完这一次以后就不再需要，并且会在根目录生成一个.git-credentials文件
  git pull Username for 'http://172.17.0.39:sauser/ansible.git': 
  xxxx@xxxx.com Password for 'https://xxxx@xxxx.com@172.17.0.39:sauser/ansible.git':
3.cat .git-
  credentialshttps://Username:Password@git.oschina.net
4.之后pull/push代码都不再需要输入账号密码了
```

### 3、设定本机用户名，绑定邮箱，让远程服务器知道机器的身份

```
git global setup  
git config --global user.name "user_name" 
git config --global user.email "XXXXX@XX.com"
```

### 4、本地项目与远程服务器项目之间的交互

#### 1、如果你没有最新的代码，希望从头开始

```
Create a new repository
git clone git@XXX.git     // 这里是项目的地址（可从项目主页复制），将远程服务器的内容完全复制过来 
cd BGBInspector_V01       // clone 之后进入该项目的文件夹 
touch　README.md          // 新建readme文件 
git add README.md         // 将新的文件添加到git的暂存区 
git commit-m ‘Its note：add a readme file’ // 将暂存区的文件提交到某一个版本保存下来，并加上注释 
git push -u origin master // 将本地的更改提交到远程服务器
```

#### 2、如果你已经有一个新版代码，希望直接把本地的代码替换到远程服务器

```
Existing folder or git repository
cd existing_folder          // 进入代码存在的文件夹，或者直接在该文件夹打开
git bash git init           // 初始化 
git remote add origin git@XXX.git  // 添加远程项目地址（可从项目主页复制） 
git add .                   // 添加该文件夹中所有的文件到git的暂存区 
git commit -m ‘note’        // 提交所有代码到本机的版本库 
git push -u origin master   // 将本地的更改提交到远程服务器
```

```
git 中clone过来的时候，git不会对比本地和服务器的文件，也就不会有冲突，
建议确定完全覆盖本地的时候用clone，不确定会不会有冲突的时候用 git pull，将远程服务器的代码download下来
```

#### 3、常用的git 命令 

```
git init                      //初始化 
git add main.cpp              //将某一个文件添加到暂存区 
git add .                     //将文件夹下的所有的文件添加到暂存区 
git commit -m ‘note‘          //将暂存区中的文件保存成为某一个版本 
git log                       //查看所有的版本日志 
git status                    //查看现在暂存区的状况 
git diff                      //查看现在文件与上一个提交-commit版本的区别 
git reset --hard HEAD^        //回到上一个版本 
git reset --hard XXXXX        //XXX为版本编号，回到某一个版本 
git pull origin master        //从主分支pull到本地 
git push -u origin master     //从本地push到主分支 
git pull                      //pull默认主分支 
git push                      //push默认主分支 ...
```

### 5、版本穿梭

#### 1、版本回退

```
用git log命令查看：
每一个提交的版本都唯一对应一个commit版本号，
使用git reset命令退到上一个版本：
git reset --hard HEAD^
```

```
git reflog                    //查看命令历史，以便确定要回到哪个版本
git reset --hard commit_id    //比如git reset --hard 3628164（不用全部输入，输入前几位即可）
```

#### 2、git分支管理

##### 1、创建分支    

```
git checkout -b dev     // 创建dev分支，然后切换到dev分支
git checkout            // 命令加上-b参数表示创建并切换，相当于以下两条命令：
git branch dev git checkout dev
git branch              // 命令查看当前分支,
git branch              // 命令会列出所有分支，当前分支前面会标一个*号
git branch * dev   master
git add readme.txt git commit -m "branch test"  //  在dev分支上正常提交.
```

##### 2、分支切换:

```
git checkout master     // 切换回master分支
查看一个readme.txt文件，刚才添加的内容不见了，因为那个提交是在dev分支上，而master分支此刻的提交点并没有变  
```

##### 3、合并分支

```
git merge dev           // 把dev分支的工作成果合并到master分支上
git merge               // 命令用于合并指定分支到当前分支。
合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。
```

```
注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。
当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。
```

```
git branch -d dev       // 删除dev分支了：
删除后，查看branch，就只剩下master分支了.
```

#### 3、解决冲突

```
git checkout -b feature1        //  创建新的feature1分支
修改readme.txt最后一行，改为：
Creating a new branch is quick AND simple.
git add readme.txt      //  在feature1分支上提交
git commit -m "AND simple"
git checkout master    // 切换到master分支
Switched to branch 'master' Your branch is ahead of 'origin/master' by 1 commit.
Git还会自动提示我们当前master分支比远程的master分支要超前1个提交。
在master分支上把readme.txt文件的最后一行改为：
Creating a new branch is quick & simple.
git add readme.txt 
git commit -m "& simple"
现在，master分支和feature1分支各自都分别有新的提交
这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：
git merge feature1 Auto-merging readme.txt CONFLICT (content): 
Merge conflict in readme.txt Automatic merge failed; 
fix conflicts and then commit the result.
```

```
readme.txt文件存在冲突，必须手动解决冲突后再提交。
git status 可以显示冲突的文件;
直接查看readme.txt的内容：
Git is a distributed version control system.
Git is free software distributed under the GPL. 
Git has a mutable index called stage. 
Git tracks changes of files. 
<<<<<<< HEAD Creating a new branch is quick & simple. ======= Creating a new branch is quick AND simple. >>>>>>> feature1
Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改后保存再提交：
git add readme.txt  
git commit -m "conflict fixed" 
[master 59bc1cb] conflict fixed
最后，删除feature1分支：
git branch -d feature1 Deleted branch feature1 (was 75a857c).
```

## 四、本地 Git 服务器

```
[root@localhost ~]# useradd git
[root@localhost ~]# mkdir /git-root/
[root@localhost ~]# cd /git-root/
[root@localhost git-root]# git init --bare shell.git
Initialized empty Git repository in /git-root/shell.git/
[root@localhost git-root]# chown -R git:git shell.git
[root@localhost git-root]# su - git
[git@localhost ~]$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/git/.ssh/id_rsa): Created directory '/home/git/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/git/.ssh/id_rsa.
Your public key has been saved in /home/git/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:fWnqJTR7uMvajcOELlrcz/cGxZHtLZbPfo7ROT3in5Q git@localhost.localdomain
The key's randomart image is:
+---[RSA 2048]----+
|               o |
|              o .|
|             . +.|
|         .   .* o|
|        S.+ +o + |
|     . ....B.  .*|
|      o..o= oo.Eo|
|     .. .*oBo +o*|
|    .. ...X+.+++o|
+----[SHA256]-----+
[git@localhost ~]$ 
[git@localhost ~]$ cd .ssh/
[git@localhost .ssh]$ cp id_rsa.pub authorized_keys
[git@localhost .ssh]$ vim authorized_keys 
[git@localhost .ssh]$ logout
[root@localhost git-root]# usermod -s /usr/bin/git-shell git
[root@localhost git-root]# cd
[root@localhost ~]# cd /opt/
[root@localhost opt]#  git clone git@192.168.1.102:/git-root/shell.git
Cloning into 'shell'...
The authenticity of host '192.168.1.102 (192.168.1.102)' can't be established.
ECDSA key fingerprint is SHA256:mytNPhHxff0nDGl3LGorCnwAscYkBONVssV44ntQFjw.
ECDSA key fingerprint is MD5:a4:30:b9:1c:35:4a:3b:9c:e5:3d:24:7c:62:26:c7:35.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.1.102' (ECDSA) to the list of known hosts.
warning: You appear to have cloned an empty repository.
[root@localhost opt]# ls
rh  shell
[root@localhost opt]# cd shell/
[root@localhost shell]# vim test1.sh
[root@localhost shell]# git add test1.sh
[root@localhost shell]# git commit -m 'first commit'
[master (root-commit) 33c5fbf] first commit
 1 file changed, 2 insertions(+)
 create mode 100644 test1.sh
[root@localhost shell]# git push origin master
Counting objects: 3, done.
Writing objects: 100% (3/3), 230 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@192.168.1.102:/git-root/shell.git
 * [new branch]      master -> master
[root@localhost shell]# 
```

## 五、Github 远程仓库

1、github.com 注册账户

2、在github上创建仓库

3、生成本地ssh key

```shell
[root@localhost ~]# ssh-keygen -t rsa -C 'meteor@163.com' # 邮箱要与github上注册的相同
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:RiE6UR1BtzV5avyE2uz6TNPsVHa2D2eHprghrJEkd/g meteor@163.com
The key's randomart image is:
+---[RSA 2048]----+
|    ..oo=o. o.   |
|     o ..o o...  |
|    o   . .. +   |
|     . o    = .  |
|    . + S  = o  =|
|     + *  . oo.=o|
|      o E ..o B.+|
|       o . =.* +o|
|      .   +++ . .|
+----[SHA256]-----+
[root@localhost ~]#
[root@localhost ~]# cat .ssh/id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDVThfq4brrlsPGtAknVB0TLPx+7Dd3qlxTbSIrUOsGC5Y8JuNqVTlIntZB4oNj8cSQrWvec9CKm0a8o7WwaJIiqpxurz+YpQHP2KbapftKIxsX4hPf/z+p0El1U6arQa35/xmNsq+cJLH/bDdRG+EMDhuCBmjVZOlLj/hEdeIT6s56AnnCkaWoF+sq58KCF7Tk54jRbs/YiyE4SN7FuA70r+07sA/uj0+lmuk4E190KtQUELhjX/E9stivlqiRhxnKvVUqXDywsjfM8Rtvbi4Fg9R8Wt9fpd4QwnWksYUoR5qZJFYXO4hSZrUnSMruPK14xXjDJcFDcP2eHIzKgLD1 meteor@163.com
```
4、复制以上的公钥，在github 中添加ssh key

5、测试
```shell
[root@localhost ~]# yum install git
........
[root@localhost ~]# ssh -T git@github.com
The authenticity of host 'github.com (13.250.177.223)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
RSA key fingerprint is MD5:16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,13.250.177.223' (RSA) to the list of known hosts.
Hi meteor! You've successfully authenticated, but GitHub does not provide shell access.
[root@localhost ~]#
```
7、在本地添加远程仓库
```shell
[root@localhost ~]# git config --global user.name 'meteor_by'
[root@localhost ~]# git config --global user.email 'meteor@163.com'
[root@localhost ~]# git config --global color.ui true
[root@localhost ~]# git config --list | tail -3
user.name=meteor_by
user.email=meteor@163.com
color.ui=true
[root@localhost ~]#
[root@localhost ~]# ls .gitconfig 
.gitconfig
[root@localhost ~]# cat .gitconfig 
[user]
	name = meteor_by
	email = meteor@163.com
[color]
	ui = true
[root@localhost ~]#
```
8、连接远程仓库听方法
![it_remote_metho](./assets/git_remote_method.png)

```shell
[root@localhost python1804]# git remote -v 
origin	git@github.com:meteor/python1804.git (fetch)
origin	git@github.com:meteor/python1804.git (push)
[root@localhost python1804]#
[root@localhost python1804]#  git remote rm origin  (如果连接远程的方式不是ssh,可以删除重新添加)
[root@localhost ~]# git remote add origin git@github.com:meteor/python1804.git
或
git remote add origin https://github.com/meteor/python1804.git
git push -u origin master
```

## 六、Gitlab Server 部署

### 1、环境准备

```
1.系统版本：CentOS7.4
2.Gitlab版本：gitlab-ee 11.0.1
3.初始化系统环境
4.关闭防火墙
[root@localhost ~]#  systemctl stop iptables firewalld
[root@localhost ~]#  systemctl disable iptables firewalld
5.开启邮件服务
[root@vm1 ~]# systemctl start postfix
[root@vm1 ~]# systemctl enable postfix
6.关闭SELinux
[root@localhost ~]#  sed -ri '/SELINUX=/cSELINUX=disabled' /etc/selinux/config
[root@localhost ~]#  setenforce 0           # 临时关闭SELinux
[root@localhost ~]#  reboot

```

### 2、部署Gitlab 

```
1.安装Gitlab社区版/企业版
2.安装gitlab依赖包
[root@localhost ~]# yum install -y curl openssh-server openssh-clients postfix cronie policycoreutils-python
# gitlab-ce 10.x.x以后的版本需要依赖policycoreutils-python

3.开启postfix，并设置开机自启
[root@localhost ~]# systemctl start postfix;systemctl enable postfix

4.选择添加yum源安装gitlab(根据需求配置源)
（1）添加阿里源
# vim /etc/yum.repos.d/gitlab-ce.repo
[gitlab-ce]
name=gitlab-ce
baseurl=http://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7
Repo_gpgcheck=0
Enabled=1
Gpgkey=https://packages.gitlab.com/gpg.key

（2） 添加清华源
# vim gitlab-ce.repo
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
gpgcheck=0
enabled=1

# vim gitlab-ee.repo
[gitlab-ee]
name=Gitlab EE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ee/yum/el$releasever/
gpgcheck=0
enabled=1

# vim runner_gitlab-ci-multi-runner.repo
[runner_gitlab-ci-multi-runner]
name=runner_gitlab-ci-multi-runner
baseurl=https://packages.gitlab.com/runner/gitlab-ci-multi-runner/el/7/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packages.gitlab.com/runner/gitlab-ci-multi-runner/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

[runner_gitlab-ci-multi-runner-source]
name=runner_gitlab-ci-multi-runner-source
baseurl=https://packages.gitlab.com/runner/gitlab-ci-multi-runner/el/7/SRPMS
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packages.gitlab.com/runner/gitlab-ci-multi-runner/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

(3) 添加官方源
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash

5.安装包下载
https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/
https://mirrors.tuna.tsinghua.edu.cn/gitlab-ee/yum/el7/

6.根据需要选择ce/ee
[root@localhost ~]# yum -y install gitlab-ce                    # 自动安装最新版
[root@localhost ~]# yum -y install gitlab-ce-x.x.x				# 安装指定版本Gitlab

[root@localhost ~]# yum -y install gitlab-ce 
warning: gitlab-ce-10.7.2-ce.0.el7.x86_64.rpm: Header V4 RSA/SHA1 Signature, key ID f27eab47: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:gitlab-ce-10.7.2-ce.0.el7        ################################# [100%]
It looks like GitLab has not been configured yet; skipping the upgrade script.

       *.                  *.
      ***                 ***
     *****               *****
    .******             *******
    ********            ********
   ,,,,,,,,,***********,,,,,,,,,
  ,,,,,,,,,,,*********,,,,,,,,,,,
  .,,,,,,,,,,,*******,,,,,,,,,,,,
      ,,,,,,,,,*****,,,,,,,,,.
         ,,,,,,,****,,,,,,
            .,,,***,,,,
                ,*,.
  


     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ `/ __ \
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \____/_/\__/_____/\__,_/_.___/
  

Thank you for installing GitLab!
GitLab was unable to detect a valid hostname for your instance.
Please configure a URL for your GitLab instance by setting `external_url`
configuration in /etc/gitlab/gitlab.rb file.
Then, you can start your GitLab instance by running the following command:
  sudo gitlab-ctl reconfigure

For a comprehensive list of configuration options please see the Omnibus GitLab readme
https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md
```

### 3、配置 Gitlab

#### 1、查看Gitlab版本

```
[root@localhost ~]# head -1 /opt/gitlab/version-manifest.txt
gitlab-ce 10.1.1
```

#### 2、Gitlab 配置文登录链接

``` shell
#设置登录链接
[root@localhost ~]# vim /etc/gitlab/gitlab.rb
***
## GitLab URL
##! URL on which GitLab will be reachable.
##! For more details on configuring external_url see:
##! https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
# 没有域名，可以设置为本机IP地址
external_url 'http://172.17.0.61'
***
[root@localhost ~]# grep "^external_url" /etc/gitlab/gitlab.rb
external_url 'http://172.17.0.61'     #绑定监听的域名或IP
```

#### 3、初始化 Gitlab (第一次使用配置时间较长)

``` shell
 [root@localhost ~]# gitlab-ctl reconfigure   
.....
```

#### 4、启动 Gitlab 服务

``` shell
[root@vm1 ~]# gitlab-ctl start
ok: run: gitaly: (pid 22896) 2922s
ok: run: gitlab-monitor: (pid 22914) 2921s
ok: run: gitlab-workhorse: (pid 22882) 2922s
ok: run: logrotate: (pid 22517) 2987s
ok: run: nginx: (pid 22500) 2993s
ok: run: node-exporter: (pid 22584) 2974s
ok: run: postgres-exporter: (pid 22946) 2919s
ok: run: postgresql: (pid 22250) 3047s
ok: run: prometheus: (pid 22931) 2920s
ok: run: redis: (pid 22190) 3053s
ok: run: redis-exporter: (pid 22732) 2962s
ok: run: sidekiq: (pid 22472) 3005s
ok: run: unicorn: (pid 22433) 3011s
[root@vm1 ~]# 
[root@vm1 ~]# lsof -i:80
COMMAND   PID       USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   22500       root    7u  IPv4  50923      0t0  TCP *:http (LISTEN)
nginx   22501 gitlab-www    7u  IPv4  50923      0t0  TCP *:http (LISTEN)
[root@vm1 ~]# 
```

#### 5、Gitlab 设置 HTTPS 方式

```
如果想要以上的 https 方式正常生效使用，则需要把 letsencrypt 自动生成证书的配置打开，这样在执行重
新让配置生效命令 (gitlab-ctl reconfigure) 的时候会自动给域名生成免费的证书并自动在 gitlab 自带的
 nginx 中加上相关的跳转配置，都是全自动的，非常方便。
letsencrypt['enable'] = true 
letsencrypt['contact_emails'] = ['caryyu@qq.com']     # 这应该是一组要添加为联系人的电子邮件地址
```

#### 6、Gitlab 添加smtp邮件功能

``` shell
[root@vm1 ~]# vim /etc/gitlab/gitlab.rb
postfix 并非必须的；根据具体情况配置，以 SMTP 的为例配置邮件服务器来实现通知；参考配置如下： 
### Email Settings  
gitlab_rails['gitlab_email_enabled'] = true  
gitlab_rails['gitlab_email_from'] = 'system.notice@qq.com'  
gitlab_rails['gitlab_email_display_name'] = 'gitlab.notice'  
gitlab_rails['gitlab_email_reply_to'] = 'system.notice@qq.com'  
gitlab_rails['gitlab_email_subject_suffix'] = 'gitlab'  
### GitLab email server settings 
###! Docs: https://docs.gitlab.com/omnibus/settings/smtp.html 
###! **Use smtp instead of sendmail/postfix.**   
gitlab_rails['smtp_enable'] = true  
gitlab_rails['smtp_address'] = "smtp.qq.com"  
gitlab_rails['smtp_port'] = 465  
gitlab_rails['smtp_user_name'] = "system.notice@qq.com"  
gitlab_rails['smtp_password'] = "xxxxx"  
gitlab_rails['smtp_domain'] = "qq.com"  
gitlab_rails['smtp_authentication'] = "login"  
gitlab_rails['smtp_enable_starttls_auto'] = true  
gitlab_rails['smtp_tls'] = true

[root@vm1 ~]# grep -P "^[^#].*smtp_|user_email|gitlab_email" /etc/gitlab/gitlab.rb
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'username@domain.cn'
gitlab_rails['gitlab_email_display_name'] = 'Admin'
gitlab_rails['gitlab_email_reply_to'] = 'usernamei@domain.cn'
gitlab_rails['gitlab_email_subject_suffix'] = '[gitlab]'
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
gitlab_rails['smtp_port'] = 25 
gitlab_rails['smtp_user_name'] = "username@domain.cn"
gitlab_rails['smtp_password'] = "password"
gitlab_rails['smtp_domain'] = "domain.cn"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false
user['git_user_email'] = "username@domain.cn"

[root@vm1 ~]# gitlab-ctl reconfigure  #修改配置后需要初始化配置
......

[root@vm1 ~]# gitlab-ctl stop
ok: down: gitaly: 0s, normally up
ok: down: gitlab-monitor: 1s, normally up
ok: down: gitlab-workhorse: 0s, normally up
ok: down: logrotate: 1s, normally up
ok: down: nginx: 0s, normally up
ok: down: node-exporter: 1s, normally up
ok: down: postgres-exporter: 0s, normally up
ok: down: postgresql: 0s, normally up
ok: down: prometheus: 0s, normally up
ok: down: redis: 0s, normally up
ok: down: redis-exporter: 1s, normally up
ok: down: sidekiq: 0s, normally up
ok: down: unicorn: 1s, normally up

[root@vm1 ~]# gitlab-ctl start
ok: run: gitaly: (pid 37603) 0s
ok: run: gitlab-monitor: (pid 37613) 0s
ok: run: gitlab-workhorse: (pid 37625) 0s
ok: run: logrotate: (pid 37631) 0s
ok: run: nginx: (pid 37639) 1s
ok: run: node-exporter: (pid 37644) 0s
ok: run: postgres-exporter: (pid 37648) 1s
ok: run: postgresql: (pid 37652) 0s
ok: run: prometheus: (pid 37660) 1s
ok: run: redis: (pid 37668) 0s
ok: run: redis-exporter: (pid 37746) 0s
ok: run: sidekiq: (pid 37750) 1s
ok: run: unicorn: (pid 37757) 0s
```

#### 7、Gitlab 发送邮件测试

``` shell
[root@vm1 ~]# gitlab-rails console 
Loading production environment (Rails 4.2.10)
irb(main):001:0>  Notify.test_email('user@destination.com', 'Message Subject', 'Message Body').deliver_now

Notify#test_email: processed outbound mail in 2219.5ms

Sent mail to user@destination.com (2469.5ms)
Date: Fri, 04 May 2018 15:50:10 +0800
From: Admin <username@domain.cn>
Reply-To: Admin <username@domain.cn>
To: user@destination.com
Message-ID: <5aec10b24cfaa_93933fee282db10c162d@vm1.mail>
Subject: Message Subject
Mime-Version: 1.0
Content-Type: text/html;
 charset=UTF-8
Content-Transfer-Encoding: 7bit
Auto-Submitted: auto-generated
X-Auto-Response-Suppress: All

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>Message Body</p></body></html>

=> #<Mail::Message:70291731344240, Multipart: false, Headers: <Date: Fri, 04 May 2018 15:50:10 +0800>, <From: Admin <username@domain.cn>>, <Reply-To: Admin <username@domain.cn>>, <To: user@destination.com>, <Message-ID: <5aec10b24cfaa_93933fee282db10c162d@vm1.mail>>, <Subject: Message Subject>, <Mime-Version: 1.0>, <Content-Type: text/html; charset=UTF-8>, <Content-Transfer-Encoding: 7bit>, <Auto-Submitted: auto-generated>, <X-Auto-Response-Suppress: All>>
irb(main):002:0>quit 
```

### 3、**gitlab的使用**
**在浏览器中输入 http://192.168.60.119/ ，然后 change password:  ，并使用root用户登录 即可 (后续动作根据提示操作)**

#### 1、gitlab 命令行修改密码

```
gitlab-rails console production
irb(main):001:0> user = User.where(id: 1).first     # id为1的是超级管理员
irb(main):002:0>user.password = 'yourpassword'      # 密码必须至少8个字符
irb(main):003:0>user.save!                          # 如没有问题 返回true
exit 												# 退出
```

#### 2、gitlab服务管理

```
gitlab-ctl start                        # 启动所有 gitlab 组件；
gitlab-ctl stop                         # 停止所有 gitlab 组件；
gitlab-ctl restart                      # 重启所有 gitlab 组件；
gitlab-ctl status                       # 查看服务状态；
gitlab-ctl reconfigure                  # 启动服务；
vim /etc/gitlab/gitlab.rb               # 修改默认的配置文件；
gitlab-ctl tail                         # 查看日志；
```

3、登陆 Gitlab

![1](./assets/1.png)

**如果需要手工修改nginx的port ，可以在gitlab.rb中设置 nginx['listen_port'] = 8000 ，然后再次 gitlab-ctl reconfigure即可**

**登录 gitlab 如下所示(首次登陆设置 root 密码)：**
![1](./assets/2.1.png)

**创建项目组 group ，组名为plat-sp ,如下所示: **
![1](./assets/2.2.png)

![1](./assets/3.png)

**去掉用户的自动注册功能（安全）：**
admin are -> settings -> Sign-up Restrictions 去掉钩钩，然后拉到最下面保存，重新登录
![1](./assets/4.png)

## 七、公司的开发代码提交处理流程

  PM（项目主管/项目经理）在gitlab创建任务，分配给开发人员
  开发人员领取任务后，在本地使用git clone拉取代码库
  开发人员创建开发分支（git checkout -b dev），并进行开发
  开发人员完成之后，提交到本地仓库（git commit ）
  开发人员在gitlab界面上申请分支合并请求（Merge request）
  PM在gitlab上查看提交和代码修改情况，确认无误后，确认将开发人员的分支合并到主分支（master）
  开发人员在gitlab上Mark done确认开发完成，并关闭issue。这一步在提交合并请求时可以通过描述中填写"close #1"等字样，可以直接关闭issue

**创建项目管理用户Tompson如下所示：**
![1](./assets/5.png)
同样的方法，再创建Eric 、Hellen 用户。用户添加完毕后，gitlab会给用户发一封修改密码的邮件，各用户需要登录自己的邮箱，并点击相关的链接，设置新密码。

**将用户添加到组中，指定Tompson为本组的owner：**
![1](./assets/6.png)

**同样的方法将用户Eric、Hellen也添加到组中，并指定他们为Developer：**
![1](./assets/7.png)

**使用 Tompson 用户的身份与密码登录到 gitlab 界面中，并创建项目 Project ，如下所示：**
![1](./assets/10.png)

**指定项目的存储路径和项目名称，如下所示**
![1](./assets/11.png)

![1](./assets/12.png)

**为项目创建Dev分支，如下所示：**
![1](./assets/13.png)

![1](./assets/14.png)

**在 client 上添加Tompson的用户：**

``` shell
[root@vm2 ~]# useradd Tompson
[root@vm2 ~]# useradd Eric
[root@vm2 ~]# useradd Hellen
[root@vm2 ~]# su - Tompson
[Tompson@vm2 ~]$ ssh-keygen -C Tompson@domain.cn
Generating public/private rsa key pair.
Enter file in which to save the key (/home/Tompson/.ssh/id_rsa): 
Created directory '/home/Tompson/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/Tompson/.ssh/id_rsa.
Your public key has been saved in /home/Tompson/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:SAoAH2zSxqEJqVgKKrxM5XMi6tKe61JMRdwMhwBNIrE Tompson@domain.cn
The key's randomart image is:
+---[RSA 2048]----+
|XX==o=.          |
|*BOo+.o          |
|E*=.  .          |
|*+.= + .         |
|=oo = . S        |
|.oo              |
|.o               |
|o...             |
|.+=.             |
+----[SHA256]-----+
[Tompson@vm2 ~]$ cat .ssh/id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDZ8cRGHej+sZzlmK36W5MUXMLOGdTwFI9Jj44mGuabZCrlYW4GDpL6ppezN+Sur0wHtnKonYJzm8ntqS0S0UHyaPPQPl9Mrs/6Z4VrXZ/4RlqHdWeSrmOwCBQld0l8HvrmP4TyGHrOreO8uZqimd/Z+OiMqnYRZzENX11Pti/Px5g1MtJcoCi9uLtF42QYrt1X/fzAyPU9C5/5ZUq4Jln3EF20bzcA52oAzZIl0jrhI0TeTeW6zYq+KxdHGshL+qG7+Ne+akPOe4Ma5BQjcMZ2dQ2kbGuozXmLT8RDcj9YRKceQsUdTI71lJpwrWKGn8Vhra0EaK3hgoTuvMYaGfOF Tompson@domain.cn
```

**将Tompson的公钥复制到gitlab中： 使用Tompson用户的身份与密码登录到gitlab界面中，然后在ssh-key中添加 相关的key ，如下所示：**
![1](./assets/8.png)

![1](./assets/9.png)

**为Tompson用户配置git ，如下所示：**

``` shell
[Tompson@vm2 ~]$ git config --global user.email "Tompson@domain.cn"
[Tompson@vm2 ~]$ git config --global user.name "Tompson"

[Tompson@vm2 ~]$ git clone git@192.168.60.119:plat-sp/chathall.git
Cloning into 'chathall'...
The authenticity of host '192.168.60.119 (192.168.60.119)' can't be established.
ECDSA key fingerprint is SHA256:CDxAQmj6gUkIxB6XUofbZ853GuPM5LS2QO4a5dD7jRo.
ECDSA key fingerprint is MD5:4e:20:72:a7:46:c6:d7:5d:bb:9d:ce:c3:f3:da:43:f9.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.60.119' (ECDSA) to the list of known hosts.
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (3/3), done.
[Tompson@vm2 ~]$ 
[Tompson@vm2 ~]$ cd chathall/
[Tompson@vm2 chathall]$ ls
Readme.txt
[Tompson@vm2 chathall]$
```

**创建一下新文件，添加内容，并提交到master分支:**

``` shell
[Tompson@vm2 chathall]$ vim test.sh
[Tompson@vm2 chathall]$ cat test.sh 
#!/bin/bash
echo "gitlab test"
[Tompson@vm2 chathall]$ git add . 
[Tompson@vm2 chathall]$ git commit -m '201805101649'
[master 80edf6b] 201805101649
 1 file changed, 2 insertions(+)
 create mode 100644 test.sh
[Tompson@vm2 chathall]$ 
[Tompson@vm2 chathall]$ git push -u origin master 
Counting objects: 4, done.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 305 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@192.168.60.119:plat-sp/chathall.git
   4611654..80edf6b  master -> master
Branch master set up to track remote branch master from origin.
[Tompson@vm2 chathall]$ 
```

**使用Eric用户登录，并clone 项目，如下所示：**

``` shell
[root@vm2 ~]# su - Eric
[Eric@vm2 ~]$ ssh-keygen -C Eric@domain.cn
Generating public/private rsa key pair.
Enter file in which to save the key (/home/Eric/.ssh/id_rsa): 
Created directory '/home/Eric/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/Eric/.ssh/id_rsa.
Your public key has been saved in /home/Eric/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:VZaJvjA5SJZEB+yuRpDBNHCECCZ5R8X0DYcNE0f1B6E Eric@domain.cn
The key's randomart image is:
+---[RSA 2048]----+
|*O=..B*o**+o+oo. |
|*.+.. *o.*oooo . |
| . + + ..oo E . .|
|  o   o =..    . |
|   . .  S+ .     |
|    . .   .      |
|   . .           |
|    o            |
|   .             |
+----[SHA256]-----+

[Eric@vm2 ~]$ cat .ssh/id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDxQcn4UjRW/5PT5witeV9+S2w8WK5ouawHxEF7s9wuWsT4pqhcu5BN74NG3CPaq1jJZnkV+aQsTw+60BAd1gOK0FBbKWxmohmE61n9vfpUT5igJ72t2jpXjfKwLIHw+Iq5yM4yUhkwSsoBuZkxYSEltnj8OvXaOlCDYnXuGBa9+xO8f5yVIcOtiwRvv+Y1PRRzSIcazPVZax9FLK26t1R4NPiY4xWkIJyK2OrKMeiaBBzyMfWzHdmsCWa51oSrYSmz3PDBXpzIBs3OdKxcaJs9Lc5u87YCV5RMUjLrPcA7nPK6crOabLXhz3d5GSYggMTOByQkyKOo7WlYpARCHOt/ Eric@domain.cn
[Eric@vm2 ~]$ 
```

**同样需要使用Eric用户登录gitlab web 界面，并添加相应的ssh-key。然后设置git ，并clone项目：**

``` shell
[Eric@vm2 ~]$ git config --global user.email "Eric@domain.cn"
[Eric@vm2 ~]$ git config --global user.name "Eric"
[Eric@vm2 ~]$ git clone git@192.168.60.119:plat-sp/chathall.git
Cloning into 'chathall'...
The authenticity of host '192.168.60.119 (192.168.60.119)' can't be established.
ECDSA key fingerprint is SHA256:CDxAQmj6gUkIxB6XUofbZ853GuPM5LS2QO4a5dD7jRo.
ECDSA key fingerprint is MD5:4e:20:72:a7:46:c6:d7:5d:bb:9d:ce:c3:f3:da:43:f9.
Are you sure you want to continue connecting (yes/no)? yes
remote: Counting objects: 6, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 6 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (6/6), done.
[Eric@vm2 ~]$ 
```

**切换到dev分支，修改文件内容，并将新code提交到dev分支(Developer角色默认并没有提交master的权限)：**

``` shell
[Eric@vm2 chathall]$ git checkout dev 
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'
[Eric@vm2 chathall]$ ls
Readme.txt  test.sh
[Eric@vm2 chathall]$ vim test.sh 
[Eric@vm2 chathall]$ cat test.sh 
#!/bin/bash
echo "gitlab test"
echo "brahch test"
[Eric@vm2 chathall]$ git add . 
[Eric@vm2 chathall]$ git commit -m '201805101658'
[dev 6687039] 201805101658
 1 file changed, 1 insertion(+)
[Eric@vm2 chathall]$ git push -u origin dev 
Counting objects: 5, done.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 306 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
remote: 
remote: To create a merge request for dev, visit:
remote:   http://192.168.60.119/plat-sp/chathall/merge_requests/new?merge_request%5Bsource_branch%5D=dev
remote: 
To git@192.168.60.119:plat-sp/chathall.git
   80edf6b..6687039  dev -> dev
Branch dev set up to track remote branch dev from origin.
[Eric@vm2 chathall]$
[Eric@vm2 chathall]$ git checkout master 
Switched to branch 'master'
[Eric@vm2 chathall]$ git branch 
  dev
* master
[Eric@vm2 chathall]$
```

**使用Eric 用户登录gitlab web，在界面中 创建一个合并请求：**
![1](./assets/15.png)

**提交合并请求：**
![1](./assets/16.png)

**然后使用Tompson用户登录 gitlab web ，找到“合并请求” ，然后将dev分支合并到master分支，如下所示：**
![1](./assets/17.png)

![1](./assets/18.png)

## 八、Gitlab 备份与恢复

### 1、查看系统版本和软件版本

```
[root@localhost gitlab]# cat /etc/redhat-release 
CentOS Linux release 7.3.1611 (Core) 

[root@localhost gitlab]# cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
8.15.4
```

### 2、数据备份

打开/etc/gitlab/gitlab.rb配置文件，查看一个和备份相关的配置项：

```
gitlab_rails['backup_path'] = "/data/gitlab/backups"
```

该项定义了默认备份出文件的路径，可以通过修改该配置，并执行 **gitlab-ctl reconfigure 或者 gitlab-ctl  restart** 重启服务生效。

执行备份命令进行备份

```
/opt/gitlab/bin/gitlab-rake gitlab:backup:create 
```

也可以添加到 crontab 中定时执行：

```
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create
```

可以到/data/gitlab/backups找到备份包，解压查看，会发现备份的还是比较全面的，数据库、repositories、build、upload等分类还是比较清晰的。

 

设置备份保留时常，防止每天执行备份，肯定有目录被爆满的风险，打开/etc/gitlab/gitlab.rb配置文件，找到如下配置：

```
gitlab_rails['backup_keep_time'] = 604800
```

设置备份保留7天（7*3600*24=604800），秒为单位，如果想增大或减小，可以直接在该处配置，并通过gitlab-ctl restart 重启服务生效。

备份完成，会在备份目录中生成一个当天日期的tar包。

### 3、数据恢复

#### 1、安装部署 gitlab server

 具体步骤参见上面：gitlab server 搭建过程

#### 2、恢复 gitlab

打开/etc/gitlab/gitlab.rb配置文件，查看一个和备份相关的配置项：

```
gitlab_rails['backup_path'] = "/data/gitlab/backups"
```

修改该配置，定义了默认备份出文件的路径，并执行 **gitlab-ctl reconfigure 或者 gitlab-ctl  restart** 重启服务生效。

恢复前需要先停掉数据连接服务：

```
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
```

如果是台新搭建的主机，不需要操作，理论上不停这两个服务也可以。停这两个服务是为了保证数据一致性。将老服务器/data/gitlab/backups目录下的备份文件拷贝到新服务器上的/data/gitlab/backups

```
[root@localhost gitlab]# rsync -avz 1530773117_2019_03_05_gitlab_backup.tar 192.168.95.135:/data/gitlab/backups/ 
```

注意权限：600权限是无权恢复的。 实验环境可改成了777，生产环境建议修改属主属组

```
[root@yunwei-test backups]# pwd
/data/gitlab/backups
[root@yunwei-test backups]# chmod 777 1530773117_2019_03_05_gitlab_backup.tar 
[root@yunwei-test backups]# ll
total 17328900
-rwxrwxrwx 1 git git 17744793600 Jul  5 14:47 1530773117_2018_07_05_gitlab_backup.tar
```

执行下面的命令进行恢复：后面再输入两次yes就完成恢复了。

```
gitlab-rake gitlab:backup:restore BACKUP=1530773117_2018_07_05_gitlab_backup.tar
```

恢复完成后，启动刚刚的两个服务，或者重启所有服务，再打开浏览器进行访问，发现数据和之前的一致：

```
gitlab-ctl start unicorn
gitlab-ctl start sidekiq
或
gitlab-ctl restart
```

**注意：通过备份文件恢复gitlab必须保证两台主机的gitlab版本一致，否则会提示版本不匹配**

## 九、平滑发布与灰度发布

   **什么叫平滑：**在发布的过程中不影响用户的使用，系统不会因发布而暂停对外服务，不会造成用户短暂性无法访问；
    **什么叫灰度：**发布后让部分用户使用新版本，其它用户使用旧版本，逐步扩大影响范围，最终达到全部更新的发布方式 ；

灰度发布与平滑发布其实是关联的。当服务器的数量只有一台的时候，不存在灰度发布，一旦发布了就是所有用户都更新了，
所以这个时候只有平滑发布。当服务器数量大于一台的时候，只要每台服务器都能达到平滑发布的方式，然后设定好需要
发布的服务器占比数量，就可以实现灰度发布了。

单台服务器的平滑发布模式：
    单机状态下，应用的持续服务主要依靠Nginx的负载均衡及自动切换功能；
    为了能够切换应用，需要在服务器中创建两个相同的独立应用，分配两个不同的端口，
    例如:app1,端口801; app2,端口802；
    在Nginx中，将app1,app2作为负载均衡加载：

```
    upstream myapp{
          server 127.0.0.1:801; //app1
          server 127.0.0.1:802; //app2
    }

    然后设置代理超时为1秒，以便在某个应用停止时及时切换到另一个应用：
server {
    listen 80;
    server_name localhost;
    location /{
    proxy_pass http://myapp;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_connect_timeout       1;
    proxy_read_timeout          1;
    proxy_send_timeout          1;
    }
}
    以上内容写在单独的配置文件中：/vhost/pub/pub_app.conf
    在nginx.conf里包含进去：
    include /vhost/*.conf;
```

​    现在系统会均衡地分配用户访问app1与app2。
​    接下来我们进行平滑发布，我们先把app1停止，然后将新版本发布到app1中：

```
    步骤1： 准备发布app1配置文件
    新做一个配置文件 pub_app1_down.conf,内容中把app1停止掉：
    upstream myapp{
          server 127.0.0.1:801 down; //app1
          server 127.0.0.1:802; //app2
    }
    
    将这个文件内容覆盖掉在原有的pub_app.conf
    cp -f /vhost/pub/pub_app1_down.conf /vhost/pub_app.conf


    步骤2：停止app1应用
    平滑重新加载一下nginx: 
    service nginx reload
    或者：
    /usr/local/nginx/sbin/nginx -s reload

    此时所有的请求都转到了app2了；

    步骤3：更新app1
    现在可以通过各种方式来更新应用了，例如：压缩包方式：
    wget http://version.my.com/appudate/myapp/myapp-v3.2.32.tar
    unzip -o -d /home/wwwroot/app1/ myapp-v3.2.32.tar
    其中：-o:不提示的情况下覆盖文件；-d:指定解压目录
    
    步骤3.5 内部测试
    如果需要的话，可以在这一步对app1进行内部测试，以确保应用的正确性；

    步骤4：准备发布app2配置文件；
    此时app1已经是最新版本的文件了，可以切换到app1来对外，

    创建一个新的nginx配置文件:pub_app2_down.conf，设置为app1对外,app2停止即可：
    
    upstream myapp{
          server 127.0.0.1:801; //app1
          server 127.0.0.1:802 down; //app2
    }

    将这个文件内容覆盖掉在原有的pub_app.conf
    cp -f /vhost/pub/pub_app2_down.conf /vhost/pub_app.conf

    步骤5：切换到app1新版本应用 
    平滑重新一下nginx: 
    service nginx reload
    或者：
    /usr/local/nginx/sbin/nginx -s reload

    此时所有的请求都转到了app1了，新版本开始运行；

    步骤6：更新app2
    与第3步一样，解压就可以了，这里可以省去下载过程
    unzip -o -d /home/wwwroot/app2/ myapp-v3.2.32.tar

    步骤7：恢复app1,app2同时对外：
    cp -f /vhost/pub/pub_app.conf /vhost/pub_app.conf
    
    平滑重新一下nginx: 
    service nginx reload
    或者：
    /usr/local/nginx/sbin/nginx -s reload

    至此，整个应用都已经更新。

    将各步骤中的脚本汇总一下：

    [pub.sh]
    #============ 平滑发布 v1.0 ===============
    #step 1
    cp -f /vhost/pub/pub_app1_down.conf /vhost/pub_app.conf
    
    #step 2
    service nginx reload
    
    #step 3
    wget http://version.my.com/appudate/myapp/myapp-v3.2.32.tar
    unzip -o -d /home/wwwroot/app1/ myapp-v3.2.32.tar
    
    #step 4
    cp -f /vhost/pub/pub_app2_down.conf /vhost/pub_app.conf
    
    #step 5
    service nginx reload
    
    #step 6
    unzip -o -d /home/wwwroot/app2/ myapp-v3.2.32.tar
    
    #step 7
    cp -f /vhost/pub/pub_app.conf /vhost/pub_app.conf
    service nginx reload
    #============ 平滑发布 v1.0  ===============    

    备注：也可以充分利用nginx的宕机检测，省去步骤1，2，4，5，7；
    简化后的脚本如下：

    [pub_mini.sh]
    #======== 简化版脚本 =============
    wget http://version.my.com/appudate/myapp/myapp-v3.2.32.tar
    unzip -o -d /home/wwwroot/app1/ myapp-v3.2.32.tar

    unzip -o -d /home/wwwroot/app2/ myapp-v3.2.32.tar
    #========= over ===========
```

多台服务器平滑发布模式：
    有了单台平滑发布模式的基础，多台服务器就简单了。
    每台服务器当作应用进行发布就可以了，由于nginx有宕机自动检测功能，
    只需要在每台服务器上先停止发布，然后更新文件，再启动就可以了；
    如果选择部分的服务器进行更新，那就是灰度了。

## 十、CentOS7 使用 Nexus3 搭建 maven 私服(了解)

### 1、Nexus3 简介

　　Maven是一个采用纯Java编写的开源项目管理工具, Maven采用了一种被称之为Project Object Model(POM)概念来管理项目，所有的项目配置信息都被定义在一个叫做POM.xml的文件中, 通过该文件Maven可以管理项目的整个生命周期，包括清除、编译，测试，报告、打包、部署等等。目前Apache下绝大多数项目都已经采用Maven进行管理. 而Maven本身还支持多种插件, 可以方便更灵活的控制项目, 开发人员的主要任务应该是关注商业逻辑并去实现它, 而不是把时间浪费在学习如何在不同的环境中去依赖jar包,项目部署等。
maven和ant都是软件构建工具（软件管理工具),maven比ant更加强大，已经取代了ant,jar包的声明式依赖描述。maven有jar包的仓库。svn是一个软件的版本控制工具，是一个协同开发工具。svn的仓库存放的是项目的源码，历史版本的备份，声明每次版本的修改情况。

　　私服是架设在局域网的一种特殊的远程仓库，目的是代理远程仓库及部署第三方构件。有了私服之后，当 Maven 需要下载构件时，直接请求私服，私服上存在则下载到本地仓库；否则，私服请求外部的远程仓库，将构件下载到私服，再提供给本地仓库下载。

　　![img](assets/1167086-20180825103130887-988863302.jpg)

**需求：**

公司没有maven私服，需要用用手动打jar包的方式添加依赖很不友好，所以需要搭建 Nexus3 私服。

### 2、搭建 maven 私服

1.下载maven压缩包  apache-maven-3.5.4-bin.tar.gz ,然后解压  tar -zxf apache-maven-3.5.4-bin.tar.gz

2.添加环境变量

```
vi /etc/profile
```

在文件下方添加如下内容（这里的MAVEN_HOME需要改为你自己的maven解压目录）：

```
export JAVA_HOME="/opt/jdk1.8"
export MAVEN_HOME="/opt/apache-maven-3.5.4"
export PATH="$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH"
```

然后保存退出。

3.输入命令 mvn version 看到如下内容说明安装成功了。

![img](assets/1167086-20180825104448130-1294323799.jpg)

### 3、部署 nexus3

#### 1、下载

由于专业版的nexus是收费的，所以我下载的是开源版 Nexus OSS,下载地址为 <https://www.sonatype.com/download-oss-sonatype>

![img](assets/1167086-20180825105031180-667090550.jpg)

点击红框区域即可下载得到文件nexus-3.13.0-01-unix.tar.gz，然后上传到服务器目录下，我的是/opt目录。

#### 2、解压

```
cd /opt
tar -zxf nexus-3.13.0-01-unix.tar.gz
```

解压后会多出两个目录，nexus-3.13.0-01和sonatype-work。

#### 3、启动

```
1 cd nexus-3.13.0-01/bin/
2 ./nexus start
```

![img](assets/1167086-20180825105844833-1628287044.jpg)

看到如图所示内容表明我们已经启动成功了，游览器输入http://localhost:8081即可访问。

**注意：**

1.Nexus3开始访问URL已经变了，以前是http://localhost:8081/nexus，这个坑了我好一会儿。

2.启动后如果你立即访问可能发现什么都没有，不要急这个启动需要一定时间，30秒后到1分钟后再尝试访问，这个开始我以为出问题了。

![img](assets/1167086-20180825110836868-96057072.jpg)　

点击右上角的sign in登录，输入账户admin，密码admin123即可登录成功。

#### 4、仓库介绍

![img](assets/1167086-20180825111811784-1078214501.jpg)

按图中标识顺序点击，就可以看到有这些仓库，现在分别介绍它们，分为三种类型：

**proxy**：是远程仓库的代理。比如说在nexus中配置了一个central repository的proxy，当用户向这个proxy请求一个artifact，这个proxy就会先在本地查找，如果找不到的话，就会从远程仓库下载，然后返回给用户，相当于起到一个中转的作用。　　　　

**Hosted**：是宿主仓库，用户可以把自己的一些构件，deploy到hosted中，也可以手工上传构件到hosted里。比如说oracle的驱动程序，ojdbc6.jar，在central repository是获取不到的，就需要手工上传到hosted里，一般用来存放公司自己的jar包；
**Group**：是仓库组，在maven里没有这个概念，是nexus特有的。目的是将上述多个仓库聚合，对用户暴露统一的地址，这样用户就不需要在pom中配置多个地址，只要统一配置group的地址就可以了右边那个Repository Path可以点击进去，看到仓库中artifact列表。不过要注意浏览器缓存，**当你的项目希望在多个repository使用资源时就不需要多次引用了，只需要引用一个group即可**。

**maven-public：**maven-central、maven-release和maven-snapshot三个库的合集。

**maven-release：**用来存放release版本的jar包。

**maven-snapshot：**用来存放snapshot版本的jar包。

### 4、上传jar包到maven私服

### 1、添加仓库认证

找到本地电脑的setting.xml，打开后找到servers节点，在里面添加如下内容。

```
<server>
        <id>releases</id>
        <username>admin</username>
        <password>admin123</password>
    </server>
    <server>
        <id>snapshots</id>
        <username>admin</username>
        <password>admin123</password>
    </server>
```

### **4.2在项目的pom.xml添加远程发布的私服仓库地址**

```
 1     <distributionManagement>
 2         <repository>
 3             <!--此id要与setting.xml里面server的id对应-->
 4             <id>releases</id>
 5             <name>releases Repository</name>
 6             <url>http://192.168.75.132:8081/repository/maven-releases/</url>
 7         </repository>
 8         <snapshotRepository>
 9             <id>snapshots</id>
10             <name>snapshots</name>
11             <url>http://192.168.75.132:8081/repository/maven-snapshots/</url>
12         </snapshotRepository>
13     </distributionManagement>
```

这里的192.168.75.132是我虚拟机的IP地址，这里的URL可以点击仓库查看详情获取。

### 3、发布

![img](assets/1167086-20180825115126027-1064558298.jpg)

先点击clean,在点击deploy就会自动根据项目的版本上传到对应的仓库（**如果pom.xml上版本是1.1-SNAPSHOT则会deploy到maven-snapshot，如果是1.1.RELEASE则会deploy到maven-release**）。

一般打包时maven会自动执行单元测试很耗时间，如果想略过该过程可以在pom文件添加如下插件。

```
1 <!-- 打包跳过测试-->
2             <plugin>
3                 <groupId>org.apache.maven.plugins</groupId>
4                 <artifactId>maven-surefire-plugin</artifactId>
5                 <version>2.18.1</version>
6                 <configuration>
7                     <skipTests>true</skipTests>
8                 </configuration>
9             </plugin>
```

上传结果如图：

![img](assets/1167086-20180825115957384-1360156005.jpg)

然后在maven仓库里就可以找到我们刚刚上传的jar包了。

![img](assets/1167086-20180825120132433-1465069579.jpg)

注意：maven仓库的Deployment policy一定要设置成allow redeploy，否则会上传失败。

### 5、从私服下载jar包

#### 1、添加仓库地址

```
<repositories>
        <repository>
            <id>releases</id>
            <name>maven-public</name>
            <url>http://192.168.75.132:8081/repository/maven-public/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>

    </repositories>
```

针对单个项目，这个可以添加到项目的pom.xml文件里，如果很多项目都需要可以添加到setting.xml文件中。

#### 2、添加依赖，以下为示例

```
<dependency>
            <groupId>cn.sp</groupId>
            <artifactId>kafka-spring-boot</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

然后一刷新发现项目里就有了。

### 6、常见错误及解决办法

**问题一：上传报错误码405，Failed to transfer file。**

**解决方法：**仔细查看报错信息就会发现，是上传的url错了,反正原因就是repository的地址写错了。

**问题二：错误码401或者403**

**解决方法：**其实403错误就是“禁止访问”的含义，所以问题的根源肯定在授权上面。Maven在默认情况下会使用deployment帐号(默认密码deploy)登录的系统，但是关键的Nexus中Releases仓库默认的Deployment Policy是“Disable Redeploy”，所以无法部署的问题在这个地方，方法是将其修改为“Allow Redeploy”就可以了。401就是Maven settings.xml没有设置密码





## 十一、介绍 CI / CD

在本文档中，我们将概述持续集成，持续交付和持续部署的概念，以及GitLab CI / CD的介绍。

### 1、为什么要 CI / CD 方法简介

软件开发的连续方法基于自动执行脚本，以最大限度地减少在开发应用程序时引入错误的可能性。从新代码的开发到部署，它们需要较少的人为干预甚至根本不需要干预。

它涉及在每次小迭代中不断构建，测试和部署代码更改，从而减少基于有缺陷或失败的先前版本开发新代码的机会。

这种方法有三种主要方法，每种方法都根据最适合您的策略进行应用。

**持续集成**(Continuous Integration, CI):  代码合并，构建，部署，测试都在一起，不断地执行这个过程，并对结果反馈。

**持续部署**(Continuous Deployment, CD):　部署到测试环境、预生产环境、生成环境。　

**持续部署**(Continuous Delivery, CD):  将最终产品发布到生成环境、给用户使用。

![img](assets/1352872-20180728202111287-1863851599.png)

#### 1、持续集成

考虑一个应用程序，其代码存储在GitLab中的Git存储库中。开发人员每天多次推送代码更改。对于每次推送到存储库，您都可以创建一组脚本来自动构建和测试应用程序，从而减少向应用程序引入错误的可能性。

这种做法被称为[持续整合](https://en.wikipedia.org/wiki/Continuous_integration) ; 对于提交给应用程序的每个更改 - 甚至是开发分支 - 它都是自动且连续地构建和测试的，确保所引入的更改通过您为应用程序建立的所有测试，指南和代码合规性标准。

[GitLab本身](https://gitlab.com/gitlab-org/gitlab-ce)就是使用持续集成作为软件开发方法的一个例子。对于项目的每次推送，都会有一组脚本来检查代码。

#### 2、持续交付

[持续交付](https://continuousdelivery.com/)是持续集成的一个步骤。您的应用程序不仅在推送到代码库的每个代码更改时都构建和测试，而且，作为一个额外的步骤，它也会连续部署，尽管部署是手动触发的。

此方法可确保自动检查代码，但需要人工干预才能手动并策略性地触发更改的部署。

#### 3、持续部署

[持续部署](https://www.airpair.com/continuous-deployment/posts/continuous-deployment-for-practical-people) 也是持续集成的又一步，类似于持续交付。不同之处在于，您不必手动部署应用程序，而是将其设置为自动部署。完全不需要人工干预就可以部署您的应用程序。

### 2、GitLab CI / CD简介

GitLab CI / CD是GitLab内置的强大工具，允许您将所有连续方法（持续集成，交付和部署）应用于您的软件，而无需第三方应用程序或集成。

### 3、GitLab CI / CD 的工作原理

要使用GitLab CI / CD，您只需要一个托管在Git存储库中的应用程序代码库，并在一个名为的文件中指定构建，测试和部署脚本，该文件[`.gitlab-ci.yml`](https://docs.gitlab.com/ce/ci/yaml/README.html)位于存储库的根路径中。

在此文件中，您可以定义要运行的脚本，定义包含和缓存依赖项，选择要按顺序运行的命令以及要并行运行的命令，定义要部署应用程序的位置，以及指定是否将要自动运行脚本或手动触发任何脚本。熟悉GitLab CI / CD后，您可以在配置文件中添加更多高级步骤。

要向该文件添加脚本，您需要按照适合您的应用程序的顺序组织它们，并且这些脚本符合您希望执行的测试。要想象可视化过程，请假设您添加到配置文件中的所有脚本与您在计算机终端上运行的命令相同。

将`.gitlab-ci.yml`配置文件添加到存储库后，GitLab将检测到它并使用名为[GitLab Runner](https://docs.gitlab.com/runner/)的工具运行脚本，该工具与终端类似。

脚本被分组到**作业中**，它们一起组成一个**管道**。`.gitlab-ci.yml`文件的极简主义示例可以包含：

```
before_script:
  - apt-get install rubygems ruby-dev -y

run-test:
  script:
    - ruby --version
```

该`before_script`属性将在运行任何内容之前为您的应用程序安装依赖项，并且调用 的 **作业**`run-test`将打印当前系统的Ruby版本。它们都构成了在每次推送到存储库的任何分支时触发的**管道**。

GitLab CI / CD不仅可以执行您设置的作业，还可以显示执行过程中发生的情况，如您在终端中看到的那样：

![工作运行](assets/job_running.png)

您可以为应用创建策略，GitLab会根据您定义的内容为您运行管道。您的管道状态也由GitLab显示：

![管道状态](assets/pipeline_status.png)

最后，如果出现任何问题，您可以轻松 [回滚](https://docs.gitlab.com/ce/ci/environments.html#rolling-back-changes)所有更改：

![回滚按钮](assets/rollback.png)

### 4、基本CI / CD工作流程

这是GitLab CI / CD如何适用于通用开发工作流程的一个非常简单的示例。

假设您已在一个问题中讨论过代码实现，并在本地处理您提出的更改。将提交推送到GitLab中远程存储库中的功能分支后，将触发为项目设置的CI / CD管道。通过这样做，GitLab CI / CD：

- 运行自动脚本（顺序或并行）到：
  - 构建并测试您的应用。
  - 使用“评论应用”预览每个合并请求的更改，如您所见`localhost`。

一旦您对实施感到满意：

- 让您的代码经过审核和批准。
- 将功能分支合并到默认分支。
  - GitLab CI / CD会自动将更改部署到生产环境中。
- 最后，如果出现问题，您和您的团队可以轻松地将其回滚。

![GitLab工作流程示例](assets/gitlab_workflow_example.png)

GitLab CI / CD能够做得更多，但这个工作流程体现了GitLab跟踪整个过程的能力，而无需任何外部工具来交付您的软件。而且，最有用的是，您可以通过GitLab UI可视化所有步骤。

### 5、首次设置 GitLab CI / CD

要开始使用GitLab CI / CD，您需要熟悉[`.gitlab-ci.yml`](https://docs.gitlab.com/ce/ci/yaml/README.html)配置文件语法及其属性。

本文档[介绍了GitLab CI / CD在GitLab页面范围内的概念](https://docs.gitlab.com/ce/user/project/pages/getting_started_part_four.html)，用于部署静态网站。虽然它适用于想要从头开始编写自己的Pages脚本的用户，但它也可以作为GitLab CI / CD设置过程的介绍。它涵盖了编写CI / CD配置文件的第一个常规步骤，因此我们建议您通读它以了解GitLab的CI / CD逻辑，并了解如何为任何应用程序编写自己的脚本（或调整现有脚本）。

有关GitLab的CI / CD配置选项的深入视图，请查看 [`.gitlab-ci.yml`完整参考](https://docs.gitlab.com/ce/ci/yaml/README.html)。

### 6、GitLab CI / CD功能集

- 使用[Auto DevOps](https://docs.gitlab.com/ce/topics/autodevops/index.html)轻松设置应用程序的整个生命周期。

- 使用[GitLab Pages](https://docs.gitlab.com/ce/user/project/pages/index.html)部署静态网站。

- 将您的应用程序部署到不同的[环境](https://docs.gitlab.com/ce/ci/environments.html)。

- 使用[Review Apps](https://docs.gitlab.com/ce/ci/review_apps/index.html)预览每个合并请求的更改。

- 使用[Container Registry](https://docs.gitlab.com/ce/user/project/container_registry.html)开发安全的私有Docker镜像。

- 安装自己的[GitLab Runner](https://docs.gitlab.com/runner/)。

- [安排管道](https://docs.gitlab.com/ce/user/project/pipelines/schedules.html)。

- 使用[安全测试报告](https://docs.gitlab.com/ee/user/project/merge_requests/#security-reports-ultimate)检查应用程序漏洞。

  ```
  具体实施参考：
  https://segmentfault.com/a/1190000016069906
  ```

  

## 十二、Jenkins CI/CD

### 1、 Jenkins CI/CD 流程图

![img](assets/1352872-20180728203103959-1827013182.png)

说明：这张图稍微更形象一点，上线之前先把代码git到版本仓库，然后通过Jenkins 如Java项目通过maven去构建，这是在非容器之前，典型的自动化的一个版本上线流程。那它有哪些问题呢？

如：它的测试环境，预生产环境，测试环境。会存在一定的兼容性问题 （环境之间会有一定的差异） 



![img](assets/1352872-20180728203917252-1861052346.png)

 

说明：它这里有一个docker harbor 的镜像仓库，通常会把你的环境打包为一个镜像，通过镜像的方式来部署。

 Jenkins持续集成01—Jenkins服务搭建和部署

### 2、介绍 Jenkins

#### 1、Jenkins概念

　　Jenkins是一个功能强大的应用程序，允许**持续集成和持续交付项目**，无论用的是什么平台。这是一个免费的源代码，可以处理任何类型的构建或持续集成。集成Jenkins可以用于一些测试和部署技术。Jenkins是一种软件允许持续集成。

#### 2、Jenkins目的

① 持续、自动地构建/测试软件项目。

② 监控软件开放流程，快速问题定位及处理，提示开放效率。

#### 3、特性

① 开源的java语言开发持续集成工具，支持CI，CD。

② 易于安装部署配置：可通过yum安装,或下载war包以及通过docker容器等快速实现安装部署，可方便web界面配置管理。

③ 消息通知及测试报告：集成RSS/E-mail通过RSS发布构建结果或当构建完成时通过e-mail通知，生成JUnit/TestNG测试报告。

④ 分布式构建：支持Jenkins能够让多台计算机一起构建/测试。

⑤ 文件识别:Jenkins能够跟踪哪次构建生成哪些jar，哪次构建使用哪个版本的jar等。

⑥ 丰富的插件支持:支持扩展插件，你可以开发适合自己团队使用的工具，如git，svn，maven，docker等。

#### 4、产品发布流程

产品设计成型 -> 开发人员开发代码 -> 测试人员测试功能 -> 运维人员发布上线

持续集成（Continuous integration，简称CI）

持续交付（Continuous delivery）

持续部署（continuous deployment） 

### 3、安装Jenkins

#### 1、安装JDK

​    Jenkins是Java编写的，所以需要先安装JDK，这里采用yum安装，如果对版本有需求，可以直接在Oracle官网下载JDK；也可自己编译安装。

[root@jenkins ~]# yum install -y java-1.8.0

#### 2、安装Jekins

[root@jenkins ~]# cd /etc/yum.repos.d/

[root@jenkins yum.repos.d]# wget http://pkg.jenkins.io/redhat/jenkins.repo

[root@jenkins ~]# rpm --import http://pkg.jenkins.io/redhat/jenkins.io.key

[root@jenkins ~]# yum install -y jenkins

#### 3、修改配置文件

（1）查询yum下载Jenkins安装的文件

[root@jenkins ~]# rpm -ql jenkins

```
/etc/init.d/jenkins
/etc/logrotate.d/jenkins
/etc/sysconfig/jenkins
/usr/lib/jenkins
/usr/lib/jenkins/jenkins.war
/usr/sbin/rcjenkins
/var/cache/jenkins
/var/lib/jenkins
/var/log/jenkins
```

（2）创建Jenkins主目录

[root@jenkins ~]# mkdir /data/jenkins -p

[root@jenkins ~]# chown -R jenkins.jenkins /data/jenkins/

（3）修改配置文件

[root@jenkins ~]# vim /etc/sysconfig/jenkins

```
JENKINS_HOME="/data/jenkins"
JENKINS_USER="jenkins"
JENKINS_JAVA_OPTIONS="-Djava.awt.headless=true -Xms256m -Xmx512m -XX:MaxNewSize=256m -XX:Maxize=256m"    //-Xms256m -Xmx512m -XX:MaxNewSize=256m -XX:Maxize=256m可以不添加
JENKINS_PORT="8000" 
```

（4）开启Jenkins服务

[root@jenkins bin]# systemctl start jenkins

（5）网页打开配置

打开192.168.130.110:8000/

**① 为了安全考虑，首先需要解锁Jenkins，请在/var/lib/jenkins/secrets/initialAdminPassword中查看文件。**

![img](/assets/1216496-20180929154422645-196405166.png)

在Jenkins服务器上查询管理员密码

[root@centos7-1 ~]# cat /data/jenkins/secrets/initialAdminPassword

250d0360e2a149dbb7402f96a26945e2

**② 选择需要安装的插件**

选择默认推荐即可，会安装通用的社区插件，剩下的可以在使用的时候再进行安装。

![img](assets/1216496-20180929154455631-121998829.png)

开始安装，由于网络原因，有一些插件会安装失败。

![img](assets/1216496-20180929154509960-593928049.png)

**③ 设置Admin用户和密码**

![img](assets/1216496-20180929154521356-1783143237.png)

![](https://i.loli.net/2019/05/15/5cdc1a660743a19086.jpg)

**④ 安装完成**

![img](assets/1216496-20180929154533743-185875991.png)

 

**⑤ 登录Jenkins**

![img](assets/1216496-20180929154546439-1243749439.png)

 

### 4、安装完后，简单的配置

#### 1、系统配置

① 系统消息：Welcome to Jenkins~

② 全局属性--->环境变量，可根据自己的项目添加；如：gitlab：

![img](assets/1216496-20181225161055783-1178107.png)

 

③ 扩展邮件通知（用于之后项目构建后发送邮件）

![img](assets/1216496-20181225161119613-946281686.png)

 

④ 邮件配置

　　管理监控配置--->系统管理员邮件地址：along@163.com，要和下面的用户名一致；

　　邮件通知，配置如下：可以点击测试，是否配置成功

![img](assets/1216496-20181225161136561-477202932.png)

 

#### 2、全局工具配置

如果你持续集成需要用的哪些工具，就需要在这里添加配置；后边持续集成中，将会详细讲解；

这里只举例：添加JDK工具

点击新增---> 取消自动安装 ---->然后查询Jenkins服务器上JDK的路径，填写JAVA_HOME --->  保存即可

![img](assets/1216496-20180929154647848-771853598.png)

 

#### 3、插件管理

这里有可更新、可选未安装插件、已安装插件；可以通过过滤快速查找

![img](assets/1216496-20180929155328709-302472729.png)

 

### 5、开始一个简单的项目

#### 1、新建任务

输入一个项目名称，构建一个自由风格的软件项目

![img](assets/1216496-20181225100855566-682627741.png) 

 

#### 2、配置项目

（1）General

描述：test    自己随意添加；

显示名称：along  是Jenkins看到的项目名称；

其他更多的用法，后续再讲；

![img](assets/1216496-20180929161011857-231187012.png)

（2）源码管理（就是拉取代码的地方，可以选择git或SVN）

① 选择git，输入gitlab项目地址

![img](assets/1216496-20181225101954642-1408979051.png)

 

② 点击Add添加凭据

选择SSH Username with pricate key，秘钥认证，输入私钥即可；

注：Jenkins服务器需在gitlab项目上有key

![img](assets/1216496-20180929155449880-1498963020.png)

因为只是简单的示范，所以就只有这些简单的配置； 

#### 3、构建项目

（1）点击项目damo，立即构建

![img](assets/1216496-20180929155508543-1988910911.png)

（2）可以点击#1，查询详细的控制台输出信息；

![img](assets/1216496-20180929155516248-1862719168.png)

 

（3）在Jenkins服务器上认证

在这个目录下能找到自己拉取git的项目；证明项目成功完成

[root@jenkins ~]# ls /data/jenkins/workspace/   

damo  damo@tmp



## 十三、Jenkins+Maven+Gitlab+Tomcat 自动化构建打包、部署

### **1、环境需求**

本帖针对的是Linux环境，Windows或其他系统也可借鉴。具体只讲述Jenkins配置以及整个流程的实现。

- 1.JDK（或JRE）及Java环境变量配置，我用的是JDK1.8.0_144，网上帖子也很多，不赘述。
- 2.Jenkins 持续集成和持续交付项目。
- 3.现有项目及gitlab（SVN或本地路径也行）地址。
- 4.maven工具及环境变量配置，用于构建和管理任何基于Java的项目。
- 5.下载解压Tomcat，我用的是Tomcat8。

### **2、环境准备**

#### **1、安装服务**

（1）安装JDK、Jenkins和gitlab

JDK yum安装和编译安装都可以；

gitlab 安装详见：gitlab 部署；

tomcat 安装详见：tomcat 服务部署

（2）mave安装

1、下载 maven 包

http://mirrors.cnnic.cn/apache/maven 选择自己需要的maven版本

```
wget https://mirrors.cnnic.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
tar -zxvf apache-maven-3.5.4-bin.tar.gz
```

#### **2、配置环境变量**

（1）配置全局环境变量

vim /etc/profile.d/jenkins_tools.sh

```
#JDK
export JAVA_HOME=/usr/java/jdk1.8.0_144
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
export TIME_STYLE='+%Y/%m/%d %H:%M:%S'

#maven
export MAVEN_HOME=/data/jenkins_tools/maven-3.5.4
export PATH=${MAVEN_HOME}/bin:$PATH 
```

使环境变量生效

```
source /etc/profile.d/jenkins_tools.sh 
```

（2）测试

```
java -version

java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

 ```
$ mvn -version
Apache Maven 3.5.4 (1edded0938998edf8bf061f1ceb3cfdeccf443fe; 2018-06-18T02:33:14+08:00)
Maven home: /data/jenkins_tools/maven-3.5.4
Java version: 1.8.0_144, vendor: Oracle Corporation, runtime: /usr/java/jdk1.8.0_144/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.10.0-514.26.2.el7.x86_64", arch: "amd64", family: "unix"
 ```

### **3、Jenkins工具、环境、插件配置**

#### **1、全局工具配置**

系统管理--->全局工具配置

修改maven默认settings.xml文件，配置git、jdk、maven工具后保存（不要勾选自动安装）。

![img](assets/1216496-20181225111116078-1810743848.png)

![img](assets/1216496-20181225111138940-378952326.png)

 

#### **2、配置全局变量**

系统管理--->系统设置--->全局属性

![img](assets/1216496-20181225111202810-240347204.png)

#### **3、安装2个插件**

系统管理--->插件管理

（1）Maven Integration plugin 安装此插件才能构建maven项目

![img](assets/1216496-20181225111239294-1597389627.png)

 

（2）Deploy to container Plugin 安装此插件，才能将打好的包部署到tomcat上

![img](assets/1216496-20181225111233645-1713837221.png)

 

### **4、创建一个Maven工程**

#### **1、构建maven项目**

**![img](assets/1216496-20181225111259028-1554866660.png)**

 

#### **2、源码管理**

填写git地址信息，添加认证凭据，详见[Jenkins持续集成01—Jenkins服务搭建和部署](https://www.cnblogs.com/along21/p/9724036.html)

![img](assets/1216496-20181225111320700-2119998020.png)

 

#### **3、构建触发器，可以根据自己的业务需求定制**

① Build whenever a SNAPSHOT dependency is built：检测到gitlab项目代码被重新构建后就触发；

② 轮询 SCM：*/2 * * * * ，每隔2分钟检查一次

![img](assets/1216496-20181225111336093-364970409.png)

![img](assets/1216496-20181225111343953-204952110.png)

 

#### **4、打包前步骤，根据自己需求可以添加一些操作：如一些shell命令**

**![img](assets/1216496-20181225111349244-1147548473.png)**

 

#### **5、build打包构建**

① Root POM：指定pom.xml的文件路径（这里是相对路径）

② Goals and options：mvn的选项，构件参数

![img](assets/1216496-20181225111411494-2004302280.png)

 

#### **6、构建后操作**

（1）选择deploy war to a container，部署到tomcat

![img](assets/1216496-20181225111422422-355528574.png)

 

（2）配置tomcat信息

![img](assets/1216496-20181225111434286-749459091.png)

- WAR/EAR files：输入war包的相对路径，如我的war包在新建目录的target下
- context path：输入部署tomcat的名称，就部署在webapps下的目录名
- add container：增加容器，一般选tomcat 8X就可以。这里的username与password需要到tomcat的conf文件夹中的tomcat-users.xml修改。tomcat URL就是你希望把war包部署到的tomcat所在IP地址，最后面不需要再加斜杠/。
- tomcat-users.xml中的用户名及密码默认是注释掉的，所以需要修改，也可以直接复制以下代码到</tomcat-users>之前。

```
  <role rolename="tomcat"/>
  <role rolename="role1"/>
  <role rolename="manager-gui" />
  <role rolename="manager-script" />
  <role rolename="manager-status" />
  <user username="tomcat" password="tomcat" roles="tomcat"/>
  <user username="both" password="tomcat" roles="tomcat,role1"/>
  <user username="role1" password="tomcat" roles="role1"/>
  <user username="deploy" password="tomcat" roles="manager-gui,manager-script,manager-status" />
```

- 然后到tomcat下面webapps/manager/META-INF/context.xml 注销掉红色部分。因为默认tomcat不可以通过外部ip访问管理界面。一定要启动Tomcat，不然等构建等时候会报拒绝连接

```
<Context antiResourceLocking="false" privileged="true" >
  <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
```

 

（3）添加tomcat的凭据

![img](assets/1216496-20181225111514628-746112672.png)

 

#### **7、配置邮件通知**

增加构建后操作--->Editable Email Notification

使用邮件同事前，需要再系统配置中进行邮箱配置，详解[Jenkins持续集成01—Jenkins服务搭建和部署](https://www.cnblogs.com/along21/p/9724036.html)

（1）配置邮件信息

![img](assets/1216496-20181225160000905-179137887.png)

 

（2）设置邮件触发器triggers

默认触发器：Failure - Any 无论何时失败触发；加一个success作为测试；

修改收件人为：recipient list

![img](assets/1216496-20181225160214801-996563924.png)

到这里就配置完成了，点击构建从控制台查看输出信息即可

 

### **5、构建项目**

#### **1、立即构建**

**![img](assets/1216496-20181225111522458-657721687.png)**

 

#### **2、查看控制台输出**

点击#1--->控制台输出；就能看到执行的整个过程

![img](assets/1216496-20181225111538744-1431965495.png)

 

#### **3、验证项目是否构建成功**

（1）成功向上蓝色；失败即为红色

![img](assets/1216496-20181225111556135-1767739343.png)

（2）在tomcat上查看项目

![img](assets/1216496-20181225111603531-886042143.png)

（3）收到项目构建成功的邮件

![img](assets/1216496-20181225155919744-410361936.png)



### 6、jenkins + gitlab + nginx 自动部署(webhook)

构建新的项目

![](https://i.loli.net/2019/05/15/5cdc2846c79b295918.jpg)

构建自由风格项目

![](https://i.loli.net/2019/05/16/5cdcfef5602b471584.jpg)



![](https://i.loli.net/2019/05/16/5cdcff4b97a8b18914.jpg)



源码管理

![](https://i.loli.net/2019/05/16/5cdcffaf04c8224886.jpg)

git 如何添加认证

![](https://i.loli.net/2019/05/16/5cdd005d445ec35626.jpg)

构建触发器    gitlab-plugin  gitlab-hook

![](https://i.loli.net/2019/05/16/5cdd00b44185158313.jpg)

![](https://i.loli.net/2019/05/16/5cdd018676c1332830.jpg)

要记录下上边的URL和认证密钥

切换到gitlab，找到对应的git库  点击setting --> Integrations ,填写以下内容，然后下拉点击 Add webhook

![](https://i.loli.net/2019/05/16/5cdd02254e31b80243.jpg)



可能会报下列错误，这是新版本gitlab 的保护功能，禁止内网跳转，解决方法如下：

![](https://i.loli.net/2019/05/16/5cdd030d0443c72410.jpg)



点击setting --> network 找到 Outbound requests

![](https://i.loli.net/2019/05/16/5cdd03a32ee5252484.jpg)

重复上列步骤添加 webhook。即可成功。

测试:





### 7、Jenkins与Docker的自动化CI/CD流水线实践

Pipeline 有诸多优点，例如：

- 项目发布可视化，明确阶段，方便处理问题
- 一个Jenkins File文件管理整个项目生命周期
- Jenkins File可以放到项目代码中版本管理

**Jenkins管理界面**

![img](assets/1352872-20180728204341141-291722191.png)



操作实例：Pipeline的简单使用

![img](assets/1352872-20180728204527837-451304456.png)

![img](assets/1352872-20180728204554081-1369553982.png)

 

 ![img](assets/1352872-20180728204657389-347280504.png)

 

![img](assets/1352872-20180728210146358-1701589142.gif)

 

这里是比较重要的核心，构建流程

![img](assets/1352872-20180728210429075-601796351.png)

点击保存之后，立即构建

![img](assets/1352872-20180728210527044-1222721532.png)

 

映像中普通Jenkins构建方式步骤：

![img](assets/1352872-20180728210804172-244354513.png)

 

 而pipeline 的构建流程：

![img](assets/1352872-20180728210838378-766950194.png)

 pipeline有诸多优点：

- 项目发布可视化，明确阶段，方便处理问题
- 一个Jenkins File 文件管理整个项目生命周期
- Jenkins File 可以放到项目代码中版本管理

![img](assets/1352872-20180728211621598-131214896.png)

一个Jenkins file 维护一个生命周期，就像写代码一样，只维护这个file文件就可以了。

 

![img](assets/1352872-20180728212016133-1509080965.png)

 

![img](assets/1352872-20180728211546157-817007695.png)

 

 

 

![img](assets/1352872-20180728213338974-1390758167.png)

小结：

Jenkins与kubernetes搭建CI/CD流水线有诸多好处：

- Jenkins高可用
- 自动伸缩
- 环境隔离
- 易维护