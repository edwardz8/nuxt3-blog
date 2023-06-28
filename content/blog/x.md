---
title: Nuxt 3 Full-Stack Guide
description: How to develop Full-Stack Nuxt 3 apps with Prisma
date: 2023-06-26
cover: golf1.jpg
---

# Nuxt 3 Full-Stack Guide

🚨 This tutorial is a work in progress and only the server-side authentication portion using Prisma is completed 🚨

*This guide aims to chronical a number of useful methods for developing Nuxt 3 applications and to be helpful to new and experienced Nuxt devs alike.*

Nuxt 3 is still quite new and at the time of this writing is still in open beta, much like anything new, there can be some learning curves and resources can be lacking; and when quality resources are found they usually only discuss trivial topics many developers may find vapid. I love Nuxt.js and the community is one of the best things about it and this is not a knock on the framework whatsoever. And, of course, there's a need for simple tutorials, but most developer/framework communities are saturated with them and it promotes tutorial hell and it's easy to get stuck there when new developers are introduced to a new framework or are just starting out with any new technology. And it is my belief there should be more "advanced" resources out there for mid-to-senior level developers.

With a quick google search one is able to find tutorials on how to request and display data from an external API with Nuxt and with another search you could learn how to create your own database with Prisma and integrate it with a Nuxt application, however, if you wanted to see how to take a pre-existing API and then create a separate database for people to interact with the application (signup and registering, liking items, commenting on items, etc.) -- and for example, you were just getting started with Nuxt or Vue, or you weren't too familiar with ORM's like Prisma -- it could be much more difficult to piece together without scouring Github for the source code that includes exactly what you are looking for; and even then there's no guarantee you would ever find the solution without asking a number of questions across Stackoverflow, Discord, Reddit or some other code-related forum.

This guide looks to help remedy that.

Ultimately, this series of tutorials will lead to a full-stack stats and "social networking" application for Star Wars while utilizing the SWAPI (Star Wars API). You aren't expected to be a fan of Star Wars, for the concepts covered can be applied to any project using a third-party API. The idea for putting this guide together was not so much to follow along, line by line -- though it's structured in a way you are able to -- but the aim is to deviate from the typical tutorial and to be more of a reference for developers of all levels.

Once the project is setup with the developer dependencies, the first section will be to pull in some data from the Star Wars API and display it; and after adding the capability to view individual items with Nuxt's file-based routing system: https://v3.nuxtjs.org/guide/directory-structure/pages we will cover pagination to set a number of items per page and flip through the pages with 'Previous' and 'Next' action buttons. Then we'll move to authentication and the type-safe database ORM, Prisma.

The main subjects this guide covers:

- Nuxt 3 + Prisma 
- DigitalOcean Postgres Database
- Authentication 
- Third-party API data integration
- Multiple API Calls with Promises 
- File-based Routing
- Composables (useFetch, useRouter, useState, etc.)
- Pagination 
- Likes
- Comments 
- Charts 

A list of subjects this guide will not cover:

- Pinia
- Vuex
- Sass/CSS 

Since we're covering a number of more advanced topics, naturally it will be on the longer side, so it will not dive too deep into the installation of dependencies or how to start a project. There's countless starter repos on github and gitlab you can clone or reference for that. Moreover, how to add UI libraries, such as tailwindcss, has been pretty well documented as well. This guide is using TailwindCSS and Preline, but you are free to use whichever CSS library you prefer.


## Database Setup with DigitalOcean

Before creating the project have a database up and running. Feel free to skip this section if you just want to run a local database or are using MySQL, SQLite or non-relational database like MongoDB.

I'm using a Postgres DB through a DigitalOcean Droplet, so keep in mind when writing the Prisma schema there may be a few values that will be slightly different than what is required in Postgres.

If you are following along with DigitalOcean, create an account and '+ New Project' in the left sidebar. 

![Digital Ocean - Step One](/assets/digital-ocean-1.png)

You should be prompted to a new project page where you can select 'Get started with a Droplet'. Once the new database is created you will be able to grab the connection string from the project page and paste it into your *.env* file.

```js
// .env

DATABASE_URL="postgresql://doadmin:XXXX_xxxxxxxx@xxxx-xx-xxx-12345-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require"

```

The *DATABASE_URL* variable will be referenced once the Prisma schema is created. 


## Create Nuxt 3 app and install dependencies:

Instead of installing everything altogher and just throwing everything at you at one time, I will do my best to try and break it up by relevancy and group installs by category, keeping UI dependencies together, auth dependencies together, Prisma, etc.

There's a convenient module for using TailwindCSS with Nuxt 3 which can be followed here: https://tailwindcss.nuxtjs.org/getting-started/setup 


```js
npx nuxi init nuxt3-app 

cd nuxt3-app 

npm install or npm i 

```

Once the project is open inside your preferred text editor, you'll notice this bare bones scaffolding includes an __app.vue__ file with  __<NuxtWelcome/>__. Replace that component with the following:


```js

<template>
  <div>
    <NuxtPage />
  </div>
</template>

```

Return to the terminal and in the root directory install the following dependencies:

