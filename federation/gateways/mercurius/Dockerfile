FROM node:23-slim

RUN apt-get update -y && apt-get install curl -y

WORKDIR /home/gw
COPY index.ts ./
COPY package.json yarn.lock ./

RUN yarn install --production
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

WORKDIR /home/gw

CMD ["yarn", "start"]
