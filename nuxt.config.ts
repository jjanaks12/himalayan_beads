import fsDriver from 'unstorage/drivers/fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: true,
  css: ['/public/style.css'],
  modules: ['@pinia/nuxt'],

  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
})