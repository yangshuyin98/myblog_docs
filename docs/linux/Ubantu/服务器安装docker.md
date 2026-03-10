### 安装环境

Ubuntu22.04系统环境

开始安装

##### 1 检查卸载老版本Docker

旧版本的 Docker 称为 `docker` 或者 `docker-engine`

```ubuntu
sudo apt-get remove docker docker-engine docker.io
#安装前先卸载操作系统默认安装的docker，
sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get autoremove
```

##### 2 更新软件包

```
#  更新软件包
sudo apt-get update
sudo apt update
sudo apt upgrade -y

```

##### 3 安装docker依赖

```
#2.由于 apt 源使用 HTTPS 以确保软件下载过程中不被篡改，因此首先需要添加使用 HTTPS 传输的软件包以及 CA 证书
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
#安装必要支持
sudo apt-get -y install software-properties-common
```

##### 4、添加docker密钥

```
#添加 Docker 官方 GPG key密钥 （可能国内现在访问会存在问题）
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg


# 阿里源（推荐使用阿里的gpg KEY）
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
##3.为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥.更安全且推荐用于新系统（如 Ubuntu 22.04 及以上）
#需要后续在 APT 源配置中手动引用

```

##### 5、添加阿里云docker软件源

```
#添加 apt 源:
#Docker官方源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
#
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null



#阿里apt源
#向 sources.list 中添加 Docker 软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 以上命令会添加稳定版本的 Docker APT 镜像源，如果需要测试版本的 Docker 请将 stable 改为 test
##4更安全且推荐用于新系统（如 Ubuntu 22.04 及以上），因为它将密钥保存为单独文件，并可通过 APT 源的 signed-by 选项显式关联，减少系统范围的安全风险。


#更新源
sudo apt update
sudo apt-get update
```

##### 6、更新 apt 软件包缓存，安装docker,并安装 `docker-ce`

```
sudo apt-get update
#安装最新版本的Docker
sudo apt install docker-ce docker-ce-cli containerd.io
sudo apt-get install docker-ce docker-ce-cli containerd.io
# 安装 Docker Engine
sudo apt install -y  docker-compose-plugin
#等待安装完成
```

7、配置用户组(非必须操作，此操作目的是为了以后执行docker命令时无需输入sudo密码，避免这些重复操作而已。)

```
sudo usermod -aG docker $USER
sudo usermod -aG docker $USER
newgrp docker  # 刷新用户组
#电脑重启
sudo reboot

```

8、执行完第七步命令的话你电脑会立刻黑屏进行重启，等待重启即可。
检验docker是否安装成功

```
sudo systemctl start docker
sudo systemctl enable docker   #设置开机启动docker服务

sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
service docker restart
sudo docker run hello-world  # 验证安装

```

执行完hello-world等待一会，会在信息栏打印出该字眼则表示docker安装成功

##### 9、查看docker版本

```
#查看Docker版本
sudo docker version
# version： 29.3.0

#查看Docker运行状态
sudo systemctl status docker
#Active active（running）
#分页显示，导致无法直接返回命令行。以下是退出该状态的几种方法：
#1：使用快捷键退出
#按键 q 直接按下键盘上的 q 键，即可退出分页显示并返回命令行。
#按键组合 Ctrl+C 如果 q 无法退出，可以尝试按下 Ctrl+C 强制中断当前操作。
```

查看docker是否安装成功，如果是普通用户有些指令可能没有权限，可以将当前用户添加到 Docker 组

```
docker -v
docker --version  # 应显示类似：Docker version 24.0.7, build xxxxxxx
docker info | grep Mirrors  # 检查加速器配置
docker info

# 将当前用户添加到 Docker 组
sudo usermod -aG docker boss-dog
newgrp docker
groups boss-dog

```



查看docker镜像

```
sudo docker images
```

如果镜像还没的话，查看镜像只会有一行字。大于两行字就是有镜像了，看英文ID之类 的可以清晰知道哪个镜像的。



##### 10、配置镜像加速器



```
# 输入docker run --rm hello-world有时会报超时，需要配置镜像加速器
# 创建或编辑配置文件
# 创建配置目录
sudo mkdir -p /etc/docker
sudo mkdir -p /etc/docker


echo '{
  "registry-mirrors": [
    "https://mirror.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com"  # 腾讯云镜像（国内稳定）
    "https://hub-mirror.c.163.com",        // 网易镜像
    "https://registry.docker-cn.com"       // Docker 中国官方镜像
    "https://docker.m.daocloud.io",
    "https://szmlw1af.mirror.aliyuncs.com",
    "https://docker.aliyuncs.com",               //阿里云镜像（通用版）
    "https://docker.mirrors.ustc.edu.cn",  // 中科大镜像（推荐，速度快）
    "https://docker.1ms.run",

    "https://docker.xuanyuan.me"
  ]
}' | sudo tee /etc/docker/daemon.json






sudo systemctl restart docker
sudo systemctl restart docker

# 写入镜像加速器配置（中科大 + 网易 + 阿里云，任选其一或多个）
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",  # 中科大镜像
    "https://hub-mirror.c.163.com",       # 网易镜像
    "https://mirror.aliyuncs.com",        # 阿里云镜像（通用版）
    "https://docker.mirrors.ustc.edu.cn",  // 中科大镜像（推荐，速度快）
    "https://docker.1ms.run",
    "https://docker.xuanyuan.me"
  ]
}
EOF



# Ubuntu/Debian/CentOS 7+ 通用
sudo systemctl daemon-reload
sudo systemctl restart docker

# 若为老版本 Docker（如 CentOS 6），用以下命令
# sudo service docker restart



```

