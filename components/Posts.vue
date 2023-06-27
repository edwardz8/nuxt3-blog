<script setup>
const { data: posts } = await useAsyncData('latest-posts', () =>
    queryContent('/blog')
        .sort({ data: 1 })
        .limit(3)
        .find()
)
</script>

<template>
    <section class="container mx-auto mt-8 mb-4">
        <h1 class="text-xl ml-4 mb-6 mt-14">Latest Posts</h1>
        <div class="grid md:grid-cols-3 pt-8 gap-10">
            <Post :posts="posts" />
        </div>
    </section>
</template>