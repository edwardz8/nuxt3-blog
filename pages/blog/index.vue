<script setup>
const { data: posts } = await useAsyncData('posts', () =>
    queryContent('/blog').find()
)
</script>

<template>
    <main>
        <Head>
            <Script defer data-domain="e8z.vercel.app" src="https://plausible.io/js/plausible.js" />
        </Head>
        <div class="container mx-auto">
            <h1 class="text-3xl my-8">Blog Posts</h1>

            <section class="ml-2 mr-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
                <Post :posts="posts" />
            </section>
            <div class="mt-16 container mx-auto ml-2">
                <NuxtLink to="/" class="inline-block bg-gray-500 hover:bg-zinc-700 text-white py-2 px-4 rounded-sm mb-2">
                    Home
                </NuxtLink>
            </div>
        </div>
    </main>
</template>