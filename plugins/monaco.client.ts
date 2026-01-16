export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    // Use CDN-based workers to avoid Vite build issues
    const MONACO_VERSION = '0.52.2' // Match your installed monaco-editor version
    const CDN_BASE = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs`
    
    // @ts-ignore
    window.MonacoEnvironment = {
      getWorkerUrl(_moduleId: string, label: string) {
        if (label === 'json') {
          return `${CDN_BASE}/language/json/json.worker.js`
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return `${CDN_BASE}/language/css/css.worker.js`
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return `${CDN_BASE}/language/html/html.worker.js`
        }
        if (label === 'typescript' || label === 'javascript') {
          return `${CDN_BASE}/language/typescript/ts.worker.js`
        }
        return `${CDN_BASE}/editor/editor.worker.js`
      }
    }
  }
})

