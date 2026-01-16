<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/10 bg-black/40">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-white">MCP Tester</h2>
          <p class="text-xs text-gray-400">Test Tools, Resources, and Prompts</p>
        </div>
        <div class="flex items-center gap-2">
          <div v-if="pyodideReady" class="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            <span class="text-xs text-emerald-400">Python Ready</span>
          </div>
          <div v-else class="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
            <span class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            <span class="text-xs text-amber-400">{{ pyodideProgress || 'Loading Python...' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Category Tabs -->
      <div v-if="serverRunning" class="flex gap-1 mt-3">
        <button
          v-for="(tab, idx) in tabs"
          :key="tab.id"
          @click="activeTab = idx"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-2',
            activeTab === idx
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
          <span v-if="tab.count > 0" class="px-1.5 py-0.5 text-[10px] bg-white/10 rounded-full">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-auto p-4 space-y-4">
      <!-- No Server State -->
      <div v-if="!serverRunning" class="h-full flex items-center justify-center">
        <div class="text-center max-w-md">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🧪</span>
          </div>
          <p class="text-lg font-medium text-white mb-2">No Server Running</p>
          <p class="text-sm text-gray-400 mb-4">
            Click "Run Server" to start your MCP server and test your tools, resources, and prompts.
          </p>
          <div class="text-xs text-gray-500 bg-white/5 rounded-lg p-3">
            <strong class="text-gray-400">MCP Components:</strong>
            <ul class="mt-2 space-y-1 text-left">
              <li>🔧 <strong class="text-violet-400">Tools</strong> - Functions that LLMs can call</li>
              <li>📄 <strong class="text-blue-400">Resources</strong> - Data that LLMs can read</li>
              <li>💬 <strong class="text-emerald-400">Prompts</strong> - Reusable prompt templates</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- TOOLS TAB -->
      <div v-else-if="activeTab === 0">
        <div v-if="tools.length === 0" class="h-64 flex items-center justify-center">
          <div class="text-center">
            <span class="text-4xl mb-4 block">🔧</span>
            <p class="text-gray-400">No tools defined</p>
            <p class="text-xs text-gray-500 mt-1">Add @mcp.tool() decorators</p>
          </div>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="tool in tools" 
            :key="tool.name"
            class="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden"
          >
            <div class="p-4 border-b border-white/5 bg-black/20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <span class="text-lg">⚡</span>
                  </div>
                  <div>
                    <h3 class="font-mono font-semibold text-white">{{ tool.name }}</h3>
                    <p class="text-xs text-gray-400">{{ tool.description }}</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">Tool</span>
              </div>
            </div>

            <div class="p-4 space-y-4">
              <div v-if="Object.keys(tool.inputSchema?.properties || {}).length > 0">
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Parameters</div>
                <div class="space-y-3">
                  <div v-for="(param, paramName) in tool.inputSchema.properties" :key="paramName" class="space-y-1">
                    <label class="flex items-center gap-2">
                      <span class="text-sm font-medium text-white">{{ paramName }}</span>
                      <span v-if="tool.inputSchema.required?.includes(String(paramName))" class="text-red-400 text-xs">*</span>
                      <span class="text-xs text-gray-500">({{ param.type }})</span>
                    </label>
                    <p v-if="param.description" class="text-xs text-gray-500 mb-1">{{ param.description }}</p>
                    
                    <select v-if="param.enum" v-model="toolInputs[tool.name][paramName]" class="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500/50">
                      <option value="" disabled>Select {{ paramName }}...</option>
                      <option v-for="opt in param.enum" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                    
                    <input v-else-if="param.type === 'number' || param.type === 'integer'" v-model.number="toolInputs[tool.name][paramName]" type="number" step="any" :placeholder="`Enter ${paramName}...`" class="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500/50" />
                    
                    <label v-else-if="param.type === 'boolean'" class="flex items-center gap-2">
                      <input v-model="toolInputs[tool.name][paramName]" type="checkbox" class="rounded border-gray-600 bg-[#0a0a0f] text-violet-500 focus:ring-violet-500" />
                      <span class="text-sm text-gray-400">{{ paramName }}</span>
                    </label>
                    
                    <input v-else v-model="toolInputs[tool.name][paramName]" type="text" :placeholder="`Enter ${paramName}...`" class="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500/50" />
                  </div>
                </div>
              </div>
              
              <div v-else class="text-sm text-gray-500 italic">This tool has no parameters</div>

              <button @click="executeTool(tool)" :disabled="isExecuting[tool.name]" class="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2">
                <svg v-if="isExecuting[tool.name]" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ isExecuting[tool.name] ? 'Executing...' : 'Execute Tool' }}</span>
              </button>
            </div>

            <div v-if="toolResults[tool.name]" class="border-t border-white/5 p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Result</span>
                <span v-if="toolResults[tool.name].executionTime" class="text-xs text-gray-500">{{ toolResults[tool.name].executionTime }}ms</span>
              </div>
              <div v-if="toolResults[tool.name].success" class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <pre class="text-sm text-emerald-300 font-mono whitespace-pre-wrap">{{ toolResults[tool.name].result }}</pre>
              </div>
              <div v-else class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <pre class="text-sm text-red-300 font-mono whitespace-pre-wrap">{{ toolResults[tool.name].error }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RESOURCES TAB -->
      <div v-else-if="activeTab === 1">
        <div v-if="resources.length === 0" class="h-64 flex items-center justify-center">
          <div class="text-center">
            <span class="text-4xl mb-4 block">📄</span>
            <p class="text-gray-400">No resources defined</p>
            <p class="text-xs text-gray-500 mt-1">Add @mcp.resource() decorators</p>
          </div>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="resource in resources" 
            :key="resource.uri"
            class="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden"
          >
            <div class="p-4 border-b border-white/5 bg-black/20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span class="text-lg">📄</span>
                  </div>
                  <div>
                    <h3 class="font-mono font-semibold text-white">{{ resource.name }}</h3>
                    <p class="text-xs text-gray-400 font-mono">{{ resource.uri }}</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Resource</span>
              </div>
            </div>

            <div class="p-4 space-y-4">
              <p class="text-sm text-gray-400">{{ resource.description }}</p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span>MIME Type:</span>
                <code class="px-2 py-0.5 bg-white/5 rounded">{{ resource.mimeType }}</code>
              </div>

              <button @click="readResourceByUri(resource.uri)" :disabled="isExecuting[resource.uri]" class="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                <svg v-if="isExecuting[resource.uri]" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ isExecuting[resource.uri] ? 'Reading...' : 'Read Resource' }}</span>
              </button>
            </div>

            <div v-if="resourceResults[resource.uri]" class="border-t border-white/5 p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</span>
                <span v-if="resourceResults[resource.uri].executionTime" class="text-xs text-gray-500">{{ resourceResults[resource.uri].executionTime }}ms</span>
              </div>
              <div v-if="resourceResults[resource.uri].success" class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <pre class="text-sm text-blue-300 font-mono whitespace-pre-wrap">{{ resourceResults[resource.uri].result }}</pre>
              </div>
              <div v-else class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <pre class="text-sm text-red-300 font-mono whitespace-pre-wrap">{{ resourceResults[resource.uri].error }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROMPTS TAB -->
      <div v-else-if="activeTab === 2">
        <div v-if="prompts.length === 0" class="h-64 flex items-center justify-center">
          <div class="text-center">
            <span class="text-4xl mb-4 block">💬</span>
            <p class="text-gray-400">No prompts defined</p>
            <p class="text-xs text-gray-500 mt-1">Add @mcp.prompt() decorators</p>
          </div>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="prompt in prompts" 
            :key="prompt.name"
            class="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden"
          >
            <div class="p-4 border-b border-white/5 bg-black/20">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <span class="text-lg">💬</span>
                  </div>
                  <div>
                    <h3 class="font-mono font-semibold text-white">{{ prompt.name }}</h3>
                    <p class="text-xs text-gray-400">{{ prompt.description }}</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Prompt</span>
              </div>
            </div>

            <div class="p-4 space-y-4">
              <div v-if="prompt.arguments && prompt.arguments.length > 0">
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Arguments</div>
                <div class="space-y-3">
                  <div v-for="arg in prompt.arguments" :key="arg.name" class="space-y-1">
                    <label class="flex items-center gap-2">
                      <span class="text-sm font-medium text-white">{{ arg.name }}</span>
                      <span v-if="arg.required" class="text-red-400 text-xs">*</span>
                    </label>
                    <p v-if="arg.description" class="text-xs text-gray-500 mb-1">{{ arg.description }}</p>
                    <input v-model="promptInputs[prompt.name][arg.name]" type="text" :placeholder="`Enter ${arg.name}...`" class="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
              </div>
              
              <div v-else class="text-sm text-gray-500 italic">This prompt has no arguments</div>

              <button @click="executePromptByName(prompt)" :disabled="isExecuting[prompt.name]" class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2">
                <svg v-if="isExecuting[prompt.name]" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ isExecuting[prompt.name] ? 'Generating...' : 'Generate Prompt' }}</span>
              </button>
            </div>

            <div v-if="promptResults[prompt.name]" class="border-t border-white/5 p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Generated Prompt</span>
                <span v-if="promptResults[prompt.name].executionTime" class="text-xs text-gray-500">{{ promptResults[prompt.name].executionTime }}ms</span>
              </div>
              <div v-if="promptResults[prompt.name].success" class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <pre class="text-sm text-emerald-300 font-mono whitespace-pre-wrap">{{ promptResults[prompt.name].result }}</pre>
              </div>
              <div v-else class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <pre class="text-sm text-red-300 font-mono whitespace-pre-wrap">{{ promptResults[prompt.name].error }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Execution History -->
    <div v-if="executionHistory.length > 0" class="border-t border-white/10 bg-black/40">
      <div class="p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Executions</span>
          <button @click="clearHistory" class="text-xs text-gray-500 hover:text-white">Clear</button>
        </div>
        <div class="space-y-1 max-h-32 overflow-auto">
          <div 
            v-for="(exec, idx) in executionHistory.slice(-5).reverse()" 
            :key="idx"
            class="flex items-center gap-2 text-xs py-1"
          >
            <span :class="exec.success ? 'text-emerald-400' : 'text-red-400'">{{ exec.success ? '✓' : '✗' }}</span>
            <span :class="[
              'px-1.5 py-0.5 rounded text-[10px] uppercase',
              exec.type === 'tool' ? 'bg-violet-500/20 text-violet-300' :
              exec.type === 'resource' ? 'bg-blue-500/20 text-blue-300' :
              'bg-emerald-500/20 text-emerald-300'
            ]">{{ exec.type }}</span>
            <span class="font-mono text-white">{{ exec.name }}</span>
            <span class="text-gray-500">→</span>
            <span class="text-gray-400 truncate flex-1">{{ exec.result || exec.error }}</span>
            <span class="text-gray-600">{{ exec.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ToolParameter {
  type: string
  description?: string
  enum?: string[]
}

interface Tool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, ToolParameter>
    required?: string[]
  }
}

