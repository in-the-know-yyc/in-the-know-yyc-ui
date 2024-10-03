FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install --production=false
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start"]
