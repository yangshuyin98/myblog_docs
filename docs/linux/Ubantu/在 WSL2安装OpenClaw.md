对于在 Windows 11 上使用本地 Ollama 模型运行 OpenClaw 的需求，**强烈建议你将 OpenClaw 安装在 WSL2 (Windows Subsystem for Linux) 中**。

直接在 Windows 环境中安装可能会遇到路径、环境变量和脚本兼容性等问题，导致运行不稳定。而 WSL2 提供了一个更接近 Linux 的原生环境，这也是 OpenClaw 官方推荐和支持的运行方式，能够确保更高的稳定性和可靠性。

以下是推荐在 WSL2 中安装 OpenClaw 的核心原因和关键步骤。

### 🤔 为什么推荐 WSL2？

- **官方推荐**：OpenClaw 官方文档明确推荐 Windows 用户通过 WSL2 来运行，这是经过验证的、最稳定的部署方式。
- **环境兼容**：OpenClaw 依赖的许多工具链和系统进程在 Linux 环境下运行更顺畅，WSL2 完美解决了原生 Windows 环境可能出现的兼容性问题。
- **排查方便**：在 WSL2 中部署，当遇到问题时，排查和解决的思路与官方文档及社区经验更一致，可以大大减少踩坑成本。

### 🛠️ 核心安装步骤概览

整个流程可以分为三个主要部分：准备 WSL2 环境、安装 Ollama、安装和配置 OpenClaw。

#### 1. 准备 WSL2 环境

1. **安装 WSL2 和 Ubuntu**：以管理员身份打开 PowerShell，运行 `wsl --install -d Ubuntu-24.04`。根据提示重启电脑，然后启动 Ubuntu 并设置用户名和密码。

2. 启用 systemd

   ：OpenClaw 需要 

   ```
   systemd
   ```

    来管理后台服务。在 Ubuntu 终端中，执行以下命令创建配置文件：

   ```bash
   sudo tee /etc/wsl.conf >/dev/null <<'EOF'
   [boot]
   systemd=true
   EOF
   ```

   然后，在 PowerShell 中运行 

   ```
   wsl --shutdown
   ```

    重启 WSL，再重新打开 Ubuntu 终端。

3. **安装 Node.js 和 pnpm**：OpenClaw 需要 Node.js 22 或更高版本。在 Ubuntu 中安装 Git、curl 和 Node.js 22，然后安装 pnpm 包管理器。

#### 2. 安装并配置 Ollama

为了获得最佳的兼容性和网络连通性，建议将 Ollama 也安装在 WSL2 内部。

1. 安装 Ollama

   ：在 Ubuntu 终端中，运行官方安装脚本：

   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. 拉取模型

   ：启动 Ollama 服务 (

   ```
   ollama serve &
   ```

   )，然后下载你需要的模型，例如 

   ```
   llama3.2
   ```

   ：

   ```bash
   ollama pull llama3.2
   ```

3. **验证安装**：运行 `curl http://localhost:11434`，如果返回 `Ollama is running`，说明安装成功。

#### 3. 安装和配置 OpenClaw

1. 克隆源码

   ：在 Ubuntu 中，从官方 GitHub 仓库克隆 OpenClaw 项目：

   ```bash
   git clone https://github.com/openclaw/openclaw.git
   cd openclaw
   ```

2. 构建项目

   ：安装依赖并构建 OpenClaw：

   ```bash
   pnpm install
   pnpm ui:build
   pnpm build
   ```

3. 运行配置向导

   ：启动交互式配置流程，并将其安装为后台服务：

   ```bash
   pnpm openclaw onboard --install-daemon
   ```

4. 配置连接 Ollama

   ：在配置向导中，当提示选择模型提供商时，选择 

   ```
   Custom Provider
   ```

    或类似选项，并填写以下信息：

   - **API Base URL**: `http://localhost:11434/v1`
   - **API Key**: 随便填写一个（例如 `ollama`），本地使用不校验。
   - **Endpoint compatibility**: `OpenAI-compatible`
   - **Model ID**: 输入你之前用 Ollama 拉取的模型名称，例如 `llama3.2`。

完成以上步骤后，你就可以通过 `openclaw dashboard` 命令在浏览器中打开 OpenClaw 的控制面板，开始使用它调用本地的 Ollama 模型了。