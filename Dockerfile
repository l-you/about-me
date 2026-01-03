# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Production stage - static-web-server
FROM docker.io/joseluisq/static-web-server:2-alpine

WORKDIR /public
COPY --from=builder /app/out /public

EXPOSE 3000
ENV SERVER_PORT=3000
ENV SERVER_ROOT=/public
ENV SERVER_LOG_LEVEL=warn
ENV SERVER_ERROR_PAGE_404=./404.html
