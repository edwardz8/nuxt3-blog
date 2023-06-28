// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-icon'],

  colorMode: {
    classSuffix: ''
  },

/*   runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
 */
  content: {
    documentDriven: true,
    highlight: {
      theme: 'github-dark',
      preload: ['ts', 'js', 'vue', 'bash', 'json', 'css']
    }
  },

  /* apollo: {
    clients: {
      default: {
        tokenName: 'github-token',
        httpEndpoint: 'https://api.github.com/graphql'
      }
    }
  }, */

  plugins: ['~/plugins/apollo.js']
})
