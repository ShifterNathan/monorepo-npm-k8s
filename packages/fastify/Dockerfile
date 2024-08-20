ARG IMAGE_TAG=20-alpine3.19
ARG BASE_IMAGE=ghcr.io/base-repository/dpt-images/utils/docker-images/node:${IMAGE_TAG} 


FROM ${BASE_IMAGE}
RUN apk update && apk upgrade

### Edit this variables to match the current package

ARG PACKAGE_NAME=fastify

### Do not edit beyond this line if you don't know what you are doing

ENV PKG=${PACKAGE_NAME}

ARG TOKEN_NPM
ENV github_token=$TOKEN_NPM

# create required directories
RUN mkdir -p /var/app/current/packages/${PACKAGE_NAME}

WORKDIR /var/app/current

# Copy packages
COPY packages/${PACKAGE_NAME}/package.json packages/${PACKAGE_NAME}/package.json
COPY package.json .
COPY package-lock.json .

RUN npm i --omit=dev --ignore-scripts

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npm start -w packages/${PKG}"]

