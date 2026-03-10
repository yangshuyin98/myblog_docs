这是一份详细的教程，旨在帮助你在本地Windows系统中安装OpenClaw，并将其配置为使用通过Ollama运行的`deepseek-r1:14b`模型作为核心“大脑”。

在开始之前，需要先说明：OpenClaw是一个能执行系统任务的AI代理，而`deepseek-r1:14b`是一个对硬件有一定要求的本地模型。根据搜索结果，运行14B模型**至少需要32GB的系统内存（RAM）**，才能获得较为流畅的体验 。如果你的设备满足这个要求，可以按照以下步骤进行操作。

### **第一步：安装并配置OpenClaw**

我们将采用对Windows用户最友好、最不容易出错的官方脚本来安装OpenClaw 。

1.  **以管理员身份打开PowerShell**：
    - 按下 `Win + S`，搜索 "PowerShell"。
    - 在搜索结果中，鼠标右键点击 "Windows PowerShell"，选择 **“以管理员身份运行”**。这一步非常重要，可以避免后续的权限问题 。

2.  **解锁脚本执行权限（临时）**：
    - 在管理员PowerShell中，粘贴以下命令并回车，以允许本次会话运行安装脚本：
      ```powershell
      Set-ExecutionPolicy Bypass -Scope Process -Force
      ```
      

3.  **执行一键安装脚本**：
    - 接着，粘贴并运行以下命令，开始下载和安装OpenClaw：
      ```powershell
      iwr -useb https://openclaw.ai/install.ps1 | iex
      ```
    - 如果遇到网络问题，可以尝试使用国内镜像源：
      ```powershell
      iwr -useb https://clawd.org.cn/install.ps1 | iex
      ```
    - 安装过程可能需要几分钟，请耐心等待 。

4.  **验证安装**：
    - 安装完成后，关闭当前的PowerShell窗口，然后**重新以管理员身份打开一个新的PowerShell窗口**。
    - 输入以下命令查看版本，如果显示版本号（如 `2026.3.2-beta.1`），则说明安装成功 ：
      ```powershell
      openclaw --version
      ```

5.  **配置并启动网关服务**：
    - 在同一个管理员PowerShell中，依次执行以下命令，将网关模式设置为本地并启动服务 ：
      ```powersill
      # 设置网关模式为本地
      openclaw config set gateway.mode local
      
      # 启动网关服务
      openclaw gateway start
      ```
    - 可以通过以下命令检查网关状态，确认是否为 "Running" ：
      ```powershell
      openclaw gateway status
      ```

6.  **访问OpenClaw Web控制台**：
    - 打开你的浏览器，在地址栏输入 `http://127.0.0.1:18789`。
    - 如果一切顺利，你应该能看到OpenClaw的Web界面。至此，OpenClaw的核心部分已安装完成 。

### **第二步：通过Ollama部署DeepSeek-R1模型**

OpenClaw本身不包含大模型，它需要连接一个“大脑”。我们将在本地用Ollama来扮演这个角色。

1.  **安装Ollama**：
    - 访问Ollama的官方网站 ( `https://ollama.com` )，下载Windows版本的安装程序。
    - 双击运行安装程序，按照提示完成安装。安装过程通常不需要额外配置 。

2.  **拉取DeepSeek-R1 14B模型**：
    - 打开一个新的 **PowerShell** 窗口（无需管理员权限）。
    - 输入以下命令，Ollama会自动从仓库下载模型文件。模型大小约为9GB左右，下载时间取决于你的网络速度。
      ```powershell
      ollama pull deepseek-r1:14b
      ```
      

3.  **验证模型是否下载成功**：
    - 下载完成后，运行以下命令可以直接与模型对话，测试其是否正常工作：
      ```powershell
      ollama run deepseek-r1:14b
      ```
    - 在出现的 `>>>` 提示符后输入 "你好，介绍一下自己"，如果模型有回复，则说明一切正常。输入 `/bye` 可以退出对话模式 。

### **第三步：将OpenClaw与Ollama连接起来**

现在，我们有了OpenClaw这个“骨架”（代理框架），也有了DeepSeek这个“大脑”（大模型）。最后一步就是让OpenClaw学会调用Ollama里的这个大脑。

