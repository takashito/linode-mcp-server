# Build stage
FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# Runtime stage
FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --omit=dev

COPY --from=build /app/dist ./dist

# Environment variables (override at runtime with -e)
ENV PORT=8080
ENV ENDPOINT=/mcp
ENV CATEGORIES=""
ENV LINODE_API_TOKEN=""

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "node dist/index.js --transport http --port $PORT --endpoint $ENDPOINT ${LINODE_API_TOKEN:+--token $LINODE_API_TOKEN} ${CATEGORIES:+--categories $CATEGORIES}"]
