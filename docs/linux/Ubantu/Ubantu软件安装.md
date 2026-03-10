远程链接 ssh root@172.18.15.128           ssh root@172.18.15.130

### 1. 更新源及软件升级

更改ubuntu源为清华源
sudo gedit /etc/apt/sources.list
https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/

    sudo apt update 更新系统
    sudo apt upgrade 升级软件
### 2. 安装搜狗输入法

add the chinese language support 增加中文支持
install fcitx 安装fcitx
*follow the sogou pinyin install instructions 根据指引安装 https://shurufa.sogou.com/linux/guide

### 3. 安装必要应用软件

install VPN 安装VPN

install google-chrome 安装Chrome浏览器

install Feishu 安装飞书办公软件

install WPS 安装WPS办公套件

install code 安装VSCODE

install Xterminal 安装Xterminal

install Zed 安装Zed编辑器 https://zed.dev/download

install wezterm [https://github.com/wezterm/wezterm/releases]
配置文件, sudo gedit ~/.wezterm.lua

### 4. 自动挂载硬盘

点击左下角左应用程序（Win键）-> 选择Disks -> 找到所在的硬盘和分区 -> 点击设置 -> 修改挂载选项（Edit Mount Option）-> 取消User Session Default 勾选

即可实现自动挂载

### 5.修改日历选项

使用

locale

查看当前设置的区域
执行

 sudo gedit /usr/share/i18n/locales/zh_CN

打开设置，找到
“ first_weekday 2 ” 这一行，将2改成1，周日设置为每周的第一天

使用命令

sudo locale-gen 

重新生成 locale 信息

### 6.安装Firefox及创建桌面快捷方式

先下载firefox，：https://www.mozilla.org/en-US/firefox/download/thanks/
然后解压到home目录，并在icon文件夹中添加图标：添加图标：https://www.flaticon.com/free-icon/firefox_5968822

创建快捷方式到桌面，创建文件：
sudo gedit /usr/share/applications/firefox.desktop
然后放入一下信息（如果路径不一致自行修改）

[Desktop Entry]
Encoding=UTF-8
Name=Firefox
Comment=Firefox
Exec=/home/andy/firefox/firefox
Icon=/home/andy/firefox/icons/firefox.png
Terminal=false# 如果没有给自己账户root权限就需要这里设为true来启动终端输入密码
StartupNotify=true
Type=Application
Categories=Application;Development;

最后的最后，重启下机器。

### 7.安装nvm 下载nodeJS

https://locahost:3002/

```
apt install curl
```

##### 1."nvm" 是一个跨平台的 Node.js 版本管理器。

```
Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```



##### 2.无需重启 shell

```
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
nvm -v             # Should print "0.40.3"
```



##### 3.下载Node.js

```
Download and install Node.js:

安装LTS版

nvm install --lts
```



##### 4.查看Node.js版本 

```
 Verify the Node.js version:
node -v # Should print "v22.15.0".
```



##### 5.nvm当前的版本

```
nvm current # Should print "v22.15.0".
6.npm的版本# Verify npm version:
npm -v # Should print "10.9.2".
```



##### 7.nvm使用当前版本

```
nvm use 22.15.0
```



##### 8.node所下目录

```
which node  
/root/.nvm/versions/node/v22.15.0/bin/node
```



##### 9.nvm 所下目录

```
which nvm 
/root/.nvm/versions/node/v22.15.0/bin:
/usr/local/sbin:
```





## 8、通过下载tgz安装

1. **下载安装包**：在你的 Windows 系统（不是 WSL）里，用浏览器打开这个链接：https://github.com/ollama/ollama/releases/latest/download/ollama-linux-amd64.tgz 。如果下载慢，可以自行搜索一个 GitHub 加速器，把上面的链接复制进去下载。

2. **传输文件**：将下载好的 `ollama-linux-amd64.tgz` 文件，放到你的 WSL2 Ubuntu 的用户目录下（例如 `/home/你的用户名/`）。

3. **解压安装**：回到 WSL2 终端，依次执行以下命令：

   bash

   ```
   # 解压文件
   sudo tar -C /usr -xzf ollama-linux-amd64.tgz
   
   # 创建 Ollama 用户（如果尚未创建）
   sudo useradd -r -s /bin/false -m -d /usr/share/ollama ollama
   
   # 启动 Ollama 服务
   sudo systemctl enable ollama
   sudo systemctl start ollama
   ```

   

4. **验证安装**：执行 `ollama -v`，如果显示版本号，则安装成功

### **后续步骤**

成功安装 Ollama 后，请继续按照上一份教程的步骤进行：

1. **拉取模型**：在 WSL2 终端执行 `ollama pull deepseek-r1:14b`。
2. **验证模型**：执行 `ollama run deepseek-r1:14b` 测试是否能正常对话。
3. **回到 Docker 教程**：完成模型拉取后，就可以无缝衔接我们上一轮讨论的 Docker 部署 OpenClaw 的步骤了。