```js
$ npm i @nuxtjs/tailwindcss -D

$ npm i @types/bcrypt @types/uuid -D

$ npm i @vueuse/core bcrypt uuid @headlessui/vue

```

A couple of these will be used now and the others will be referenced and explained later.

Now, inside nuxt.config.ts add the required modules and also tailwindcss to the content object:

```js
modules: ['@nuxtjs/tailwindcss'],
content: {
    tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
}

```

Then, in the root directory, create a __main.css__ file within __/assets/css/__. Of course, include any font you prefer.


```js
// assets/css/main.css

@import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1,800,500,100,700,400,300,200,900&f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Front-end Project Structure

And in the root directory, create 2 separate folders: 

1) /pages
2) /components 

In the pages directory, create an __index.vue__ file. This will be the home page for this project. And for now, I'm only going to include a template tag with some html and a __NuxtLink__ routing to a new page.

```js
<template>
    <div class="container mx-auto">
        <h1 class="text-lg font-bold text-gray-800">Star Wars Directory</h1>
        <NuxtLink to="/starships" class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white text-sm hover:bg-orange-900">
        View Ships     
        </NuxtLink>
    </div>
</template>

```

It's not pretty but it will do the job for now. If you are not familiar with Tailwind or CSS in general you can read about how CSS utility frameworks like TailwindCSS work; essentially they do all they heavy lifting of styling for you and all you have to do is add them to a class in the html. https://tailwindcss.com/docs/container 


### Star Wars API (SWAPI)

###### https://swapi.dev/

With the Star Wars API, one can find information on different planets, spaceships, vehicles and people from all of the films. Let's retrieve all the starships included with the API and see what cool, nerd things we get back.

##### https://swapi.dev/api/starships

With the returned JSON there's a few interesting values we can display in the application using dynamic *props* and *useFetch*. In a child component let's return the name, model, manufacturer, cargo_capacity and starship_class using props.

In the components folder, create a __Card.vue__ file:

```js
// components/Card.vue

<script setup>
const props = defineProps(['starship'])
</script>

