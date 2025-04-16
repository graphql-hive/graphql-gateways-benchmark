FROM node:23-slim

RUN apt-get install curl

RUN addgroup -S gw && adduser -S gw -G gw

WORKDIR /home/gw
COPY supergraph.graphql index.ts ./
COPY package.json yarn.lock ./

RUN yarn install --production
ENV PORT 4000
ENV NODE_ENV production

EXPOSE 4000

USER gw
WORKDIR /home/gw

CMD yarn start