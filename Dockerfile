FROM mhart/alpine-node:10

WORKDIR /app/pixels.chrisesplin.com/functions

COPY ./app/pixels.chrisesplin.comfunctions/package.json package.json
COPY ./app/pixels.chrisesplin.comfunctions/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production

WORKDIR /app/pixels.chrisesplin.com

COPY ./app/pixels.chrisesplin.com/package.json package.json
COPY ./app/pixels.chrisesplin.com/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production

ADD ./app /app

WORKDIR /app

RUN yarn && yarn ci:build
