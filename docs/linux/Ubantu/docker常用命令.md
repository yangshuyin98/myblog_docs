## Ollama

### 3. 创建并启动 Ollama 容器（挂载模型目录）

```
# 清理可能存在的旧容器
docker stop ollama 2>/dev/null; docker rm ollama 2>/dev/null

# 启动新容器，挂载宿主机的模型目录
docker run -d \
  -p 11434:11434 \
  -v ~/.ollama/models:/root/.ollama/models \
  --name ollama \
  ollama/ollama:0.10.1
  

docker run -d \
  -p 11434:11434 \
  -v /mnt/c/Users/dell/.ollama/models:/root/.ollama/models \
  --name ollama \
  ollama/ollama:0.10.1

```



### 4. 验证 Ollama 服务

```
docker ps                     # 应看到 ollama 容器状态为 Up
docker exec ollama ollama list   # 应显示 qwen2.5:14b
curl http://localhost:11434/api/tags   # 返回包含模型的 JSON
```





## OpenClaw 

### 4. 修改配置文件，添加 Ollama 提供商

```
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
            "id": "qwen2.5:14b",
            "name": "Qwen 2.5 14B",
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
        "primary": "ollama/qwen2.5:14b"
      }
    }
  }
}
```





### 启动 OpenClaw 容器（使用 host 网络模式）

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









### 如何判断容器是否在后台运行？

- 使用 `docker ps`：只显示当前**正在运行**的容器。
- 使用 `docker ps -a`：显示**所有容器**（包括运行中和已停止的）。如果状态为 `Exited`，说明已停止。



要彻底关闭并移除 Docker 内运行（或已停止）的 Ollama 容器，请按以下步骤操作：

### 1. 查看所有容器（包括已停止的）
```bash
docker ps -a | grep ollama
```
这将列出所有名称包含 `ollama` 的容器及其状态。

### 2. 停止正在运行的容器（如果正在运行）
```bash
docker stop ollama
```
如果容器名不是 `ollama`，请替换为实际名称（可从第一步的输出中获取）。

### 3. 删除容器
```bash
docker rm ollama
```
如果你希望彻底移除这个已退出的容器（而不是留在磁盘上）：

```
docker rm <容器名或ID>
```

同样，如果容器名不同，请替换。此命令会彻底移除容器，但**不会删除**你挂载到容器外的模型数据（例如 `~/.ollama/models` 目录下的文件）。

### 4. 确认容器已消失
```bash
docker ps -a | grep ollama
```
应该没有任何输出。

### 5. （可选）删除 Ollama 镜像
如果你还想删除下载的 Ollama 镜像以释放空间，可以执行：
```bash
docker rmi ollama/ollama:0.10.1
```
注意：如果还有其他容器在使用该镜像，需要先删除它们。

---

### 补充说明
- 容器被删除后，其内部的所有数据（如未挂载的日志、临时文件）都将丢失，但**挂载到宿主机的模型文件**仍然保留在 `~/.ollama/models` 中，可后续重新挂载使用。
- 如果之后你想重新创建 Ollama 容器，只需再次运行 `docker run` 命令即可，模型文件依然可用。

关于“后台”的理解

- 运行中的容器：`docker ps` 能看到，状态为 `Up`，它们在后台持续运行。
- 已停止的容器：`docker ps` 看不到，但 `docker ps -a` 能看到，状态为 `Exited`，它们不运行。

所以，`Exited (0)` 的容器**不在后台**，只是“尸体”还留着，可以随时复活（`docker start`）或火化（`docker rm`）。