interface Resource {
  uri: string
  name: string
  description: string
  mimeType: string
}

interface Prompt {
  name: string
  description: string
  arguments: Array<{
    name: string
    description: string
    required: boolean
  }>
}

interface ExecutionResult {
  success: boolean
  result?: string
  error?: string
  executionTime?: number
}

interface HistoryEntry {
  type: 'tool' | 'resource' | 'prompt'
  name: string
  success: boolean
  result?: string
  error?: string
  time: string
}

const props = defineProps<{
  serverRunning: boolean
  tools: Tool[]
  resources: Resource[]
  prompts: Prompt[]
  pyodideReady: boolean
  pyodideProgress: string
}>()

const { callTool, readResource, callPrompt } = useMCPServer()

const activeTab = ref(0)
const tabs = computed(() => [
  { id: 'tools', label: 'Tools', icon: '🔧', count: props.tools.length },
  { id: 'resources', label: 'Resources', icon: '📄', count: props.resources.length },
  { id: 'prompts', label: 'Prompts', icon: '💬', count: props.prompts.length },
])

// Reactive state
const toolInputs = ref<Record<string, Record<string, unknown>>>({})
const promptInputs = ref<Record<string, Record<string, string>>>({})
const toolResults = ref<Record<string, ExecutionResult>>({})
const resourceResults = ref<Record<string, ExecutionResult>>({})
const promptResults = ref<Record<string, ExecutionResult>>({})
const isExecuting = ref<Record<string, boolean>>({})
const executionHistory = ref<HistoryEntry[]>([])

