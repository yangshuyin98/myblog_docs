# OpenClaw + Ollama 本地部署完整教程（WSL2 + Docker）

本教程将指导你在 **Windows 11 + WSL2 (Ubuntu)** 环境中，使用 Docker 部署 OpenClaw，并连接本地 Ollama 容器中的 `deepseek-r1:14b` 模型，实现完全本地化的 AI 代理服务。  
教程包含两种模型获取方式：**在线拉取**（简单）和 **挂载 Windows 已有模型**（省流量），并详细说明网络配置关键点。

---

## 环境准备

### 1. 确认 WSL2 已安装并配置
- Windows 11 已安装 WSL2，并已安装 Ubuntu 发行版。
- 在 Ubuntu 中，确保系统已更新：
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

### 2. 安装 Docker（在 WSL2 Ubuntu 中）
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```
**重要**：退出当前终端并重新打开，使组权限生效。

### 3. （可选）配置 WSL2 资源限制
在 Windows 用户目录（`C:\Users\你的用户名`）下创建 `.wslconfig` 文件，限制内存使用（例如 8GB）：
```ini
[wsl2]
memory=8GB
processors=4
swap=0
localhostForwarding=true
```
保存后，在 PowerShell 中执行 `wsl --shutdown` 重启 WSL2。

---

## 第一步：部署 Ollama 容器

### 1. 拉取 Ollama 镜像（使用国内加速源）
为了加快下载速度，使用华为云镜像源：
```bash
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ollama/ollama:0.10.1
```
拉取完成后，将其标记回原生镜像名称，便于后续命令简洁和兼容：
```bash
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ollama/ollama:0.10.1 ollama/ollama:0.10.1
```

### 2. 获取模型文件（二选一）

#### 选项 A：在线拉取模型（简单，约 9GB 数据）
启动临时容器拉取模型：
```bash
docker run -d --name ollama_temp ollama/ollama:0.10.1
docker exec -it ollama_temp ollama pull deepseek-r1:14b
```
等待下载完成后，将模型文件从临时容器复制出来（以便后续挂载）：
```bash
docker cp ollama_temp:/root/.ollama/models ./ollama_models
docker stop ollama_temp && docker rm ollama_temp
```
然后按选项 B 的方式挂载此目录。

#### 选项 B：挂载 Windows 本地已下载的模型（省流量）
如果你的 Windows 系统已通过 Ollama 下载过 `deepseek-r1:14b` 模型（通常位于 `C:\Users\<你的Windows用户名>\.ollama\models`），可以直接挂载到容器，避免重新下载。

**操作步骤**：
1. **确认 Windows 模型路径**  
   例如：`C:\Users\dell\.ollama\models`（请替换为你的实际用户名）。  
   该目录下应包含 `blobs` 和 `manifests` 子目录，以及模型相关文件。

2. **创建挂载点并启动 Ollama 容器**（使用 `-v` 挂载）：
   ```bash
   docker stop ollama 2>/dev/null; docker rm ollama 2>/dev/null
   docker run -d \
     -p 11434:11434 \
     -v /mnt/c/Users/dell/.ollama/models:/root/.ollama/models \
     --name ollama \
     ollama/ollama:0.10.1
   ```
   **注意**：将 `dell` 替换为你的 Windows 用户名。路径 `/mnt/c/Users/...` 是 WSL2 访问 Windows C 盘的固定格式。

3. **验证模型是否被识别**：
   ```bash
   docker exec ollama ollama list
   ```
   若输出包含 `deepseek-r1:14b`，则挂载成功。

### 3. 验证 Ollama 服务
无论采用哪种方式，最终确保 Ollama 容器正常运行，并可通过 API 访问：
```bash
curl http://localhost:11434/api/tags
```
应返回 JSON 格式的模型列表（可能为空，但至少返回 `{"models":[]}` 表示服务正常）。

---

## 第二步：部署 OpenClaw 容器

### 1. 拉取 OpenClaw 镜像（使用国内加速源）
```bash
docker pull sgccr.ccs.tencentyun.com/openclaw/openclaw:latest
```
（无需额外标记，直接使用此镜像名即可。）

### 2. 创建本地配置目录和工作空间
```bash
mkdir -p /home/你的Linux用户名/openclaw/workspace
```
注意：配置文件将存放在 `/root/.openclaw`（由 root 用户管理），无需手动创建，后续会自动生成。

### 3. 初始化 OpenClaw 配置
使用交互式命令生成配置文件（注意挂载路径）：
```bash
docker run -it --rm \
  -v /root/.openclaw:/data \
  sgccr.ccs.tencentyun.com/openclaw/openclaw:latest \
  openclaw setup
