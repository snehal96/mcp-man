<template>
  <div class="h-full bg-[#0a0a0f] font-mono text-sm flex flex-col">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/40">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <span class="text-gray-400 text-xs font-semibold">Console Output</span>
        <span v-if="logs.length > 0" class="px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-gray-500">
          {{ logs.length }} entries
        </span>
      </div>
      <button 
        @click="handleClear"
        class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs rounded-lg transition-colors"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        <span>Clear</span>
      </button>
    </div>

    <!-- Logs -->
    <div class="flex-1 p-4 space-y-1 overflow-auto">
      <!-- Empty State -->
      <div v-if="logs.length === 0" class="h-full flex items-center justify-center">
        <div class="text-center">
          <div class="text-gray-600 mb-2">
            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p class="text-gray-600 text-xs">No console output yet</p>
          <p class="text-gray-700 text-xs mt-1">Run your server to see logs</p>
        </div>
      </div>

      <!-- Log Entries -->
      <div 
        v-for="(log, index) in logs" 
        :key="index"
        class="flex gap-3 text-xs py-1 hover:bg-white/[0.02] px-2 -mx-2 rounded"
      >
        <span class="text-gray-600 tabular-nums flex-shrink-0">{{ formatTime(log.timestamp) }}</span>
        <span 
          :class="[
            'font-semibold flex-shrink-0 w-16',
            {
              'text-cyan-400': log.type === 'info',
              'text-emerald-400': log.type === 'success',
            'text-red-400': log.type === 'error',
              'text-amber-400': log.type === 'warning',
              'text-gray-500': log.type === 'log',
            }
          ]"
        >
          {{ getLogPrefix(log.type) }}
        </span>
        <span class="text-gray-300 flex-1 break-all">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LogEntry {
    type: 'info' | 'success' | 'error' | 'warning' | 'log'
    message: string
    timestamp: string
}

defineProps<{
  logs: LogEntry[]
}>()

const emit = defineEmits<{
  clear: []
}>()

const { clearLogs } = useMCPServer()

function handleClear() {
  clearLogs()
  emit('clear')
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function getLogPrefix(type: string): string {
  const prefixes: Record<string, string> = {
    info: '[INFO]',
    success: '[OK]',
    error: '[ERROR]',
    warning: '[WARN]',
    log: '[LOG]',
  }
  return prefixes[type] || '[LOG]'
}
</script>
