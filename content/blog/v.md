---
title: Nuxt.js 3 with Prisma
description: Learn how to get started with Prisma and Nuxt 3
date: 2023-06-26
cover: golf0.jpg
tags:
- nuxt
- vue
- prisma
---

# Learn how to get started with Prisma and Nuxt 3

*Our goal is to add the Prisma database client to a server-side rendered application using the latest version of Nuxt.js! That means we can write our back and front-end code within the same project!* 

Prisma is a node.js and typescript ORM which provides a type-safe database client to help build full-stack apps. We will utilize it today by adding an API to a Nuxt 3 application with Postgres SQL as our database, however, it is framework agnostic and compatible with other databases and libraries, including: Next.js and Express.js and can be paired with MySQL, SQLite or MongoDB.

*An ORM stands for Object Relational Mapping and is a programming technique for converting data between different type systems in object-oriented programming languages.*

Prisma is quite extensive so this demo is just for getting started and will only cover the basics. The main topics covered will include: 

- Create a minimal Nuxt 3 project from scratch
- Add and setup Prisma
- Retrieve data from local Postgres database
- Use dynamic routing to view specific information

<!--more-->

### Install and setup new Prisma project



```js
npm install prisma --save-dev
npx prisma
npx prisma init

```


The npx prisma init command creates a prisma folder within the project folder directory which will define the connection to our database.

### Create new migration folder in Prisma
The following generates our schema artifacts


```js
npx prisma generate
```


Set DATABASE_URL in .env file to point to database and also set provider of datasource in schema.prisma to match database. If your database has no tables reference: https://pris.ly/d/getting-started
The URL will look similar to this:


```js
DATABASE_URL="postgresql://username@localhost:5432/databaseName”
```


### Create database migrations

We can use prisma migrate to create or sync existing tables in the database: 



```js
npx prisma migrate dev --name init
npx prisma migrate deploy
```


### Install Prisma Client



```js
npm i @prisma/client
```


Once the prisma client package is installed, npx prisma generate can read the schema where our application can read the data; we can also use the visual editor Prisma has to view and edit all data within the tables. Also, keep in mind, whenever any changes are made to the schema, the npx prisma generate command needs to be called again for everything to work.

### Resolving changes to database schema


```js
npx prisma migrate resolve --applied "20211202202741_1_migration" --new-feature
```


### Pull the schema from an existing database, updating the Prisma schema


```js
npx prisma db pull
```

### OR Push the prisma schema state to the database


```js
npx prisma db push
```


### Explore Prisma Studio

```js
npx prisma studio
```

We can now test and query our data! 🍾

#### Optional: inject local database sample data into database:
npx prisma db seed

