#development stage
FROM node:18-alpine as development


WORKDIR /app


COPY package*.json ./


RUN npm ci

COPY . .


RUN VITE_API_URL=https://node103.cs.colman.ac.il/api npm run build

#production stage
FROM caddy:2-alpine as production
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv

