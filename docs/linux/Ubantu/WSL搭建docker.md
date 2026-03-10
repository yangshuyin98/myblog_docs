# **WSL2 + Ubuntu 22.04 + Docker 安装配置过程**







## 在 Ubuntu 22.04 中安装 Docker

### 1. 更新系统并安装依赖
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```

### 2. 添加 Docker 官方 GPG 密钥
```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### 3. 添加 Docker 软件源
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 4. 安装 Docker Engine
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 5. 配置 Docker 用户权限（关键步骤）

**无需 sudo 运行 Docker：**
```bash
sudo usermod -aG docker $USER
newgrp docker  # 立即生效，无需重启
```

### 6. 验证安装
```bash
docker --version          # 查看版本
docker run hello-world    # 测试运行
docker compose version    # 查看 compose 版本
```

## WSL2 特有优化配置

### 启用 systemd（Ubuntu 22.04 已默认支持）
```bash
# 检查是否已启用
cat /etc/wsl.conf

# 如未启用，创建/编辑配置
sudo tee /etc/wsl.conf <<EOF
[boot]
systemd=true
EOF
```

### 配置 Docker 使用 WSL2 特性
```bash
# 编辑 Docker 配置优化 WSL2 性能
sudo tee /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

sudo systemctl restart docker
```

## 常用命令速查

| 命令                   | 说明                  |
| ---------------------- | --------------------- |
| `docker ps`            | 查看运行中的容器      |
| `docker images`        | 查看本地镜像          |
| `docker compose up -d` | 后台启动 compose 项目 |
| `docker system prune`  | 清理无用数据          |

## 常见问题

**Q: 提示 "Cannot connect to the Docker daemon"**
```bash
# 检查 Docker 服务状态
sudo systemctl status docker
sudo systemctl start docker   # 如未运行则启动
```

**Q: WSL2 中 Docker 启动慢**
- 这是正常现象，首次启动需要初始化
- 建议保持 WSL2 实例运行，不要频繁 `wsl --shutdown`

**Q: 与 Windows 版 Docker Desktop 冲突**
- 两者二选一即可
- 如已装 Docker Desktop，可在设置中启用 "Use the WSL 2 based engine"

---

安装完成后，你的 Ubuntu 22.04 WSL 环境就具备了完整的 Docker 容器能力，可以直接运行容器化应用了。

# **完全正确的 WSL2 + Ubuntu 22.04 + Docker 安装配置过程**

### 完整正确的安装配置流程

### 启用 WSL 功能

首先需要启用 Windows 的 WSL 功能。打开 PowerShell（以管理员身份运行），执行以下命令：

```powershell
dism.exe /online /enable-feature /featurenameingraphicsfeature /all /norestart
```

##### 注意事项

- Windows 11 家庭版和专业版都支持 WSL 2
- 需要启用虚拟化功能（Hyper-V 或虚拟机平台）
- 首次使用可能需要运行 `wsl --install` 命令来安装 WSL 组件

如果你需要特定版本的 Linux 内核或有特殊兼容性需求，仍然可以手动切换回 WSL 1，但一般情况下 WSL 2 是推荐的选择。

### 一、WSL2 环境准备（Windows PowerShell 管理员）

1.**安装 WSL2 和 Ubuntu**：

以管理员身份打开 PowerShell，运行 `wsl --install -d Ubuntu-24.04`。根据提示重启电脑，然后启动 Ubuntu 并设置用户名和密码。

Windows 11 上自带的 WSL 默认安装的是 **WSL 2**（Windows Subsystem for Linux 2）。

##### 2.WSL 版本说明

| 版本      | 特点                                                      |
| --------- | --------------------------------------------------------- |
| **WSL 1** | 第一代，通过翻译层实现 Linux 系统调用                     |
| **WSL 2** | 第二代，使用真正的 Linux 内核虚拟机，性能更好，兼容性更强 |

##### 3.Windows 11 的 WSL 特性

从 Windows 11 开始，WSL 2 成为默认版本，主要改进包括：

- **真正的 Linux 内核**：基于 Hyper-V 轻量级虚拟机技术
- **完整的系统调用兼容性**：可以运行 Docker、Kubernetes 等
- **更快的文件系统性能**：特别是跨 Windows 和 Linux 的文件操作
- **支持 GPU 加速**：可用于 CUDA 计算和机器学习
- **开箱即用**：可通过 `wsl --install` 一键安装 Ubuntu 等发行版