<template>
  <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-900/[.7]"
  >
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-orange-200">
        {{ starship.name }}
      </h3>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Model: {{ starship.model }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Manufacturer: {{ starship.manufacturer }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Capacity: {{ starship.cargo_capacity }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ starship.starship_class }}
        <br />
      </p>
      <NuxtLink
        class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-900">
        View Starship
      </NuxtLink>
    </div>
  </div>
</template>

```

Taken from the Vue.js documentation:

```js
Props are custom attributes you can register on a component.
```

Props allow us to build reusable components which can be passed from child to parent components and shared across the entirety of an application. At it's core, it is a child of the DRY (don't repeat yourself) principle. You can read more about Vue props and their role when constructing component architecture here: https://vuejs.org/guide/essentials/component-basics.html#passing-props

Next, within the pages directory, create a folder called __starships__ with an __index.vue__ file inside.

```js
// pages/starships/index.vue

<script setup>
const results = ref({})

const { data } = await useFetch('https://swapi.dev/api/starships')
results.value = data.value.results

</script>

<template>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-4">
        <Card v-for="ship in results" :starship="ship" :key="ship.name" />
    </div>
</template>

```

### Dynamic Routing and Creating Unique Identifier

When working with external API's, it's not uncommon for there to be a few peculiarities to have to find solutions for through code; and SWAPI is no exception. But problem solving is a part of programming and it can be a fun and rewarding aspect of the profession.

One such "problem" with this API in particular is there are no IDs! Weird, I know. But since there is a url being returned for each item in the JSON result, there's a way to create our own unique identifier and get an id from the url.

So, within the script tag created earlier in __/components/index.vue__ we can add:

```js
// components/Card.vue

const getId = (url) => {
    try {
        const arr = url.split('/')
        return arr[arr.length - 2]
    } catch (error) {
        return ''
    }
}

```

Then inbetween the template tags of the same file we can add dynamic routing with _:to__ and use the __getId__ method we just wrote which grabs the url and creates an ID for it through the use of the .split javascript method.

For brevity, the CSS utility classes were left off here since they were already written and added in the code above.

```js
// components/Card.vue

<template>
...
    <NuxtLink :to="`/starships/` + getId(starship.url)">
        View Starship
    </NuxtLink>
</template>

```

Now, to create the actual view the above code will be routing to, we need to create 2 new files: 1) a child component, called __ItemCard.vue__, which will be very similar to the previous card component from earlier and 2) a new route using file-based routing. In the __/pages/starships/__ directory, an empty folder like so: __[id]__ with an __index.vue__ file. The relative path should be: __/pages/starships/[id]/index.vue__.

##### components/ItemCard.vue

```js
// components/ItemCard.vue

<script setup>
const props = defineProps({
  name: {
    type: String
  },
  model: {
    type: String
  },
  manufacturer: {
    type: String
  },
  cargo_capacity: {
    type: String
  },
  starship_class: {
    type: String
  },
  cost_in_credits: {
    type: String
  },
  crew: {
    type: String
  },
  passengers: {
    type: String
  },
  hyperdrive_rating: {
    type: String
  }
})
</script>

<template>
  <div
    class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-900/[.7]">
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-orange-200">
        {{ props.name }}
      </h3>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Model: {{ props.model }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Manufacturer: {{ props.manufacturer }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Capacity: {{ props.cargo_capacity }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Class: {{ props.starship_class }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Rating: {{ props.hyperdrive_rating }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Cost: {{ props.cost_in_credits }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Crew #: {{ props.crew }}
        <br />
      </p>
      <p class="mt-1 text-gray-800 dark:text-gray-400">
        Passenger #: {{ props.passengers }}
        <br />
      </p>
    </div>
  </div>
</template>

```

##### pages/starships/[id]/index.vue

There's 2 different composable helpers needed for the parent component, the first being __useRoute__ which provides us with the current route which can then be passed to the other composable, __useFetch__ via a template literal to add the correct route to the url. When the empty __[id]__ folder was created, __id__ became the value that needs to be passed to __$route.params.id__.

The __ItemCard__ child component is then conditionally rendered by dynamically binding the optional values we choose to display to the user.

Read more about conditional rendering here: https://vuejs.org/guide/essentials/conditional.html 

And __useRoute__ here: https://v3.nuxtjs.org/api/composables/use-route/ 

```js
// pages/starships/[id]/index.vue

<script setup>
const route = useRoute()

const { data: ship } = await useFetch(`https://swapi.dev/api/starships/${route.params.id}`);
</script>

<template>
    <div class="container mx-auto mt-6">
        <div class="gap-3 px-4">
            <item-card v-if="ship"
                :name="ship.name"
                :model="ship.model"
                :manufacturer="ship.manufacturer"
                :cargo_capacity="ship.cargo_capacity"
                :starship_class="ship.starship_class"
                :cost_in_credits="ship.cost_in_credits"
                :crew="ship.crew"
                :passengers="ship.passengers"
                :hyperdrive_rating="ship.hyperdrive_rating" />
        </div>
    </div>
</template>

```

### Pagination

There's also only a limited number of items per page that are returned for each call and we can't just return every single ship in the Star Wars universe with a single API call. Returning just the first 6 ships, or people, or vehicles to our users isn't very useful so we need to code another solution to this obstacle the API presents and will do this through pagination.

Back in __/pages/starships/index.vue__, replace the current <script> and <template> tags with the following:

```js

<script setup>
const results = ref({})
const count = ref('')
const perPage = ref(6)
const page = ref(1)
const loadingNext = ref(false)
const loadingPrev = ref(false)

const { data } = await useFetch('https://swapi.dev/api/starships')
results.value = data.value.results
count.value = data.value.count

const fetchPage = async (p) => {
    if (p > page.value) loadingNext.value = true
    else loadingPrev.value = true

    try {
        const { data } = await useFetch(
            'https://swapi.dev/api/starships?page=' + p,
            { initialCache: false }
        )
        page.value = p
        results.value = data.value.results
    } catch (error) {
        console.log(error)
    } finally {
        loadingNext.value = false
        loadingPrev.value = false
    }
}

const showNextPage = computed(() => {
    return Math.floor(count.value / (page.value * perPage.value))
})
</script>

<template>
    <div class="container mx-auto mt-6">
        <!-- pagination -->
        <div class="flex justify-between gap-4 py-4 px-4">
            <a href="#" :disabled="page === 1" @click="fetchPage(page - 1)" :class="[
              page === 1
                ? 'border-gray-300 text-gray-500'
                : 'text-gray-800 border-gray-500',
            ]"
                class="relative items-center border rounded bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 md:inline-flex">
                <svg v-if="loadingPrev" aria-hidden="true"
                    class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span v-else>Previous</span>
            </a>

            <NuxtLink to="/">
                <div class="rounded-md shadow">
                    <a href="#"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-3 text-base font-medium text-white hover:bg-orange-800 md:py-2 md:px-6 md:text-lg">
                        Home</a>
                </div>
            </NuxtLink>

            <a href="#" :disabled="showNextPage === 0" :class="[
              showNextPage === 0
                ? 'border-gray-300 text-gray-500'
                : 'text-gray-800 border-gray-500',
            ]" class="relative items-center border rounded bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 md:inline-flex"
                @click="fetchPage(page + 1)">
                <svg v-if="loadingNext" aria-hidden="true"
                    class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span v-else>Next </span>
            </a>
        </div>
        
        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 px-4">
            <Card v-for="ship in results" :starship="ship" :key="ship.name" />
        </div>
    </div>
</template>

```

There's several additions to note here. The first being the new *count*, *perPage*, *page*, *loadingNext* and *loadingPrev* __ref__ values. In Vue 3 and the Composition API, when __ref__ variables are present, a .__value__ must accompany it in order for the variable to be accessed and read.

The *count* variable is a string value that will ultimately assist in calculating the number of pages based on the number of total items. Then *perPage* is the number of items to be returned and *page* accounts for the current page. And finally, there are 2 boolean values *loadingNext* and *loadingPrev* for loading states when new data is being returned.

The __fetchPage__ function is where the magic happens and is an asynchronous method to the API for dynamically awaiting a new page with __useFetch__. If the data is loading, either for the 'Next' or 'Previous' action buttons, a loading indicator by means of an svg, and once the loading state turns to true, the API data is returned with __useFetch__. 


Now that the basic data and routing is implemented, let's move onto user authentication.


## Server


###  TypeScript Interfaces 

Let's quickly jump to defining the types relating to users and authentication first. From the root directory, create a __types__ folder and add the following TypeScript files:

##### IUser.ts 

```js
// types/IUser.ts

export interface IUser {
    id?: number
    username?: string
    name?: string
    password?: string
    email?: string
    avatarUrl?: string
}

```

##### IRegistration.ts

```js
// types/IRegistration.ts

export type IRegistrationErrors = {
    hasErrors?: string
}

export type RegistrationResponse = {
    hasErrors: boolean,
    errors?: IRegistrationErrors
}

export type RegistrationRequest = {
    name: string
    username?: string
    email?: string
    password?: string
}

```

##### ISession.ts 

```js
import { IUser } from "./IUser"

export interface ISession {
    authToken?: string 
    user?: IUser
    userId?: number 
}

```

##### InputValidation.ts

```js
type InputValidation = {
    key: string
    isBlank: boolean
    lenghtMin8: boolean
    hasError: boolean
    value: string
    emailTaken?: boolean
    usernameTaken?: boolean
    errorMessage?: string
}

```

##### FormValidation.ts

```js
type FormValidation = {
    hasErrors: boolean
    errors?: Map<string, { check: InputValidation; }>
}

type FormErrors = {
    field: string
    check: InputValidation
}

```

We will circle back to types after user authentication is in order.


### Server and Prisma

#### Install Prisma dependencies

```js
$ npm i prisma -D // install prisma

$ npx prisma // displays available prisma commands

$ npm i @prisma/client 

$ npx prisma init 

// Other notable commands while using Prisma 

$ npx prisma db push 

$ npx prisma db pull

$ npx prisma migrate dev

$ npx prisma migrate dev --name init

$ npx prisma migrate deploy 

```

### Authentication

For authentication, Full Stack Jack on Youtube has what I believe to be an ideal approach on how to setup a solid and secure auth system with Prisma and Nuxt 3 while utilizing composables. You can find that here: https://www.youtube.com/watch?v=A24aKCQ-rf4&t=1586s with the link to his repo: https://github.com/jurassicjs/nuxt3-fullstack-tutorial 

This guide follows a very similar approach to the way Full Stack Jack implements authentication -- with a few minor differences here and there -- so, similar to the why and how of starting a Nuxt 3 project, this guide is not going to dive too deep into the technicalities of authentication since most of the code pertaining to auth is heavily inspired from the aforementioned, Full Stack Jack, and there's no need to steal his thunder for the work he put into his project and -- perhaps more importantly -- the thoughtfulness of sharing his code with the world.

With that said, there is a lot to cover and to make it easier for the reader, I will add everything within the project here in this article and explain some of the key concepts in hopes of preventing the need of tab and code hoping back and forth in order to make the learning process seamless as possible.

#### Prisma Schema

When running ```$ npx prisma init ``` a schema file was created. The schema will be generated within the root of the project, specifically __/prisma/schema.prisma__, but for this tutorial it will reside inside __/server/database/schema.prisma__.

Take the schema.prisma file and move it to the newly created __server/database__ directory and add the models below in __schema.prisma__. You can safely delete the prisma folder.

```js

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id               Int            @id @default(autoincrement())
  password         String?
  email            String?        @unique
  name             String?
  username         String?        @unique
  session          Session[]
  comment          Comment[]
}

model Session {
  id        Int       @id @default(autoincrement())
  authToken String    @unique
  user      User      @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}

```

In order for Nuxt to know how to communicate with Prisma -- with the current server folder structure in place -- a slight change is required within __package.json__ as it's own value needs to be referenced outside of "devDependencies" and "dependencies".

```js
...
"prisma": {
    "schema": "server/database/schema.prisma"
  }

```

## Back-end Project Server Structure

Within the __server__ folder, also create an __api__ and __services__ folder (make sure they are not inside the recently created  __database__ folder).

Starting with the __database__ directory, create a file: __client.ts__ and include the following code; a snippet that will initialize the Prisma Client.

```js
// server/database/client.ts

import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient()
export default prisma

```

Next, create a __repositories__ folder inside the __database__ directory and add __sessionRepository.ts__ and __userRepository.ts__.


#### sessionRepository.ts 

Looking over at the schema, there's a userId (Int) and authToken (string) value witin the *Session* model. Below these two values are referenced inside the data object of the __createSession__ method where *async await* is used to create a user session. You'll notice two other methods in this file, __getUserByAuthToken__ and __getSessionByAuthToken__ both of which pass a *authToken* string parameter; both functions do similar things, but the logic doesn't have to be re-written twice. When reading the __where__ clause inside __getUserByAuthToken__ a built-in Prisma method __findUnique__ is used to locate each user while logged into the application via bcrypt and uuid libraries. Then __getUserByAuthToken__ can be passed to __getSessionByAuthToken__ by creating a *user* variable and then return both ```authToken``` and ```user```.

This is possible since *User* is passed to the Session model of the schema via a *@relation* as well as the fact *Session[]* is included with the *User* model. The ability to create connections like these is what makes working with Prisma and Nuxt 3 so cool.

```js
// sessionRepository.ts

import { IUser } from "~~/types/IUser";
import { ISession } from '~~/types/ISession';
import prisma from "../client";

export async function createSession(data: ISession): Promise<ISession> {
    return await prisma.session.create({
        data: {
            userId: data.userId,
            authToken: data.authToken
        }
    })
}

export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
    const user: IUser = await getUserByAuthToken(authToken) as unknown as IUser

    return { authToken, user }
}

async function getUserByAuthToken(authToken: string): Promise<IUser> {
    return prisma.session.findUnique({
        where: {
            authToken: authToken
        }
    }).user()
}

```

#### userRepository.ts 

Something similar can be found with __userRepository__ and both the *findUnique* and *create* Prisma methods are used to keep track of when individuals are created by registering (__createUser__), logging in (__getUserByEmailWithPass__), and when they form some other action while using the application (__getUserById__).

With the __createUser__ function, the data object holds all the values associated with a user, which were made back in the *User* schema. Naturally, there is: username, name, email and password; there's also a *loginType*, which is set to *email* in the schema. You will find more _where_ and _select_ clauses here; _where_ takes the param that's passed into the original function and calls it, _select_ grabs other values the app will need.

```js
// userRepository.ts

import prisma from "../client";
import { IUser } from '~/types/IUser';

export async function getUserByEmail(email: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
    },
  })
}

