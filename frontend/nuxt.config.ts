import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/fonts',
    'pinia-plugin-persistedstate',
    'shadcn-nuxt',
    'nuxt-tiptap-editor'
  ],

  css: ['@/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: ['hb.janak.click']
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      bodyAttrs: {
        class: 'font-[Ek Mukta]'
      }
    }
  },

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME,
      serverUrl: process.env.NUXT_SERVER_URL,
      apiUrl: process.env.NUXT_API_URL,
      mailAdmin: process.env.NUXT_MAIL_ADMIN,
    }
  }
})