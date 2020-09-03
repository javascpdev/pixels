FROM mhart/alpine-node:10

RUN apk add --update zip

WORKDIR /app/extension
COPY ./app/extension/package.json package.json
COPY ./app/extension/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production

WORKDIR /app/pixels.chrisesplin.com/functions
COPY ./app/pixels.chrisesplin.com/functions/package.json package.json
COPY ./app/pixels.chrisesplin.com/functions/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production

WORKDIR /app/pixels.chrisesplin.com
COPY ./app/pixels.chrisesplin.com/package.json package.json
COPY ./app/pixels.chrisesplin.com/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production

ADD ./app /app

WORKDIR /app

RUN yarn ci:build
