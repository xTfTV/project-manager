# -------------------------
# Stage 1: Install dependencies
# -------------------------
FROM node:22-alpine AS deps

WORKDIR /app

# Match the npm version used locally
RUN npm install -g npm@11.6.2

COPY package.json package-lock.json ./

RUN npm ci


# -------------------------
# Stage 2: Build the app
# -------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Match npm version here too
RUN npm install -g npm@11.6.2

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# -------------------------
# Stage 3: Production runtime
# -------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the app as a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy Next.js standalone production build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static Next.js files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]