<template>
    <div class="container mx-auto mt-4 flex justify-between">
        <h1 class="ml-2 text-xl">ztv0x</h1>
        <div class="mr-2">
            <NuxtLink to="/blog" class=" bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-sm mb-8">blog</NuxtLink>
        </div>
    </div>
    <div class="container mx-auto px-4 mt-8 mb-8 text-md text-gray-200">
        <p>Hi, I'm Zach. I'm a frontend software developer working with Vue.js, Laravel and Go. I've primarily worked with
            JavaScript & TypeScript - along with several other languages - and a number of their
            libraries and frameworks, for 6+ years and as my programming skills grow so does my passion and curiosity for
            computer science and engineering. I also like long single file components written in tsx within Vue 3.x and
            React Native repos 📱 and really fancy as many functional components I can write until I'm lost.
        </p>

        <p class="mt-8 mb-8">
            Professionaly, I spend most of my time building Gutenberg blocks with React.js in WordPress land for Oak Ridge National Laboratory.
            Outside of my professional work I build applications for Android TV using Vue.js and Laravel. There's several
            projects in the making currently that I've yet to share with the world but i'm very much looking forward to when that day
            arrives.
        </p>

        <p class="mt-8 mb-4">
            I also like to teach and demonstrate the knowledge I have gained during my time as a developer. Eventually, I
            intend to learn Rust and/or C++ and work with embedded systems; I've read a lot of the docs and followed a few
            tutorials on these 2 lower-level languages but have not yet had the chance yet to truly delve into them as there
            are not enough hours in the day when you suffer from an addiction to golf like I do.
            I code using Visual Studio, but over the past year or so I've been spending time with
            Vim/Neovim but I'm still not yet to the point where I'm a more efficient developer while using it. I know the
            basic commands like toggling the menu, switching between tabs and all the trivial things, but I've found the
            barrier to entry after the setup, such as configuring syntax, LSP and tree-sitters, to be a time-consuming drag
            so I'm still stuck in VS Code land indefinitely. 🌲
        </p>
    </div>
   <!-- <Projects /> -->
    <Posts />
    <Footer />
</template>

<script setup>
definePageMeta({
    colorMode: 'dark',
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