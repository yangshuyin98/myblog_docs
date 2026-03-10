这是一份为你定制的、在 **WSL2 (Ubuntu)** 中安装 OpenClaw，并让它调用本地 **Ollama** 中的 **`deepseek-r1:14b`** 模型的详细教程。

选择 WSL2 方案，意味着你将为你的 AI 员工提供一个更稳定、更安全、功能完整的“家”。虽然前期配置比纯 Windows 稍显复杂，但它能完美避开前一种方案可能遇到的权限、服务和兼容性问题。

在开始前，请确保你的电脑满足运行 **14B 模型的基本硬件要求：至少 32GB 系统内存（RAM）**，否则模型加载会失败或导致系统卡顿。

### **第一阶段：在 Windows 中准备 WSL2 环境**

这个阶段的目标是在你的 Windows 系统上搭建一个轻量、高效的 Linux 子系统。

1.  **安装 WSL2 和 Ubuntu**
    *   右键点击“开始”菜单，选择 **“Windows PowerShell (管理员)”**。
    *   在 PowerShell 中输入以下命令并回车，这将自动安装 WSL2 并为你安装 Ubuntu 最新 LTS 版本（如 24.04）：
        ```powershell
        wsl --install
        ```
    *   安装完成后，**重启你的电脑**。重启后，系统可能会自动弹出一个控制台窗口，要求你为 Ubuntu 设置一个新的用户名和密码。这个密码可以与你 Windows 的登录密码不同。

2.  **为 WSL2 设置内存上限（关键优化）**
    *   WSL2 默认会“吃掉”你一半以上的内存，如果不加限制，可能会导致 Windows 本体卡顿。我们需要给它戴上“紧箍咒”。
    *   在 Windows 文件资源管理器的地址栏输入 `C:\Users\你的Windows用户名\` 并回车，进入你的用户文件夹。
    *   新建一个文件，命名为 **`.wslconfig`**（注意文件名前面有一个点）。用记事本打开它，粘贴以下内容后保存：
        ```ini
        [wsl2]
        memory=8GB
        processors=4
        swap=0
        localhostForwarding=true
        ```
        *   `memory`：建议设置为 `8GB` 或 `6GB`，为 Windows 和其他程序留足空间。
        *   `processors`：根据你的 CPU 核心数调整。

3.  **启用 systemd（OpenClaw 服务的基石）**
    *   OpenClaw 的网关（Gateway）服务需要 Linux 的 `systemd` 来管理进程。WSL2 默认没有开启它，需要手动配置。
    *   打开刚安装好的 **Ubuntu 终端**（可以在开始菜单中找到）。
    *   在 Ubuntu 终端中，依次运行以下命令：
        ```bash
        # 创建并编辑 wsl.conf 文件
        sudo tee /etc/wsl.conf > /dev/null <<'EOF'
        [boot]
        systemd=true
        EOF
        ```
    *   然后，**必须回到 Windows PowerShell（管理员）**，运行以下命令来彻底关闭 WSL2 虚拟机，使配置生效：
        ```powershell
        wsl --shutdown
        ```
    *   重新打开 Ubuntu 终端。之后可以用 `systemctl list-units --type=service` 命令验证 `systemd` 是否已启用。

### **第二阶段：在 WSL2（Ubuntu）中安装 OpenClaw**

环境准备好了，现在进入 Ubuntu 系统内部安装主角 OpenClaw。

1.  **更新系统并安装基础依赖**
    *   在 Ubuntu 终端中，先更新软件包列表并安装必要的工具：
        ```bash
        sudo apt update && sudo apt upgrade -y
        sudo apt install -y git nodejs npm python3 python3-pip python3-venv build-essential curl
        ```
    *   **确保 Node.js 版本 >= 22**。如果 `apt` 安装的版本过低，可以通过 `nvm`（Node Version Manager）来安装最新版：
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        source ~/.bashrc
        nvm install --lts
        node --version # 确认版本
        ```

2.  **执行 OpenClaw 一键安装脚本**
    *   在 Ubuntu 终端中，直接运行官方安装脚本，这是最推荐的安装方式：
        ```bash
        curl -fsSL https://openclaw.ai/install.sh | bash
        ```
    *   安装完成后，运行 `openclaw --version` 来验证是否安装成功。

3.  **初始化配置并安装网关服务**
    *   运行 Onboarding 向导，这是 OpenClaw 的配置工具。它会引导你完成初始设置：
        ```bash
        openclaw onboard --install-daemon
        ```
    *   在向导过程中：
        *   当询问 **"Which model provider would you like to use?"** 时，可以先随便选一个，因为我们后面会手动配置 Ollama。
        *   当询问 **"Do you want to install the Gateway as a systemd service?"** 时，务必选择 **Yes**。这是让 OpenClaw 能在后台 7x24 小时运行的关键。
    *   安装完成后，检查网关服务状态：
        ```bash
        systemctl --user status openclaw-gateway.service
        openclaw status
        ```

