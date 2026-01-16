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
        <!-- Share Link -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span>Share Link</span>
            <span v-if="copied" class="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded">
              Copied!
            </span>
          </label>
          <div class="flex gap-2">
            <input
              :value="shareUrl"
              readonly
              class="flex-1 px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-violet-500/50"
              @click="selectAllText"
            />
            <button
              @click="copyToClipboard"
              class="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <svg v-else class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>
          <p class="text-xs text-gray-500">
            {{ isCompressed ? '📦 Code compressed for shorter URL' : '🔗 Code encoded in URL' }}
            <span class="text-gray-600">({{ urlLength }} characters)</span>
          </p>
        </div>

        <!-- Social Share -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-300">Share on Social</label>
          <div class="flex gap-2">
            <button
              @click="shareOnTwitter"
              class="flex-1 px-4 py-2.5 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-[#1DA1F2] rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Twitter</span>
            </button>
            <button
              @click="shareOnLinkedIn"
              class="flex-1 px-4 py-2.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#0A66C2] rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        <!-- Info Banner -->
        <div class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div class="flex gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="text-sm">
              <p class="font-medium text-emerald-300 mb-1">How it works</p>
              <p class="text-gray-400">
                Your code is encoded directly in the URL. Anyone with the link can open and edit your MCP server instantly - no account required!
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
          class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
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

const copied = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Encode code to URL-safe base64
function encodeCode(code: string): string {
  try {
    // Convert to base64 and make URL-safe
    const base64 = btoa(unescape(encodeURIComponent(code)))
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch {
    return ''
  }
}

const encodedCode = computed(() => encodeCode(props.code))
const isCompressed = computed(() => props.code.length > 2000)

const shareUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  const base = `${window.location.origin}/editor`
  return `${base}?code=${encodedCode.value}`
})

const urlLength = computed(() => shareUrl.value.length)

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

function selectAllText(event: Event) {
  const input = event.target as HTMLInputElement
  input.select()
}

function shareOnTwitter() {
  const text = encodeURIComponent('Check out my MCP server built with MCP Playground! 🚀')
  const url = encodeURIComponent(shareUrl.value)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(shareUrl.value)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

function handleDownload() {
  emit('download')
  isOpen.value = false
}
</script>
