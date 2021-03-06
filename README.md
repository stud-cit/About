﻿# About
This project consists of two applications: SPA and API. Built on modern and promising technology. The client part is a bunch of Nuxt.js, Vuetify, and other modules ( seriously, there are a lot of them :3 ). The server part is a bunch of Nest.js + TypeORM ( MySQL ) + Swagger + Multer. The impetus for the creation of this project was the lack of our own website from our organization.

#### If You are a Front-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a installed dependencies and an environment file.
```bash
# Node version - v12.16.1
# Install dependencies
$ npm i
# Clone env.development to .env
$ cp .env.development .env
# Run the project in development mode
$ npm run start:dev
```

### Admin path - /dashboard/auth

#### If You are a Back-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a docker, installed dependencies and an environment file.
```bash
# Clone repo
$ git clone https://bitbucket.org/dkd13/studcit-backend/src/master/
# Download openserver
$ Run openserver
$ Create database studcit
$ Copy and fill env.example files with appropriate data
# Generate key
$ php artisan key:generate
# Install dependencies
$ composer install
# Link storage
$ php artisan storage:link
# Migrate db
$ php artisan migrate:fresh —seed
# Install passport
$ php artisan passport:install
# Run backend
$ php artisan serve --port 8081

# Your credentials for db is located in \database\seeds\UsersTableSeeder.php
# Optional if you want to change admin sername and password
$ php artisan config:cache
$ re-rerun migrations

# Versions for back-end deploy
	PHP - 7.2
	MySQL - 5.6
	Composer - 1.10
```

