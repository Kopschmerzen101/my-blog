// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
      remarkPlugins: [],
      rehypePlugins: []
    },
    navigation: {
      fields: ['navTitle']
    }
  },


  compatibilityDate: '2025-03-24'
})