export async function getUserByEmailWithPass(email: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      password: true
    }
  })
}

export async function getUserByUserName(username: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
    },
  })
}

export async function createUser(data: IUser) {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })

  return user
}

export async function getUserById(id: number): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })
}

```

### Services 

Moving to the __services__ directory, create __userService.ts__, __sessionService.ts__ and __validator.ts__.

#### validator.ts

Validation is a nice-to-have addition for people using the application, so when implementing authentication it's a good practice if there are restrictions while interacting in the browser; checking length of passwords, using regular expressions, and insuring no 2 individuals have the exact same password are all examples of things that could and should be accounted for.

```js
// validator.ts

import { RegistrationRequest } from '~~/types/IRegistration';
import { getUserByEmailWithPass, getUserByUserName } from '~/server/database/repositories/userRepository'


export async function validate(data: RegistrationRequest) {

 const errors = new Map<string, { check: InputValidation }>()

 for (const [key, value] of Object.entries(data)) {
  let val = await runChecks(key, value)

  if (val.hasError) {
   errors.set(key, { 'check': val })
  }
 }

 return errors
}

async function runChecks(key: string, value: string): Promise<InputValidation> {
 const check: InputValidation = {
  value,
  isBlank: false,
  lenghtMin8: true,
  key,
  hasError: false
 }

 if (value == '' || value == null) {
  check.isBlank = true
  check.hasError = true
  check.errorMessage = `${key} is required`
  return check
 }

 if (key == 'password') {
  if (value.length < 8) {
   check.hasError = true
   check.errorMessage = `password must be at least 8 characters`
  }
  check.lenghtMin8 = false
 }

 if (key == 'email') {

  const isValidEmail = validateEmail(value)

  if (!isValidEmail) {
   check.emailTaken = true
   check.hasError = true
   check.errorMessage = `${value}, is not a valid email!`
   return check
  }

  const email = await getUserByEmailWithPass(value)
  if (email) {
   check.emailTaken = true
   check.hasError = true
   check.errorMessage = `This email, ${value}, is already registered!`
  }
 }

 if (key == 'username') {
  const username = await getUserByUserName(value)
  if (username) {
   check.usernameTaken = true
   check.hasError = true
   check.errorMessage = `The username, ${value}, is already registered!`
  }
 }

 return check
}

