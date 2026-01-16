// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'MCP Playground - Build & Test MCP Servers in the Cloud',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Build, test, and share Model Context Protocol (MCP) servers in your browser. No installation required.' 
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['monaco-editor']
    }
  }
})

