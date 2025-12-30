# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Production stage - miniserve
FROM docker.io/svenstaro/miniserve:alpine

COPY --from=builder /app/out /data

EXPOSE 3000

ENTRYPOINT ["/app/miniserve", "/data", "--port", "3000", "--index", "index.html"]
