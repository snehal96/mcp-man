<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-violet-500/25">
              ⚡
            </div>
            <span class="text-xl font-bold tracking-tight">MCP Playground</span>
          </NuxtLink>
          
          <div class="flex items-center gap-4">
            <NuxtLink to="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">
              Docs
            </NuxtLink>
            <NuxtLink 
              to="/editor" 
              class="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
            >
              Open Editor
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative z-10 py-20">
      <div class="max-w-4xl mx-auto px-6">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 mb-6">
            <span class="text-2xl">💬</span>
            <span class="text-sm text-emerald-300">We'd love to hear from you</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Found a bug? Have a suggestion? Want to contribute? 
            We're always looking to improve MCP Playground.
          </p>
        </div>

        <!-- Contact Form -->
        <div class="relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-50"></div>
          
          <div class="relative bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Type Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-3">What's this about?</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    v-for="type in feedbackTypes"
                    :key="type.value"
                    type="button"
                    @click="formData.type = type.value"
                    :class="[
                      'px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200',
                      formData.type === type.value
                        ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                    ]"
                  >
                    <span class="text-lg mb-1 block">{{ type.icon }}</span>
                    {{ type.label }}
                  </button>
                </div>
              </div>

              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                />
              </div>

              <!-- Subject -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  required
                  placeholder="Brief description of your feedback"
                  class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="5"
                  required
                  placeholder="Please describe your bug report, feature suggestion, or question in detail..."
                  class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <!-- Browser Info (for bug reports) -->
              <div v-if="formData.type === 'bug'" class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div class="flex items-start gap-3">
                  <span class="text-amber-400 text-xl">ℹ️</span>
                  <div class="text-sm">
                    <p class="text-amber-300 font-medium mb-1">Browser info will be included</p>
                    <p class="text-amber-200/70">{{ browserInfo }}</p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="submitted" class="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div class="flex items-center gap-3">
                <span class="text-2xl">✅</span>
                <div>
                  <p class="text-emerald-300 font-medium">Thank you for your feedback!</p>
                  <p class="text-emerald-200/70 text-sm">We'll get back to you as soon as possible.</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div class="flex items-center gap-3">
                <span class="text-2xl">❌</span>
                <div>
                  <p class="text-red-300 font-medium">Something went wrong</p>
                  <p class="text-red-200/70 text-sm">{{ error }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Alternative Contact Methods -->
        <div class="mt-12 grid md:grid-cols-2 gap-6">
          <a 
            href="https://github.com/modelcontextprotocol/servers/issues"
            target="_blank"
            class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Open a GitHub Issue</h3>
                <p class="text-gray-400 text-sm">For technical bugs and feature requests</p>
              </div>
            </div>
          </a>

          <a 
            href="mailto:feedback@mcpplayground.com"
            class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-2xl">📧</span>
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-1">Email Us Directly</h3>
                <p class="text-gray-400 text-sm">feedback@mcpplayground.com</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl mt-20">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-gray-500 text-sm">
            © {{ new Date().getFullYear() }} MCP Playground. Built with ❤️ for the MCP community.
          </p>
          <div class="flex items-center gap-6 text-sm">
            <NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us - MCP Playground',
  meta: [
    { name: 'description', content: 'Get in touch with the MCP Playground team. Report bugs, suggest features, or ask questions.' }
  ]
})

const feedbackTypes = [
  { value: 'bug', label: 'Bug Report', icon: '🐛' },
  { value: 'feature', label: 'Feature', icon: '💡' },
  { value: 'question', label: 'Question', icon: '❓' },
  { value: 'other', label: 'Other', icon: '💬' }
]

const formData = ref({
  type: 'bug',
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref('')

// Get browser info for bug reports
const browserInfo = computed(() => {
  if (process.client) {
    return `${navigator.userAgent}`
  }
  return ''
})

// Configuration for form submission
// Option 1: Formspree - Replace with your Formspree form ID
const FORMSPREE_ENDPOINT = '' // e.g., 'https://formspree.io/f/your-form-id'

// Option 2: Google Sheets via Apps Script - Replace with your deployment URL
const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxQ_pH8WzCV3akPZ9a7LhX_uTQPHZP70ZNX4Mj3q4uiGGsyKY-Q3NJqHd1N7NvYHN0t/exec' // e.g., 'https://script.google.com/macros/s/your-script-id/exec'

async function submitForm() {
  isSubmitting.value = true
  error.value = ''
  
  try {
    const payload = {
      ...formData.value,
      timestamp: new Date().toISOString(),
      browserInfo: formData.value.type === 'bug' ? browserInfo.value : '',
      url: window.location.href
    }

    // Try Formspree first
    if (FORMSPREE_ENDPOINT) {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      if (!response.ok) throw new Error('Form submission failed')
      submitted.value = true
    }
    // Try Google Sheets
    else if (GOOGLE_SHEETS_ENDPOINT) {
      const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires this
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      // no-cors mode doesn't return response, so we assume success
      submitted.value = true
    }
    // Fallback to mailto
    else {
      const subject = encodeURIComponent(`[${formData.value.type.toUpperCase()}] ${formData.value.subject}`)
      const body = encodeURIComponent(
        `Name: ${formData.value.name}\n` +
        `Email: ${formData.value.email}\n` +
        `Type: ${formData.value.type}\n\n` +
        `Message:\n${formData.value.message}` +
        (formData.value.type === 'bug' ? `\n\nBrowser Info:\n${browserInfo.value}` : '')
      )
      window.location.href = `mailto:feedback@mcpplayground.com?subject=${subject}&body=${body}`
      submitted.value = true
    }

    // Reset form on success
    if (submitted.value) {
      formData.value = {
        type: 'bug',
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  } catch (e) {
    error.value = e.message || 'Failed to send message. Please try again or email us directly.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
