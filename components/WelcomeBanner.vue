<template>
  <div v-if="show" class="relative overflow-hidden">
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-gradient-to-r from-violet-600/90 via-fuchsia-600/90 to-violet-600/90"></div>
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    
    <div class="px-6 py-3 flex items-center justify-between relative z-10">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span class="text-xl">🚀</span>
        </div>
        <div>
          <p class="text-white font-bold text-base">
            Welcome to MCP Playground!
          </p>
          <p class="text-white/80 text-sm">
            Build and test Model Context Protocol servers in your browser — no setup required.
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <button
          @click="openDocs"
          class="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span>📚</span>
          <span>Quick Start Guide</span>
        </button>
        <button
          @click="dismiss"
          class="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'open-guide': []
}>()

const show = ref(true)

onMounted(() => {
  const dismissed = localStorage.getItem('welcome-banner-dismissed')
  if (dismissed) {
    show.value = false
  }
})

function dismiss() {
  show.value = false
  localStorage.setItem('welcome-banner-dismissed', 'true')
}

function openDocs() {
  emit('open-guide')
}
</script>
