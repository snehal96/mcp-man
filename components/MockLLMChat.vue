<template>
  <div class="flex flex-col h-full bg-[#0a0a0f]">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
          <span class="text-xl">🤖</span>
        </div>
        <div>
          <h3 class="font-semibold text-white">Mock AI Assistant</h3>
          <p class="text-xs text-gray-400">
            {{ tools.length }} tool{{ tools.length !== 1 ? 's' : '' }} available
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="clearChat"
          class="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title="Clear chat"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Chat Messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Welcome Message -->
      <div v-if="messages.length === 0" class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
          <span class="text-3xl">🤖</span>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Mock AI Testing</h3>
          <p class="text-sm text-gray-400 max-w-sm mx-auto">
            Test how an AI would interact with your MCP tools. Try asking natural questions!
          </p>
        </div>
        
        <!-- Quick Prompts -->
        <div class="space-y-2">
          <p class="text-xs text-gray-500 uppercase tracking-wider">Try these:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="prompt in quickPrompts"
              :key="prompt"
              @click="sendMessage(prompt)"
              class="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-full text-sm text-gray-300 hover:text-white transition-all"
            >
              {{ prompt }}
            </button>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-for="(message, index) in messages" :key="index" class="space-y-1">
        <!-- User Message -->
        <div v-if="message.role === 'user'" class="flex justify-end">
          <div class="max-w-[85%] bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl rounded-tr-md px-4 py-2.5 shadow-lg">
            <p class="text-white text-sm">{{ message.content }}</p>
          </div>
        </div>

        <!-- AI Message -->
        <div v-else class="flex gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <span class="text-sm">🤖</span>
          </div>
          <div class="flex-1 space-y-2">
            <!-- Thinking -->
            <div v-if="message.thinking" class="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              <div class="flex items-center gap-2 text-amber-300 text-xs mb-1">
                <svg class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span class="font-semibold">Thinking...</span>
              </div>
              <p class="text-amber-200/80 text-xs font-mono">{{ message.thinking }}</p>
            </div>

            <!-- Tool Call -->
            <div v-if="message.toolCall" class="bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-2">
              <div class="flex items-center gap-2 text-violet-300 text-xs mb-2">
                <span>⚡</span>
                <span class="font-semibold">Calling tool: {{ message.toolCall.name }}</span>
              </div>
              <pre class="text-xs text-violet-200/80 font-mono overflow-x-auto">{{ JSON.stringify(message.toolCall.args, null, 2) }}</pre>
            </div>

            <!-- Tool Result -->
            <div v-if="message.toolResult" class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
              <div class="flex items-center gap-2 text-emerald-300 text-xs mb-1">
                <span>✅</span>
                <span class="font-semibold">Tool Result</span>
                <span v-if="message.executionTime" class="text-emerald-400/60">({{ message.executionTime }}ms)</span>
              </div>
              <pre class="text-xs text-emerald-200/80 font-mono overflow-x-auto whitespace-pre-wrap">{{ message.toolResult }}</pre>
            </div>

            <!-- Tool Error -->
            <div v-if="message.toolError" class="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <div class="flex items-center gap-2 text-red-300 text-xs mb-1">
                <span>❌</span>
                <span class="font-semibold">Error</span>
              </div>
              <pre class="text-xs text-red-200/80 font-mono overflow-x-auto">{{ message.toolError }}</pre>
            </div>

            <!-- Response -->
            <div v-if="message.content" class="bg-white/[0.02] border border-white/10 rounded-2xl rounded-tl-md px-4 py-2.5">
              <p class="text-gray-200 text-sm whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isProcessing" class="flex gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
          <span class="text-sm animate-bounce">🤖</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-2xl rounded-tl-md px-4 py-3">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-white/10">
      <form @submit.prevent="handleSubmit" class="flex gap-2">
        <input
          v-model="userInput"
          type="text"
          placeholder="Ask the AI to use your tools..."
          class="flex-1 px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          :disabled="isProcessing || !serverRunning"
        />
        <button
          type="submit"
          :disabled="!userInput.trim() || isProcessing || !serverRunning"
          class="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </form>
      <p v-if="!serverRunning" class="text-xs text-amber-400 mt-2">
        ⚠️ Run your server first to enable AI testing
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, { type: string; description?: string; enum?: string[] }>
    required?: string[]
  }
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  toolCall?: { name: string; args: Record<string, unknown> }
  toolResult?: string
  toolError?: string
  executionTime?: number
}

