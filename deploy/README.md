# 自托管本项目

本指南适用于 Ubuntu 22.04 系统。

## 环境准备

### 更新系统

确保系统的软件包是最新的：

```bash
sudo apt update && sudo apt upgrade -y
```

### 安装 Docker 和 Docker Compose

通过 Snap 安装 Docker：

```bash
sudo snap install docker
```

## 构建项目镜像

### 克隆项目

1. 生成 SSH 密钥并添加到 GitHub：

```bash
ssh-keygen -t ed25519 -C "root@mtzzhw.com"
```

2. 克隆项目到本地：

```bash
git clone --depth 1 git@github.com:MTZZHW/template.git
cd template
```

### 构建镜像

运行以下命令构建项目镜像：

```bash
make -s build-web
```

## 启动服务

### 启动项目

等待镜像构建完成后，运行以下命令启动项目：

```bash
make -s start-web
```

### 启动代理服务器

启动代理服务器：

```bash
make -s start-proxy
```

> **注意**：首次启动时会检查 SSL 证书。如果没有证书，系统会自动申请（请提前配置好 DNS）。

### 检查运行状态

使用以下命令查看容器运行状态：

```bash
docker ps -a
```

如果输出类似以下内容，则表明服务已成功启动并正常运行：

| CONTAINER ID | IMAGE               | COMMAND | CREATED | STATUS        | PORTS | NAMES |
| ------------ | ------------------- | ------- | ------- | ------------- | ----- | ----- |
| cc7db4df9671 | nginx               | …       | …       | Up 36 seconds | …     | …     |
| 34bfc08d2d58 | mtzzhw/template-web | …       | …       | Up 19 minutes | …     | …     |
