import fsDriver from 'unstorage/drivers/fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: true,

  css: ['/public/style.css', '@/assets/scss/main.scss'],

  modules: [
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-file-storage',
    'nuxt-tiptap-editor',
    'nuxt-mdi'
  ],

  runtimeConfig: {
    storage: '',
    yourOrigin: '',
    baseUrl: '',
    authSecret: ''
  },

  fileStorage: {
    mount: process.env.NUXT_STORAGE
  },

  tiptap: {
    prefix: 'TipTap'
  },

  mdi: {
    defaultSize: '1rem'
  },

  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: false
  },

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
