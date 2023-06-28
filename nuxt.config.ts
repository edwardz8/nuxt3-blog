// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/apollo', '@nuxtjs/color-mode', 'nuxt-icon'],

  colorMode: {
    classSuffix: ''
  },

  runtimeConfig: {
    githubURL: process.env.GITHUB_URL,
    githubToken: process.env.GITHUB_TOKEN
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-dark',
      preload: ['ts', 'js', 'vue', 'bash', 'json', 'css']
    }
  },

  apollo: {
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    clients: {
      default: {
        tokenName: 'github-token',
        httpEndpoint: 'https://api.github.com/graphql'
      }
    }
  },

  plugins: ['~/plugins/apollo.ts']
})
