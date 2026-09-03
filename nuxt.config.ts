// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL || './data/app.sqlite'
  },

  css: ['~/assets/css/main.css'],

  icon: {
    provider: 'none',
    clientBundle: {
      icons: [
        'lucide:arrow-right',
        'lucide:blocks',
        'lucide:chevron-down',
        'lucide:code-2',
        'lucide:palette',
        'lucide:rocket',
        'lucide:shield-check',
        'lucide:zap',
        'simple-icons:github',
        'simple-icons:nuxtdotjs'
      ]
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
