<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'max-w-lg' }">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
          <span class="text-xl">🔗</span>
        </div>
        <div>
          <h3 class="font-bold text-white">Share Your MCP Server</h3>
          <p class="text-sm text-gray-400">Share your creation with the community</p>
        </div>
      </div>
    </template>

    <template #body>
      <div class="space-y-5">
        <!-- Share Link (Coming Soon) -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span>Share Link</span>
            <span class="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded">Coming Soon</span>
          </label>
          <div class="flex gap-2">
            <input
              :value="shareUrl"
              readonly
              disabled
              class="flex-1 px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-lg text-gray-500 text-sm font-mono"
            />
            <button
              disabled
              class="px-4 py-2.5 bg-white/5 text-gray-500 rounded-lg cursor-not-allowed flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Copy</span>
            </button>
          </div>
        </div>

        <!-- Embed Code (Coming Soon) -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span>Embed Code</span>
            <span class="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded">Coming Soon</span>
          </label>
          <textarea
            :value="embedCode"
            readonly
            disabled
            rows="3"
            class="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-lg text-gray-500 text-xs font-mono resize-none"
          ></textarea>
        </div>

        <!-- Info Banner -->
        <div class="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4">
          <div class="flex gap-3">
            <div class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-sm">
              <p class="font-medium text-violet-300 mb-1">Share Feature Coming Soon!</p>
              <p class="text-gray-400">
                We're working on enabling you to share your MCP servers with a unique URL. 
                For now, download your code and share it manually.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          @click="isOpen = false"
          class="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-lg transition-colors"
        >
          Close
        </button>
        <button
          @click="handleDownload"
          class="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Download Code</span>
        </button>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  code: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'download': []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const shareUrl = computed(() => {
  return 'https://mcp-playground.dev/share/abc123'
})

const embedCode = computed(() => {
  return `<iframe src="${shareUrl.value}/embed" width="800" height="600"></iframe>`
})

function handleDownload() {
  emit('download')
  isOpen.value = false
}
</script>
