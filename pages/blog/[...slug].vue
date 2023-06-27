<template>
    <main class="ml-2 mr-2">
        <ContentRenderer :value="data" class="prose dark:prose-invert my-10 mx-auto max-w-7xl" />
    </main>
    <div class="container mx-2">
        <a v-for="tag in data.tags" :key="tag" :href="`/blog/tags/${tag}`"
        class="text-sm font-semibold inline-block py-2 px-4 rounded-lg text-gray-100 bg-black uppercase last:mr-0 mr-4">{{ tag }}</a>
        <NuxtLink to="/">Home</NuxtLink>
    </div>
</template>

<script setup>
const { path } = useRoute()

const { data } = await useAsyncData(`content-${path}`, () => {
    return queryContent()
    .where({ _path: path })
    .findOne()
})
</script>