有两种主要方法可以实现连接：

#### **方法一：通过配置文件（推荐，配置更持久）**

1.  **找到OpenClaw的配置文件**：
    - 在Windows资源管理器的地址栏中输入 `%USERPROFILE%\.openclaw\` 并回车。
    - 找到名为 `openclaw.json` 的文件，用记事本或其他代码编辑器打开。如果文件不存在，可以新建一个 。

2.  **编辑配置文件**：
    - 将以下JSON配置内容复制并粘贴到文件中，然后保存。这段代码告诉OpenClaw，有一个叫 `ollama` 的模型提供商，地址在哪里，以及默认使用哪个模型 。
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

#### **方法二：通过环境变量（适合临时测试）**

如果你更喜欢临时设置，可以在每次启动OpenClaw前，在PowerShell中运行以下命令来指定模型 ：
```powershell
# 设置Ollama的主机地址
$env:OLLAMA_HOST = "http://localhost:11434"
# 设置要使用的模型
$env:OLLAMA_MODEL = "deepseek-r1:14b"
# 然后启动OpenClaw的配置向导（如果需要）或直接使用
openclaw onboard --flow quickstart
```

### **第四步：验证集成效果**

1.  **确保两个服务都在运行**：
    - **Ollama**：通常作为后台服务自动运行，你可以在任务栏右侧找到它的图标。
    - **OpenClaw Gateway**：之前在PowerShell中运行 `openclaw gateway start` 后，它应该就在运行了。

2.  **在OpenClaw Web界面中测试**：
    - 刷新或重新打开你的OpenClaw Web控制台 (`http://127.0.0.1:18789`)。
    - 在聊天框中输入一个问题，例如：“用Python写一个计算斐波那契数列的函数”。
    - 如果OpenClaw能正常调用模型并返回代码结果，那么恭喜你，整个部署流程就成功了！

### **附录：常用维护与排错命令**

在日后的使用中，你可能会用到以下命令来检查和维护你的系统 ：

| 命令                       | 作用                                       |
| :------------------------- | :----------------------------------------- |
| `openclaw gateway status`  | 查看OpenClaw网关的运行状态                 |
| `openclaw gateway restart` | 重启网关（修改配置后常用）                 |
| `openclaw doctor`          | 运行诊断检查，查看是否有配置问题           |
| `openclaw logs follow`     | 实时查看OpenClaw的日志，排查错误时非常有用 |
| `ollama list`              | 查看本地已下载了哪些Ollama模型             |
| `ollama ps`                | 查看当前正在运行的模型                     |









这是个很关键的问题。简单来说，**对于长期、稳定、功能完整地使用 OpenClaw，WSL2 方案要优于上一份教程中的纯 Windows 安装方式。**

这并非是“哪个更好”的二选一，而是取决于你的使用场景和目标。上一份教程提供的方法可以让你快速在 Windows 上跑起来体验一下，但如果想让 OpenClaw 成为你电脑上可靠的“AI 员工”，WSL2 是官方和社区公认的“正确方式”。

下面我把两种方案的优缺点掰开揉碎了讲，方便你根据自己的情况做决定。

### 🔍 两种方案对比：速览版

| 维度              | **方案 A：纯 Windows 安装 (PowerShell)**                     | **方案 B：WSL2 (Ubuntu) 安装**                               |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **运行原理**      | 通过 PowerShell 脚本安装，OpenClaw 核心在 Windows 上以用户态进程运行。 | 在 Windows 下的 Linux 虚拟机里运行，拥有完整的 Linux 内核。  |
| **功能完整性**    | **受限**。无法使用依赖 Linux 内核的特性（如 `systemd` 守护进程），稳定性差。 | **完整**。支持 `systemd` 后台守护、原生进程管理，功能与在 Linux 服务器上无异。 |
| **维护复杂度**    | **低**。安装简单，开箱即用，但后续可能遇到奇怪的问题。       | **中高**。需要了解基本的 Linux 命令，并处理 WSL 特有的一些问题（如网络、文件路径）。 |
| **安全性/隔离性** | **差**。AI 代理直接运行在主系统上，有权限访问和修改你所有的个人文件，风险较高。 | **好**。运行在隔离的 Linux 子系统中，即使出问题也难以直接影响 Windows 宿主机，更安全。 |
| **资源管理**      | **一般**。进程直接竞争 Windows 资源，难以精确控制。          | **优秀**。可以通过 `.wslconfig` 文件精确限制 WSL2 能使用的 CPU、内存，避免影响宿主机。 |
| **硬件加速**      | 对 NVIDIA 显卡调用 CUDA 的支持较为复杂。                     | **原生支持**。可以方便地调用 NVIDIA 显卡进行 GPU 加速，跑大模型更流畅。 |

