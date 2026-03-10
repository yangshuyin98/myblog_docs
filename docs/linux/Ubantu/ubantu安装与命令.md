### 一、切换到 root 用户



```
sudo su - root
sudo su -
```

#### 2. 使用 `sudo` 命令临时获得管理员权限`(推荐)`

`sudo`（SuperUser Do）命令允许普通用户临时以管理员身份执行命令。

**切换到 root 用户：**

```
sudo -i
```

- **`sudo -i`**：启动一个 root shell。

#### 3. 使用 `sudo su` 切换到 root 用户

通过 `sudo` 切换到 root 用户。

#### 4. 使用 `passwd` 设置 root 密码

```
sudo passwd root
```





### 二、恢复为普通用户

#### 1. 退出当前的 root 用户会话

```
exit

```

#### 2.切换回普通用户`(推荐)`

如果您是在 `root` 用户下，可以使用 `su` 或 `sudo` 切换回普通用户：



| 方法 | 命令 | 密码要求 | 说明 |
| ---- | ---- | ---- |---- |
|切换到 root 用户|sudo su - root|root用户的密码|直接切换到 root 用户并加载 root 用户环境。|
|临时获得管理员权限|sudo|当前用户的密码|使用当前用户的 sudo 权限来执行管理员命令。|
|通过 sudo 切换到 root|sudo su -|当前用户的密码|使用 sudo 切换到 root 用户，并加载 root 用户环境。|
|启动 root shell|sudo -i|当前用户的密码|启动一个新的 shell，模拟 root 用户环境。|
|设置 root 密码|sudo passwd root|当前用户的密码|在没有 root 密码的情况下，设置 root 用户密码。|
|切换回普通用户|exit|无|退出 root 用户会话，恢复为普通用户。|
|切换到指定普通用户|su - username	|root 用户的密码	|从 root 用户切换到指定的普通用户。|
|切换到普通用户 (sudo)|sudo -u username -i|当前用户的密码|使用 sudo 切换到指定的普通用户。|