function validateEmail(input: string): boolean {
 const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

 if (!input.match(validRegex)) {
  return false;
 }

 return true
}

```

#### userService.ts

Earlier, in our types folder, both __InputValidation.ts__ and __FormValidation.ts__ files were created so now we need to pass the *FormValidation* type to check if all required data is passed inside the respective form(s) correctly while using the app.

The __sanitizeUserForFrontend__ method hides any of the user state values so they aren’t exposed client-side; this will be called within __sessionService.ts__ as well as in __/server/api/auth/__ which will be discussed shortly.

```js
// userService.ts

import { IUser } from "~~/types/IUser";
import { RegistrationRequest } from "~~/types/IRegistration";
import { validate } from '~~/server/services/validator'

export async function validateUser(data: RegistrationRequest): Promise<FormValidation> {
    const errors = await validate(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {
    if (!user) {
        return user
    }

    delete user.password

    return user 
}
```


#### sessionService.ts

The Session Service takes in the _createSession_ and _getSessionByAuthToken_ written earlier in *sessionRepository.ts* and also uses the uuid library to help manage authentication token via cookies when each user session begins and ends. The path needs to be set to root so it’s accessible throughout the application and httpOnly so the cookie cannot be manipulated client-side.

Nuxt is packaged with _h3_, a utility framework, which provides methods for better code readibility. Here's a link to the npm package: https://www.npmjs.com/package/h3. If you've never seen or heard of it before it may be useful to skim through the docs as the purposes of some of the methods referenced in the code below might not be crystal clear every instance they are present in the code.


```js
// sessionService.ts

import { sanitizeUserForFrontend } from '~~/server/services/userService';
import { CompatibilityEvent } from "h3"
import { createSession, getSessionByAuthToken } from "~~/server/database/repositories/sessionRepository"
import { IUser } from "~~/types/IUser"
import { v4 as uuidv4 } from 'uuid'


export async function makeSession(user: IUser, event: CompatibilityEvent): Promise<IUser> {
    const authToken = uuidv4().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
        return getUserBySessionToken(authToken)
    }

    throw Error('Error Creating Session')
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
    const session = await getSessionByAuthToken(authToken)

    return sanitizeUserForFrontend(session.user)
}

```


### Server Routes: API Authentication

For Nuxt 3, all the API calls will live inside the __/server/api__ directory via TypeScript. The exported __defineEventHandler__ will be used to hold the server-side logic and is called when a specific route is visited. 

A beautiful thing about Nuxt is once any server-side route is in place, it will be automatically imported and conveniently called in *.vue* files with _useFetch_ or _useAsyncData_, which are juiced-up wrappers of the $fetch methods. Another thing to note is we can capture query params with another useful Nuxt method called useQuery. Moreover, we can view the body of the request with another composable via Nuxt and h3: _useBody_.

Let's move to the __api__ directory mentioned earlier and create a folder called __auth__ and add a few files inside, including: *getByAuthToken.ts*, *login.ts*, *logout.ts* and *register.ts*. The folder structure should be __/server/api/auth/getByAuthToken.ts__, etc.

Starting with *getByAuthToken.ts*, let's begin to take the auth functions created in the services folder and create an API so they can then later be applied to the front-end.

##### getByAuthToken.ts 

```js
// getByAuthToken.ts

import { IUser } from '~/types/IUser';
import { getUserBySessionToken } from '~~/server/services/sessionService'

export default defineEventHandler<IUser>(async (event) => {
    const authToken = getCookie(event.req, 'auth_token')

    const user = await getUserBySessionToken(authToken)

    return user
})

```

Above, we are using the _getUserBySession_ function that was created in *sessionService.ts* -- which is just taking a authToken string from the Prisma schema and assigning it to a user -- so this new function can be used to create a user session.

##### register.ts 

Applications with users usually come with a register functionality and this one is no different. The register file contains the user data to sign up for the app. You will notice a number of variables that are being used to pass previously created methods to. This file passes in the user values accessed in the body, checks if a user exists and submits a new user to the database. The session will be linked to a user and the user is associated with an auth_token and anytime in the browser when a user is logged into a session, a cookie will be sent from the client to the server to verify the user is valid. 

Note: The _bcrypt_ package provides password encryption so passwords cannot be read from malicious hackers.

```js
// register.ts

import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~/types/IUser';
import { validateUser } from '~/server/services/userService';
import { createUser } from '~/server/database/repositories/userRepository';
import { makeSession } from '~~/server/services/sessionService';
import { RegistrationRequest } from '~~/types/IRegistration';

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const data = body.data as RegistrationRequest

    const validation = await validateUser(data)

    if (validation.hasErrors === true) {
        const errors = JSON.stringify(Object.fromEntries(validation.errors))
        return sendError(event, createError({ statusCode: 422, data: errors }))
    }

    const encryptedPassword: string = await bcrypt.hash(data.password, 10)

    const userData: IUser = {
        username: data.username,
        name: data.name,
        email: data.email,
        password: encryptedPassword
    }

    const user = await createUser(userData)

    return await makeSession(user, event)
}

