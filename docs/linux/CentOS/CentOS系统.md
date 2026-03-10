
查询ip4地址ifconfig    

172.18.15.127          Dell

172.18.15.129          CenOS7.8simple              最小化安装

172.18.15.128          CenOS7.8Desktop CentOS7.8.2003桌面

172.21.136.206         yubantu
连接ip4地址
ssh root@172.18.15.128 
ssh XNY5612@172.18.15.128 
sftp  root@172.18.15.128 

```
yum install -y vim
vim /etc/sysconfig/network-scripts/ifcfg-ens33
BOOTPROTO=static                  # 静态IP模式
IPADDR=172.18.15.218             # 指定IP地址                             i p   :172.18.15.128
NETMASK=255.255.255.0          # 子网掩码                               掩码  :255.255.255.0
GATEWAY=172.18.15.254            # 网关（根据实际网络修改）   路 由 :172.18.15.254
DNS1=172.18.6.6                      # DNS服务器                           DNS  :172.18.6.6
DNS2=10.1.0.3
ONBOOT=yes                          # 开机自启网卡yum install -y vim
vim /etc/sysconfig/network-scripts/ifcfg-ens33
BOOTPROTO=static                  # 静态IP模式
IPADDR=172.18.15.218             # 指定IP地址                             i p   :172.18.15.128
NETMASK=255.255.255.0          # 子网掩码                               掩码  :255.255.255.0
GATEWAY=172.18.15.254            # 网关（根据实际网络修改）   路 由 :172.18.15.254
DNS1=172.18.6.6                      # DNS服务器                           DNS  :172.18.6.6
DNS2=10.1.0.3
ONBOOT=yes                          # 开机自启网卡
```



```
#service network restart

#mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
centos6
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-6.10.repo
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-6.10.repo
CentOS 7
#wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
#curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo#service network restart

#mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
centos6
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-6.10.repo
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-6.10.repo
CentOS 7
#wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
#curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```



### 3.运行 yum makecache 生成缓存

yum clean all  #清理缓存

yum makecache   #设置缓存

#yum install -y wget
安装 ifconfig
ifconfig 属于 net-tools 软件包。你可以按照系统的包管理器来安装它：
#yum install net-tools

1.查看网络连接名称：
#nmcli connection show
2. 设置指定连接开机自动启动：
nmcli connection modify <连接名称> connection.autoconnect yes
#nmcli connection modify ens33 connection.autoconnect yes

3. 重启网络服务：
#systemctl restart NetworkManager


①下载nginx
#cd     /usr/local/src/
#wget     https://nginx.org/download/nginx-1.26.3.tar.gz
②解压nginx安装包
# tar -zxvf nginx-1.26.3.tar.gz

③进入nginx解压目录
#cd nginx-1.26.3/
开始进行配置、编译、安装操作
#./configure --prefix=/usr/local/nginx

在配置时候报错：没有PCRE库      
直接yum安装pcre-devel：
#yum install pcre-devel

#./configure --prefix=/usr/local/nginx --with-pcre

报错缺少zlib库：
直接使用yum安装zlib库：
#yum install zlib-devel
还需要自己去下载一个zlib的源码包，然后解压出来：
#cd     /usr/local/src/
下载
#wget https://zlib.net/fossils/zlib-1.2.11.tar.gz
#wget https://zlib.net/zlib-1.3.1.tar.gz
解压zlib安装包
# tar -zxvf zlib-1.2.11.tar.gz


#./configure --prefix=/usr/local/nginx --with-pcre --with-zlib=/usr/local/src/zlib-1.2.11


安装完成：  
Configuration summary
  + using system PCRE library
  + OpenSSL library is not used
  + using zlib library: /usr/lib/

④开始安装：
#make
⑤最后安装：
#make install

⑥ls    /usr/local/src
⑦先停止Apache，然后再运行nginx
service httpd stop
⑧#/usr/local/nginx/sbin/nginx			【启动命令】
#/usr/local/nginx/sbin/nginx -s reload	【重载，重载配置文件】
⑨了解：卸载编译安装的软件
#rm -rf 软件的安装目录
注意：卸载一个编译安装的软件的时候必须先停止。




