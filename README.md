# About
This project consists of two applications: SPA and API. Built on modern and promising technology. The client part is a bunch of Nuxt.js, Vuetify, and other modules ( seriously, there are a lot of them :3 ). The server part is a bunch of Nest.js + TypeORM ( MySQL ) + Swagger + Multer. The impetus for the creation of this project was the lack of our own website from our organization.

#### If You are a Front-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a installed dependencies and an environment file.
```bash
# Install dependencies
$ npm i
# Install client deps
$ cd client && npm i
# Clone env.development to .env
$ cp .env.development .env
# Run the project in development mode
$ npm run client:start:dev
```

#### If You are a Back-end developer:
The following steps may cause difficulties, feel free to ask questions. You need a docker, installed dependencies and an environment file.
```bash
# Clone repo
$ git clone https://bitbucket.org/dkd13/studcit-backend/src/master/
# Download openserver
$ Run openserver
$ Create database studcit
$ Copy and fill env.example files with appropriate data
# Install dependencies
$ composer install
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
   libs - fideloper/proxy: ^4.0,
        fruitcake/laravel-cors: ^1.0,
        laravel/framework: ^6.2,
        laravel/passport: ^8.4,
        laravel/tinker: ^2.0

	HTTP - Apache_2.4-PHP_7.2-7.3-x64
	PHP - 7.2-x64
	MySQL - 5.6-x64
	phpMyAdmin - 4.8.5
```

