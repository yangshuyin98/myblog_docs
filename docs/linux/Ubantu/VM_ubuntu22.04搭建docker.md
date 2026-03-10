好的！以下是 **VMware + Ubuntu 22.04 + Docker 完整环境搭建指南**，基于之前的经验整理，去除无效步骤，确保一次性成功。

---

## VMware + Ubuntu 22.04 + Docker 环境搭建

### 一、VMware 虚拟机创建

#### 1. 下载 Ubuntu 22.04 ISO
- 官网：https://ubuntu.com/download/desktop
- 或国内镜像：阿里云、清华源等

#### 2. VMware 新建虚拟机
```
文件 → 新建虚拟机 → 典型(推荐)

安装来源：稍后安装操作系统
客户机操作系统：Linux → Ubuntu 64位

虚拟机名称：Ubuntu-22.04-Docker
位置：选择磁盘空间充足的位置（建议 50GB+）

磁盘容量：50GB（建议），选择"将虚拟磁盘存储为单个文件"

内存：4GB（建议 2GB 起步）
处理器：2核（建议 2核+）
网络适配器：NAT 或 桥接模式
```

#### 3. 安装 Ubuntu 22.04
```
启动虚拟机 → 加载 ISO → 选择 "Try or Install Ubuntu"

语言：中文/English
键盘布局：默认
网络：连接网络（建议插网线或连接 WiFi）
更新和其他软件：正常安装，勾选"安装第三方软件"
安装类型：清除整个磁盘并安装 Ubuntu

设置用户名密码：
- 姓名：dockeruser
- 计算机名：ubuntu-docker
- 用户名：dockeruser
- 密码：建议强密码

等待安装完成，重启虚拟机
```

---

### 二、Ubuntu 22.04 系统配置

```bash
# 1. 更新系统源（推荐换国内源）
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 使用阿里云源
sudo tee /etc/apt/sources.list <<'EOF'
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
EOF

# 2. 更新系统
sudo apt update && sudo apt upgrade -y

# 3. 安装必要工具
sudo apt install -y curl wget vim net-tools openssh-server
```

---

### 三、安装 Docker（官方推荐方式）

```bash
# 1. 卸载旧版本（如有）
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null

# 2. 安装依赖
sudo apt install -y ca-certificates curl gnupg lsb-release

# 3. 添加 Docker 官方 GPG 密钥
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 4. 添加 Docker 软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. 安装 Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 6. 验证安装
docker --version
docker compose version
```

---

### 四、配置国内镜像源（关键步骤）

```bash
# 创建 Docker 配置文件（使用 2025 年实测可用镜像源）
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.nju.edu.cn"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

# 验证 JSON 格式（必须无错误）
cat /etc/docker/daemon.json | python3 -m json.tool
```

**注意**：URL 后面**绝对不能有空格**！

---

### 五、启动并配置 Docker 服务

```bash
# 1. 重新加载配置
sudo systemctl daemon-reload

# 2. 启动 Docker
sudo systemctl start docker

# 3. 设置开机自启
sudo systemctl enable docker

# 4. 将当前用户加入 docker 组（免 sudo 运行）
sudo usermod -aG docker $USER

# 5. 立即生效（或重新登录）
newgrp docker

# 6. 验证状态
sudo systemctl status docker --no-pager
```

---

### 六、验证安装

```bash
# 1. 检查 Docker 信息
docker info | grep -A 6 "Registry Mirrors"

# 2. 测试拉取镜像
docker pull hello-world

# 3. 运行测试容器
docker run hello-world

# 4. 查看本地镜像
docker images

# 5. 测试 docker compose
docker compose version
```

**成功标志**：
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

### 七、VMware 网络配置（如需要）

#### NAT 模式（默认，虚拟机共享主机网络）
```bash
# 通常无需配置，自动获取 IP
ip addr show
# 应显示 192.168.x.x 或 10.0.x.x 网段
```

#### 桥接模式（虚拟机独立 IP，与主机同网段）
```
VMware → 虚拟机 → 设置 → 网络适配器 → 桥接模式 → 复制物理网络连接状态

# Ubuntu 中配置静态 IP（可选）
sudo tee /etc/netplan/00-installer-config.yaml <<'EOF'
network:
  version: 2
  ethernets:
    ens33:
      dhcp4: no
      addresses:
        - 192.168.1.100/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 223.5.5.5
          - 114.114.114.114
EOF

sudo netplan apply
```

---

### 八、常用命令速查

| 命令                            | 说明             |
| ------------------------------- | ---------------- |
| `sudo systemctl start docker`   | 启动 Docker      |
| `sudo systemctl stop docker`    | 停止 Docker      |
| `sudo systemctl restart docker` | 重启 Docker      |
| `docker ps`                     | 查看运行中容器   |
| `docker ps -a`                  | 查看所有容器     |
| `docker images`                 | 查看本地镜像     |
| `docker pull <镜像>`            | 拉取镜像         |
| `docker rmi <镜像ID>`           | 删除镜像         |
| `docker rm <容器ID>`            | 删除容器         |
| `docker compose up -d`          | 后台启动 compose |
| `docker logs <容器ID>`          | 查看容器日志     |

---

### 九、常见问题修复

| 问题            | 解决                                       |
| --------------- | ------------------------------------------ |
| Docker 无法启动 | `sudo systemctl restart docker`            |
| 拉取镜像超时    | 检查 `/etc/docker/daemon.json` 镜像源配置  |
| 权限 denied     | `sudo usermod -aG docker $USER` 后重新登录 |
| 磁盘空间不足    | `docker system prune -a` 清理无用数据      |
| 端口被占用      | `sudo netstat -tulpn \| grep <端口>`       |

---

### 十、可选：安装 Portainer（Docker 图形化管理）

```bash
# 安装 Portainer
docker volume create portainer_data

docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest

# 访问 https://虚拟机IP:9443 进行图形化管理
```

---

## 完整验证流程

```bash
# 最终验证命令
docker --version                    # 显示版本
docker compose version              # 显示 compose 版本
docker info | grep "Registry Mirrors"  # 显示配置的镜像源
docker pull nginx                   # 拉取 nginx 测试
docker run -d -p 80:80 --name test-nginx nginx  # 运行 nginx
curl http://localhost               # 测试访问
docker stop test-nginx && docker rm test-nginx  # 清理
```

---

**完成！** VMware + Ubuntu 22.04 + Docker 环境已完全搭建成功！🎉