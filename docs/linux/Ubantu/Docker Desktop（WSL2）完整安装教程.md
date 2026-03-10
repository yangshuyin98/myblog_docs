 好的！以下是 **Windows 11 + WSL2 + Docker Desktop 完整安装教程**，以及**与 WSL2 内部 Docker 不冲突的配置方法**。

---

## 方案选择说明

| 方案                         | 适用场景         | 特点                         |
| ---------------------------- | ---------------- | ---------------------------- |
| **A: 纯 WSL2 Docker**        | 轻量、命令行用户 | 仅在 WSL2 内运行，无图形界面 |
| **B: Docker Desktop + WSL2** | 需要可视化界面   | 图形化管理，WSL2 自动集成    |
| **C: 两者共存**              | 高级用户         | 需要仔细配置避免冲突         |

**推荐方案 B**：Docker Desktop 管理容器，WSL2 作为后端，**无需在 WSL2 内单独安装 Docker**。

---

## 完整安装教程：Docker Desktop + WSL2

### 一、前置准备

#### 1. 启用 WSL2（已启用可跳过）

```powershell
# 以管理员身份打开 PowerShell
wsl --install
# 或手动启用
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 设置 WSL2 为默认版本
wsl --set-default-version 2
```

#### 2. 安装 Ubuntu 22.04（如未安装）

```powershell
wsl --install -d Ubuntu-22.04
# 或从 Microsoft Store 安装
```

#### 3. 清理 WSL2 内部 Docker（关键！避免冲突）

```bash
# 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 停止并卸载 WSL2 内部的 Docker（如果之前安装过）
sudo systemctl stop docker 2>/dev/null
sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo rm -rf /var/lib/docker /etc/docker

# 可选：完全重置 WSL2（如之前配置混乱）
# 在 PowerShell 中执行：wsl --unregister Ubuntu-22.04
# 然后重新安装 Ubuntu-22.04
```

---

### 二、安装 Docker Desktop

#### 1. 下载安装包

- 官网：https://www.docker.com/products/docker-desktop/
- 或国内镜像站搜索下载

#### 2. 安装步骤

```
1. 双击 Docker Desktop Installer.exe
2. 勾选 "Use WSL 2 instead of Hyper-V"（默认已勾选）
3. 点击 OK 等待安装完成
4. 安装完成后重启电脑
```

#### 3. 首次启动配置

```
1. 启动 Docker Desktop
2. 接受 License Agreement
3. 登录 Docker 账号（可选，可跳过）
4. 进入主界面
```

---

### 三、配置 Docker Desktop 集成 WSL2

#### 1. 启用 WSL2 后端引擎

```
Docker Desktop → 右上角齿轮图标 (Settings) → General

勾选以下选项：
☑ Use the WSL 2 based engine（使用 WSL 2 后端引擎）
☑ Start Docker Desktop when you log in（登录时启动）
☑ Open Docker Dashboard when starting（启动时打开面板）

点击 Apply & Restart
```

#### 2. 启用 Ubuntu-22.04 集成（关键！）

```
Docker Desktop → Settings → Resources → WSL Integration

勾选：
☑ Enable integration with my default WSL distro（与默认 WSL 发行版集成）
☑ Ubuntu-22.04（在列表中找到并勾选）

点击 Apply & Restart
```

#### 3. 验证集成状态

```powershell
# 在 PowerShell 中查看 WSL 状态
wsl --list --verbose
# 应显示 Ubuntu-22.04 为 Running，且 Docker Desktop 正在运行

# 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 验证 Docker 命令可用（无需安装，自动连接 Docker Desktop）
docker --version
docker info
```

---

### 四、验证完整功能

#### 1. WSL2 内测试

```bash
# 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 测试命令
docker --version                    # 显示 Docker Desktop 版本
docker compose version              # 显示 compose 版本
docker info | grep "Name"           # 应显示 docker-desktop

# 拉取镜像（走 Docker Desktop 配置）
docker pull hello-world
docker run hello-world

# 查看镜像（与 Docker Desktop 共享）
docker images
```

#### 2. Docker Desktop 图形界面查看

```
打开 Docker Desktop 主界面 → Images
应能看到刚才拉取的 hello-world 镜像
```

#### 3. 文件共享测试

