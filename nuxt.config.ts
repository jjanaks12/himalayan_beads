import fsDriver from 'unstorage/drivers/fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  sourcemap: true,

  css: ['/public/style.css', '@/assets/scss/main.scss'],

  modules: [
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-file-storage',
    'nuxt-tiptap-editor',
    'nuxt-mdi',
    'nuxt-swiper',
    'nuxt-auth-utils',
    '@pinia-plugin-persistedstate/nuxt',
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
    // origin: process.env.AUTH_ORIGIN,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.NUXT_BASE_URL,
    provider: {
      type: 'authjs',
    },
    sessionRefresh: {
      enablePeriodically: 1 * 60 * 1000,
      enableOnWindowFocus: true
    },
    globalAppMiddleware: false
  },

  swiper: {
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
