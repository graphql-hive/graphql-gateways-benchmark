FROM node:23-slim

RUN apt-get updapte -y && apt-get install curl -y

WORKDIR /home/gw
COPY supergraph.graphql index.ts ./
COPY package.json yarn.lock ./

RUN yarn install --production
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

CMD ["yarn", "start"]