```

##### login.ts

Another composable __useBody__ is used here to pass the email and password input values of the form and attach them to the body of the request. There's also a variable assigned which is passed the __getUserByEmailWithPass__ method that queries the username and password of registered users. The *bcrypt* library is then implemented to check if the current password entered aligns with the previous password submitted when first registering. And finally, once that request is finished -- only if the form values are correct -- the __makeSession__ is called so a new user session can be initiated for the new logged in user.

```js
// login.ts

import { sanitizeUserForFrontend } from '~~/server/services/userService';
import bcrypt from 'bcrypt'
import { getUserByEmailWithPass } from '~/server/database/repositories/userRepository';
import { CompatibilityEvent, sendError } from "h3"
import { makeSession } from '~~/server/services/sessionService';

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const email: string = body.email
    const password: string = body.password
    const user = await getUserByEmailWithPass(email)

    if (user === null) {
        return sendError(event, createError({ statusCode: 423, statusMessage: 'Wrong Email' }))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    console.log(password, user, isPasswordCorrect)

    if (!isPasswordCorrect) {
        return sendError(event, createError({ statusCode: 423, statusMessage: 'Wrong Password' }))
    }

    await makeSession(user, event)

    return sanitizeUserForFrontend(user)
}

```

##### logout.ts

```js
// logout.ts

