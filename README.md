<div align="center">
  <h1>Next.js Template</h1>
  <p>🚀 开箱即用的 Next.js 项目模板，集成现代工具链和最佳实践</p>
</div>

Next.js Template 是一个开箱即用的项目模板，旨在帮助开发者快速启动基于 Next.js 的 Web 应用程序。通过使用此模板，您可以专注于业务逻辑开发，而无需从头配置项目环境。

## 快速开始

### 开发环境

1. 安装依赖：
   ```bash
   pnpm install
   ```
2. 初始化开发环境：
   ```bash
   pnpm run dev:init
   ```
3. 启动开发服务器：
   ```bash
   pnpm run dev
   ```
4. 打开 [http://localhost:3000](http://localhost:3000) 查看项目。

### 构建与运行

1. 构建项目：
   ```bash
   pnpm run build
   ```
2. 本地运行：
   ```bash
   pnpm run start
   ```
3. 打开 [http://localhost:3000](http://localhost:3000) 查看项目。

## 数据库配置

### 生成 Prisma Client

每次修改 Prisma 模式文件后，运行以下命令更新 Prisma Client：

```bash
pnpm run prisma:generate
```

## 部署

您可以选择以下方式部署项目：

- **Vercel 一键部署**：快速将项目部署到 Vercel。
- **自托管**：参考[自托管指南](./docker/README.md)。
