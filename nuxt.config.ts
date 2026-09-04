// https://nuxt.com/docs/api/configuration/nuxt-config
const isFastDev = process.env.NUXT_FAST_DEV === '1'

export default defineNuxtConfig({
  modules: [
    ...isFastDev ? [] : ['@nuxt/eslint'],
    '@nuxt/ui'
  ],

  devtools: {
    enabled: false
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
        'lucide:circle-alert',
        'lucide:code-2',
        'lucide:palette',
        'lucide:pencil',
        'lucide:plus',
        'lucide:refresh-cw',
        'lucide:rocket',
        'lucide:save',
        'lucide:shield-check',
        'lucide:trash-2',
        'lucide:x',
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
      devtools: {
        enabled: false
      },
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
