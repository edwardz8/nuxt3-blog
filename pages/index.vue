<template>
    <div class="container mx-auto mt-4 flex justify-between">
        <h1 class="ml-2 text-xl">ztv0x</h1>
        <div class="mr-2">
            <NuxtLink to="/blog" class=" bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-sm mb-8">blog</NuxtLink>
        </div>
    </div>
    <div class="container mx-auto px-4 mt-8 mb-8 text-md text-gray-200">
        <p>Hi, I'm Zach. I'm a frontend software developer based out of Knoxville, TN and I work with Vue and React.js.
            I've primarily been programming with JavaScript & TypeScript - along with several other languages - and a number of their
            libraries and frameworks, since graduating from the now defunct Iron Yard Bootcamp in Nashville 6+ years ago and as my programming skills grow 
            so does my passion and curiosity for computer science and engineering. It's always been difficult for me to invest in most things. I have many interests that seem like great ideas at the time,
            but something sticking around and receiving all of my effort is a different story. But that changed in 2016 with software development.</p>

        <p class="mt-8 mb-8">
            Professionaly, I spend most of my time building Gutenberg blocks with React and Vue in WordPress land for Oak Ridge National Laboratory. I'm currently working on a writeup on 
            how to add a Vite project into a WordPress plugin while working with the WordPress API and Advanced Custom Fields. Headless is a cool technoloy but where the team and I are at as a group we find that it's not the best tech for the job for the time being.
            Outside of my professional work, I enjoy creating apps like this one: https://nuxt3-88.vercel.app and this: https://swspecs.vercel.app (both built using Nuxt 3). I also like staying up-to-date with and learning about emerging idealogies in frontend land, however, 
            I've begun to branch out and dedicate spare time to Rust and Go and want to build up my skills in both languages as not only do both have a bright future ahead, but I've honestly just enjoyed tinkering with them. 
            I have goals in mind as it relates to these two languages and I'm sure I'll reach them but between work and life it's been a slow journey learning and navigating the backend. 
            And there really aren't enough hours in the day when you suffer from an addiction to golf like I do.
        </p>

        <p class="mt-8 mb-4">
            I used to be writer and I still love it -- just not as a career anymore -- and I want to bring that desire 
            to write and learn to the tech community I care about and am grateful to be a part of. I like to teach and demonstrate the 
            knowledge I have gained during my time as a developer. I code using Visual Studio, but over the past year or so I've been spending time with
            Vim/Neovim but I'm still not yet to the point where I'm a more efficient developer while using it. I know the
            basic commands like toggling the menu, switching between tabs and all the trivial things, but I've found the
            barrier to entry after the setup, such as configuring syntax, LSP and tree-sitters, to be a time-consuming drag
            so I'm still stuck in VS Code land indefinitely. I also like long single file components written in tsx within Vue 3.x and
            React Native repos 📱 and really fancy as many functional components I can write until I'm lost.
        </p>

        <p>Thanks for reading and if you'd like to reach out you can find me @zedev8 on twitter. I'd love to hear from you! 🌲</p>
    </div>
   <!-- <Projects /> -->
    <Posts />
    <Footer />
</template>

<script setup lang="ts">
definePageMeta({
    colorMode: 'dark',
})

useSeoMeta({
  title: 'Zach Edwards Software Development Blog',
  ogTitle: 'Dev Blog by Zach Edwards',
  description: 'I write about my life in tech while working with Vue.js and Nuxt 3',
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