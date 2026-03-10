太棒了，既然你的 WSL2 环境已经就绪，我们就可以直接进入最核心的部署环节。选择“WSL2 + Docker”这个组合，意味着你将获得一个**环境极其干净、未来升级维护几乎零成本、且安全性最佳**的 AI 专属环境 。

下面是一份为你定制的、从零到一的详细教程，请打开你的 WSL2 Ubuntu 终端，我们逐条执行。

### **第一阶段：在 WSL2 (Ubuntu) 中安装 Docker 环境**

既然 WSL2 已装好，我们首先需要让 Ubuntu 获得“容器化”能力。

1.  **安装 Docker**
    在 Ubuntu 终端中，执行官方一键安装脚本，这是最干净的方式：
    ```bash
    # 下载并运行 Docker 安装脚本
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    ```
    
2.  **将当前用户加入 Docker 组**
    这一步是为了让你执行 `docker` 命令时不再需要每次都加 `sudo`，省去后续麻烦。
    ```bash
    sudo usermod -aG docker $USER
    ```
    **关键操作**：执行完后，需要**完全退出 WSL2 终端**（可以关掉所有标签页），然后重新打开一个新的 Ubuntu 终端，这个组权限才会生效。你可以用 `docker ps` 测试一下是否还需要 `sudo`。

