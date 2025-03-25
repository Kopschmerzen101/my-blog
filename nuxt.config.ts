// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },

  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  nitro: {
    plugins: ['~/server/trpc.ts']
  },

  compatibilityDate: '2025-03-24'
})