### **第三阶段：在 WSL2（Ubuntu）中部署 Ollama 和 DeepSeek-R1 模型**

现在，为 OpenClaw 安装“大脑”。

1.  **安装 Ollama**
    *   在 Ubuntu 终端中，运行 Ollama 的一键安装脚本：
        ```bash
        curl -fsSL https://ollama.com/install.sh | sh
        ```

2.  **拉取 DeepSeek-R1 14B 模型**
    *   在 Ubuntu 终端中，执行拉取命令。模型大小约 9GB，下载时间取决于你的网络速度：
        ```bash
        ollama pull deepseek-r1:14b
        ```

3.  **验证模型可用性**
    *   下载完成后，可以直接运行模型进行测试：
        ```bash
        ollama run deepseek-r1:14b
        ```
    *   在 `>>>` 提示符后输入“你好”，如果能正常回复，说明模型就绪。输入 `/bye` 退出。

### **第四阶段：连接 OpenClaw 与 Ollama（核心配置）**

最后也是最关键的一步，配置 OpenClaw，让它知道如何调用 Ollama 里的 DeepSeek 模型。

1.  **找到并编辑 OpenClaw 配置文件**
    *   配置文件位于你的 Ubuntu 用户主目录下：`~/.openclaw/openclaw.json`。用 `nano` 或 `vim` 编辑它：
        ```bash
        nano ~/.openclaw/openclaw.json
        ```

2.  **添加 Ollama 作为模型提供商**
    *   将文件内容替换或修改为以下 JSON 配置。这段代码的核心作用是：在 `providers` 中注册一个名叫 `ollama` 的模型服务商，告诉 OpenClaw 它的地址（`baseUrl`）和通信协议（`api`），然后在 `agents` 中指定默认使用的模型就是 `ollama` 服务商下的 `deepseek-r1:14b` 模型。
        ```json
        {
          "models": {
            "providers": {
              "ollama": {
                "baseUrl": "http://localhost:11434/v1",
                "api": "openai-completions"
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
        **特别注意**：`baseUrl` 的地址 `http://localhost:11434/v1` 末尾的 **`/v1` 必不可少**，因为它模拟的是 OpenAI 兼容的 API 路径。`api` 字段必须填写 `openai-completions`。

3.  **重启 OpenClaw 网关使配置生效**
    *   在 Ubuntu 终端中，执行以下命令来重启网关服务：
        ```bash
        systemctl --user restart openclaw-gateway.service
        ```

### **第五阶段：验证与排错**

1.  **打开 Web 控制台进行测试**
    *   在 Ubuntu 终端中运行 `openclaw dashboard`，它应该会自动在 Windows 浏览器中打开一个页面，地址通常是 `http://127.0.0.1:18789`。
    *   在聊天框中输入一个问题，例如：“用 Python 写一个快速排序算法”。如果 OpenClaw 能基于 DeepSeek 模型返回正确的代码，那么恭喜你，大功告成！

2.  **故障排查（来自实战的“踩坑”经验）**
    *   **问题：** 配置完成后，OpenClaw 依然报错 `Unknown model: ollama/deepseek-r1:14b`。
        *   **原因：** OpenClaw CLI（命令行界面）的版本和后台运行的网关（Gateway）服务版本不一致。你升级了 CLI，但后台服务还是旧版本。
        *   **解法：** 这是 WSL 环境中最容易遇到的坑。需要手动重启网关服务，并确保它指向新版本的路径。
            ```bash
            # 1. 停掉旧进程
            systemctl --user stop openclaw-gateway.service
            pkill -9 node
            
            # 2. 找到新版本的真实路径（例如 /home/你的用户名/.npm-global/bin/openclaw）
            which openclaw
            
            # 3. 重启服务（通常简单的 restart 就能解决）
            systemctl --user restart openclaw-gateway.service
            
            # 4. 使用 --deep 参数检查版本是否一致
            openclaw status --deep
            ```
    *   **问题：** 启动服务时提示 `MissingEnvVarError`。
        *   **原因：** 配置文件中可能存在 `${变量名}` 这种环境变量引用，但该变量未被赋值，导致 CLI 无法启动。
        *   **解法：** 可以先用 `openclaw config set env.变量名 "值"` 来设置，或者更直接地，用文本编辑器打开 `~/.openclaw/openclaw.json`，将 `${...}` 替换成实际值，等 CLI 复活后再用命令注入敏感信息。
    *   **问题：** Ollama 模型响应慢。
        *   **原因：** `deepseek-r1:14b` 对硬件要求较高，或 WSL2 分配的资源不足。
        *   **解法：** 检查 `.wslconfig` 中的内存设置，确保给 WSL2 分配了足够的内存（如 8-10GB）。也可以考虑使用更小的模型，如 `deepseek-r1:8b` 或 `deepseek-r1:7b`，作为日常使用的平衡点。