3.  **配置 WSL2 资源限制（防爆内存）**
    虽然你已安装 WSL2，但为了防止 Docker 和 AI 模型吃掉所有内存导致 Windows 卡顿，建议在 Windows 侧加固一下配置。
    *   在 Windows 的 `C:\Users\你的Windows用户名\` 目录下，新建或编辑文件 **`.wslconfig`**。
    *   写入以下内容（以限制内存 8GB 为例）：
        ```ini
        [wsl2]
        memory=8GB
        processors=4
        swap=0
        localhostForwarding=true
        ```
    *   保存文件后，在 **Windows PowerShell (管理员)** 中运行 `wsl --shutdown` 彻底重启 WSL，然后重新打开 Ubuntu 终端使配置生效 。

### **第二阶段：在 WSL2 中部署 Ollama 与 DeepSeek-R1 模型**

OpenClaw 的大脑需要提前准备好。

1.  **安装 Ollama**
    Ollama 官方提供了 Linux 一键安装脚本，在 Ubuntu 终端中运行：
    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

2.  **拉取 DeepSeek-R1 14B 模型**
    ```bash
    ollama pull deepseek-r1:14b
    ```
    *   模型大小约 9GB，下载需要一点时间，耐心等待即可 。
3.  **确认 Ollama 服务运行状态**
    Ollama 安装后会默认作为后台服务运行。执行以下命令，确保它正在监听：
    ```bash
    systemctl status ollama
    ```
    如果没运行，可以手动启动：`systemctl start ollama`。

### **第三阶段：使用 Docker 部署 OpenClaw**

这是最核心的步骤，我们将拉取 OpenClaw 的官方 Docker 镜像并运行它。Docker 方式的最大好处是，OpenClaw 运行在一个与系统隔离的容器中，即使它被赋予极高权限，也无法逃逸到你的 WSL2 或 Windows 宿主机，非常安全 。

1.  **拉取 OpenClaw Docker 镜像**
    ```bash
    docker pull openclaw/openclaw:latest
    ```
    
2.  **创建本地配置目录**
    我们需要将容器内的配置和数据目录挂载到 WSL2 本地，这样数据不会因为容器删除而丢失。
    ```bash
    mkdir -p ~/.openclaw
    mkdir -p ~/openclaw/workspace
    ```
    *   `~/.openclaw`：存放配置文件 `openclaw.json`。
    *   `~/openclaw/workspace`：这是 AI 代理默认的工作空间，它可以在这里读写文件 。

3.  **启动 OpenClaw 容器**
    这是最关键的 `docker run` 命令，我们拆解一下参数的含义：
    ```bash
    docker run -d \
      --name openclaw \
      --restart unless-stopped \
      -p 18789:18789 \
      -v ~/.openclaw:/root/.openclaw \
      -v ~/openclaw/workspace:/workspace \
      -e LOG_LEVEL=INFO \
      openclaw/openclaw:latest
    ```
    *   `-d`：后台运行。
    *   `--name openclaw`：给容器起个名字。
    *   `--restart unless-stopped`：如果 Docker 重启或容器崩溃，自动重启（除非手动停止），确保 7x24 小时在线。
    *   `-p 18789:18789`：将容器的 18789 端口映射到 WSL2 的 18789 端口（也就是映射到了 Windows 的 `localhost:18789`），方便你之后用浏览器访问 。
    *   `-v ~/.openclaw:/root/.openclaw`：挂载配置目录。
    *   `-v ~/openclaw/workspace:/workspace`：挂载工作空间目录 。

4.  **验证容器是否运行**
    ```bash
    docker ps
    ```
    你应该能看到名为 `openclaw` 的容器状态为 `Up`。

### **第四阶段：连接 OpenClaw 与本地 Ollama（核心配置）**

OpenClaw 容器已经运行，但它还不知道去哪找 DeepSeek 模型。我们需要修改它的配置文件。

1.  **进入 OpenClaw 容器内部进行配置（推荐）**
    虽然可以直接修改挂载出来的 `~/.openclaw/openclaw.json`，但为了版本兼容性，进入容器执行 `openclaw onboard` 向导是官方推荐的标准做法 。
    ```bash
    # 进入正在运行的容器
    docker exec -it openclaw bash
    ```

2.  **运行 Onboarding 向导**
    在容器内部的命令行中，执行：
    ```bash
    openclaw onboard --install-daemon
    ```
    *   **向导注意点**：
        *   当询问 **"Which model provider would you like to use?"** 时，可以先选一个占位，因为我们要手动配置 Ollama，后面会覆盖。
        *   当询问 **"Do you want to install the Gateway as a systemd service?"** 时，由于我们在容器内，`systemd` 不可用，选择 **No**。OpenClaw 会以前台进程运行（这正是 Docker 需要的模式）。
    *   完成向导的初步问题后，它会生成基础配置文件。

3.  **手动编辑配置文件（连接 Ollama 的关键）**
    在容器内，编辑配置文件：
    ```bash
    nano /root/.openclaw/openclaw.json
    ```
    将其内容修改或替换为以下 JSON 配置。这段代码的核心作用是告诉 OpenClaw 如何调用你 WSL2 宿主机的 Ollama 服务。
    ```json
    {
      "models": {
        "providers": {
          "ollama": {
            "baseUrl": "http://host.docker.internal:11434/v1",
            "apiKey": "ollama",
            "api": "openai-completions",
            "models": [
              {
                "id": "deepseek-r1:14b",
                "name": "DeepSeek R1 14B",
                "reasoning": true,
                "input": ["text"],
                "cost": {
                  "input": 0,
                  "output": 0
                },
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
    **配置解析**：
    *   `baseUrl`：`http://host.docker.internal:11434/v1` 这是 Docker 环境访问宿主机（你的 WSL2）的固定地址，**末尾的 `/v1` 绝对不可少**，因为它模拟的是 OpenAI 兼容 API 的路径 。
    *   `api`: 必须填写 `openai-completions` 。
    *   `models` 数组：显式注册了这个模型，这能避免 OpenClaw 因无法识别模型 ID 而报错 "Unknown model" 。

4.  **退出容器**
    ```bash
    exit
    ```

5.  **重启 OpenClaw 容器使配置生效**
    ```bash
    docker restart openclaw
    ```

### **第五阶段：验证与使用**

1.  **打开 Web 控制台**
    在 Windows 浏览器中访问 `http://localhost:18789`。你应该能看到 OpenClaw 的 Web 界面 。

2.  **发送测试消息**
    在聊天框中输入：“用 Python 写一个快速排序算法，并解释一下”。如果一切顺利，OpenClaw 会调用 DeepSeek-R1 模型进行推理并返回结果。

### **故障排查：针对 Docker 环境的特别指南**

如果在 WSL2 + Docker 组合中遇到问题，这里有一份排错清单：

| 现象                                                      | 可能原因                                                     | 排查命令/解法                                                |
| :-------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **浏览器无法访问 `localhost:18789`**                      | 容器未运行，或端口映射错误                                   | `docker ps` 查看容器状态；`docker logs openclaw` 查看日志    |
| **OpenClaw 报错 `Unknown model: ollama/deepseek-r1:14b`** | 配置文件中的模型 ID 与 Ollama 中的不一致，或 `baseUrl` 配置错误 | 1. 在 WSL2 中执行 `ollama list` 确认模型 ID 完全一致。<br>2. 在容器内 `curl http://host.docker.internal:11434/api/tags` 测试是否能连通 Ollama 。 |
| **模型响应极慢或超时**                                    | WSL2 资源分配不足，或 14B 模型对内存压力大                   | 1. 检查 `.wslconfig` 中的内存限制是否过小。<br>2. 考虑使用 `deepseek-r1:7b` 或 `deepseek-r1:8b` 量化版本来降低资源消耗。 |
| **容器日志报连接拒绝**                                    | Ollama 服务没运行，或 `host.docker.internal` 不通            | 在 WSL2 中执行 `systemctl status ollama` 确保 Ollama 在运行。 |

这份教程为你构建了一个完全隔离、干净且易于维护的 AI 代理环境。如果你在配置过程中遇到任何具体的报错，可以随时把错误信息贴出来，我们继续分析。