##### 4. 配置 WSL

首次启动 Linux 发行版时，需要创建用户账户和密码。



##### 5. 升级 WSL 版本

查看和切换版本命令

如果需要将现有发行版升级到 WSL 2：

# 在 PowerShell (管理员) 中执行
```powershell
# 查看当前 WSL 版本
wsl --version

# 1. 确保 WSL2 已启用
# 设置默认 WSL 版本
wsl --set-default-version 2
wsl --set-default-version 2

# 2. 安装 Ubuntu 22.04（如未安装）
wsl --install -d Ubuntu-22.04

# 3. 设置 Ubuntu-22.04 为 WSL2
wsl --set-version Ubuntu-22.04 2

# 4. 验证   # 查看已安装发行版的版本
wsl --list --verbose
# 应显示 Ubuntu-22.04    Running    2
# 确认 Ubuntu-22.04 是 VERSION 2
```

---

### 二、Ubuntu 22.04 内配置

```bash
# 1. 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 2. 更新系统
sudo apt update && sudo apt upgrade -y

# 3. 安装必要依赖
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 4. 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 5. 添加 Docker 软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 6. 安装 Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 7. 将当前用户加入 docker 组（免 sudo 运行）
sudo usermod -aG docker $USER
```

---

### 三、关键：配置 WSL2 使用 systemd（核心步骤）

```bash
# 1. 创建 WSL 配置文件启用 systemd
sudo tee /etc/wsl.conf <<'EOF'
[boot]
systemd=true
EOF

# 2. 在 Windows PowerShell 中重启 WSL2（必须！）
wsl --shutdown
# 然后重新打开 Ubuntu-22.04
```

---

### 四、配置国内镜像源（解决拉取超时）

```bash
# 1. 进入 WSL2 Ubuntu（重启后）
wsl -d Ubuntu-22.04

# 2. 创建 Docker 配置文件（使用 2025 年实测可用镜像源）
sudo tee /etc/docker/daemon.json <<'EOF'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.nju.edu.cn"
  ]
}
EOF

# 3. 验证 JSON 格式（必须无错误）
cat /etc/docker/daemon.json | python3 -m json.tool
```

**注意**：URL 后面**绝对不能有空格**，否则 Docker 无法启动！

---

### 五、启动 Docker 服务

```bash
# 使用 systemctl 启动（因已启用 systemd）
sudo systemctl start docker

# 设置开机自启
sudo systemctl enable docker

# 验证状态
sudo systemctl status docker --no-pager
```

---

### 六、验证安装

```bash
# 1. 检查 Docker 版本
docker --version

# 2. 检查镜像源配置
docker info | grep -A 6 "Registry Mirrors"

# 3. 测试拉取镜像（走国内镜像源）
docker pull hello-world

# 4. 运行测试容器
docker run hello-world

# 5. 查看本地镜像
docker images

# 6. 测试 docker compose
docker compose version
```

---

### 七、常见问题快速修复

| 问题             | 解决命令                                                     |
| ---------------- | ------------------------------------------------------------ |
| Docker 无法启动  | `sudo systemctl restart docker`                              |
| 镜像源失效       | 更新 `/etc/docker/daemon.json` 中的 URL                      |
| 权限不足         | `sudo usermod -aG docker $USER` 后重新登录                   |
| WSL2 网络不通    | `wsl --shutdown` 后重启                                      |
| metadata.db 锁定 | `sudo rm -f /var/lib/docker/volumes/metadata.db && sudo systemctl restart docker` |

---

### 八、可选：配置 DNS（如域名解析失败）

```bash
# 固定使用国内 DNS，防止 WSL2 自动生成失效
sudo tee /etc/resolv.conf <<'EOF'
nameserver 223.5.5.5
nameserver 119.29.29.29
nameserver 114.114.114.114
EOF

# 防止 WSL2 覆盖
sudo chattr +i /etc/resolv.conf 2>/dev/null || sudo chmod 444 /etc/resolv.conf
```

---

## 验证成功的标志

```bash
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
```

看到以上输出，说明 **WSL2 + Ubuntu 22.04 + Docker 完全安装成功！** 🎉
