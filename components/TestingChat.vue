<template>
  <div class="h-full flex flex-col">
    <!-- Messages Area -->
    <div class="flex-1 overflow-auto p-6 space-y-4">
      <!-- Empty State -->
      <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
        <div class="text-center max-w-md">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">💬</span>
          </div>
          <p class="text-lg font-medium text-white mb-2">Test Your MCP Server</p>
          <p class="text-sm text-gray-400">
            {{ serverRunning ? 'Type a message to test your tools — try "Greet John" or "What\'s the weather?"' : 'Run your server first to begin testing your tools' }}
          </p>
          <div v-if="serverRunning && availableTools.length > 0" class="mt-4 flex flex-wrap gap-2 justify-center">
            <span 
              v-for="tool in availableTools.slice(0, 3)" 
              :key="tool.name"
              class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
            >
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-for="(message, index) in messages" :key="index" class="flex gap-3 animate-fade-in">
        <div 
          :class="[
            'flex-1 rounded-xl p-4',
            message.role === 'user' 
              ? 'bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 ml-12' 
              : 'bg-white/[0.02] border border-white/10 mr-12'
          ]"
        >
          <div class="flex items-start gap-3">
            <div 
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                message.role === 'user' 
                  ? 'bg-violet-500/20' 
                  : 'bg-cyan-500/20'
              ]"
            >
              <span class="text-lg">{{ message.role === 'user' ? '👤' : '🤖' }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-gray-500 mb-1">
                {{ message.role === 'user' ? 'You' : 'AI Assistant' }}
              </div>
              <div class="text-white whitespace-pre-wrap text-sm">{{ message.content }}</div>
              
              <!-- Tool Call Display -->
              <div v-if="message.toolCalls" class="mt-3 space-y-2">
                <div 
                  v-for="(call, idx) in message.toolCalls" 
                  :key="idx"
                  class="bg-[#0a0a0f] border border-white/5 rounded-lg overflow-hidden"
                >
                  <div class="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/5">
                    <div class="w-5 h-5 rounded bg-violet-500/20 flex items-center justify-center">
                      <svg class="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <span class="text-xs font-mono font-medium text-violet-300">{{ call.name }}</span>
                  </div>
                  <div class="p-3 space-y-2">
                    <div class="text-xs text-gray-500">
                      <span class="font-medium">Input:</span>
                      <pre class="mt-1 text-gray-400 font-mono">{{ JSON.stringify(call.args, null, 2) }}</pre>
                    </div>
                    <div v-if="call.result" class="text-xs text-gray-500 pt-2 border-t border-white/5">
                      <span class="font-medium">Output:</span>
                      <pre class="mt-1 text-emerald-400 font-mono">{{ call.result }}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Thinking Indicator -->
      <div v-if="isThinking" class="flex gap-3 animate-fade-in">
        <div class="flex-1 rounded-xl p-4 bg-white/[0.02] border border-white/10 mr-12">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <span class="text-lg">🤖</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
                <span class="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
                <span class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
              </div>
              <span class="text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-white/10 p-4 bg-black/40">
      <div v-if="!serverRunning" class="text-center py-3">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span class="text-sm text-amber-300">Server is not running. Click "Run Server" to start testing.</span>
        </div>
      </div>
      
      <div v-else class="flex gap-3">
        <div class="flex-1 relative">
          <textarea
            v-model="userInput"
            placeholder="Ask the AI to use your MCP tools... (e.g., 'Greet John')"
            :rows="2"
            :disabled="isThinking"
            @keydown.enter.exact.prevent="sendMessage"
            class="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
          ></textarea>
        </div>
        <button
          :disabled="!userInput.trim() || isThinking"
          @click="sendMessage"
          :class="[
            'px-4 rounded-xl font-medium transition-all flex items-center justify-center',
            userInput.trim() && !isThinking
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105'
              : 'bg-white/5 text-gray-500 cursor-not-allowed'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: 'user' | 'assistant'
  content: string
  toolCalls?: Array<{
    name: string
    args: Record<string, unknown>
    result?: string
  }>
}