```bash
# WSL2 内创建项目目录
mkdir -p ~/docker-projects/test
cd ~/docker-projects/test

# 创建测试文件
cat > docker-compose.yml <<'EOF'
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
EOF

mkdir -p html
echo "<h1>Hello from WSL2 + Docker Desktop</h1>" > html/index.html

# 启动容器
docker compose up -d

# 在 Windows 浏览器访问 http://localhost:8080
# 应显示 "Hello from WSL2 + Docker Desktop"
```

---

### 五、配置国内镜像加速（解决拉取慢）

#### 方法 1：Docker Desktop 界面配置（推荐）

```
Docker Desktop → Settings → Docker Engine

编辑右侧 JSON，添加 registry-mirrors：

{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.nju.edu.cn"
  ]
}

点击 Apply & Restart
```

#### 方法 2：验证镜像源生效

```bash
# 在 WSL2 或 PowerShell 中执行
docker info | grep -A 10 "Registry Mirrors"
# 应显示配置的镜像源列表
```

---

### 六、日常使用 workflow

| 场景         | 操作方式                      |
| ------------ | ----------------------------- |
| 查看容器状态 | Docker Desktop 图形界面       |
| 快速命令操作 | WSL2 终端输入 docker 命令     |
| 开发调试     | WSL2 内编辑代码 + Docker 运行 |
| 镜像管理     | Docker Desktop 可视化操作     |
| 日志查看     | Docker Desktop 容器详情页     |
| 端口映射     | 自动映射到 Windows localhost  |

---

### 七、常见问题解决

| 问题                        | 解决方法                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Docker Desktop 启动失败     | 检查 Hyper-V 和 WSL2 是否启用                                |
| WSL2 内 docker 命令找不到   | 检查 Settings → Resources → WSL Integration 是否启用 Ubuntu-22.04 |
| 镜像拉取慢                  | 配置国内镜像源，或检查网络                                   |
| 端口无法访问                | 检查 Windows Defender 防火墙，或手动放行端口                 |
| WSL2 和 Docker Desktop 冲突 | 确保 WSL2 内没有单独运行 dockerd 进程                        |
| 磁盘空间不足                | Docker Desktop → Settings → Resources → Disk image size 调整 |

---

### 八、完全卸载（如需切换方案）

```powershell
# 1. 卸载 Docker Desktop
Windows 设置 → 应用 → 应用和功能 → Docker Desktop → 卸载

# 2. 清理 WSL2 集成
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data

# 3. 如需恢复纯 WSL2 Docker，重新安装
wsl -d Ubuntu-22.04
sudo apt update
sudo apt install -y docker.io
```

---

## 总结：推荐配置

```
Windows 11
├── WSL2（Ubuntu-22.04）
│   ├── 仅作为开发环境，编辑代码
│   └── 无需安装 Docker，命令自动连接 Docker Desktop
│
└── Docker Desktop
    ├── 提供 Docker 引擎（WSL2 后端）
    ├── 提供图形化管理界面
    ├── 管理所有镜像和容器
    └── 配置国内镜像加速
```

**优势**：

- ✅ 可视化界面管理容器
- ✅ WSL2 内命令无缝使用
- ✅ 文件共享和端口映射自动处理
- ✅ 性能最优（WSL2 后端而非 Hyper-V）

---

完成！你现在拥有 **带图形界面的 WSL2 + Docker 开发环境**！🎉






**是的，强烈建议删除！** 否则会产生冲突，导致不可预期的问题。

---

## 为什么必须删除 WSL2 内部的 Docker？

| 冲突场景                             | 后果                            |
| ------------------------------------ | ------------------------------- |
| 两个 Docker 守护进程同时运行         | 端口冲突、资源竞争、性能下降    |
| WSL2 内 `docker` 命令指向内部 Docker | 绕过 Docker Desktop，配置不统一 |
| 镜像存储位置不同                     | 重复占用磁盘空间，镜像不共享    |
| 网络配置冲突                         | 容器网络异常，端口映射失败      |

---

## 正确的迁移步骤

### 第一步：备份重要数据（如有）

```bash
# 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 导出重要镜像（如有需要保留的）
docker save -o ~/backup-images.tar 镜像名1 镜像名2

# 导出容器数据（如有需要）
docker export -o ~/backup-container.tar 容器名
```

### 第二步：完全卸载 WSL2 内部 Docker

