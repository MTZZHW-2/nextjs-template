FROM node:20 AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN \
    if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nextjs --uid 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME=0.0.0.0 node server.js
