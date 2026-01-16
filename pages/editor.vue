<template>
  <div class="h-screen flex flex-col bg-[#0a0a0f] overflow-hidden">
    <!-- Header -->
    <header class="border-b border-white/10 bg-black/60 backdrop-blur-xl relative z-50">
      <div class="px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Logo & Back to Home -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all duration-300">
              ⚡
            </div>
            <span class="text-lg font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">MCP Playground</span>
          </NuxtLink>
          
          <div class="h-6 w-px bg-white/10"></div>
          
          <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 rounded-full border border-violet-500/30">
            Editor
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Docs Link -->
          <NuxtLink 
            to="/docs"
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <UIcon name="i-heroicons-book-open" class="w-4 h-4" />
            <span>Docs</span>
          </NuxtLink>
          
          <!-- GitHub Link -->
          <a 
            href="https://github.com/modelcontextprotocol" 
            target="_blank"
            class="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          
          <div class="h-6 w-px bg-white/10 mx-1"></div>
          
          <UButton 
            icon="i-heroicons-question-mark-circle"
            variant="ghost"
            color="neutral"
            size="sm"
            class="text-gray-400 hover:text-white"
            @click="showGuide = true"
          />
          
          <UButton 
            icon="i-heroicons-play-solid"
            color="primary"
            variant="solid"
            size="sm"
            @click="runCode"
            :loading="isLoading"
            :disabled="isLoading"
            class="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25 font-semibold"
          >
            {{ isLoading ? loadingText : (isServerRunning ? 'Restart' : 'Run Server') }}
          </UButton>
          
          <UButton 
            icon="i-heroicons-arrow-down-tray"
            variant="soft"
            color="success"
            size="sm"
            class="font-medium"
            @click="downloadCode"
          >
            <span class="hidden sm:inline">Download</span>
          </UButton>
          
          <UButton 
            icon="i-heroicons-share"
            variant="ghost"
            color="neutral"
            size="sm"
            class="text-gray-400 hover:text-white"
            @click="sharePlayground"
          />
        </div>
      </div>
    </header>

    <!-- Welcome Banner (Collapsible) -->
    <WelcomeBanner @open-guide="showGuide = true" class="relative z-40" />

    <!-- Loading Overlay -->
    <div 
      v-if="isLoading && !isServerRunning" 
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="text-center space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto animate-pulse">
          <span class="text-3xl">🐍</span>
        </div>
        <div>
          <p class="text-white font-semibold text-lg">{{ loadingText }}</p>
          <p class="text-gray-400 text-sm mt-1">This may take a few seconds on first load...</p>
        </div>
        <div class="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Panel: Code Editor -->
      <div class="w-1/2 flex flex-col border-r border-white/10 bg-[#0d0d12]">
        <!-- Template Selector -->
        <div class="px-4 py-2.5 border-b border-white/10 bg-black/40 flex items-center gap-3">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Template</span>
          <USelect
            v-model="selectedTemplate"
            :items="templates"
            value-key="value"
            class="w-56"
            :ui="{ content: 'bg-[#0a0a0f] ring-white/10' }"
            @update:model-value="loadTemplate"
          />
          <UButton
            icon="i-heroicons-arrow-path"
            variant="ghost"
            color="neutral"
            size="xs"
            @click="resetEditor"
            title="Reset to template"
            class="text-gray-400 hover:text-white"
          />
          
          <!-- Server Status -->
          <div class="ml-auto flex items-center gap-2">
            <div v-if="isServerRunning" class="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span class="text-xs font-medium text-emerald-400">Running</span>
              <span class="text-xs text-emerald-400/70">({{ availableTools.length + availableResources.length + availablePrompts.length }} items)</span>
            </div>
            <div v-else-if="pyodideReady" class="flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span class="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <span class="text-xs font-medium text-blue-400">Python Ready</span>
            </div>
          </div>
        </div>

        <!-- Monaco Editor Container -->
        <div class="flex-1 relative">
          <ClientOnly>
            <MonacoEditor
              v-model="code"
              language="python"
              theme="vs-dark"
              :options="editorOptions"
            />
          </ClientOnly>
        </div>

        <!-- Status Bar -->
        <div class="px-4 py-1.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs">
          <div class="flex items-center gap-3">
            <span class="text-gray-400 flex items-center gap-1.5">
              <span class="text-base">🐍</span>
              Python 3.11 (Pyodide)
            </span>
            <span v-if="validationErrors.length > 0" class="text-amber-400 flex items-center gap-1">
              <span>⚠️</span>
              {{ validationErrors.length }} warning(s)
            </span>
          </div>
          <div class="text-gray-500">
            <span>{{ lineCount }} lines</span>
            <span class="mx-2">•</span>
            <span>{{ codeSize }}</span>
            <span class="mx-2">•</span>
            <span class="text-gray-600">⌘+Enter to run</span>
          </div>
        </div>
      </div>

      <!-- Right Panel: Testing Interface -->
      <div class="w-1/2 flex flex-col bg-[#0a0a0f]">
        <!-- Tabs -->
        <div class="border-b border-white/10 bg-black/40 px-2">
          <div class="flex">
            <button 
              v-for="(tab, index) in tabs" 
              :key="tab.value"
              @click="activeTab = index"
              :class="[
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative',
                activeTab === index 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              ]"
            >
              <UIcon :name="tab.icon" class="w-4 h-4" />
              <span>{{ tab.label }}</span>
              <span 
                v-if="tab.badge" 
                class="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-violet-500/20 text-violet-300"
              >
                {{ tab.badge }}
              </span>
              <div 
                v-if="activeTab === index" 
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
              ></div>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="flex-1 overflow-hidden">
          <!-- Test Tab (Real Tool Testing with Pyodide) -->
          <div v-show="activeTab === 0" class="h-full">
            <ToolTester
              :server-running="isServerRunning"
              :tools="availableTools"
              :resources="availableResources"
              :prompts="availablePrompts"
              :pyodide-ready="pyodideReady"
              :pyodide-progress="pyodideProgress"
            />
          </div>

          <!-- Tools Inspector Tab -->
          <div v-show="activeTab === 1" class="h-full overflow-auto p-6">
            <ToolsInspector :tools="availableTools" />
          </div>

          <!-- Console Tab -->
          <div v-show="activeTab === 2" class="h-full overflow-auto">
            <ConsoleOutput :logs="consoleLogs" />
          </div>

          <!-- Docs Tab -->
          <div v-show="activeTab === 3" class="h-full overflow-auto p-6">
            <DocsPanel />
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <ShareModal
      v-model="showShareModal"
      :code="code"
      @download="downloadCode"
    />

    <!-- Quick Start Guide Modal -->
    <UModal v-model:open="showGuide" title="🚀 Quick Start Guide" :ui="{ content: 'max-w-3xl bg-black', body: 'max-h-[70vh] overflow-y-auto' }">
      <template #body>
        <div class="space-y-6">
          <div class="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
            <h3 class="text-lg font-bold text-violet-300 mb-2">Welcome to MCP Playground!</h3>
            <p class="text-gray-300">
              Build and test Model Context Protocol (MCP) servers in your browser. Your Python code actually runs!
            </p>
          </div>

          <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 class="font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <span>✨</span> Real Python Execution
            </h4>
            <p class="text-gray-400 text-sm">
              Unlike other playgrounds, this one actually executes your Python code using Pyodide (Python in WebAssembly). 
              Test your MCP tools with real inputs and see real outputs!
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 class="font-bold text-white mb-1">Write Your MCP Server</h4>
                <p class="text-gray-400 text-sm">
                  Use the editor to write your MCP server code. Choose a template to get started quickly.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 class="font-bold text-white mb-1">Run Server</h4>
                <p class="text-gray-400 text-sm">
                  Click "Run Server" to load Python and parse your code. Tool definitions will be extracted automatically.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 class="font-bold text-white mb-1">Test Your Tools</h4>
                <p class="text-gray-400 text-sm">
                  Go to the <span class="font-semibold text-violet-400">Test</span> tab, select a tool, fill in parameters, and click Execute. 
                  Your actual Python code runs!
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h4 class="font-bold text-white mb-1">Debug & Download</h4>
                <p class="text-gray-400 text-sm">
                  Check the <span class="font-semibold text-violet-400">Console</span> for logs and errors. 
                  When ready, download your validated server code.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h4 class="font-bold text-white mb-1">Connect to Cursor</h4>
                <p class="text-gray-400 text-sm">
                  Add your server to <span class="font-mono text-cyan-400">~/.cursor/mcp.json</span> to use your MCP tools in Cursor!
                </p>
              </div>
            </div>
          </div>

          <!-- Connect to Cursor Guide -->
          <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
            <h4 class="font-bold text-cyan-300 mb-3 flex items-center gap-2">
              <span>🔌</span> Use in Cursor IDE
            </h4>
            <div class="space-y-3 text-sm">
              <p class="text-gray-300">After downloading your server code:</p>
              <div class="bg-black/40 rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto">
                <div class="text-cyan-400"># Install MCP package</div>
                <div>pip install mcp</div>
                <div class="mt-2 text-cyan-400"># Edit ~/.cursor/mcp.json</div>
                <div class="text-gray-400">{"{"}</div>
                <div class="pl-4">"mcpServers": {"{"}</div>
                <div class="pl-8">"my-server": {"{"}</div>
                <div class="pl-12">"command": "python",</div>
                <div class="pl-12">"args": ["/path/to/server.py"]</div>
                <div class="pl-8">{"}"}</div>
                <div class="pl-4">{"}"}</div>
                <div>{"}"}</div>
              </div>
              <p class="text-gray-400">Restart Cursor and your tools will be available!</p>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <h4 class="font-bold text-white mb-2 flex items-center gap-2">
              <span>⌨️</span> Keyboard Shortcuts
            </h4>
            <ul class="space-y-1 text-sm text-gray-400">
              <li class="flex items-center gap-2">
                <span class="text-violet-400 font-mono">⌘+Enter</span>
                <span>Run server</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-violet-400 font-mono">⌘+S</span>
                <span>Download code</span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="dont-show" 
              v-model="dontShowGuide"
              class="rounded border-gray-600 bg-gray-800 text-violet-500 focus:ring-violet-500"
            />
            <label for="dont-show" class="text-sm text-gray-400">Don't show this again</label>
          </div>
          <UButton 
            color="primary" 
            class="bg-gradient-to-r from-violet-600 to-fuchsia-600"
            @click="closeGuide"
          >
            Got it!
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const { 
  serverState, 
  startServer, 
  stopServer, 
  clearLogs,
  isLoading: mcpLoading,
  isRunning: isServerRunning,
  tools: availableTools,
  resources: availableResources,
  prompts: availablePrompts,
  logs: consoleLogs,
  validationErrors,
  pyodideProgress,
} = useMCPServer()

