---
title: npm
date: 2026-03-02
tags:
 - npm
 - 镜像站
categories:
 - npm命令
sticky: 3
---



# npm概述

**npm** 是 Node.js 官方提供的包管理工具，用于管理项目的依赖包，包括安装、卸载、更新等操作。它是全球最大的模块生态系统，默认从国外的 npm 官方镜像下载依赖包。

**cnpm** 是淘宝团队基于 npm 定制的工具，主要为了解决国内网络环境下使用 npm 下载速度慢的问题。cnpm 使用淘宝 NPM 镜像源，提供更快的下载速度，同时与 npm 的使用方式完全一致，只需将命令中的 *npm* 替换为 *cnpm* 即可。

**cnpm**、**yarn**、**pnpm**等工具都是基于**npm**包管理器的一些变种。解决了早期`npm`的一些缺点，例如下载速度慢，不能离线下载等。

使用场景

npm 适用于全球范围的开发者，但在国内网络环境下，可能会因连接国外服务器而导致下载缓慢或失败。此时，cnpm 是更好的选择，尤其是在需要频繁安装依赖的情况下。

> ```
> npx是npm5.2版本新增的一个命令，如果npm版本没到v5.2，请运行npm install -g npx
> npx方便使用一次就丢弃的情况，不会全局安装
> 使用一次后面几乎就不怎么使用了，非常浪费磁盘空间。
> npx会下载会放在临时文件中，过一段时间会自动清除，注意不会立即清除，
> ```





### 主要的`npm`版本更新日程：

主要的npm版本更新日程：

1. npm@v1.0.0 首次发布--2010年
2. npm@v3.0.0 node_modules目录结构扁平化 --2015年06月
3. npm@4.0.0 package-lock.json前身npm-shrinkwrap.json用于依赖锁定--2016年10月
4. npm@v5.0.0 package-lock.json默认生成，并兼容npm-shrinkwrap.json，重构npm-cache，大大提升下载速度 --2017年05月
5. npm@v5.2.0 npx命令发布 --2017年07月
6. npm@v6.0.0 增加npm init --2018年05月







### npm 安装和使用

**全称: Node Package Manager**

**特点**:

- 是 Node.js 的官方包管理工具，随 Node.js 一起安装。
- 拥有最大的包生态系统，几乎所有 JavaScript 包都发布在 npm 上。
- 支持 package.json 文件管理依赖。
- 提供了 npm install、npm run、npm publish 等常用命令。









### cnpm 安装和使用

安装 cnpm 的命令如下：

```bash
npm config set registry https://registry.npmmirror.com/
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装完成后，可以通过以下命令验证版本：

```bash
cnpm -v
```

使用 cnpm 安装依赖时，只需将 *npm install* 替换为 *cnpm install*，例如：

```bash
cnpm install <package-name>
```

安装所有依赖

```
cnpm install
```



总结来说，npm 和 cnpm 的核心区别在于下载源的不同。npm 使用官方镜像，适合全球开发者；cnpm 使用淘宝镜像，优化了国内的下载速度。开发者可以根据网络环境和项目需求选择合适的工具。

### yarn 安装和使用

`yarn`也是一个包管理器，它和`npm`其实没有本质区别，都是管理和安装包的。

- 支持离线安装（`npm@5`已支持）
- 树形结构的依赖
- 依赖安装确定性yarn.lock
- 安装失败自动重试



安装：

```text
npm install -g yarn
```

安装包：

```text
yarn add [package]
```

删除包：

```text
yarn remove [package]
```

### pnpm安装和使用

`pnpm`也是一个包管理器，它巧妙的使用了类似于`linux`的软连接方式，达到一个模块文件多处服用，解决了`yarn、npm`在多个项目安装同一个依赖时会下载重复文件的问题，避免磁盘的浪费，同时大大提升下载速度。

下面是`pnpm`的一些特点：

1. `pnpm`运行起来非常的快，超过了`npm`和`yarn`。
2. `pnpm`采用了一种巧妙的方法，利用硬链接和符号链接来避免复制所有本地缓存源文件。也就是说多个项目相同的依赖只会在某处安装一次，连接过来直接使用，节省了安装时间和瓷盘空间。
3. `pnpm`继承了`yarn`和新版`npm`的所有优点，包括离线模式和确定性安装。
4. 但是链接在一些场景下会存在兼容的问题，例如`Electron` 应用无法使用 `pnpm`、部署在 `lambda` 上的应用无法使用 `pnpm`

安装：

```text
npm install -g pnpm
```

初始化项目要：

```
pnpm init
```

安装包：

```text
pnpm add [package-name]
```

删除包：

```text
pnpm remove [package]
```

## 



#  npm mirror镜像源



### 国内镜像源

>  TIP
>
> npm 默认的镜像源下载速度很慢，通常切换国内淘宝镜像源，下载速度更快



### 查看当前正在使用的 npm 镜像源

```shell
npm config get registry
#临时使用 npm 镜像源（仅使用一次淘宝镜像源地址）
npm --registry https://registry.npmmirror.com install <ModuleName>
```

***腾讯云 NPM 镜像***：`https://mirrors.cloud.tencent.com/npm/`

***华为云 NPM 镜像***：`https://repo.huaweicloud.com/repository/npm/`

***淘宝 NPM 镜像：***`https://registry.npmmirror.com/`