const props = defineProps<{
  serverRunning: boolean
  tools: MCPTool[]
  callTool: (name: string, args: Record<string, unknown>) => Promise<{ success: boolean; result?: string; error?: string; executionTime?: number }>
}>()

const userInput = ref('')
const messages = ref<ChatMessage[]>([])
const isProcessing = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

// Generate quick prompts based on available tools
const quickPrompts = computed(() => {
  const prompts: string[] = []
  
  for (const tool of props.tools.slice(0, 4)) {
    if (tool.name.includes('greet') || tool.name.includes('hello')) {
      prompts.push('Say hello to John')
    } else if (tool.name.includes('weather')) {
      prompts.push("What's the weather in Tokyo?")
    } else if (tool.name.includes('calc') || tool.name.includes('add')) {
      prompts.push('Calculate 15 + 27')
    } else if (tool.name.includes('todo') || tool.name.includes('task')) {
      prompts.push('Add a todo: Buy groceries')
    } else if (tool.name.includes('search') || tool.name.includes('find')) {
      prompts.push('Search for Python tutorials')
    } else {
      // Generic prompt based on tool description
      const desc = tool.description.toLowerCase()
      if (desc.includes('get') || desc.includes('fetch')) {
        prompts.push(`Get ${tool.name.replace(/_/g, ' ')}`)
      } else {
        prompts.push(`Use ${tool.name.replace(/_/g, ' ')}`)
      }
    }
  }
  
  return prompts.slice(0, 4)
})

// Scroll to bottom when new messages arrive
watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })

function clearChat() {
  messages.value = []
}

async function handleSubmit() {
  if (!userInput.value.trim() || isProcessing.value) return
  await sendMessage(userInput.value.trim())
  userInput.value = ''
}

async function sendMessage(text: string) {
  // Add user message
  messages.value.push({ role: 'user', content: text })
  isProcessing.value = true

  // Simulate AI thinking delay
  await delay(500)

  // Find matching tool
  const { tool, args, reasoning } = analyzeRequest(text)

  if (!tool) {
    // No tool found
    messages.value.push({
      role: 'assistant',
      content: `I understand you want to "${text}", but I don't have a suitable tool for that. Available tools:\n\n${props.tools.map(t => `• **${t.name}**: ${t.description}`).join('\n')}`
    })
    isProcessing.value = false
    return
  }

  // Add thinking message
  const assistantMsg: ChatMessage = {
    role: 'assistant',
    content: '',
    thinking: reasoning,
    toolCall: { name: tool.name, args }
  }
  messages.value.push(assistantMsg)

  // Simulate processing delay
  await delay(300)

  // Call the tool
  try {
    const result = await props.callTool(tool.name, args)
    
    if (result.success) {
      assistantMsg.toolResult = result.result
      assistantMsg.executionTime = result.executionTime
      assistantMsg.content = generateResponse(text, tool.name, result.result || '')
    } else {
      assistantMsg.toolError = result.error
      assistantMsg.content = `I tried to use the ${tool.name} tool, but encountered an error. ${result.error}`
    }
  } catch (err: unknown) {
    assistantMsg.toolError = err instanceof Error ? err.message : 'Unknown error'
    assistantMsg.content = `Something went wrong while calling ${tool.name}. Please try again.`
  }

  // Clear thinking indicator
  assistantMsg.thinking = undefined
  isProcessing.value = false
}

function analyzeRequest(text: string): { tool: MCPTool | null; args: Record<string, unknown>; reasoning: string } {
  const lower = text.toLowerCase()
  
  for (const tool of props.tools) {
    const toolLower = tool.name.toLowerCase()
    const descLower = tool.description.toLowerCase()
    
    // Check if the request matches this tool
    const keywords = [
      ...toolLower.split('_'),
      ...descLower.split(' ').filter(w => w.length > 3)
    ]
    
    const matches = keywords.some(kw => lower.includes(kw)) ||
                    lower.includes(toolLower.replace(/_/g, ' '))
    
    if (matches) {
      const args = extractArgs(text, tool)
      const reasoning = `Analyzing request... Found matching tool "${tool.name}" which ${tool.description.toLowerCase()}`
      return { tool, args, reasoning }
    }
  }
  
  // Try to find any tool that might work based on general patterns
  for (const tool of props.tools) {
    const args = extractArgs(text, tool)
    if (Object.keys(args).length > 0) {
      const reasoning = `Attempting to use "${tool.name}" based on detected parameters`
      return { tool, args, reasoning }
    }
  }
  
  return { tool: null, args: {}, reasoning: '' }
}