---

### 🧐 深入分析：为什么 WSL2 是“更好”的选择？

1.  **核心原因：OpenClaw 需要 Linux 环境**
    OpenClaw 的底层设计（如进程管理、`systemd` 服务）与 Linux 生态紧密相连。它并非一个原生的 Windows 应用程序。虽然通过 PowerShell 可以运行，但这更像是“兼容模式”，其网关服务（Gateway）无法作为稳定的后台服务运行，容易在长时间使用后出问题。WSL2 提供了一个与 Windows 完美集成的轻量级 Linux 虚拟机，为 OpenClaw 提供了它“原生”的家。

2.  **安全与资源控制：长期运行的保障**
    AI 代理能执行命令、访问文件，这意味着它拥有很高的系统权限。官方社区**强烈不建议**将其直接部署在你的主力个人电脑上，因为这可能会带来安全隐患。在 WSL2 中运行，等于加了一层“沙箱”，将潜在风险隔离在 Linux 子系统中，不会影响你的 Windows 主系统。同时，你可以通过配置文件精确限制 WSL2 占用的资源，防止它在后台“吃”掉你所有内存。

3.  **你可能会遇到的小麻烦（WSL2 的代价）**
    - **学习成本**：你需要习惯在 Linux 终端里操作，使用 `apt` 安装软件，理解 Linux 的文件权限。
    - **文件访问**：访问 Windows 文件需要通过 `/mnt/c/` 路径，权限处理有时需要留意。
    - **特有 Bug**：正如一篇实战文章中提到，WSL2 环境下可能会遇到“环境变量死锁”、“OAuth 回调黑洞”等特殊问题，但这些都有明确的解决方案。

### 💡 到底该怎么选？

看完对比，你可能已经有了答案。这里给你两个直接的建议：

*   **如果你是……想“快速体验”或“轻度试用”**：
    那么上一份教程的 **纯 Windows 安装** 完全可以满足你。用它跑几个简单任务，感受一下 OpenClaw 是什么，完全没问题。

*   **如果你是……打算“长期使用”、“7x24小时运行”，或者要把它当成生产力工具**：
    那么，强烈建议你**采用 WSL2 方案**。虽然前期多花半小时配置，但它带来的稳定性、完整功能和安全隔离，是纯 Windows 方案无法比拟的。这才是让 AI 员工“安家落户”的正确姿势。

### 🚀 接下来怎么办？

如果你决定采用 WSL2 方案，接下来的步骤很清晰：

1.  **卸载**：如果你已经通过 PowerShell 安装了 OpenClaw，可以将其卸载，避免未来可能的冲突。
2.  **启用 WSL2**：以管理员身份打开 PowerShell，运行 `wsl --install` 即可自动安装 Ubuntu。
3.  **配置 WSL2**：重启后，在 Windows 用户目录下创建 `.wslconfig` 文件，为 WSL2 设置内存和 CPU 上限（例如 `memory=8GB`）。
4.  **在 WSL2 中安装**：在 Ubuntu 终端里，重新运行 OpenClaw 的一键安装脚本（Linux 版），并拉起你的 DeepSeek-R1 模型。

你之前已经拉取了 `deepseek-r1:14b` 模型，这个模型文件在 WSL2 里是无法直接访问的。所以迁移到 WSL2 方案后，你需要先在 WSL2 的 Ubuntu 环境中重新安装 Ollama，并再次执行 `ollama pull deepseek-r1:14b`。考虑到网络问题，在 WSL2 里拉取大模型的速度可能会比较慢，如果你需要，我可以提供几种在 WSL2 里加速下载的方法～