interface ToolDefinition {
  name: string
  description: string
  parameters?: Record<string, unknown>
}

const props = defineProps<{
  serverRunning: boolean
  availableTools: ToolDefinition[]
}>()

const emit = defineEmits<{
  'execute-tool': [toolName: string, args: Record<string, unknown>]
}>()

const messages = ref<Message[]>([])
const userInput = ref('')
const isThinking = ref(false)

// Helper function to parse tool calls from user input
function parseToolCall(input: string, availableTools: ToolDefinition[]): { toolName: string; args: Record<string, unknown>; description: string } | null {
  const lowerInput = input.toLowerCase()
  
  // Check for greet tool
  if (availableTools.some(t => t.name === 'greet')) {
    const greetMatch = input.match(/greet\s+(\w+)/i) || input.match(/say\s+(?:hello|hi)\s+(?:to\s+)?(\w+)/i)
    if (greetMatch) {
      return {
        toolName: 'greet',
        args: { name: greetMatch[1] },
        description: `I'll greet ${greetMatch[1]} for you.`
      }
    }
  }
  
  // Check for weather tool
  if (availableTools.some(t => t.name === 'get_weather')) {
    const weatherMatch = lowerInput.match(/weather.*?(?:in|for)?\s*(new york|london|tokyo|paris|sydney)/i) ||
                        lowerInput.match(/(new york|london|tokyo|paris|sydney).*weather/i)
    if (weatherMatch || /weather/i.test(lowerInput)) {
      const city = weatherMatch?.[1] || 'new york'
      return {
        toolName: 'get_weather',
        args: { city },
        description: `I'll check the weather for ${city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}.`
      }
    }
  }
  
  // Check for calculate tool
  if (availableTools.some(t => t.name === 'calculate')) {
    // Match patterns like "add 5 and 8", "5 + 8", "multiply 3 by 4", "sqrt 16"
    const mathPatterns = [
      // "add 5 and 8" or "add 5, 8"
      { regex: /(?:calculate\s+)?(?:add|sum|plus)\s+(-?\d+(?:\.\d+)?)\s*(?:and|,|with|\+)?\s*(-?\d+(?:\.\d+)?)/i, op: 'add' },
      // "subtract 5 from 10" or "10 - 5"
      { regex: /(?:calculate\s+)?(?:subtract|minus)\s+(-?\d+(?:\.\d+)?)\s*(?:from|,|-)?\s*(-?\d+(?:\.\d+)?)/i, op: 'subtract', reverse: true },
      // "multiply 3 by 4" or "3 * 4"
      { regex: /(?:calculate\s+)?(?:multiply|times)\s+(-?\d+(?:\.\d+)?)\s*(?:by|,|\*|x)?\s*(-?\d+(?:\.\d+)?)/i, op: 'multiply' },
      // "divide 10 by 2" or "10 / 2"
      { regex: /(?:calculate\s+)?(?:divide)\s+(-?\d+(?:\.\d+)?)\s*(?:by|,|\/)?\s*(-?\d+(?:\.\d+)?)/i, op: 'divide' },
      // "power 2 to 3" or "2 ^ 3"
      { regex: /(?:calculate\s+)?(?:power|pow)\s+(-?\d+(?:\.\d+)?)\s*(?:to|,|\^)?\s*(-?\d+(?:\.\d+)?)/i, op: 'power' },
      // "sqrt 16" or "square root of 16"
      { regex: /(?:calculate\s+)?(?:sqrt|square\s*root)\s*(?:of)?\s*(-?\d+(?:\.\d+)?)/i, op: 'sqrt' },
      // Simple math expressions: "5 + 8", "10 - 3", "4 * 5", "20 / 4"
      { regex: /(-?\d+(?:\.\d+)?)\s*\+\s*(-?\d+(?:\.\d+)?)/i, op: 'add' },
      { regex: /(-?\d+(?:\.\d+)?)\s*-\s*(-?\d+(?:\.\d+)?)/i, op: 'subtract' },
      { regex: /(-?\d+(?:\.\d+)?)\s*[*×x]\s*(-?\d+(?:\.\d+)?)/i, op: 'multiply' },
      { regex: /(-?\d+(?:\.\d+)?)\s*[\/÷]\s*(-?\d+(?:\.\d+)?)/i, op: 'divide' },
      { regex: /(-?\d+(?:\.\d+)?)\s*\^\s*(-?\d+(?:\.\d+)?)/i, op: 'power' },
    ]
    
    for (const pattern of mathPatterns) {
      const match = input.match(pattern.regex)
      if (match) {
        const a = parseFloat(pattern.reverse ? match[2] : match[1])
        const b = pattern.op === 'sqrt' ? undefined : parseFloat(pattern.reverse ? match[1] : match[2])
        
        const opNames: Record<string, string> = {
          add: 'add', subtract: 'subtract', multiply: 'multiply',
          divide: 'divide', power: 'raise to power', sqrt: 'calculate square root of'
        }
        
        return {
          toolName: 'calculate',
          args: { operation: pattern.op, a, ...(b !== undefined && { b }) },
          description: `I'll ${opNames[pattern.op]} ${a}${b !== undefined ? ` and ${b}` : ''}.`
        }
      }
    }
  }
  
  // Check for text processing tool
  if (availableTools.some(t => t.name === 'process_text')) {
    const textPatterns = [
      { regex: /(?:uppercase|upper)\s+["']?(.+?)["']?$/i, op: 'uppercase' },
      { regex: /(?:lowercase|lower)\s+["']?(.+?)["']?$/i, op: 'lowercase' },
      { regex: /(?:reverse)\s+["']?(.+?)["']?$/i, op: 'reverse' },
      { regex: /(?:count|length)\s+(?:characters?\s+)?(?:in\s+)?["']?(.+?)["']?$/i, op: 'count' },
    ]
    
    for (const pattern of textPatterns) {
      const match = input.match(pattern.regex)
      if (match) {
        return {
          toolName: 'process_text',
          args: { operation: pattern.op, text: match[1].trim() },
          description: `I'll ${pattern.op} the text "${match[1].trim()}".`
        }
      }
    }
  }
  
  // Check for todo tools
  if (availableTools.some(t => t.name === 'add_todo')) {
    const addTodoMatch = input.match(/(?:add|create|new)\s+(?:a\s+)?(?:todo|task)\s*[:\s]+["']?(.+?)["']?$/i)
    if (addTodoMatch) {
      return {
        toolName: 'add_todo',
        args: { title: addTodoMatch[1].trim() },
        description: `I'll add a new todo: "${addTodoMatch[1].trim()}".`
      }
    }
  }
  
  if (availableTools.some(t => t.name === 'list_todos')) {
    if (/(?:list|show|get)\s+(?:all\s+)?(?:todos?|tasks?)/i.test(lowerInput)) {
      return {
        toolName: 'list_todos',
        args: {},
        description: `I'll list all your todos.`
      }
    }
  }
  
  return null
}

// Mock tool execution for demo purposes
function executeMockTool(toolName: string, args: Record<string, unknown>): string {
  switch (toolName) {
    case 'greet':
      return `Hello, ${args.name}! Welcome to MCP Playground! 👋`
    case 'get_weather': {
      const weatherData: Record<string, { temp: number; condition: string; humidity: number }> = {
        'new york': { temp: 72, condition: 'Sunny', humidity: 65 },
        'london': { temp: 61, condition: 'Cloudy', humidity: 78 },
        'tokyo': { temp: 68, condition: 'Rainy', humidity: 82 },
        'paris': { temp: 64, condition: 'Partly Cloudy', humidity: 70 },
        'sydney': { temp: 75, condition: 'Clear', humidity: 60 },
      }
      const city = String(args.city).toLowerCase()
      const weather = weatherData[city]
      if (weather) {
        return `🌤️ Weather in ${city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}:\nTemperature: ${weather.temp}°F\nCondition: ${weather.condition}\nHumidity: ${weather.humidity}%`
      }
      return `❌ Weather data not available for ${args.city}`
    }
    case 'calculate': {
      const op = args.operation as string
      const a = args.a as number
      const b = args.b as number | undefined
      let result: number
      switch (op) {
        case 'add': result = a + (b ?? 0); break
        case 'subtract': result = a - (b ?? 0); break
        case 'multiply': result = a * (b ?? 1); break
        case 'divide': 
          if (b === 0) return '❌ Error: Division by zero'
          result = a / (b ?? 1)
          break
        case 'power': result = Math.pow(a, b ?? 1); break
        case 'sqrt': result = Math.sqrt(a); break
        default: return `❌ Unknown operation: ${op}`
      }
      return `🔢 Result: ${result}`
    }
    case 'process_text': {
      const op = args.operation as string
      const text = args.text as string
      switch (op) {
        case 'uppercase': return `📝 Result: ${text.toUpperCase()}`
        case 'lowercase': return `📝 Result: ${text.toLowerCase()}`
        case 'reverse': return `📝 Result: ${text.split('').reverse().join('')}`
        case 'count': return `📝 Character count: ${text.length}`
        default: return `❌ Unknown operation: ${op}`
      }
    }
    case 'add_todo':
      return `✅ Added todo: "${args.title}"`
    case 'list_todos':
      return `📋 Your todos:\n1. [ ] Sample task 1\n2. [ ] Sample task 2`
    default:
      return `Executed ${toolName} with args: ${JSON.stringify(args)}`
  }
}

async function sendMessage() {
  if (!userInput.value.trim()) return

  // Add user message
  messages.value.push({
    role: 'user',
    content: userInput.value,
  })

  const currentInput = userInput.value
  userInput.value = ''
  isThinking.value = true

  // Simulate AI processing
  setTimeout(async () => {
    const parsedTool = parseToolCall(currentInput, props.availableTools)
    
    if (parsedTool) {
      const result = executeMockTool(parsedTool.toolName, parsedTool.args)
      
      const toolCall = {
        name: parsedTool.toolName,
        args: parsedTool.args,
        result,
      }
      
      messages.value.push({
        role: 'assistant',
        content: parsedTool.description,
        toolCalls: [toolCall],
      })
      
      emit('execute-tool', parsedTool.toolName, parsedTool.args)
    } else {
      // Provide helpful guidance based on available tools
      const toolExamples: Record<string, string[]> = {
        greet: ['greet John', 'say hello to Sarah'],
        get_weather: ['weather in London', 'Tokyo weather'],
        calculate: ['5 + 8', 'multiply 3 by 4', 'sqrt 16', 'add 10 and 20'],
        process_text: ['uppercase hello', 'reverse hello world', 'count characters in test'],
        add_todo: ['add todo: Buy groceries', 'create task: Call mom'],
        list_todos: ['list todos', 'show all tasks'],
      }
      
      const examples = props.availableTools
        .filter(t => toolExamples[t.name])
        .map(t => `• **${t.name}**: ${toolExamples[t.name]?.slice(0, 2).join(', ')}`)
        .join('\n')
      
      messages.value.push({
        role: 'assistant',
        content: `I couldn't understand that request.\n\n**Available tools:**\n${props.availableTools.map(t => `• ${t.name}: ${t.description}`).join('\n')}\n\n**Try these examples:**\n${examples || 'Type a command to use one of the tools above.'}`,
      })
    }
    
    isThinking.value = false
  }, 800)
}

// Auto-scroll to bottom when new messages arrive
watch(() => messages.value.length, () => {
  nextTick(() => {
    const container = document.querySelector('.overflow-auto')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
