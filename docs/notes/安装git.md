# 一、关于Git

### Git 的理解

**Git 是目前世界上最先进的分布式版本控制系统（没有之一），用于敏捷高效地处理任何或小或大的项目。**

简单理解就是代码管理工具。使用 Git 一般处于以下 3 中原因：

**1、代码管理**

在本地写完代码后需要将代码备份到一个地方，Git 就给我们提供了一个仓库来进行存储和管理；

**2、版本控制**

如：我们开发一个项目，发布了很多个版本，想要查看之前某一个版本都更新了哪些内容 或 做版本回滚，就会非常的方便和快捷；

**3、团队协作**

当项目达到一定规模，会有多个人一起开发同一个项目（UI，前端，后端，运维），文件或代码都是放到同一个仓库的，这么多人同时操作仓库里的文件很容易造成混乱，Git 也提供了团队协作的支持

使用git从github下载项目到本地以及本地项目上传github

本文介绍了如何下载并安装Git，通过快速下载链接提高效率。详细步骤包括配置Git用户名和邮箱，创建SSH Key，并在GitHub上添加SSH Key。

此外，还讲解了如何从GitHub克隆项目以及将本地项目上传到GitHub，包括gitclone、gitinit、git、remote、add、origin等关键命令的使用。

## 二、git安装配置

要使用GitCode，需要先安装git工具。
git工具下载：<https://git-scm.com/downloads>
安装完成后，在命令行输入git --version可以查看到git的版本。
验证Git安装是否成功的方法：

1. 验证Git安装是否成功的方法是通过在命令提示符或终端中输入以下命令：git --version
2. 若显示版本号（git version 2.48.1.windows.1），说明Git安装成功。
3. 如果没有返回版本信息或出现“命令未找到”的错误消息，则表示Git可能未正确安装或未添加到系统路径中。此时，可以参考安装指南重新检查安装步骤。

安装完成后，右键菜单也会出现Git GUI、Git Bash相应的菜单。

## 三、配置Git用户名和邮箱的命令

当安装完 Git 后：

应该做的第一件事就是设置你的用户名称与邮件地址。这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改。



### 全局配置（适用于所有项目）：

设置全局用户名：

```text
#git config命令的--global参数，用了这个参数，表示你这台机器上所有的 Git 仓库都会使用这个配置
# 如果去掉 --global 参数只对当前仓库有效。

git config --global user.name "你的名字（一定要是英文的）"
git config --global user.name  "yangshuyin98"
```

设置全局邮箱：

```text
git config --global user.email "你的邮箱"
git config --global user.email "yangshuyin@126.com"
```

这些命令会将配置信息保存到全局配置文件中，适用于所有项目。

### 项目级配置（仅当前仓库生效）

设置局部用户名：

```text
git config user.name  "yang_shu_yin"
```

  设置局部邮箱：

```text
git config user.email "yangshuyin@126.com"
```

 配置完成后，可以使用git config --list命令查看所有git配置信息，以确认配置是否成功。

```shell
# 查看用用户名和邮箱信息是否配置成功
git config --global --list
```

## 四、登录GitCode

#### gitee码云

我们先在 gitee码云上注册账号并登录。

地址：https://gitee.com/

#### Github

如果你有CSDN账号，直接用CSDN账号登录即可。

我们先在 Github上注册账号并登录。
Github地址：<https://github.com/new>

## 五、生成SSH密钥

由于我们的本地git仓库和 GitCode仓库之间的传输是通过SSH加密的，所以我们需要配置SSH密钥。
如果你打算将Git仓库托管在GitHub、GitLab等远程代码托管平台上，并希望通过SSH方式进行代码推送和拉取，那么还需要配置SSH密钥。

1. 首先，在命令提示符中输入命令生成SSH密钥对。按照提示完成三次回车，即可生成ssh key。

```text
ssh-keygen -t rsa -C "yangshuyin@126.com"
```

可以看到，我们生成的公钥文件id_rsa.pub路径：C:\User\Adminstrator/.ssh/id_rsa.pub。
这个命令会生成一个私钥（默认存储在~/.ssh/id_rsa）和一个公钥（默认存储在~/.ssh/id_rsa.pub）。



## 六、配置SSH密钥的步骤

1. 进入该目录用文本编辑器打开。即可看到SSH公钥，下文中将会用到这个SSH公钥。

2. 然后，登录到你的远程代码托管平台账户，找到SSH密钥设置部分，将生成的公钥添加到你的账户中。

3. 在GitCode网站点击设置。

4. 点击SSH密钥。

5. 拷贝刚刚的SSH密钥到框中，输入公钥标题，点击添加密钥。

6. 配置成功。

7. 最后，为了验证SSH配置是否成功，可以在命令提示符中输入（以GitHub为例）命令进行测试。

   ```text
   ssh -T git@github.com
   ssh -T git@gitee.com
   ```
   > gitee码云为：gitee.com
   > GitHub 为：     github.com

10. 如果看到欢迎信息，则说明SSH配置成功。

   > gitee码云的提示信息为：
   > ```bash
   > Hi yangshuyin98! You've successfully authenticated, but GitHub does not provide shell access.
   > ```
   > 





   > GitHub的提示信息为：
   > ```bash
   > Hi yangshuyin98! You've successfully authenticated, but GitHub does not provide shell access.
   > ```
   > 