import { CompatibilityEvent } from "h3";

export default async (event: CompatibilityEvent) => {
    setCookie(event, 'auth_token', null)
}

```

========= FRONT END ==========

### Composables

### composables/useAuth.ts

Inside the root directory, create a composables folder and add an __useAuth.ts__ file. The structure should look like this: __/composables/useAuth.ts__. Here, the user state is set with __useState__ and if both a cookie value is present and a user value doesn't exist then an API call is set in the header.

A fetch POST request is also made with the help from the code written in the __register.ts__ api file and then an object holding the username, name, email and password values is returned from the body. If the returned result is as expected and without errors, a useState user value is accepted and is directed to a new route via useRouter().

...


```js
// composables/useAuth.ts

import { useRouter, useState } from '#app'
import { ISession } from '~~/types/ISession'
import { IUser } from '~~/types/IUser'

export const useAuthCookie = () => useCookie('auth_token')

export async function useUser(): Promise<IUser> {
    const authCookie = useAuthCookie().value
    const user = useState<IUser>('user')

    if (authCookie && !user.value) {

        const { data } = await useFetch(`/api/auth/getByAuthToken`, {
            headers: useRequestHeaders(['cookie'])
        })

        user.value = data.value
    }

    return user.value
}

export async function userLogout() {
    await useFetch('/api/auth/logout')
    useState('user').value = null
    await useRouter().push('/')
}

export async function registerWithEmail(
    username: string,
    name: string,
    email: string,
    password: string
): Promise<FormValidation> {

    const { data, error } = await useFetch<ISession>('/api/auth/register', {
        method: 'POST',
        body: { data: { username, name, email, password } }
    })

    if (error.value) {
        type ErrorData = {
            data: ErrorData
        }

        const errorData = error.value as unknown as ErrorData
        const errors = errorData.data.data as unknown as string
        const res = JSON.parse(errors)
        const errorMap = new Map<string, { check: InputValidation }>(Object.entries(res))

        return { hasErrors: true, errors: errorMap }
    }

    if (data) {
        useState('user').value = data
        await useRouter().push('/blog')
    }

}

export async function loginWithEmail(email: string, password: string) {
    const user = await $fetch<IUser>('/api/auth/login', { method: 'POST', body: { email: email, password: password } })
    useState('user').value = user
    await useRouter().push('/blog')
}

```



## Front-End Setup

Create a __middleware__ folder in the root directory with both an __auth.ts__ and __guest.ts__ file.


##### auth.ts

```js
// /middleware/auth.ts

import { defineNuxtRouteMiddleware } from "#app";
import { useUser } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
    const user = await useUser()

    if (user == null && user == undefined) {
        return '/'
    }
})

```

##### guest.ts

```js
// /middleware/guest.ts

import { defineNuxtRouteMiddleware } from "#app";
import { useUser } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
    const user = await useUser()

    if (user !== null && user !== undefined) {
        return '/'
    }
})

```


#### User and Header Components

Next, create two components, __User.vue__ and __SiteHeader.vue__.

The state of the user through the composable __useState__ is passed to a *user* variable. Then we have an external method from the vueuse core library __onClickOutside__ which takes the null value of a __ref__ *userActions* and will assign the other __ref__ -- a boolean true-false value -- *hideActions* so a dynamic class can be toggled if a user is logged in.

```js
// components/User.vue

<script setup lang="ts">
import { IUser } from "~/types/IUser";
import { ref } from "@vue/reactivity";
import { userLogout } from "~/composables/useAuth";
import { useState } from "#app";
import { onClickOutside } from "@vueuse/core";

const user = useState<IUser>("user");

const logout = userLogout;

const hideActions = ref(true);
const userActions = ref(null);

onClickOutside(userActions, () => (hideActions.value = true));
</script>

<template>
  <div @click="hideActions = !hideActions" ref="userActions" class="flex items-center justify-end md:flex-1">
    <span class="mr-2">
      <strong>{{ user.username }}</strong>
    </span>

    <ul
      :class="[{ hidden: hideActions }]"
      class="dropdown-menu min-w-max absolute bottom bg-white text-base z-100 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 top- m-0 bg-clip-padding border-none"
      aria-labelledby="dropdownMenuButton1"
    >
      <li @click="logout">
        <a
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-800 hover:bg-gray-400"
          href="#"
          >logout</a
        >
      </li>
    </ul>
  </div>
</template>

```

#### SiteHeader.vue

A simple navigation bar will do for now, but more details can be added easily down the road. For now, if a user is logged into the app the navigation will display the user name and a dropdown menu to allow them to logout. If they are not logged in, both a 'Sign up' and 'Sign in' button will be displayed. The logic for this is written in __User.vue__.

```js
// components/SiteHeader.vue

<script setup lang="ts">
import { useState } from "#app";

const user = useState("user");
</script>