##### 11、系统 DNS 解析失败

这次报错 `dial tcp: lookup docker.mirrors.ustc.edu.cn on 127.0.0.53:53: no such host` 的核心是 **系统 DNS 解析失败**：

`127.0.0.53:53` 是 Linux 系统默认的本地 DNS 解析服务，`no such host` 表示它无法识别 `docker.mirrors.ustc.edu.cn` 这个域名；

本质是你的系统 DNS 配置有问题，导致连国内镜像源的域名都解析不了，而非 Docker 本身的问题。

###### 步骤 1：临时修复 DNS 配置（立即生效）

先修改系统的 DNS 配置文件，添加国内可靠的 DNS 服务器（阿里 / 腾讯 DNS）：****

```bash
# 备份原有DNS配置（防止出错）
sudo cp /etc/resolv.conf /etc/resolv.conf.bak

# 写入新的DNS服务器（阿里DNS + 腾讯DNS）
sudo tee /etc/resolv.conf <<-'EOF'
nameserver 223.5.5.5    # 阿里云公共DNS
nameserver 119.29.29.29 # 腾讯云公共DNS
nameserver 8.8.8.8      # 谷歌DNS（备用）
EOF
```

###### 步骤 2：更换更稳定的 Docker 镜像源（避免部分镜像源域名失效）

中科大镜像源偶尔可能解析异常，换成阿里云专属镜像源（更稳定），先修改 Docker 配置：

```bash
# 重新写入Docker镜像源配置（用阿里云通用版+腾讯云镜像）
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://mirror.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com"  # 腾讯云镜像（国内稳定）
  ]
}
EOF
```



###### 步骤 3：重启 Docker 服务并测试

```bash
# 重新加载配置+重启Docker
sudo systemctl daemon-reload
sudo systemctl restart docker

# 先验证DNS解析是否正常
ping -c 3 mirror.aliyuncs.com

# 再测试拉取hello-world镜像
sudo docker run hello-world
```



### 额外说明（若仍有问题）

如果是 Ubuntu 系统，`/etc/resolv.conf` 可能会被系统自动覆盖，需要永久修改 DNS：

```
# 编辑netplan配置（Ubuntu 18.04+）
sudo nano /etc/netplan/00-installer-config.yaml

# 在文件中添加DNS配置（示例，根据你的网卡调整）
network:
  ethernets:
    ens33:  # 替换成你的网卡名（用ip addr查看）
      dhcp4: true
      nameservers:
        addresses: [223.5.5.5, 119.29.29.29]
  version: 2

# 应用netplan配置
sudo netplan apply
```



##### 11、安装Docker 命令补全工具

```
sudo apt-get install bash-completion

sudo curl -L https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker -o /etc/bash_completion.d/docker.sh

source /etc/bash_completion.d/docker.sh

```

##### 12、允许非Root用户执行docker 命令

当我们安装好了Docker之后，有两种方式来执行docker 命令

在docker命令前加上sudo, 比如：sudo docker ps
sudo -i 切换至root用户，再执行docker 命令
是不是可以让当前用户在不切root，或者不加sudo 的情况下正常使用 docker 命令呢？答案是有的。

###### 添加docker用户组

```
sudo groupadd docker
```

###### 将当前用户添加到用户组

```
sudo usermod -aG docker $USER
```

###### 使权限生效

```
newgrp docker 
```

###### 测试一下

```
#查看所有容器
docker ps -a

```

#### 最后一步 更新.bashrc文件

我们需要编辑 ~/.bashrc文件，并在文件末尾增加如下一行,如果不在.bashrc文件中增加下面这一行命令

```
#如果没有此行命令，你会发现，当你每次打开新的终端
#你都必须先执行一次 “newgrp docker” 命令
#否则当前用户还是不可以执行docker命令
groupadd -f docker

```

### 卸载 Docker

```
sudo apt purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

```



## 总结

我想这是Ubuntu下安装Docker环境你所需要的一份完整的指引了，希望对大家有所帮助。

## 更新

关于最近国内无法访问到Docker的，首先在安装的时候，我们可以选国内阿里的源。参考上面的更新。

另外，我们需要在docker daemon 配置文件中增加国的可用的 docker hub mirror ，

找到你的daemon.json 文件，通常在 /etc/docker/daemon.json 这个位置

在daemon.json 中增加

```
"registry-mirrors": [
    "https://docker.m.daocloud.io"
  ]

```

通常来讲如果没有其它的配置，那么daemon.json完整的文件内容就是

```
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io"
  ]
}  

```