const { isReady: pyodideReady } = usePyodide()

const code = ref('')
const selectedTemplate = ref('hello-world')
const activeTab = ref(0)
const showShareModal = ref(false)
const showGuide = ref(false)
const dontShowGuide = ref(false)
const loadingText = ref('Loading...')

const isLoading = computed(() => mcpLoading.value)

// Update loading text based on progress
watch(pyodideProgress, (progress) => {
  if (progress) {
    loadingText.value = progress
  }
})

// Keyboard shortcuts
onMounted(() => {
  const handleKeyboard = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault()
      downloadCode()
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (!isLoading.value) {
        runCode()
      }
    }
  }
  
  window.addEventListener('keydown', handleKeyboard)
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyboard)
  })
})

const { templates: availableTemplates } = useTemplates()

const templates = availableTemplates.map(t => ({
  label: t.name,
  value: t.id,
  description: t.description,
}))

const totalItems = computed(() => availableTools.value.length + availableResources.value.length + availablePrompts.value.length)

const tabs = computed(() => [
  { label: 'Test', icon: 'i-heroicons-play-circle', value: 0, badge: totalItems.value > 0 ? String(totalItems.value) : undefined },
  { label: 'Tools', icon: 'i-heroicons-wrench-screwdriver', value: 1 },
  { label: 'Console', icon: 'i-heroicons-command-line', value: 2, badge: consoleLogs.value.length > 0 ? String(consoleLogs.value.length) : undefined },
  { label: 'Docs', icon: 'i-heroicons-book-open', value: 3 },
])

