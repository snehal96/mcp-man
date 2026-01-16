// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  
  // SEO & Meta
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'MCP Playground - Build & Test MCP Servers in Your Browser',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Free, open-source browser-based IDE for building, testing, and sharing Model Context Protocol (MCP) servers. Write Python MCP servers with FastMCP, test tools in real-time, no installation required.' 
        },
        // Keywords
        { name: 'keywords', content: 'MCP, Model Context Protocol, MCP server, FastMCP, Python, Pyodide, AI tools, LLM tools, Claude, Anthropic, browser IDE, playground' },
        { name: 'author', content: 'MCP Playground' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://mcpplayground.com/' },
        { property: 'og:title', content: 'MCP Playground - Build & Test MCP Servers in Your Browser' },
        { property: 'og:description', content: 'Free, open-source browser-based IDE for building and testing Model Context Protocol servers. No installation required.' },
        { property: 'og:image', content: 'https://mcpplayground.com/logo.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'MCP Playground' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://mcpplayground.com/' },
        { name: 'twitter:title', content: 'MCP Playground - Build & Test MCP Servers in Your Browser' },
        { name: 'twitter:description', content: 'Free, open-source browser-based IDE for building and testing Model Context Protocol servers.' },
        { name: 'twitter:image', content: 'https://mcpplayground.com/logo.png' },
        
        // Additional SEO
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#8b5cf6' },
        { name: 'msapplication-TileColor', content: '#8b5cf6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        { rel: 'canonical', href: 'https://mcpplayground.com/' },
      ],
    },
  },
  
  vite: {
    optimizeDeps: {
      include: ['monaco-editor'],
      exclude: ['monaco-editor/esm/vs/language/json/json.worker', 'monaco-editor/esm/vs/language/css/css.worker', 'monaco-editor/esm/vs/language/html/html.worker', 'monaco-editor/esm/vs/language/typescript/ts.worker', 'monaco-editor/esm/vs/editor/editor.worker']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'monaco-editor': ['monaco-editor']
          }
        }
      }
    }
  }
})

