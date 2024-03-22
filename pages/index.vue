<template>
    <div class="container mx-auto mt-4 flex justify-between">
        <h1 class="ml-2 text-xl">zach</h1>
        <div class="mr-2">
            <NuxtLink to="/blog" class=" bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-sm mb-8">blog</NuxtLink>
        </div>
    </div>
    <div class="container mx-auto px-4 mt-8 mb-8 text-lg text-gray-200">
        <p>Hi, I'm Zach. I'm a frontend software developer based out of Knoxville, TN and I work with Vue and React.js and WordPress (PHP).
            I've primarily been programming with JavaScript & TypeScript - along with several other languages - and a number of their
            libraries and frameworks, since graduating from the now defunct Iron Yard Bootcamp in Nashville 7 years ago and as my programming skills grow 
            so does my passion and curiosity for computer science and system design. It's always been difficult for me to invest in most things. I have many interests that seem like great ideas at the time,
            but something sticking around and receiving all of my effort is a different story; but that changed in 2016 with software development.</p>

        <p class="mt-8 mb-8">
            Professionaly, I spend most of my time with PHP in WordPress world for Oak Ridge National Laboratory.
             Outside of my professional work, I enjoy creating apps like this one: https://dfsbaseball.vercel.app (built using Nuxt 3 and Prisma). View more of my work below.
             I also enjoy golf, spending time with friends and family and staying up-to-date with and learning about emerging idealogies in frontend land.
        </p>

        <p class="mt-8 mb-4">
            I used to be writer and I still love it -- just not as a career anymore -- and I want to bring that desire 
            to write and learn to the tech community I care about and am grateful to be a part of. I like to teach and demonstrate the 
            knowledge I have gained during my time as a developer.
        </p>

        <p class="mt-8 mb-4">
            Currently I am working on several projects; the first being a e-commerce app built for Android TV so folks can have a digital shopping experience from their living room couch. I am using Nuxt, Ionic connected to a WooCommerce and WordPress backend to accomplish this feat.
            Another project I've been passionate about lately is creating a Custom WordPress Plugin using Gutenburg Block development and Advanced Custom Fields while using Vue and/or Nuxt 3; I aim to write docs on how to accomplish this since Gutenburg Blocks are at their core built in React.js, which in turn has somewhat indirectly made resources on Vue.js and WordPress scarce unless you are working with building a Headless CMS with WordPress and a frontend framework. 
        </p>

       <!--  <p class="mt-8 mb-4">
            I code using Visual Studio, but over the past year or so I've been spending time with
            Vim/Neovim, and though I'm still not yet to the point where I'm a more efficient developer while using it, I'm efficient enough to play around with it while building software.
            I know the basic commands like toggling the menu, switching between tabs and all the trivial things, but I've found the
            barrier to entry after the setup, such as configuring syntax, LSP and tree-sitters, to be a time-consuming drag
            so I'm still stuck in VSCode indefinitely. I also like long single file components written in tsx/jsx within Vue 3.x repos 📱 
            and enjoy creating as many functional components I can write until I'm lost.
        </p> -->

        <p class="mt-8">Thanks for reading! 🌲</p>
    </div>
   <!-- <Projects /> -->
    <Work />
    <Posts />
    <Footer />
</template>

<script setup lang="ts">
definePageMeta({
    colorMode: 'dark',
})

useSeoMeta({
  title: 'Zach Edwards Vue and Nuxt Development Blog',
  ogTitle: 'Nuxt and Vue 3 Development Blog',
  description: 'Writings working with Vue.js, Nuxt 3 and WordPress',
  ogDescription: 'I write about my life in tech while working with Vue.js and Nuxt 3',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      src: 'https://e8z.vercel.app',
      tagPosition: 'head'
    }
  ]
})
</script>


<style>
body {
    /* background-color: #202122; */
    /* background-color: rgb(10 10 10); */
    background-color: rgb(23 23 23);
    color: #ffffff;
}

.dark-mode body {
    background-color: #091a28;
    color: #ebf4f1;
}

h1 {
    color: #ebf4f1;
    text-shadow: rgb(200, 200, 200) 1px 0 8px;
}

h2 {
    color: #ebf4f1;
}
</style>