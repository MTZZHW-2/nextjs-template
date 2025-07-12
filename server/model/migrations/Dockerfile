FROM node:22 AS base

FROM base AS deps
WORKDIR /app
RUN corepack enable pnpm && pnpm add dotenv-cli@8 prisma@6 @prisma/client@6

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY .env.production ./
COPY server/model ./server/model

CMD ["sh", "-c", "npm run prisma:generate && npm run prisma:migrate"]