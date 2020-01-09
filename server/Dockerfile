FROM node:alpine AS builder

WORKDIR /home/node/

ENV NODE_ENV production

COPY ./src ./src
COPY ./test ./test
COPY ./static/ ./static
COPY ./coverage/ ./coverage

COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./.env.${NODE_ENV} ./

USER root

RUN apk add --no-cache --virtual \
		deps \
	  python \
	  build-base \
	&& npm i --production \
	&& npm i -g \
		typescript \
		@compodoc/compodoc \
	&& npm audit fix \
	| compodoc \
 	| npm run build \
 	&& rm -rf \
		src \
		test \
		tsconfig*.json \
		/var/cache/apk/*


FROM node:alpine

ENV NODE_ENV production

COPY --from=builder /home/node/ .

ENTRYPOINT [ "npm" ]
CMD ["run", "start:prod"]
