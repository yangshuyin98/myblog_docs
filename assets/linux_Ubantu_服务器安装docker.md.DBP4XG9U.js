import{_ as a,c as n,o as e,ag as p}from"./chunks/framework.KcKrU9KS.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux/Ubantu/服务器安装docker.md","filePath":"linux/Ubantu/服务器安装docker.md","lastUpdated":1773107605000}'),i={name:"linux/Ubantu/服务器安装docker.md"};function l(t,s,c,o,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<h3 id="安装环境" tabindex="-1">安装环境 <a class="header-anchor" href="#安装环境" aria-label="Permalink to &quot;安装环境&quot;">​</a></h3><p>Ubuntu22.04系统环境</p><p>开始安装</p><h5 id="_1-检查卸载老版本docker" tabindex="-1">1 检查卸载老版本Docker <a class="header-anchor" href="#_1-检查卸载老版本docker" aria-label="Permalink to &quot;1 检查卸载老版本Docker&quot;">​</a></h5><p>旧版本的 Docker 称为 <code>docker</code> 或者 <code>docker-engine</code></p><div class="language-ubuntu vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ubuntu</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt-get remove docker docker-engine docker.io</span></span>
<span class="line"><span>#安装前先卸载操作系统默认安装的docker，</span></span>
<span class="line"><span>sudo apt-get remove docker docker-engine docker.io containerd runc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo apt-get autoremove</span></span></code></pre></div><h5 id="_2-更新软件包" tabindex="-1">2 更新软件包 <a class="header-anchor" href="#_2-更新软件包" aria-label="Permalink to &quot;2 更新软件包&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#  更新软件包</span></span>
<span class="line"><span>sudo apt-get update</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt upgrade -y</span></span></code></pre></div><h5 id="_3-安装docker依赖" tabindex="-1">3 安装docker依赖 <a class="header-anchor" href="#_3-安装docker依赖" aria-label="Permalink to &quot;3 安装docker依赖&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#2.由于 apt 源使用 HTTPS 以确保软件下载过程中不被篡改，因此首先需要添加使用 HTTPS 传输的软件包以及 CA 证书</span></span>
<span class="line"><span>sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release</span></span>
<span class="line"><span>#安装必要支持</span></span>
<span class="line"><span>sudo apt-get -y install software-properties-common</span></span></code></pre></div><h5 id="_4、添加docker密钥" tabindex="-1">4、添加docker密钥 <a class="header-anchor" href="#_4、添加docker密钥" aria-label="Permalink to &quot;4、添加docker密钥&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#添加 Docker 官方 GPG key密钥 （可能国内现在访问会存在问题）</span></span>
<span class="line"><span>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo mkdir -p /etc/apt/keyrings</span></span>
<span class="line"><span>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 阿里源（推荐使用阿里的gpg KEY）</span></span>
<span class="line"><span>curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</span></span>
<span class="line"><span>##3.为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥.更安全且推荐用于新系统（如 Ubuntu 22.04 及以上）</span></span>
<span class="line"><span>#需要后续在 APT 源配置中手动引用</span></span></code></pre></div><h5 id="_5、添加阿里云docker软件源" tabindex="-1">5、添加阿里云docker软件源 <a class="header-anchor" href="#_5、添加阿里云docker软件源" aria-label="Permalink to &quot;5、添加阿里云docker软件源&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#添加 apt 源:</span></span>
<span class="line"><span>#Docker官方源</span></span>
<span class="line"><span>echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>echo \\</span></span>
<span class="line"><span>  &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\</span></span>
<span class="line"><span>  $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#阿里apt源</span></span>
<span class="line"><span>#向 sources.list 中添加 Docker 软件源</span></span>
<span class="line"><span>echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null</span></span>
<span class="line"><span># 以上命令会添加稳定版本的 Docker APT 镜像源，如果需要测试版本的 Docker 请将 stable 改为 test</span></span>
<span class="line"><span>##4更安全且推荐用于新系统（如 Ubuntu 22.04 及以上），因为它将密钥保存为单独文件，并可通过 APT 源的 signed-by 选项显式关联，减少系统范围的安全风险。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#更新源</span></span>
<span class="line"><span>sudo apt update</span></span>
<span class="line"><span>sudo apt-get update</span></span></code></pre></div><h5 id="_6、更新-apt-软件包缓存-安装docker-并安装-docker-ce" tabindex="-1">6、更新 apt 软件包缓存，安装docker,并安装 <code>docker-ce</code> <a class="header-anchor" href="#_6、更新-apt-软件包缓存-安装docker-并安装-docker-ce" aria-label="Permalink to &quot;6、更新 apt 软件包缓存，安装docker,并安装 \`docker-ce\`&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt-get update</span></span>
<span class="line"><span>#安装最新版本的Docker</span></span>
<span class="line"><span>sudo apt install docker-ce docker-ce-cli containerd.io</span></span>
<span class="line"><span>sudo apt-get install docker-ce docker-ce-cli containerd.io</span></span>
<span class="line"><span># 安装 Docker Engine</span></span>
<span class="line"><span>sudo apt install -y  docker-compose-plugin</span></span>
<span class="line"><span>#等待安装完成</span></span></code></pre></div><p>7、配置用户组(非必须操作，此操作目的是为了以后执行docker命令时无需输入sudo密码，避免这些重复操作而已。)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo usermod -aG docker $USER</span></span>
<span class="line"><span>sudo usermod -aG docker $USER</span></span>
<span class="line"><span>newgrp docker  # 刷新用户组</span></span>
<span class="line"><span>#电脑重启</span></span>
<span class="line"><span>sudo reboot</span></span></code></pre></div><p>8、执行完第七步命令的话你电脑会立刻黑屏进行重启，等待重启即可。 检验docker是否安装成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo systemctl start docker</span></span>
<span class="line"><span>sudo systemctl enable docker   #设置开机启动docker服务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common</span></span>
<span class="line"><span>service docker restart</span></span>
<span class="line"><span>sudo docker run hello-world  # 验证安装</span></span></code></pre></div><p>执行完hello-world等待一会，会在信息栏打印出该字眼则表示docker安装成功</p><h5 id="_9、查看docker版本" tabindex="-1">9、查看docker版本 <a class="header-anchor" href="#_9、查看docker版本" aria-label="Permalink to &quot;9、查看docker版本&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#查看Docker版本</span></span>
<span class="line"><span>sudo docker version</span></span>
<span class="line"><span># version： 29.3.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#查看Docker运行状态</span></span>
<span class="line"><span>sudo systemctl status docker</span></span>
<span class="line"><span>#Active active（running）</span></span>
<span class="line"><span>#分页显示，导致无法直接返回命令行。以下是退出该状态的几种方法：</span></span>
<span class="line"><span>#1：使用快捷键退出</span></span>
<span class="line"><span>#按键 q 直接按下键盘上的 q 键，即可退出分页显示并返回命令行。</span></span>
<span class="line"><span>#按键组合 Ctrl+C 如果 q 无法退出，可以尝试按下 Ctrl+C 强制中断当前操作。</span></span></code></pre></div><p>查看docker是否安装成功，如果是普通用户有些指令可能没有权限，可以将当前用户添加到 Docker 组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker -v</span></span>
<span class="line"><span>docker --version  # 应显示类似：Docker version 24.0.7, build xxxxxxx</span></span>
<span class="line"><span>docker info | grep Mirrors  # 检查加速器配置</span></span>
<span class="line"><span>docker info</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 将当前用户添加到 Docker 组</span></span>
<span class="line"><span>sudo usermod -aG docker boss-dog</span></span>
<span class="line"><span>newgrp docker</span></span>
<span class="line"><span>groups boss-dog</span></span></code></pre></div><p>查看docker镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo docker images</span></span></code></pre></div><p>如果镜像还没的话，查看镜像只会有一行字。大于两行字就是有镜像了，看英文ID之类 的可以清晰知道哪个镜像的。</p><h5 id="_10、配置镜像加速器" tabindex="-1">10、配置镜像加速器 <a class="header-anchor" href="#_10、配置镜像加速器" aria-label="Permalink to &quot;10、配置镜像加速器&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 输入docker run --rm hello-world有时会报超时，需要配置镜像加速器</span></span>
<span class="line"><span># 创建或编辑配置文件</span></span>
<span class="line"><span># 创建配置目录</span></span>
<span class="line"><span>sudo mkdir -p /etc/docker</span></span>
<span class="line"><span>sudo mkdir -p /etc/docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;{</span></span>
<span class="line"><span>  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>    &quot;https://mirror.aliyuncs.com&quot;,</span></span>
<span class="line"><span>    &quot;https://mirror.ccs.tencentyun.com&quot;  # 腾讯云镜像（国内稳定）</span></span>
<span class="line"><span>    &quot;https://hub-mirror.c.163.com&quot;,</span><span>        // 网易镜像</span></span>
<span class="line"><span>    &quot;https://registry.docker-cn.com&quot;</span><span>       // Docker 中国官方镜像</span></span>
<span class="line"><span>    &quot;https://docker.m.daocloud.io&quot;,</span></span>
<span class="line"><span>    &quot;https://szmlw1af.mirror.aliyuncs.com&quot;,</span></span>
<span class="line"><span>    &quot;https://docker.aliyuncs.com&quot;,</span><span>               //阿里云镜像（通用版）</span></span>
<span class="line"><span>    &quot;https://docker.mirrors.ustc.edu.cn&quot;,</span><span>  // 中科大镜像（推荐，速度快）</span></span>
<span class="line"><span>    &quot;https://docker.1ms.run&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;https://docker.xuanyuan.me&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}&#39; | sudo tee /etc/docker/daemon.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo systemctl restart docker</span></span>
<span class="line"><span>sudo systemctl restart docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 写入镜像加速器配置（中科大 + 网易 + 阿里云，任选其一或多个）</span></span>
<span class="line"><span>sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>    &quot;https://docker.mirrors.ustc.edu.cn&quot;,  # 中科大镜像</span></span>
<span class="line"><span>    &quot;https://hub-mirror.c.163.com&quot;,       # 网易镜像</span></span>
<span class="line"><span>    &quot;https://mirror.aliyuncs.com&quot;,        # 阿里云镜像（通用版）</span></span>
<span class="line"><span>    &quot;https://docker.mirrors.ustc.edu.cn&quot;,</span><span>  // 中科大镜像（推荐，速度快）</span></span>
<span class="line"><span>    &quot;https://docker.1ms.run&quot;,</span></span>
<span class="line"><span>    &quot;https://docker.xuanyuan.me&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Ubuntu/Debian/CentOS 7+ 通用</span></span>
<span class="line"><span>sudo systemctl daemon-reload</span></span>
<span class="line"><span>sudo systemctl restart docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 若为老版本 Docker（如 CentOS 6），用以下命令</span></span>
<span class="line"><span># sudo service docker restart</span></span></code></pre></div><h5 id="_11、系统-dns-解析失败" tabindex="-1">11、系统 DNS 解析失败 <a class="header-anchor" href="#_11、系统-dns-解析失败" aria-label="Permalink to &quot;11、系统 DNS 解析失败&quot;">​</a></h5><p>这次报错 <code>dial tcp: lookup docker.mirrors.ustc.edu.cn on 127.0.0.53:53: no such host</code> 的核心是 <strong>系统 DNS 解析失败</strong>：</p><p><code>127.0.0.53:53</code> 是 Linux 系统默认的本地 DNS 解析服务，<code>no such host</code> 表示它无法识别 <code>docker.mirrors.ustc.edu.cn</code> 这个域名；</p><p>本质是你的系统 DNS 配置有问题，导致连国内镜像源的域名都解析不了，而非 Docker 本身的问题。</p><h6 id="步骤-1-临时修复-dns-配置-立即生效" tabindex="-1">步骤 1：临时修复 DNS 配置（立即生效） <a class="header-anchor" href="#步骤-1-临时修复-dns-配置-立即生效" aria-label="Permalink to &quot;步骤 1：临时修复 DNS 配置（立即生效）&quot;">​</a></h6><p>先修改系统的 DNS 配置文件，添加国内可靠的 DNS 服务器（阿里 / 腾讯 DNS）：****</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 备份原有DNS配置（防止出错）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/resolv.conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/resolv.conf.bak</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 写入新的DNS服务器（阿里DNS + 腾讯DNS）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/resolv.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nameserver 223.5.5.5    # 阿里云公共DNS</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nameserver 119.29.29.29 # 腾讯云公共DNS</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nameserver 8.8.8.8      # 谷歌DNS（备用）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><h6 id="步骤-2-更换更稳定的-docker-镜像源-避免部分镜像源域名失效" tabindex="-1">步骤 2：更换更稳定的 Docker 镜像源（避免部分镜像源域名失效） <a class="header-anchor" href="#步骤-2-更换更稳定的-docker-镜像源-避免部分镜像源域名失效" aria-label="Permalink to &quot;步骤 2：更换更稳定的 Docker 镜像源（避免部分镜像源域名失效）&quot;">​</a></h6><p>中科大镜像源偶尔可能解析异常，换成阿里云专属镜像源（更稳定），先修改 Docker 配置：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新写入Docker镜像源配置（用阿里云通用版+腾讯云镜像）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/docker/daemon.json</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.aliyuncs.com&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.ccs.tencentyun.com&quot;  # 腾讯云镜像（国内稳定）</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><h6 id="步骤-3-重启-docker-服务并测试" tabindex="-1">步骤 3：重启 Docker 服务并测试 <a class="header-anchor" href="#步骤-3-重启-docker-服务并测试" aria-label="Permalink to &quot;步骤 3：重启 Docker 服务并测试&quot;">​</a></h6><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新加载配置+重启Docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 先验证DNS解析是否正常</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ping</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mirror.aliyuncs.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 再测试拉取hello-world镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello-world</span></span></code></pre></div><h3 id="额外说明-若仍有问题" tabindex="-1">额外说明（若仍有问题） <a class="header-anchor" href="#额外说明-若仍有问题" aria-label="Permalink to &quot;额外说明（若仍有问题）&quot;">​</a></h3><p>如果是 Ubuntu 系统，<code>/etc/resolv.conf</code> 可能会被系统自动覆盖，需要永久修改 DNS：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 编辑netplan配置（Ubuntu 18.04+）</span></span>
<span class="line"><span>sudo nano /etc/netplan/00-installer-config.yaml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在文件中添加DNS配置（示例，根据你的网卡调整）</span></span>
<span class="line"><span>network:</span></span>
<span class="line"><span>  ethernets:</span></span>
<span class="line"><span>    ens33:  # 替换成你的网卡名（用ip addr查看）</span></span>
<span class="line"><span>      dhcp4: true</span></span>
<span class="line"><span>      nameservers:</span></span>
<span class="line"><span>        addresses: [223.5.5.5, 119.29.29.29]</span></span>
<span class="line"><span>  version: 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 应用netplan配置</span></span>
<span class="line"><span>sudo netplan apply</span></span></code></pre></div><h5 id="_11、安装docker-命令补全工具" tabindex="-1">11、安装Docker 命令补全工具 <a class="header-anchor" href="#_11、安装docker-命令补全工具" aria-label="Permalink to &quot;11、安装Docker 命令补全工具&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt-get install bash-completion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo curl -L https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker -o /etc/bash_completion.d/docker.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>source /etc/bash_completion.d/docker.sh</span></span></code></pre></div><h5 id="_12、允许非root用户执行docker-命令" tabindex="-1">12、允许非Root用户执行docker 命令 <a class="header-anchor" href="#_12、允许非root用户执行docker-命令" aria-label="Permalink to &quot;12、允许非Root用户执行docker 命令&quot;">​</a></h5><p>当我们安装好了Docker之后，有两种方式来执行docker 命令</p><p>在docker命令前加上sudo, 比如：sudo docker ps sudo -i 切换至root用户，再执行docker 命令 是不是可以让当前用户在不切root，或者不加sudo 的情况下正常使用 docker 命令呢？答案是有的。</p><h6 id="添加docker用户组" tabindex="-1">添加docker用户组 <a class="header-anchor" href="#添加docker用户组" aria-label="Permalink to &quot;添加docker用户组&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo groupadd docker</span></span></code></pre></div><h6 id="将当前用户添加到用户组" tabindex="-1">将当前用户添加到用户组 <a class="header-anchor" href="#将当前用户添加到用户组" aria-label="Permalink to &quot;将当前用户添加到用户组&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo usermod -aG docker $USER</span></span></code></pre></div><h6 id="使权限生效" tabindex="-1">使权限生效 <a class="header-anchor" href="#使权限生效" aria-label="Permalink to &quot;使权限生效&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>newgrp docker</span></span></code></pre></div><h6 id="测试一下" tabindex="-1">测试一下 <a class="header-anchor" href="#测试一下" aria-label="Permalink to &quot;测试一下&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#查看所有容器</span></span>
<span class="line"><span>docker ps -a</span></span></code></pre></div><h4 id="最后一步-更新-bashrc文件" tabindex="-1">最后一步 更新.bashrc文件 <a class="header-anchor" href="#最后一步-更新-bashrc文件" aria-label="Permalink to &quot;最后一步 更新.bashrc文件&quot;">​</a></h4><p>我们需要编辑 ~/.bashrc文件，并在文件末尾增加如下一行,如果不在.bashrc文件中增加下面这一行命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#如果没有此行命令，你会发现，当你每次打开新的终端</span></span>
<span class="line"><span>#你都必须先执行一次 “newgrp docker” 命令</span></span>
<span class="line"><span>#否则当前用户还是不可以执行docker命令</span></span>
<span class="line"><span>groupadd -f docker</span></span></code></pre></div><h3 id="卸载-docker" tabindex="-1">卸载 Docker <a class="header-anchor" href="#卸载-docker" aria-label="Permalink to &quot;卸载 Docker&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo apt purge docker-ce docker-ce-cli containerd.io</span></span>
<span class="line"><span>sudo rm -rf /var/lib/docker</span></span>
<span class="line"><span>sudo rm -rf /var/lib/containerd</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>我想这是Ubuntu下安装Docker环境你所需要的一份完整的指引了，希望对大家有所帮助。</p><h2 id="更新" tabindex="-1">更新 <a class="header-anchor" href="#更新" aria-label="Permalink to &quot;更新&quot;">​</a></h2><p>关于最近国内无法访问到Docker的，首先在安装的时候，我们可以选国内阿里的源。参考上面的更新。</p><p>另外，我们需要在docker daemon 配置文件中增加国的可用的 docker hub mirror ，</p><p>找到你的daemon.json 文件，通常在 /etc/docker/daemon.json 这个位置</p><p>在daemon.json 中增加</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>    &quot;https://docker.m.daocloud.io&quot;</span></span>
<span class="line"><span>  ]</span></span></code></pre></div><p>通常来讲如果没有其它的配置，那么daemon.json完整的文件内容就是</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>        &quot;https://docker.m.daocloud.io&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>目前可用的国内docker hub 镜像，<a href="https://docker.m.daocloud.io" target="_blank" rel="noreferrer">https://docker.m.daocloud.io</a>。</p><h3 id="docker-hub-拉取镜像失败的网络问题" tabindex="-1">Docker Hub 拉取镜像失败的网络问题 <a class="header-anchor" href="#docker-hub-拉取镜像失败的网络问题" aria-label="Permalink to &quot;Docker Hub 拉取镜像失败的网络问题&quot;">​</a></h3><p>这通常意味着 Docker 客户端在等待 Docker Hub 响应时超时了。可能的原因包括：</p><ol><li><strong>网络连接问题</strong>：您的计算机可能无法访问 Docker Hub，或者网络连接不稳定。</li><li><strong>Docker 服务问题</strong>：Docker 服务可能没有正确运行。</li><li><strong>防火墙或代理设置</strong>：防火墙或代理可能阻止了 Docker 客户端访问 Docker Hub。</li></ol><h2 id="_2-docker命令" tabindex="-1">2.Docker命令 <a class="header-anchor" href="#_2-docker命令" aria-label="Permalink to &quot;2.Docker命令&quot;">​</a></h2><h3 id="_2-1-服务相关命令" tabindex="-1">2.1 服务相关命令 <a class="header-anchor" href="#_2-1-服务相关命令" aria-label="Permalink to &quot;2.1 服务相关命令&quot;">​</a></h3><p>启动docker服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl start docker</span></span></code></pre></div><p>停止docker服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl stop docker</span></span></code></pre></div><p>重启docker服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl restart docker</span></span></code></pre></div><p>查看docker服务状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl status docker</span></span></code></pre></div><p>设置开机启动docker服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl enable docker</span></span></code></pre></div><p>重启docker服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl restart docker</span></span></code></pre></div><h3 id="_2-2-镜像-相关命令" tabindex="-1">2.2 镜像 相关命令 <a class="header-anchor" href="#_2-2-镜像-相关命令" aria-label="Permalink to &quot;2.2 镜像 相关命令&quot;">​</a></h3><p>查看镜像：查看本地所有的镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker images</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker images -q # 查看所用镜像的id</span></span></code></pre></div><p>搜索镜像：从网络中查找需要的镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker search 镜像名称</span></span></code></pre></div><p>拉取镜像：从docker仓库下载镜像到本地，镜像名称格式为名称：版本号，如果版本号不指定则是最新的版本。</p><p>如果不知道镜像版本，可以去 <a href="https://hub.docker.com/" target="_blank" rel="noreferrer">docker hub</a>搜索对应镜像查看。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker pull 镜像名称</span></span></code></pre></div><p>拉取指定CPU架构并且指定ubuntu版本的docker：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># aarch64 (arm v8) CPU架构：</span></span>
<span class="line"><span>docker pull --platform=linux/aarch64 ubuntu:22.04</span></span>
<span class="line"><span># x86_64 CPU架构：</span></span>
<span class="line"><span>docker pull --platform=linux/x86_64 ubuntu:22.04</span></span></code></pre></div><p>查看镜像的架构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker image inspect ubuntu:22.04 | grep Architecture</span></span>
<span class="line"><span># &quot;Architecture&quot;: &quot;arm64&quot;,</span></span></code></pre></div><p>查看主机架构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arch</span></span>
<span class="line"><span># x86_64</span></span></code></pre></div><p>删除镜像：删除本地镜像</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker rmi 镜像id # 删除指定本地镜像</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker rmi \`docker images -q\`  # 删除所有本地镜像</span></span></code></pre></div><h3 id="_2-3-容器相关命令" tabindex="-1">2.3 容器相关命令 <a class="header-anchor" href="#_2-3-容器相关命令" aria-label="Permalink to &quot;2.3 容器相关命令&quot;">​</a></h3><ul><li>查看容器</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker ps  #查看正在运行的容器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker ps -a  #查看所有容器</span></span></code></pre></div><ul><li>创建并启动容器</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run 参数</span></span></code></pre></div><ul><li>进入 容器</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker exec 参数 容器名称/容器id bash</span></span>
<span class="line"><span>docker exec -it test bash</span></span></code></pre></div><ul><li>停止容器</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker stop 容器名称/容器id</span></span></code></pre></div><ul><li>启动容器</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker start 容器名称/容器id</span></span></code></pre></div><ul><li>删除容器：如果容器是运行状态则删除失败，需要停止容器才能删除。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker rm 容器名称/容器id</span></span></code></pre></div><ul><li>查看容器信息</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker inspect 容器名称/容器id</span></span></code></pre></div><h2 id="_3-docker容器的数据卷" tabindex="-1">3.Docker容器的数据卷 <a class="header-anchor" href="#_3-docker容器的数据卷" aria-label="Permalink to &quot;3.Docker容器的数据卷&quot;">​</a></h2><h5 id="_3-1-数据卷概念" tabindex="-1">3.1 数据卷概念 <a class="header-anchor" href="#_3-1-数据卷概念" aria-label="Permalink to &quot;3.1 数据卷概念&quot;">​</a></h5><p>数据卷 数据卷是宿主机中的一个目录或文件 当容器目录和数据卷目录绑定后，对方的修改会立即同步 一个数据卷可以被多个容器同时挂载 一个容器也可以挂在多个数据卷</p><h5 id="_3-2-数据卷作用" tabindex="-1">3.2 数据卷作用 <a class="header-anchor" href="#_3-2-数据卷作用" aria-label="Permalink to &quot;3.2 数据卷作用&quot;">​</a></h5><p>容器数据持久化 外部机器和容器间接通信 容器之间数据交换</p><h5 id="_3-3-数据卷配置" tabindex="-1">3.3 数据卷配置 <a class="header-anchor" href="#_3-3-数据卷配置" aria-label="Permalink to &quot;3.3 数据卷配置&quot;">​</a></h5><p>创建启动容器时，使用-v参数设置数据卷</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run … -v 宿主机目录（文件）：容器目录（文件）…</span></span></code></pre></div><p><strong>注意事项：</strong></p><ul><li>目录必须是绝对路径（/开头是绝对，./开头是相对)</li><li>如果目录不存在，会自己创建</li><li>可以挂载多个数据卷</li></ul><h4 id="一个容器挂载多个数据卷" tabindex="-1">一个容器挂载多个数据卷： <a class="header-anchor" href="#一个容器挂载多个数据卷" aria-label="Permalink to &quot;一个容器挂载多个数据卷：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -it --name=c2 \\</span></span>
<span class="line"><span> -v ~/data2:/root/data2 \\</span></span>
<span class="line"><span> -v ~/data3:/root/data3 \\</span></span>
<span class="line"><span> centos:7</span></span></code></pre></div><blockquote><p>centos:7表示镜像为centor，版本为7</p></blockquote><h4 id="一个数据卷挂载多个容器" tabindex="-1">一个数据卷挂载多个容器： <a class="header-anchor" href="#一个数据卷挂载多个容器" aria-label="Permalink to &quot;一个数据卷挂载多个容器：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -it --name=c3 -v ~/data:/root/data centos:7</span></span>
<span class="line"><span>docker run -it --name=c4 -v ~/data:/root/data centos:7</span></span></code></pre></div><h3 id="_3-4-数据卷容器" tabindex="-1">3.4 数据卷容器 <a class="header-anchor" href="#_3-4-数据卷容器" aria-label="Permalink to &quot;3.4 数据卷容器&quot;">​</a></h3><p>多容器进行数据交换</p><blockquote><p>1.多个容器挂载同一个数据卷</p><p>2.数据卷容器</p></blockquote><h5 id="配置数据卷容器" tabindex="-1">配置数据卷容器 <a class="header-anchor" href="#配置数据卷容器" aria-label="Permalink to &quot;配置数据卷容器&quot;">​</a></h5><p>1.创建启动<code>c3</code>数据卷容器，使用<code>-v</code>参数设置数据卷</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -it --name=c3 -v /volume centos:7 /bin/bash</span></span></code></pre></div><blockquote><p><code>c3</code>容器的目录是<code>/volume</code>,宿主机目录会自己分配一个，可以使用<code>docker inspect 容器名称/容器id</code>指令进行查看。</p></blockquote><p>2.创建启动<code>c1</code>，<code>c2</code>容器，使用<code>--volumes-from</code> 参数设置数据卷</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -it --name=c1 --volumes-from c3 centos:7 /bin/bash</span></span>
<span class="line"><span>docker run -it --name=c2 --volumes-from c3 centos:7 /bin/bash</span></span></code></pre></div><blockquote><p><code>c1</code>和<code>c2</code>容器的目录也是<code>/volume</code>，宿主机目录和<code>c3</code>是同一个目录。</p></blockquote><h2 id="_4-常用指令" tabindex="-1">4.常用指令 <a class="header-anchor" href="#_4-常用指令" aria-label="Permalink to &quot;4.常用指令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker ps -a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker stop 603ff4a03cffe2278b2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker rm 603ff4a03cffe2278b2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 拷贝本机上的文件到docker环境中</span></span>
<span class="line"><span>docker cp test.zip 62471a960847:/root/opencv/lib_cmake</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 拷贝docker环境中的文件到本机上</span></span>
<span class="line"><span>docker cp &lt;容器ID或容器名称&gt;:&lt;容器内路径&gt; &lt;本机路径&gt;</span></span>
<span class="line"><span>docker cp my_container:/usr/local/myfolder /home/user/myfolder</span></span></code></pre></div>`,149)]))}const k=a(i,[["render",l]]);export{u as __pageData,k as default};
