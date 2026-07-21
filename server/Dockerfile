# ── Stage 1: Install dependencies ──────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# ── Stage 2: Production image ────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only prod dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Never bake .env into the image — inject at runtime via docker-compose
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8080

CMD ["node", "index.js"]