```bash
# 停止 Docker 服务
sudo systemctl stop docker 2>/dev/null
sudo pkill -9 dockerd 2>/dev/null

# 卸载 Docker 软件包
sudo apt remove --purge -y docker-ce docker-ce-cli containerd.io docker-compose-plugin docker.io

# 删除所有 Docker 数据和配置
sudo rm -rf /var/lib/docker
sudo rm -rf /etc/docker
sudo rm -f /var/run/docker.sock /var/run/docker.pid

# 清理残留
sudo apt autoremove -y
sudo apt autoclean
```

### 第三步：验证清理完成

```bash
# 确认 docker 命令不存在
which docker
# 应显示：未找到命令 或空白

# 确认没有 docker 进程
ps aux | grep docker
# 应只显示 grep 自身，无 dockerd 进程

# 确认没有 docker 组（可选）
groups | grep docker
# 可为空，Docker Desktop 会重新配置
```

---

### 第四步：安装 Docker Desktop 并集成

```powershell
# 在 Windows 上安装 Docker Desktop
# 下载地址：https://www.docker.com/products/docker-desktop/

# 安装时勾选 "Use WSL 2 instead of Hyper-V"
# 安装完成后重启电脑
```

**配置 WSL2 集成：**

```
Docker Desktop → Settings → Resources → WSL Integration
☑ Enable integration with my default WSL distro
☑ Ubuntu-22.04
Apply & Restart
```

---

### 第五步：验证迁移成功

```bash
# 进入 WSL2 Ubuntu
wsl -d Ubuntu-22.04

# 验证使用的是 Docker Desktop
docker version
# Client 版本应与 Docker Desktop 一致

docker info | grep "Name"
# 应显示 docker-desktop

# 测试命令
docker run hello-world
```

---

## 如果不删除会怎样？

### 典型冲突现象

```bash
# WSL2 内执行 docker 命令，随机连接到不同实例
docker ps
# 有时显示空（连接 Desktop），有时显示容器（连接内部 Docker）

# 端口冲突示例
docker run -p 80:80 nginx
# 报错：端口已被占用（另一个 Docker 实例在用）
```

### 磁盘空间浪费

| 位置                                | 说明                                 |
| ----------------------------------- | ------------------------------------ |
| `/var/lib/docker` (WSL2 内部)       | 旧 Docker 镜像，不再使用但仍占用空间 |
| `docker-desktop-data` (WSL2 发行版) | Docker Desktop 镜像存储              |
| **结果**                            | 同一份镜像可能存两份，浪费数十 GB    |

---

## 特殊情况：临时保留（不推荐）

如果你**必须暂时保留** WSL2 内部 Docker（如过渡期间）：

```bash
# 重命名 docker 命令，避免冲突
sudo mv /usr/bin/docker /usr/bin/docker-old
sudo mv /usr/bin/docker-compose /usr/bin/docker-compose-old

# 这样 WSL2 内的 docker 命令会找不到
# 强制使用 Docker Desktop 提供的命令
```

**但这只是临时方案，最终还是要彻底清理。**

---

## 快速检查清单

```bash
# 在 WSL2 Ubuntu 中执行，确认清理完成

# ✅ 检查 1：无 docker 软件包
dpkg -l | grep docker
# 应无输出或显示已卸载

# ✅ 检查 2：无 docker 进程
ps aux | grep dockerd | grep -v grep
# 应无输出

# ✅ 检查 3：无 /var/lib/docker
ls -la /var/lib/docker 2>&1
# 应显示：没有那个文件或目录

# ✅ 检查 4：docker 命令来自 Docker Desktop
which docker
# 应显示：/usr/bin/docker（这是 Docker Desktop 挂载的）

# ✅ 检查 5：版本信息一致
docker version
# Client 和 Server 版本应相同，且与 Docker Desktop 界面显示一致
```

---

## 总结

| 问题                               | 答案                                          |
| ---------------------------------- | --------------------------------------------- |
| 必须删除 WSL2 内部 Docker 吗？     | **是的，必须删除**                            |
| 删除后会丢失镜像吗？               | 会，但可通过 `docker save` 备份后导入 Desktop |
| 删除后 WSL2 还能用 docker 命令吗？ | **能**，自动使用 Docker Desktop 的引擎        |
| 配置会继承吗？                     | 不会，需在 Docker Desktop 中重新配置镜像源    |

**一句话：彻底清理 WSL2 内部 Docker，安装 Docker Desktop，启用 WSL2 集成，获得最佳体验。** 🎯