const editorOptions = {
  fontSize: 13,
  minimap: { enabled: false },
  lineNumbers: 'on',
  automaticLayout: true,
  tabSize: 4,
  insertSpaces: true,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  padding: { top: 16, bottom: 16 },
  renderLineHighlight: 'gutter',
  scrollBeyondLastLine: false,
}

const lineCount = computed(() => code.value.split('\n').length)
const codeSize = computed(() => {
  const bytes = new Blob([code.value]).size
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`
})

// Load initial template and show guide
onMounted(() => {
  loadTemplate(selectedTemplate.value)
  
  const hasSeenGuide = localStorage.getItem('mcp-playground-seen-guide')
  if (!hasSeenGuide) {
    setTimeout(() => {
      showGuide.value = true
    }, 1000)
  }
})

function closeGuide() {
  showGuide.value = false
  if (dontShowGuide.value) {
    localStorage.setItem('mcp-playground-seen-guide', 'true')
  }
}

function loadTemplate(templateName: string) {
  const templateCode = getTemplateCode(templateName)
  code.value = templateCode
  clearLogs()
  if (isServerRunning.value) {
    stopServer()
  }
}

function getTemplateCode(templateId: string): string {
  const { getTemplateById } = useTemplates()
  const template = getTemplateById(templateId)
  return template?.code || ''
}

async function runCode() {
  loadingText.value = 'Starting server...'
  
  try {
    await startServer(code.value, (msg) => {
      loadingText.value = msg
    })
    // Switch to Test tab after successful start
    activeTab.value = 0
  } catch (error: unknown) {
    console.error('Error running code:', error)
  }
}

function resetEditor() {
  if (isServerRunning.value) {
    stopServer()
  }
  loadTemplate(selectedTemplate.value)
}

function downloadCode() {
  const blob = new Blob([code.value], { type: 'text/x-python' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mcp-server-${selectedTemplate.value}.py`
  a.click()
  URL.revokeObjectURL(url)
}

function sharePlayground() {
  showShareModal.value = true
}
</script>

<style scoped>
@keyframes loading-bar {
  0% { width: 0%; margin-left: 0; }
  50% { width: 70%; margin-left: 15%; }
  100% { width: 0%; margin-left: 100%; }
}

.animate-loading-bar {
  animation: loading-bar 1.5s ease-in-out infinite;
}

:deep(.overflow-auto) {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

:deep(.overflow-auto::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.overflow-auto::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.overflow-auto::-webkit-scrollbar-thumb) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

:deep(.overflow-auto::-webkit-scrollbar-thumb:hover) {
  background: rgba(255, 255, 255, 0.2);
}
</style>