### **常用命令速查表**

为了方便日后维护，这里整理了一些在 WSL2 中常用的命令：

| 操作                  | 命令 (在 WSL2 Ubuntu 终端中)                                 | 作用                                     |
| :-------------------- | :----------------------------------------------------------- | :--------------------------------------- |
| **OpenClaw 网关**     | `systemctl --user status/stop/start/restart openclaw-gateway.service` | 管理 OpenClaw 后台服务                   |
| **OpenClaw 诊断**     | `openclaw status --deep`                                     | 查看详细状态，排查版本不一致等问题       |
| **OpenClaw 健康检查** | `openclaw doctor`                                            | 对环境和配置进行全面检查                 |
| **Ollama 模型管理**   | `ollama list`                                                | 查看本地已下载的模型列表                 |
| **Ollama 运行状态**   | `ollama ps`                                                  | 查看当前正在运行的模型                   |
| **WSL 全局重启**      | 在 **Windows PowerShell** 中运行 `wsl --shutdown`            | 彻底关闭 WSL2 虚拟机，解决大部分疑难杂症 |

这份教程结合了官方推荐路径和社区实战经验，希望能帮助你顺利地在 WSL2 中搭建起属于自己的、完全本地化运行的 AI 助理。如果遇到其他问题，随时可以再来交流。





这是一个非常棒的问题，它触及了现代开发环境架构的核心。直接说结论：**是的，在 WSL2 中使用 Docker 运行 OpenClaw，比单纯在 WSL2 中直接安装，拥有更明显的综合优势，可以说是目前 Windows 用户部署 OpenClaw 的“黄金组合”** 。

这种方式结合了 WSL2 的 seamless 集成和 Docker 的标准化封装，能让你同时获得两方面的好处。下面我们详细拆解一下“WSL2 + Docker”方案相比“纯 WSL2 安装”的具体优势。

### **方案优势对比：纯 WSL2 安装 vs WSL2 + Docker**

为了让你看得更清楚，我把两种方案在几个关键维度上做了对比：

| 维度                      | **方案 A：纯 WSL2 安装**                                     | **方案 B：WSL2 + Docker (黄金组合)**                         |
| :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **环境隔离与安全性**      | **中等**。OpenClaw 直接运行在 WSL2 的 Linux 系统中，可以访问 WSL2 内的所有文件。若被恶意利用，可能影响 WSL 环境，但相比纯 Windows 已有隔离 。 | **极佳**。OpenClaw 运行在 Docker 容器内，与宿主机（WSL2）有明确边界。通过最小权限挂载和以非 root 用户运行，能极大降低安全风险，是官方和社区推荐的方式 。 |
| **环境统一性与可复现性**  | **差**。依赖手动配置的 WSL2 环境（如 Node.js 版本、Python 依赖）。换一台机器或重装系统，整个配置过程需要重来，极易遇到依赖冲突 。 | **极佳**。OpenClaw 及其所有依赖都打包在 Docker 镜像中。无论在哪个机器上，`docker run` 启动的就是完全一致的环境。彻底告别“在我电脑上是好的啊”的问题 。 |
| **运维与升级体验**        | **复杂**。升级 OpenClaw 或相关依赖时，可能会遇到我们之前讨论过的“幽灵进程”问题——前台 CLI 升级了，后台 systemd 服务还指向旧版本，导致难以排查的错误 。 | **极简**。升级就是拉取新镜像、重启容器的事。Docker 提供了标准的日志、启停管理命令，无需和 systemd 等进程管理器打交道，运维心智负担小 。 |
| **对 Windows 资源的影响** | **可控**。可以通过 `.wslconfig` 文件限制 WSL2 的总体资源占用 。 | **精细可控**。除了 WSL2 的全局限制，还可以通过 `docker run` 的参数（如 `--memory`、`--cpus`）对 OpenClaw 容器进行更细粒度的资源配额管理。 |
| **开发与调试体验**        | **灵活**。对于开发者来说，可以直接修改源码并立即运行，调试起来非常方便 。 | **统一**。对于**大多数用户（只是想使用 OpenClaw 的功能）**，Docker 屏蔽了所有底层复杂性。对于开发者，也可以通过挂载源码目录来实现即时修改。 |

