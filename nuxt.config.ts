// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-dark',
      preload: ['ts', 'js', 'vue', 'bash', 'json', 'css']
    }
  },
})
