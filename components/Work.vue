<template>
    <section class="container mx-auto mt-8 mb-4">
        <h1 class="text-3xl ml-4 mb-6 mt-14">My Work</h1>
        <div class="grid md:grid-cols-3 pt-8 gap-10 ml-2 mr-2">
            <!-- my work card -->
            <div>
                <a href="https://dfsbaseball.vercel.app"
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:bg-zinc-900">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nuxt 3, Prisma and Charts.js App</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Baseball directory built complete with authentication, charts, comments and likes. I fed a JSON File to a Prisma Postgres database and created a baseball directory for fans to comment on and view their favorite players seasons stats through charts. Heads up: I have yet to get around to implementing search and I should probably remove it from the UI.</p>
                </a>
    
                <button type="button" class="text-white bg-gray-800 hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 dark:border-zinc-700 mt-4">
                    <a href="https://github.com/edwardz8/nuxt3-baseball">View Code</a>
                </button>
            </div>

            <!-- second work card -->
            <div>
                <a href="https://zachary.hashnode.dev/how-to-use-google-sheets-with-nuxt-3"
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:bg-zinc-900">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nuxt 3 with Google Sheets</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">I wrote an article for this one and provided a working demo on how to connect a Google Sheet to a Nuxt 3 application.</p>
                </a>
    
                <button type="button" class="text-white bg-gray-800 hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 dark:border-zinc-700 mt-4">
                    <a href="https://github.com/edwardz8/nuxt3-googlesheet">View Code</a>
                </button>

                <button type="button" class="text-white bg-gray-800 hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 dark:border-zinc-700 mt-4">
                    <a href="https://nuxt3-gsheet.vercel.app/">Demo</a>
                </button>
            </div>

            <!-- third work card -->
            <div>
                <a href="https://github.com/edwardz8/nuxt3-zero"
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:bg-zinc-900">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nuxt 3, Prisma and External API</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">There's no demo for this one as I was tired of paying $40 to host on DigitalOcean but the code is working if you want to check out how I did it. Similar functionality applies to the baseball application as it does this hockey one, the difference being I used an external API to pull up-to-date hockey stats instead of inserting RAW data into a database.</p>
                </a>
    
                <button type="button" class="text-white bg-gray-800 hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 dark:border-zinc-700 mt-4">
                    <a href="https://github.com/edwardz8/nuxt3-zero">View Code</a>
                </button>
            </div>

            <!-- fourth work card -->
            <div>
                <a href="https://nuxt3-sanity-shopify.vercel.app/products"
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-600 dark:hover:bg-zinc-900">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nuxt 3, Shopify and Sanity CMS</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Sanity is a CMS</p>
                </a>
    
                <button type="button" class="text-white bg-gray-800 hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 dark:border-zinc-700 mt-4">
                    <a href="https://github.com/edwardz8/nuxt3-sanity-commerce">View Code</a>
                </button>
            </div>

        </div>
    </section>
</template>