FROM node:22.15.0-alpine

WORKDIR /app

RUN apk add git

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run lint
RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD ["serve", "-s", "dist"]