### **深度解析：Docker 带来的三重核心优势**

1.  **彻底告别“依赖地狱”和“幽灵进程”**
    我们之前在纯 WSL2 方案中讨论的、需要手动处理的 `systemd` 配置、Node.js 版本管理、以及最让人头疼的升级后 CLI 与 Gateway 版本不一致的问题，在 Docker 方案中都将不复存在。Docker 容器本身就封装了完整且经过测试的运行环境，你不再需要关心宿主机上安装了什么 。

2.  **安全性的本质提升**
    OpenClaw 是一个能执行命令的 AI 代理，其安全性怎么强调都不过分。在 Docker 中运行，你可以遵循最小权限原则：
    *   **只挂载必要目录**：仅将需要 AI 处理的特定文件夹（如 `~/workspace`）挂载进容器，而不是整个 WSL 或 Windows 文件系统 。
    *   **以非 root 用户运行**：配置容器使用非特权用户，即使容器被攻破，攻击者也无法获取你 WSL2 或 Windows 的 root 权限 。这相当于给 AI 员工划定了一个明确的工作区，它无法越界。

3.  **真正的“一键部署”与跨平台一致性**
    Docker 化的 OpenClaw 实例，其部署过程被简化为几条命令。无论是你想在本机部署，还是将来迁移到云端 VPS，这套 `docker-compose.yml` 文件都可以直接使用，实现真正的“一次构建，到处运行” 。

### **如何实现：WSL2 + Docker 部署 OpenClaw 核心步骤**

既然这个组合优势明显，我们来梳理一下核心的实现路径，这可以看作是上一份纯 WSL2 教程的“升级版”：

1.  **第一阶段：基础环境准备（与之前类似）**
    *   在 Windows 中安装 WSL2 和 Ubuntu 。
    *   配置 `.wslconfig` 限制资源，并启用 `systemd` 。
    *   **关键一步：** 安装 **Docker Desktop** for Windows，并在设置中确保开启了“Use the WSL 2 based engine”，且与你的 Ubuntu 发行版集成 。这样，Docker 命令就可以直接在 WSL2 的 Ubuntu 中使用了。

2.  **第二阶段：在 WSL2 (Ubuntu) 中部署**
    *   打开 Ubuntu 终端，后续所有操作都在此进行。
    *   创建一个项目目录，例如 `~/projects/openclaw-docker`。
    *   在该目录下创建 `docker-compose.yml` 文件。一个典型的配置会包含 OpenClaw 服务、必要的端口映射（如 18789）、以及最关键的环境变量配置（用于存放你的 API Key 或 Ollama 地址）。
    *   在同一个目录下创建 `.env` 文件，用于存放敏感信息（如 `ANTHROPIC_API_KEY`、`TELEGRAM_BOT_TOKEN` 等），避免硬编码到配置文件中 。

3.  **第三阶段：连接 Ollama 与启动**
    *   在 Ubuntu 终端中，确保你的 Ollama 已经在运行（直接在 WSL2 中安装运行，或者如果 Ollama 也容器化运行，需要配置在同一个 Docker 网络）。
    *   在 `docker-compose.yml` 中，你需要通过环境变量告诉 OpenClaw 容器如何找到 Ollama 服务。由于 OpenClaw 在容器内，Ollama 如果在宿主机（WSL2）运行，通常可以使用 `host.docker.internal` 这个特殊 DNS 名称来访问宿主机。
    *   配置好一切后，在 `docker-compose.yml` 所在目录执行 `docker-compose up -d`，OpenClaw 就会在后台启动。
    *   之后，你就可以通过 `http://localhost:18789` 访问 OpenClaw 的 Web 界面了 。

### **总结**

| 场景                                                      | 推荐方案                                                     |
| :-------------------------------------------------------- | :----------------------------------------------------------- |
| **你是普通用户，希望稳定、安全、省心地长期运行 OpenClaw** | **首选 WSL2 + Docker**。它将所有复杂性封装，提供最优的隔离性和可维护性，让你专注于使用 AI 功能。 |
| **你是开发者，需要深度修改 OpenClaw 核心代码或调试**      | **纯 WSL2 安装**可能更灵活，因为修改源码后无需重建镜像即可生效。但对于大多数不修改核心代码的场景，Docker 依然是更稳妥的选择。 |

“WSL2 + Docker”的组合，既利用了 Windows 强大的硬件（尤其是 NVIDIA 显卡 ），又享受了 Docker 带来的环境一致性，是目前构建本地、安全、7x24 小时 AI 代理的最优解之一。

如果你想了解具体的 `docker-compose.yml` 和 `.env` 文件配置细节，或者需要一份从零开始的完整命令列表，随时可以继续问我。