// Initialize inputs when items change
watch(() => props.tools, (newTools) => {
  for (const tool of newTools) {
    if (!toolInputs.value[tool.name]) {
      toolInputs.value[tool.name] = {}
      for (const [paramName, param] of Object.entries(tool.inputSchema?.properties || {})) {
        if (param.enum && param.enum.length > 0) {
          toolInputs.value[tool.name][paramName] = param.enum[0]
        } else if (param.type === 'number' || param.type === 'integer') {
          toolInputs.value[tool.name][paramName] = 0
        } else if (param.type === 'boolean') {
          toolInputs.value[tool.name][paramName] = false
        } else {
          toolInputs.value[tool.name][paramName] = ''
        }
      }
    }
  }
}, { immediate: true, deep: true })

watch(() => props.prompts, (newPrompts) => {
  for (const prompt of newPrompts) {
    if (!promptInputs.value[prompt.name]) {
      promptInputs.value[prompt.name] = {}
      for (const arg of prompt.arguments || []) {
        promptInputs.value[prompt.name][arg.name] = ''
      }
    }
  }
}, { immediate: true, deep: true })

async function executeTool(tool: Tool) {
  isExecuting.value[tool.name] = true
  
  try {
    const args = { ...toolInputs.value[tool.name] }
    
    for (const [key, value] of Object.entries(args)) {
      const param = tool.inputSchema?.properties?.[key]
      if (param?.type === 'number' || param?.type === 'integer') {
        args[key] = Number(value)
      }
    }
    
    const result = await callTool(tool.name, args)
    toolResults.value[tool.name] = result
    
    executionHistory.value.push({
      type: 'tool',
      name: tool.name,
      success: result.success,
      result: result.result,
      error: result.error,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Execution failed'
    toolResults.value[tool.name] = { success: false, error: errorMessage }
  } finally {
    isExecuting.value[tool.name] = false
  }
}

async function readResourceByUri(uri: string) {
  isExecuting.value[uri] = true
  
  try {
    const result = await readResource(uri)
    resourceResults.value[uri] = result
    
    executionHistory.value.push({
      type: 'resource',
      name: uri.split('/').pop() || uri,
      success: result.success,
      result: result.result?.substring(0, 50) + (result.result && result.result.length > 50 ? '...' : ''),
      error: result.error,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Read failed'
    resourceResults.value[uri] = { success: false, error: errorMessage }
  } finally {
    isExecuting.value[uri] = false
  }
}

async function executePromptByName(prompt: Prompt) {
  isExecuting.value[prompt.name] = true
  
  try {
    const args = { ...promptInputs.value[prompt.name] }
    const result = await callPrompt(prompt.name, args)
    promptResults.value[prompt.name] = result
    
    executionHistory.value.push({
      type: 'prompt',
      name: prompt.name,
      success: result.success,
      result: result.result?.substring(0, 50) + (result.result && result.result.length > 50 ? '...' : ''),
      error: result.error,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Execution failed'
    promptResults.value[prompt.name] = { success: false, error: errorMessage }
  } finally {
    isExecuting.value[prompt.name] = false
  }
}

function clearHistory() {
  executionHistory.value = []
}
</script>
