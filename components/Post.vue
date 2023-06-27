<script setup>
const props = defineProps(['posts'])
</script>

<template>
        <div v-for="post in props.posts" :key="post.slug" class="bg-neutral-800 rounded-md shadow-lg overflow-hidden hover:opacity-90">
            <NuxtLink :to="post._path" class="text-2xl">
                <img :src="`/images/blog/${post.cover}`" alt="Blog Post Cover Image" class="w-full h-30 object-cover">
            </NuxtLink>
            <div class="p-6">
                <h2 class="text-gray-100 font-semibold text-xl mb-2">{{ post.title }}</h2>
                <p class="text-gray-200 mb-4">{{ post.description }}</p>
                <NuxtLink :to="post._path" class="inline-block bg-gray-500 hover:bg-zinc-700 text-white py-2 px-4 rounded-sm mb-2">Read More
                </NuxtLink>
            </div>
        </div>
</template>