###  切换 npm 镜像源

一旦你找到了最新的镜像源，你可以使用以下命令来切换到新的镜像源：

```shell
npm config set registry https://registry.npmmirror.com/
npm config set registry https://registry.npmmirror.com
```

查看所有配置的镜像，可以使用：

```shell
npm config get registry   查看镜像源地址
npm config get registry -l
```

安装完成后，可以直接使用cnpm安装所需的包，例如：

```shell
cnpm install [package_name]
```

### node 的包管理器

### 

NPM是node package manager的简称

### 💡 cnpm使用说明

你可以使用我们定制的[cnpm](https://npmmirror.com/package/cnpm)命令行工具代替默认的 npm。
cnpm 支持除了写相关操作外的所有命令，例如 install、info、view 等。

```
npm install -g cnpm --registry=https://registry.npmmirror.com
```

当然，你也可以使用任意你心仪的命令行工具，只要配置 registry 即可

```
npm config set registry https://registry.npmmirror.com
```

### 🎯安装模块

```
$ cnpm install [name]
```

### 同步模块

```
$ cnpm sync cnpmcore
```

当然, 你可以直接通过 web 方式来同步, 界面打开时会自动比对版本信息

```
$ open https://npmmirror.com/sync/cnpmcore
```

### npm升级到最新

```
npm install -g npm@latest



npm install -g vuepress 
```













## npm常用命令

检测是否安装及版本

```sh
npm -v # 显示版本号说明已经安装相应的版本
```

生成 package.json 文件

```sh
npm init # 初始化生成package.json

```

> package.json 用来描述项目中用到的模块和其他信息



#### 1.下载包

本地下载

```shell
npm install # 安装package.json定义好的模块，简写 npm i
# 查看所有全局安装的包
npm ls -g
# 查看本地项目中安装的包
npm ls
# 查看帮助
npm help

```



1. 开发依赖

```shell
npm install 包名 --D
#简写
npm i 包名 -D
```



2. 线上依赖

```shell
npm install 包名 --save
#简写
npm i 包名 -S
# 安装包的同时，将信息写入到package.json中的 dependencies 配置中
npm i <ModuleName> --save
# 安装包的同时，将信息写入到package.json中的 devDependencies 配置中
npm i <ModuleName> --save-dev

# 安装方式参数：
-save # 简写-S，加入到生产依赖中
-save-dev # 简写-D，加入到开发依赖中
-g # 全局安装 将安装包放在 /usr/local 下或者你 node 的安装目录
```



全局下载 在任意地方都需要使用的命令

```shell
webpack gulp  vue  create-react-app ....
npm install/i 包名 -g 
# 全局安装
npm i <ModuleName> -g

```

下载指定版本的包

```shell
npm i 包名@版本号 -D/-S
```

#### 2.卸载包

本地卸载

1. 开发依赖

```shell
npm uninstall 包名 -D 
```

2.线上依赖

```shell
npm uninstall 包名 --save/-S
```

全局卸载

```shell
npm uninstall 包名 -g
# 卸载本地模块
npm uninstall <ModuleName>

# 卸载全局模块
npm uninstall -g <ModuleName> # 卸载全局软件包。
```

#### 3.更新包

```
npm update 包名 -D/-S/-g
# 更新本地模块
npm update <ModuleName>
# 更新全局模块
npm update -g <ModuleName> # 更新全局软件包。
npm update -g # 更新所有的全局软件包。
npm outdated -g --depth=0 # 找出需要更新的包。
```

#### 4.使用包

```plaintext
require(模块标识)   ：默认查找的是module.exports 抛出的模块

exports 抛出模块 是module.exports 的一个别名   exports 是不能直接赋值的，需要以属性的
形式去抛出方法或属性


模块标识：包名和路径  路径：绝对路径和相对路径

绝对路径：相对盘,域名    /

相对路径： ./  ../ ../../
```

#### 5.查看全局包路径

```shell
npm root -g
```

#### 6.清空缓存

```sh
# 清空npm缓存
npm cache clear
```

#### package.json  包描述文件

生成一个package.json文件  

```shell
npm init 
npm init -y 快速生成
```

```
{
	"name": "npm-demo",   //包名
	"version": "1.0.0",   //版本号
	"description": "",    //描述
	"main": "index.js",   //入口文件
	"scripts": {          //命令
		"test": "echo "Error: no test specified" && exit 1"
	},
	"author": "",         //作者
	"license": "ISC",
	"dependencies": {
		"swiper": "^6.6.1"   //是一个范围   swiper 升级到7.0.0
	}
}
```

**package-lock.json** ：锁定版本号和下载的镜像源

#### 包的查找规则

1. node_modules 文件

先在当前文件夹下查找  --->  往上一级找 ---->....  --->磁盘根目录--->全局里 NODE_PATH 指定的路径里查找

1. 在node_modules文件夹

查找对应包名的文件 ---> package.json文件  ---> main主入口文件 报 can not find  modules xxx

#### 发布包

1. 新建一个文件夹，生成一个package.json文件
2. 确保当前是在国外镜像源
3. 编写包的逻辑，抛出外界的需要的接口
4. 登录npm官网，发布

```
npm login  ：输入用户名和密码邮箱

npm publish  :发包
```

**注**：包名不能和现有的包名冲突

```
npm unpublish 包名 --force  强制从npm的官网上删除包
```

