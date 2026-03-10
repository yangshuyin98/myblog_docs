



### 打开Xshell创建连接

使用的是CentOS



##### 查看端口

查看22是否开启。一般都是默认开启的。

```
netstat -an
```



##### 关防火墙

查看一下防火墙是否开启



```
systemctl status firewalld.service
```

绿色的圆点，绿色的字体说明防火墙是开启的。

关闭防火墙命令

```
systemctl stop firewalld.service
```

关闭自启动防火墙命令

```
systemctl disable firewalld.service
```



##### 查看IP

输入ifconfig查看以下IP

在ens33中inet查看IP



### 新建连接

##### 链接属性

文件→新建

名称：Ubuntu22.04

主机号：172.18.15.2

##### 用户身份验证

需要使用root权限

用户名：root

密码：   5612

连接