```
此命令会在 `/root/.openclaw` 下生成 `config.json`。过程中所有选项均可按回车使用默认值。

### 4. 修改配置文件，添加 Ollama 提供商
编辑配置文件：
```bash
sudo nano /root/.openclaw/config.json
```
将内容替换为以下完整配置（确保 JSON 格式正确）：

```json
{
  "gateway": {
    "mode": "local"
  },
  "models": {
    "providers": {
      "ollama": {
        "baseUrl": "http://localhost:11434/v1",
        "apiKey": "ollama",
        "api": "openai-completions",
        "models": [
          {
            "id": "deepseek-r1:14b",
            "name": "DeepSeek R1 14B",
            "reasoning": true,
            "input": ["text"],
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/deepseek-r1:14b"
      }
    }
  }
}
```
**重要说明**：

- 由于 OpenClaw 容器将使用 `--network host` 模式，容器内的 `localhost` 就是 WSL2 的 `localhost`，因此 `baseUrl` 必须设置为 `http://localhost:11434/v1`（**不能使用 `host.docker.internal`**）。
- 若你的 Ollama 容器是通过挂载 Windows 模型目录启动的，此配置同样适用。

保存退出。

### 5. 启动 OpenClaw 容器（使用 host 网络模式）
```bash
docker stop openclaw 2>/dev/null; docker rm openclaw 2>/dev/null
docker run -d \
  --name openclaw \
  --network host \
  -v /root/.openclaw:/data \
  -v /home/你的Linux用户名/openclaw/workspace:/workspace \
  sgccr.ccs.tencentyun.com/openclaw/openclaw:latest
```
**说明**：`--network host` 让容器直接使用宿主机网络，无需端口映射，容器内的 `127.0.0.1:18789` 即 WSL2 的本地地址。

### 6. 验证容器运行状态
```bash
docker ps
```
应看到 `openclaw` 状态为 `Up`。查看日志确认服务启动：
```bash
docker logs openclaw --tail 20
```
输出应包含 `listening on ws://127.0.0.1:18789`。

---

## 第三步：访问 OpenClaw Web 界面

### 1. 获取访问 Token
OpenClaw 自动生成了一个安全令牌，可通过以下命令查看：
```bash
sudo cat /root/.openclaw/config.json | grep token
```
输出类似：
```json
      "token": "2c9d8b56a272b85f7642f50e8327e7b36efd84bf2a4234fe"
```
记下这个 token 值。

### 2. 生成带 Token 的访问链接
```bash
docker exec -it openclaw openclaw dashboard
```
输出一个包含 token 的完整 URL，例如：
```
http://127.0.0.1:18789/#token=2c9d8b56a272b85f7642f50e8327e7b36efd84bf2a4234fe
```

### 3. 在 Windows 浏览器中打开
复制上述完整链接，在 Windows 浏览器中打开。即可直接进入 OpenClaw 主界面，无需再输入密码。

> **注意**：如果浏览器提示需要密码，请使用无痕模式或清除缓存后再次用带 token 的 URL 访问。

---

## 第四步：验证与使用

### 1. 确认 Ollama 模型已就绪
执行以下命令，确保 `deepseek-r1:14b` 存在于 Ollama 中：
```bash
docker exec ollama ollama list
```
若未列出，请参考第一步重新拉取或检查挂载。

### 2. 在 OpenClaw 界面中测试
在聊天框中输入任意问题，例如“用 Python 写一个快速排序算法”。OpenClaw 应调用本地 DeepSeek 模型并返回结果。

1.  **打开 Web 控制台**
    在 Windows 浏览器中访问 `http://localhost:18789`。你应该能看到 OpenClaw 的 Web 界面 。

2.  **发送测试消息**
    在聊天框中输入：“用 Python 写一个快速排序算法，并解释一下”。如果一切顺利，OpenClaw 会调用 DeepSeek-R1 模型进行推理并返回结果。





---

## 可选：升级 OpenClaw（如有新版本）
若提示有更新，可在容器内以 root 权限执行升级：
```bash
docker exec -it --user root openclaw openclaw update
```

---

## 常见问题排查

| 问题                                      | 解决方法                                                     |
| ----------------------------------------- | ------------------------------------------------------------ |
| OpenClaw 容器启动后立即退出               | 检查配置文件 JSON 格式是否正确，尤其是 `baseUrl` 和 `models` 数组。可用 `docker logs openclaw` 查看错误信息。 |
| 浏览器无法访问 `localhost:18789`          | 确保容器使用 `--network host` 模式，并检查 WSL2 IP（`ip addr show eth0`），尝试直接访问 `http://<WSL2-IP>:18789`。 |
| 登录页面反复提示密码                      | 使用带 token 的完整 URL 访问，或清理浏览器缓存。             |
| 模型调用失败，日志显示 `Connection error` | 检查 OpenClaw 配置文件中的 `baseUrl` 是否为 `http://localhost:11434/v1`（host 网络模式下必须使用 localhost）。 |
| 模型调用失败，日志显示 `model not found`  | 确认 Ollama 容器中是否存在模型：`docker exec ollama ollama list`。若不存在，请拉取或正确挂载。 |
| 挂载 Windows 模型目录后模型仍不可见       | 检查 Windows 路径是否正确（如 `/mnt/c/Users/dell/.ollama/models`），并确保目录权限可读。可尝试在 WSL2 中列出该目录：`ls -la /mnt/c/Users/dell/.ollama/models`。 |
| 容器内无法使用 `curl` 测试                | OpenClaw 容器基于 Debian，可用 `docker exec -it openclaw bash` 进入后安装：`apt update && apt install curl -y`。 |

---

## 总结
至此，你已成功在 WSL2 + Docker 环境中搭建了 OpenClaw 与 Ollama 的本地 AI 服务。所有组件均运行在容器中，配置持久化，安全隔离，且完全离线可用。

- **模型获取方式**：可根据网络情况选择在线拉取或挂载 Windows 已有模型。
- **网络关键点**：host 模式下，OpenClaw 需通过 `localhost:11434/v1` 访问 Ollama。

如需进一步自定义（如添加更多模型、调整网关设置），可参考 OpenClaw 官方文档。







1.  

### **故障排查：针对 Docker 环境的特别指南**

如果在 WSL2 + Docker 组合中遇到问题，这里有一份排错清单：

| 现象                                                      | 可能原因                                                     | 排查命令/解法                                                |
| :-------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **浏览器无法访问 `localhost:18789`**                      | 容器未运行，或端口映射错误                                   | `docker ps` 查看容器状态；`docker logs openclaw` 查看日志    |
| **OpenClaw 报错 `Unknown model: ollama/deepseek-r1:14b`** | 配置文件中的模型 ID 与 Ollama 中的不一致，或 `baseUrl` 配置错误 | 1. 在 WSL2 中执行 `ollama list` 确认模型 ID 完全一致。<br>2. 在容器内 `curl http://host.docker.internal:11434/api/tags` 测试是否能连通 Ollama 。 |
| **模型响应极慢或超时**                                    | WSL2 资源分配不足，或 14B 模型对内存压力大                   | 1. 检查 `.wslconfig` 中的内存限制是否过小。<br>2. 考虑使用 `deepseek-r1:7b` 或 `deepseek-r1:8b` 量化版本来降低资源消耗。 |
| **容器日志报连接拒绝**                                    | Ollama 服务没运行，或 `host.docker.internal` 不通            | 在 WSL2 中执行 `systemctl status ollama` 确保 Ollama 在运行。 |









# 

**不需要删除 Windows 版，但需要在 WSL2 中再安装一份 Linux 版的 Ollama。**

这两个环境是相互独立的，它们可以（也应该）共存。下面我为你详细解释原因，并提供具体的操作建议。

### 为什么不能直接用 Windows 版 Ollama？

这主要源于 WSL2 和 Docker 的工作原理。简单来说，你的 OpenClaw 运行在 WSL2 的 Docker 容器里，它是个“纯粹的 Linux 程序”，无法直接调用 Windows 上的任何软件。就像你不能在安卓手机上直接运行 iPhone 的 App 一样。

具体来说，有三个核心障碍：

1.  **架构隔离**：WSL2 是一个完整的 Linux 虚拟机，拥有自己独立的 Linux 内核和系统环境。运行在其中的 Docker 容器，本质上是这个 Linux 系统里的“隔离进程”。它只能看到 Linux 内核和网络，无法感知到 Windows 宿主机的存在，更无法直接调用 Windows 上的可执行程序 。

2.  **网络与路径不通**：虽然 WSL2 和 Windows 可以共享 `localhost`，但 OpenClaw 容器通过 `http://host.docker.internal:11434` 访问的是 **WSL2 自身**的 11434 端口，而不是 Windows 的端口 。此外，Linux 容器也完全无法理解 `C:\Users\...` 这种 Windows 路径。

3.  **服务独立性**：Windows 版 Ollama 是作为一个 Windows 服务在运行，而 WSL2 里的 Ollama 则是一个 Linux 服务（或前台进程）。它们是两个完全独立的软件实例，各自管理自己的模型文件 。







# Ollama错误解答

你提的这个问题非常及时，正好可以用你找到的国内镜像来解决网络问题。根据你提供的链接信息，我来为你详细解答。

### **关于使用华为云镜像安装的解答**

**答案是：完全可以，而且速度会比直接拉取快非常多。**

你提供的 `swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ollama/ollama:0.10.1` 是一个位于华为云（北京四区域）的**国内加速镜像**。直接使用这个地址拉取，可以避开国际带宽瓶颈，下载2.27GB的镜像通常只需几分钟，体验会非常顺畅。

### **具体操作步骤与注意事项**

根据你提供的链接内容，正确的安装命令和你设想的略有不同，需要分两步走：

1.  **第一步：拉取镜像（使用国内加速地址）**
    在你的 **WSL2 Ubuntu 终端**中，直接执行你找到的拉取命令：
    
    ```bash
    docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ollama/ollama:0.10.1
    ```
    *   **速度预期**：如链接中所述，此镜像大小为 **2.27GB**。使用国内镜像源，在你家正常宽带下，下载完成预计在 **2-5分钟** 左右。
    
2.  **第二步：重新标记镜像（方便后续使用）**
    为了后续命令的简洁和兼容性，建议将其标记回原生的镜像名称：
    
    ```bash
    docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ollama/ollama:0.10.1 ollama/ollama:0.10.1
    ```
    这样，之后你就可以直接用 `ollama/ollama:0.10.1` 来引用它了。
    
3.  **第三步：运行容器**
    标记完成后，就可以使用你熟悉的命令来启动容器了：
    
    ```bash
    docker run -d -p 11434:11434 --name ollama ollama/ollama:0.10.1
    ```
    **关键细节**：链接中的镜像信息显示，其默认的 `ENTRYPOINT` 是 `["/bin/ollama"]`，默认 `CMD` 是 `["serve"]`。因此，直接运行上述命令就会正确启动 Ollama 服务并监听在 `0.0.0.0:11434`。

### **补充建议与后续连接**

1. **验证容器状态**
   运行后，可以用 `docker ps` 查看容器是否正常运行，并通过 `docker logs ollama` 查看启动日志。

2. **与 OpenClaw 的连接**
   这个容器化的 Ollama 运行后，你的 OpenClaw 容器可以通过 **`http://host.docker.internal:11434`** 来访问它（因为两个容器在同一个 Docker 网络环境下，Ollama 监听在 `0.0.0.0`）。这正是我们上一轮教程中配置的地址。

3. 模型文件的位置

   你之前已经下载了模型，完全没必要在容器内重新下载一次。可以按以下步骤操作：

   1. **停止并删除当前容器**（因为创建时没有挂载卷）：

      ```bash
      docker stop ollama
      docker rm ollama
      ```

   2. **重新运行容器，并挂载你的模型目录**：

      ```bash
      #拉取模型
      docker exec -it ollama ollama pull deepseek-r1:14b
      #挂载模型
      docker run -d \
        -p 11434:11434 \
        -v /mnt/c/Users/你的Windows用户名/.ollama/models:/root/.ollama/models \
        --name ollama \
        ollama/ollama:0.10.1
      ```

      （请将 `你的Windows用户名` 替换为实际用户名）

   3. **验证模型是否被识别**：

      ```bash
      拉取完成后，列出模型确认：
      docker exec -it ollama ollama list
      ```

      如果之前模型文件完整，现在应该能看到 `deepseek-r1:14b` 已存在。

   



你的操作完全正确，`ollama` 容器已经成功运行了！你遇到的困惑其实是一个很常见的误解：`ollama list` 这个命令需要在 **容器内部** 执行，而不是在 WSL 宿主机上。

### **为什么 `ollama list` 会报错？**
因为你是在 WSL 的终端里直接输入 `ollama list`，但此时 `ollama` 这个命令行工具并没有安装在你本地的 Ubuntu 系统里，它只存在于你刚刚启动的 Docker 容器中。所以系统会提示 `command not found`，这是完全正常的。

### **如何确认 `ollama` 容器是否真的在运行？**
你已经成功运行了容器，并且得到了容器 ID `f5123e24f9b4`。要查看它的运行状态，请执行：
```bash
docker ps
```
你应该能看到类似这样的输出，其中 `STATUS` 列显示 `Up` 开头（比如 `Up 2 minutes`），表示容器正在后台健康运行：



### **如何与运行中的 `ollama` 容器交互？**
你有两种方式可以在容器内执行 `ollama` 命令：

**方法一：使用 `docker exec` 直接执行命令（最常用）**

```bash
# 列出容器内的模型
docker exec -it ollama ollama list

# 拉取模型（例如 deepseek-r1:14b）
docker exec -it ollama ollama pull deepseek-r1:14b

# 进入容器内部的交互式 Shell（可以连续执行多条命令）
docker exec -it ollama bash
# 进入容器后，就可以直接运行 ollama list、ollama run 等命令了
```
*   `-it` 参数让你能与容器进行交互（比如输入命令、看到输出）。







 根据你的 RTX A4000 16GB 显存，以下是推荐模型及配置建议：

---

## 推荐模型（16GB 显存优化）

| 模型                | 大小  | 显存占用 | 特点                       | 用途                    |
| ------------------- | ----- | -------- | -------------------------- | ----------------------- |
| **qwen2.5:14b**     | 9GB   | ~10-12GB | 支持 tools、中文强、速度快 | **首选，Agent 推荐**    |
| **qwen2.5:7b**      | 4.7GB | ~6-8GB   | 支持 tools、轻量快速       | 备选，资源紧张时用      |
| **llama3.1:8b**     | 4.7GB | ~6-8GB   | 支持 tools、英文强         | 英文场景首选            |
| **mistral:7b**      | 4.1GB | ~6GB     | 支持 tools、代码好         | 编程辅助                |
| **deepseek-r1:14b** | 9GB   | ~10-12GB | 推理强、**不支持 tools**   | 纯对话/推理（需改配置） |

---

## OpenClaw 配置建议

### 方案 A：功能完整版（推荐）
```bash
# 拉取支持 tools 的模型
docker exec ollama ollama pull qwen2.5:14b

# 修改 OpenClaw Agent 配置
# 模型名: qwen2.5:14b
# Tools: 启用
```

### 方案 B：轻量快速版
```bash
docker exec ollama ollama pull qwen2.5:7b
# 或
docker exec ollama ollama pull llama3.2:3b  # 极速，基本 tools 支持
```

### 方案 C：继续使用 DeepSeek-R1
如果必须用 `deepseek-r1:14b`：
1. 进入 OpenClaw Dashboard → Agent 配置
2. **关闭 Tools/Functions 功能**
3. 或使用 `deepseek-r1:8b`（5GB）更轻量

---

## 显存优化参数（Ollama）

创建 `Modelfile` 优化推理：
```dockerfile
FROM qwen2.5:14b

# 降低上下文窗口节省显存
PARAMETER num_ctx 4096

# 使用量化版本（如需要）
# FROM qwen2.5:14b-q4_K_M
```

```bash
# 构建优化版本
docker exec -it ollama sh -c "cat > /tmp/Modelfile << 'EOF'
FROM qwen2.5:14b
PARAMETER num_ctx 4096
EOF"
docker exec ollama ollama create qwen2.5:14b-optimized -f /tmp/Modelfile
```

---

## 快速命令总结

```bash
# 1. 清理旧模型（可选）
docker exec ollama ollama rm deepseek-r1:14b

# 2. 拉取推荐模型
docker exec ollama ollama pull qwen2.5:14b

# 3. 验证
docker exec ollama ollama list

# 4. 测试模型
docker exec ollama ollama run qwen2.5:14b "你好，请介绍自己"
```

---

## 选择建议

| 场景                     | 推荐模型                           |
| ------------------------ | ---------------------------------- |
| **Agent/Tools 功能完整** | `qwen2.5:14b`                      |
| 中文优先 + 复杂任务      | `qwen2.5:14b`                      |
| 英文优先 + 通用任务      | `llama3.1:8b`                      |
| 编程/代码生成            | `mistral:7b` 或 `qwen2.5-coder:7b` |
| 极致速度 + 低延迟        | `llama3.2:3b`                      |

**最终推荐：qwen2.5:14b** — 在你的 A4000 上能流畅运行，且完全兼容 OpenClaw 的 tools 功能。









#   在 OpenClaw Dashboard 中关闭 Tools/Functions 功能的具体位置：

---

## 配置路径

### 1. 进入 Dashboard
```bash
docker exec -it openclaw openclaw dashboard
# 复制输出的完整 URL（含 token）到浏览器
```

### 2. 找到 Agent 配置
```
左侧导航栏 → Agents → 点击你的 Agent 名称（如 main）
```

或直接在浏览器访问：
```
http://127.0.0.1:18789/agents/main/configure#token=你的token
```

### 3. 关闭 Tools 功能

在 Agent 配置页面找到以下选项：

| 配置项                | 设置                 |
| --------------------- | -------------------- |
| **Model**             | `deepseek-r1:14b`    |
| **Tools / Functions** | ❌ **关闭 / Disable** |
| **Function Calling**  | ❌ **关闭 / Disable** |

界面大致位置：
```
┌─────────────────────────────────────┐
│  Agent Configuration                │
├─────────────────────────────────────┤
│  Name: main                         │
│  Model: [deepseek-r1:14b    ▼]     │
│                                     │
│  Capabilities:                      │
│  ☑️ Chat                            │
│  ☐ Tools/Functions  ← 取消勾选     │
│  ☐ Code Interpreter                 │
│                                     │
│  [Save Changes]                     │
└─────────────────────────────────────┘
```

---

## 如果找不到该选项

### 方法 A：通过环境变量强制禁用（推荐）
```bash
# 停止容器
docker stop openclaw

# 重新创建，添加环境变量禁用 tools
docker run -d \
  --name openclaw \
  --restart always \
  --network host \
  -e OPENCLAW_AGENT_MAIN_TOOLS_ENABLED=false \
  -e OPENCLAW_AGENT_MAIN_MODEL=deepseek-r1:14b \
  sgccr.ccs.tencentyun.com/openclaw/openclaw:latest
```

### 方法 B：修改配置文件
```bash
# 进入容器
docker exec -it openclaw sh

# 找到配置文件（通常在）
cat /etc/openclaw/agents.yaml
# 或
cat /app/config/agents.yaml

# 编辑你的 Agent 配置，设置
# tools: false
# function_calling: false
```

### 方法 C：创建新的 DeepSeek-Only Agent
在 Dashboard 中：
```
Agents → [+] Create New Agent
├── Name: deepseek-chat
├── Model: deepseek-r1:14b
├── Tools: 不勾选任何工具
└── Save
```

然后使用新 Agent 的会话：
```
http://127.0.0.1:18789/chat?session=agent:deepseek-chat:main
```

---

## 验证配置生效

修改后测试：
```bash
# 查看日志确认无 tools 调用
docker logs openclaw --tail 20 -f
```

正常应该不再出现：
```
400 registry.ollama.ai/library/deepseek-r1:14b does not support tools
```

而是正常响应对话。

---

## 快速修复命令（一键方案）

```bash
# 1. 停止并删除旧容器
docker stop openclaw && docker rm openclaw

# 2. 重新创建，预设 deepseek-r1:14b 且禁用 tools
docker run -d \
  --name openclaw \
  --restart always \
  --network host \
  -e OPENCLAW_DEFAULT_MODEL=deepseek-r1:14b \
  -e OPENCLAW_TOOLS_ENABLED=false \
  sgccr.ccs.tencentyun.com/openclaw/openclaw:latest

# 3. 获取新 Dashboard URL
docker exec -it openclaw openclaw dashboard
```

如果仍有问题，请提供 Dashboard 的截图或描述左侧菜单结构，我可以更精确地指导位置。