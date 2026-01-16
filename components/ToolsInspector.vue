<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-white mb-1">Available Tools</h2>
      <p class="text-sm text-gray-400">
        Tools exposed by your MCP server
      </p>
    </div>

    <!-- Empty State -->
    <div v-if="tools.length === 0" class="text-center py-16">
      <div class="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">🔧</span>
      </div>
      <p class="text-gray-400 font-medium mb-2">No tools available yet</p>
      <p class="text-sm text-gray-500">Run your server to discover available tools</p>
    </div>

    <!-- Tools List -->
    <div v-else class="space-y-4">
      <div
        v-for="(tool, index) in tools"
        :key="index"
        class="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
      >
        <div class="p-4 space-y-3">
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span class="text-lg">⚡</span>
              </div>
            <div>
                <h3 class="text-base font-semibold text-white font-mono">{{ tool.name }}</h3>
                <p class="text-sm text-gray-400 mt-0.5">{{ tool.description }}</p>
              </div>
            </div>
            <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">
              Tool
            </span>
          </div>

          <!-- Parameters -->
          <div v-if="tool.parameters" class="pt-3 border-t border-white/5">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Parameters</span>
            </div>
            <div class="bg-[#0a0a0f] rounded-lg p-3 font-mono text-xs text-gray-400 overflow-x-auto">
              <pre class="whitespace-pre-wrap">{{ JSON.stringify(tool.parameters, null, 2) }}</pre>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-2">
            <button
              @click="testTool(tool)"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 text-xs font-medium rounded-lg transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Test Tool
            </button>
            <button
              @click="copyToolCode(tool)"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy Usage
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ToolDefinition {
  name: string
  description: string
  parameters?: Record<string, unknown>
}

defineProps<{
  tools: ToolDefinition[]
}>()

const toast = useToast()

function testTool(tool: ToolDefinition) {
  toast.add({
    title: `Testing ${tool.name}`,
    description: 'Tool testing will be implemented with real tool execution',
    color: 'primary'
  })
}

function copyToolCode(tool: ToolDefinition) {
  const code = `# Call ${tool.name}
result = await call_tool("${tool.name}", ${JSON.stringify(tool.parameters || {}, null, 2)})`
  
  navigator.clipboard.writeText(code)
  toast.add({
    title: 'Copied!',
    description: 'Usage code copied to clipboard',
    color: 'success'
  })
}
</script>