PHP安装
yum install php
安装依赖包含httpd 2.2.15-60.el6.centos.6            2.4.6-99.el7.centos.1 


启动apache
service httpd start

查找find / -name httpd.conf

/etc/httpd/conf/httpd.conf
/usr/lib/tmpfiles.d/httpd.conf
vim /etc/httpd/conf/httpd.conf
在文件中搜索“:/ServerName”

开启80端口的防火墙
测试PHP是否可以运行（默认的apache站点的目录：/var/www/html）
cd       /var/www/html
vim index.php
<?php
phpinfo();


ps -ef查看进程

Apache 




1.查看系统中是否已安装unzip程序

在终端中输入以下命令：

which unzip
which zip

如果终端中出现了unzip的路径，则说明系统中已经安装了unzip程序。如果未出现任何显示，则需要安装unzip程序。





2.使用apt-get安装unzip程序

在终端中输入以下命令：

sudo apt-get install unzip
sudo apt-get install zip unzip

输入密码并确认后，系统会开始下载并安装unzip程序。安装完成后，即可在终端中使用unzip命令解压缩文件。

3.使用yum安装unzip程序

在某些Linux系统中，yum是管理软件包的命令。在终端中输入以下命令：

sudo yum install unzip
sudo yum install  zip



4.手动下载并安装unzip程序

在某些情况下，系统可能无法通过上述命令自动安装unzip程序。此时，可以手动下载并安装unzip程序。

在终端中输入以下命令：

sudo apt-get update

该命令会更新软件包信息。然后，在浏览器中搜索并下载unzip程序的压缩包（通常为zip格式）。将压缩包解压缩到文件夹中，然后打开终端，进入到该文件夹中。输入以下命令：

./configure

make

sudo make install

这些命令将会编译并安装unzip程序。安装完成后，即可在终端中使用unzip命令解压缩文件。



验证安装
安装完成后，你可以通过运行以下命令来验证zip和unzip是否正确安装：
检查zip版本：zip -v
检查unzip版本：unzip -v
创建zip文件：
zip -r myfolder.zip myfolder/
这个命令会将名为myfolder的文件夹及其内容压缩成一个名为myfolder.zip的文件。
解压zip文件：
unzip myfolder.zip
这个命令会将myfolder.zip文件解压到当前目录。

在Linux上安装unzip程序非常简单，可以通过命令行自动安装，也可以手动下载并安装。安装完成后，即可在终端中使用unzip命令进行文件解压缩。无论您是Linux新手还是高级用户，都能轻松掌握unzip程序的安装方法。







# 卸载旧版本
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# 安装必要依赖
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加 Docker 官方仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 删除旧仓库文件（如果存在）
sudo rm -f /etc/yum.repos.d/docker-ce.repo
# 添加正确仓库配置（注意URL格式）
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

 安装必要依赖
# 启用EPEL仓库
sudo yum install -y epel-release
# 安装container-selinux（关键依赖）
sudo yum install -y container-selinux
4. 清理并重建缓存.
sudo yum clean all
sudo rm -rf /var/cache/yum
sudo yum makecache fast

# 安装Docker引擎     Docker CE
sudo yum install -y docker-ce docker-ce-cli containerd.io


# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装 运行测试容器
sudo docker run hello-world
1. 检查Docker服务状态
sudo systemctl status docker
预期输出：
Active: active (running)
2. 查看已下载的镜像
sudo docker images
预期输出：
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
hello-world    latest    feb5d9fea6a5   6 months ago   13.3kB
3. 检查容器运行记录
sudo docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     PORTS     NAMES
d3a8c7a3f0e8   hello-world   "/hello"   2 minutes ago   Exited (0) 2 minutes ago             festive_curie

1. 配置国内镜像加速器
# 创建配置目录
sudo mkdir -p /etc/docker

# 添加阿里云镜像加速（其他厂商同理）
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://your-aliyun-mirror.mirror.aliyuncs.com"]
}
EOF

# 重启Docker
sudo systemctl daemon-reload
sudo systemctl restart docker


3. 关闭防火墙临时测试
sudo systemctl stop firewalld
sudo systemctl stop firewalld
sudo docker run hello-world