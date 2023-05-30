# Install dependencies only when needed
FROM docker.io/node:lts-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY dist/packages/backend/package*.json ./
COPY dist/packages/backend/prisma ./prisma/
RUN npm install --only=production
RUN npx prisma generate


# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/insignia?schema=public
ENV PORT 80

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/packages/backend .
RUN chown -R node:node .
USER node
EXPOSE 80
CMD ["dumb-init", "node", "main.js"]
