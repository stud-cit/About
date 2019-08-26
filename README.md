# About
This project consists of two applications: SPA and API. Built on modern and promising technology. The client part is a bunch of Nuxt.js, Vuetify, and other modules ( seriously, there are a lot of them :3 ). The server part is a bunch of Nest.js + TypeORM ( MySQL ) + Swagger + Multer. The impetus for the creation of this project was the lack of our own website from our organization.

## Attention
We use the latest modules, so there may be conflicts between dependencies. One way to prevent npm cache errors is to execute the following series of commands:
```bash
# Delete current modules
$ rm -rf node_modules package-lock.json
# Forced clearing the cache
$ npm cache clean --force
# Install dependencies
$ npm i
```

## Quick start
1. Сlone this repository
2. Install all dependency in-of both project
3. Create a copy of the file `*.env` and rename it to `.env` in-of both project
4. And now the paths diverge:

#### If You are a Front-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a installed dependencies and an environment file.
```bash
# Install dependencies
$ npm i
# Run the project in development mode
$ npm run start:dev
```

#### If You are a Back-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a docker, installed dependencies and an environment file.
```bash
# Install dependencies
$ npm i
# Deployment the database for development
$ npm run database:up
# Run the project in development mode
$ npm run start:dev
```