function extractArgs(text: string, tool: MCPTool): Record<string, unknown> {
  const args: Record<string, unknown> = {}
  const properties = tool.inputSchema?.properties || {}
  
  for (const [paramName, paramDef] of Object.entries(properties)) {
    const paramLower = paramName.toLowerCase()
    
    // Try to extract value based on parameter name patterns
    if (paramLower.includes('name') || paramLower.includes('person') || paramLower.includes('user')) {
      // Extract name (look for capitalized words or after "to" or "for")
      const nameMatch = text.match(/(?:to|for|greet|hello|hi)\s+(\w+)/i) ||
                        text.match(/(\b[A-Z][a-z]+\b)/)
      if (nameMatch) args[paramName] = nameMatch[1]
    }
    
    else if (paramLower.includes('city') || paramLower.includes('location') || paramLower.includes('place')) {
      // Extract location (look for "in" or common city names)
      const locMatch = text.match(/(?:in|at|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i)
      if (locMatch) args[paramName] = locMatch[1]
    }
    
    else if (paramLower.includes('language') || paramLower.includes('lang')) {
      // Extract language
      const languages = ['english', 'spanish', 'french', 'german', 'japanese', 'chinese']
      for (const lang of languages) {
        if (text.toLowerCase().includes(lang)) {
          args[paramName] = lang
          break
        }
      }
    }
    
    else if (paramLower.includes('task') || paramLower.includes('todo') || paramLower.includes('item') || paramLower.includes('title')) {
      // Extract task description (look for quoted text or after colon)
      const taskMatch = text.match(/[:"]\s*(.+?)(?:["\s]*$)/i) ||
                        text.match(/(?:add|create|new)\s+(?:a\s+)?(?:todo|task)?:?\s*(.+)/i)
      if (taskMatch) args[paramName] = taskMatch[1].trim()
    }
    
    else if (paramLower.includes('query') || paramLower.includes('search') || paramLower.includes('text')) {
      // Extract search query
      const queryMatch = text.match(/(?:search|find|look for|query)\s+(?:for\s+)?(.+)/i)
      if (queryMatch) args[paramName] = queryMatch[1].trim()
    }
    
    else if (paramDef.type === 'number' || paramDef.type === 'integer') {
      // Extract numbers
      const nums = text.match(/\d+\.?\d*/g)
      if (nums && nums.length > 0) {
        // Try to figure out which number goes where
        if (paramLower.includes('a') || paramLower.includes('first') || paramLower.includes('x')) {
          args[paramName] = parseFloat(nums[0])
        } else if (paramLower.includes('b') || paramLower.includes('second') || paramLower.includes('y')) {
          args[paramName] = parseFloat(nums[1] || nums[0])
        } else {
          args[paramName] = parseFloat(nums[0])
        }
      }
    }
    
    else if (paramDef.enum) {
      // Check for enum values
      for (const enumVal of paramDef.enum) {
        if (text.toLowerCase().includes(enumVal.toLowerCase())) {
          args[paramName] = enumVal
          break
        }
      }
    }
    
    // Default string extraction for required params without a value
    else if (tool.inputSchema.required?.includes(paramName) && !args[paramName]) {
      // Try to extract any quoted string or the main subject
      const quotedMatch = text.match(/["']([^"']+)["']/)
      if (quotedMatch) {
        args[paramName] = quotedMatch[1]
      }
    }
  }
  
  return args
}

function generateResponse(request: string, toolName: string, result: string): string {
  const responses = [
    `Here's what I found:\n\n${result}`,
    `Based on your request, ${result}`,
    `Done! ${result}`,
    `I used the ${toolName} tool and got: ${result}`,
    `${result}`,
  ]
  
  // Pick a response style based on the result content
  if (result.includes('error') || result.includes('Error')) {
    return `I encountered an issue: ${result}`
  }
  
  return responses[Math.floor(Math.random() * responses.length)]
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