目前可用的国内docker hub 镜像，https://docker.m.daocloud.io。





### Docker Hub 拉取镜像失败的网络问题





这通常意味着 Docker 客户端在等待 Docker Hub 响应时超时了。可能的原因包括：

1. **网络连接问题**：您的计算机可能无法访问 Docker Hub，或者网络连接不稳定。
2. **Docker 服务问题**：Docker 服务可能没有正确运行。
3. **防火墙或代理设置**：防火墙或代理可能阻止了 Docker 客户端访问 Docker Hub。





## 2.Docker命令

### 2.1 服务相关命令

 启动docker服务

```
systemctl start docker

```

停止docker服务

```
systemctl stop docker

```

重启docker服务

```
systemctl restart docker
```



查看docker服务状态

```
systemctl status docker
```



设置开机启动docker服务

```
systemctl enable docker
```

重启docker服务

```
systemctl restart docker
```

### 2.2 镜像 相关命令



查看镜像：查看本地所有的镜像

```
docker images

docker images -q # 查看所用镜像的id

```

搜索镜像：从网络中查找需要的镜像

```
docker search 镜像名称

```

拉取镜像：从docker仓库下载镜像到本地，镜像名称格式为名称：版本号，如果版本号不指定则是最新的版本。

如果不知道镜像版本，可以去 [docker hub](https://hub.docker.com/)搜索对应镜像查看。

```
docker pull 镜像名称

```

拉取指定CPU架构并且指定ubuntu版本的docker：

```
# aarch64 (arm v8) CPU架构：
docker pull --platform=linux/aarch64 ubuntu:22.04
# x86_64 CPU架构：
docker pull --platform=linux/x86_64 ubuntu:22.04

```

查看镜像的架构：

```
docker image inspect ubuntu:22.04 | grep Architecture
# "Architecture": "arm64",

```

查看主机架构：

```
arch
# x86_64

```

删除镜像：删除本地镜像

```
docker rmi 镜像id # 删除指定本地镜像

docker rmi `docker images -q`  # 删除所有本地镜像

```

### 2.3 容器相关命令

- 查看容器

```
docker ps  #查看正在运行的容器

docker ps -a  #查看所有容器

```

- 创建并启动容器

```
docker run 参数

```

- 进入 容器

```
docker exec 参数 容器名称/容器id bash
docker exec -it test bash

```

- 停止容器

```
docker stop 容器名称/容器id

```

- 启动容器

```
docker start 容器名称/容器id

```

- 删除容器：如果容器是运行状态则删除失败，需要停止容器才能删除。

```
docker rm 容器名称/容器id

```

- 查看容器信息

```
docker inspect 容器名称/容器id

```

## 3.Docker容器的数据卷

##### 3.1 数据卷概念

数据卷
数据卷是宿主机中的一个目录或文件
当容器目录和数据卷目录绑定后，对方的修改会立即同步
一个数据卷可以被多个容器同时挂载
一个容器也可以挂在多个数据卷

##### 3.2 数据卷作用

容器数据持久化
外部机器和容器间接通信
容器之间数据交换

##### 3.3 数据卷配置

创建启动容器时，使用-v参数设置数据卷

```
docker run … -v 宿主机目录（文件）：容器目录（文件）…

```

**注意事项：**

- 目录必须是绝对路径（/开头是绝对，./开头是相对)
- 如果目录不存在，会自己创建
- 可以挂载多个数据卷

#### 一个容器挂载多个数据卷：

```
docker run -it --name=c2 \
 -v ~/data2:/root/data2 \
 -v ~/data3:/root/data3 \
 centos:7

```

>  centos:7表示镜像为centor，版本为7

#### 一个数据卷挂载多个容器：

```
docker run -it --name=c3 -v ~/data:/root/data centos:7
docker run -it --name=c4 -v ~/data:/root/data centos:7

```

### 3.4 数据卷容器

多容器进行数据交换

> 1.多个容器挂载同一个数据卷
>
> 2.数据卷容器

##### 配置数据卷容器

1.创建启动`c3`数据卷容器，使用`-v`参数设置数据卷

```
docker run -it --name=c3 -v /volume centos:7 /bin/bash

```

>  `c3`容器的目录是`/volume`,宿主机目录会自己分配一个，可以使用`docker inspect 容器名称/容器id`指令进行查看。

2.创建启动`c1`，`c2`容器，使用`--volumes-from` 参数设置数据卷

```
docker run -it --name=c1 --volumes-from c3 centos:7 /bin/bash
docker run -it --name=c2 --volumes-from c3 centos:7 /bin/bash

```

> `c1`和`c2`容器的目录也是`/volume`，宿主机目录和`c3`是同一个目录。



## 4.常用指令

```
docker ps -a

docker stop 603ff4a03cffe2278b2

docker rm 603ff4a03cffe2278b2

# 拷贝本机上的文件到docker环境中
docker cp test.zip 62471a960847:/root/opencv/lib_cmake

# 拷贝docker环境中的文件到本机上
docker cp <容器ID或容器名称>:<容器内路径> <本机路径>
docker cp my_container:/usr/local/myfolder /home/user/myfolder

```