<template>
  <header class="site-header">
    <div class="wrapper">
      <NuxtLink to="/" class="no-underline">
        <figure class="site-logo">
          <h1>swspecs</h1>
        </figure>
      </NuxtLink>

      <nav class="site-nav">
        <ul class="links">
          <div class="flex items-center justify-end md:flex-1 lg:w-0">
            <User v-if="user" :user="user" />

            <li class="link">
              <nuxt-link
                v-if="!user"
                to="/register"
                class="transition duration-500 hover:scale-110 mr-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-gray-600"
              >
                Sign up
              </nuxt-link>
            </li>

            <li class="link">
              <nuxt-link
                v-if="!user"
                to="/login"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </nuxt-link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  @apply sticky top-0 w-full p-4 bg-slate-100 bg-opacity-40 border-b-2 border-white border-opacity-30 backdrop-blur-lg z-20;
}
.site-header > .wrapper {
  @apply flex items-center justify-between max-w-6xl m-auto;
}
.site-logo {
  @apply font-black text-lg;
}
</style>

```



#### app.vue

In __app.vue__, the implementation of useNuxtApp forces a scroll to the top of the page on navigation to any page. Referencing: https://v3.nuxtjs.org/api/composables/use-nuxt-app/ 

```js
// app.vue

<template>
  <div>
    <SiteHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~/composables/useAuth";

await useUser();
</script>


```

Now an individual can move around in the application as a logged in user if they choose! 


## Emitting Events: Likes 

Back in the __server/database__ folder, in the __schema.prisma__ file we can add a Likes model so we can then create the functionality of liking items. Once the new model is in place, run the migration to the Prisma database with: ```npx prisma migrate dev && npx prisma db push```.

```js
// schema.prisma 

model Like {
  id       Int @id @default(autoincrement())
  userId   Int
  itemId Int
}

```

Then in the same __server/database__ folder, navigate to the __repositories__ directory and create a __likeRepository.ts__ file to add the Prisma queries for liking items.

For getting likes by user, a playerId parameter is passed to the function that is then assigned to an idArray variable and then used as the itemId. Then for the addLike function, the .create method from Prisma is used to pass the id's of both the user and item.

```js
// server/database/repositories/likeRepository.ts 

import prisma from '../client'
import { ILike } from '~~/types/ILike'

export async function getLikesByUser(playerId) {
    const idArray = playerId.split(',').map(Number)
    return await prisma.like.findMany({
        where: {
            itemId: { in: idArray }
        },
        select: {
            id: true,
            itemId: true,
            userId: true
        }
    })
}

export async function addLike(data: ILike) {
    const like = await prisma.like.create({
        data: {
            userId: data.userId,
            itemId: data.playerId
        }
    })

    return like
}

export async function deleteLike(data) {
    await prisma.like.delete({
        where: {
            id: +data.id,
        },
    })
    return 'Unliked successfully!'
}


```

Next, move back to the __types__ folder and add an __ILike.ts__ file:

```js
// types/ILike.ts

export interface ILike {
    id?: number 
    userId: number 
    itemId: number 
}

```

Now, in the __server/api__ directory, create a new folder __like__ and add an __addLike.ts__ file.

```js
// server/api/like/addLike.ts 

import { CompatibilityEvent } from 'h3'
import { addLike } from '~/server/database/repositories/likeRepository';

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    console.log(body)

    const likeData = {
        userId: body.userId,
        itemId: body.itemId,
    }

    const like = await addLike(likeData)

    return like
}

```

And finally, back on the front-end side of the project directory, inside __composables__, create a new file: __useLike.ts__ and add the following utility methods so the code is more readable wherever the functionality is utilized across the app.

```js
// composables/useLike.ts

export async function getUserLikes(itemId: string) {
    const like = await $fetch('/api/like/getLikes?itemId=' + itemId, { method: 'GET' })
    return like
}

export async function addUserLike({ itemId, userId }) {
    const like = await $fetch('/api/like/addLike', { method: 'POST', body: { userId: userId, itemId: itemId } })
    return like
}

export async function removeUserLike(likeId) {
    const res = await $fetch('/api/like/deleteLike?likeId=' + likeId, { method: 'GET' })
    return res
}

```




## Preline and TailwindCSS





## External Methods

In the root of the project create a javascript file; the one I'm using is titled: __methods.js__ but you are free to use whatever name you like.

This particular method will utilize a switch statement to read the names of ships or people or vehichles from the API and pair the item with whichever image we want to display throughout the application.

With Nuxt, images can be read in the __/public__ folder. Within that directory I created a folder called __img__ where all images can live. Nuxt will automatically read __public__ so all that's required is */img/name-of-asset.png*.

```js
// methods.js 

export default function matchPlayerImage(player) {
        switch (player) {
            case "Auston Matthews":
                return "/img/Auston_Matthews.svg";
                break;
            case "Mitch Marner":
                return "/img/Mitch_Marner.svg";
                break;
            case "Erik Karlsson":
                return "/img/karlsson.png";
                break;
            default:
                return "/img/Skates-Retro-Pink-2.svg";
        }
    }

```

Next, navigate to the components folder and visit.



## Chart.js + Nuxt 3

```
$ npm i vue-chartjs chart.js 

```

Also must add __build__ to the content object in nuxt.config.ts:

```
build: {
    transpile: ['chart.js']
  }

```

Reference: https://vue-chartjs.org/guide/#using-with-nuxt  

======================= 

