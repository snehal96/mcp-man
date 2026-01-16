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
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 backdrop-blur-sm rounded-full border border-amber-500/20 mb-6">
            <span class="text-2xl">📜</span>
            <span class="text-sm text-amber-300">Legal stuff made simple</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p class="text-gray-400">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <!-- Content -->
        <div class="relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-50"></div>
          
          <div class="relative bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
            <div class="prose prose-invert max-w-none">
              
              <!-- TL;DR -->
              <section class="mb-10 p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <h2 class="text-xl font-bold text-violet-300 mb-3 flex items-center gap-2">
                  ⚡ TL;DR (Summary)
                </h2>
                <ul class="text-gray-300 space-y-2 text-sm">
                  <li>✅ MCP Playground is free to use</li>
                  <li>✅ Your code belongs to you</li>
                  <li>✅ Code runs locally in your browser</li>
                  <li>⚠️ Use at your own risk - no warranty</li>
                  <li>⚠️ Don't use for malicious purposes</li>
                  <li>⚠️ We can update these terms anytime</li>
                </ul>
              </section>

              <!-- Agreement -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">1.</span> Agreement to Terms
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  By accessing or using MCP Playground ("Service"), you agree to be bound by these Terms of Service 
                  ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.
                </p>
              </section>

              <!-- Description of Service -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">2.</span> Description of Service
                </h2>
                <p class="text-gray-300 mb-4">
                  MCP Playground is a free, browser-based development environment for building and testing 
                  Model Context Protocol (MCP) servers. The Service provides:
                </p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li>A code editor for writing Python MCP servers</li>
                  <li>In-browser Python execution via Pyodide</li>
                  <li>Tool testing and validation features</li>
                  <li>Code sharing capabilities</li>
                  <li>Pre-built templates and examples</li>
                </ul>
              </section>

              <!-- User Responsibilities -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">3.</span> User Responsibilities
                </h2>
                <p class="text-gray-300 mb-4">When using our Service, you agree to:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not attempt to disrupt or damage the Service</li>
                  <li>Not use the Service to develop malicious code</li>
                  <li>Not attempt to access other users' data</li>
                  <li>Not use the Service to violate any applicable laws or regulations</li>
                  <li>Take responsibility for the code you write and share</li>
                </ul>
              </section>

              <!-- Intellectual Property -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">4.</span> Intellectual Property
                </h2>
                
                <h3 class="text-lg font-semibold text-white mt-6 mb-3">4.1 Your Content</h3>
                <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-4">
                  <p class="text-emerald-300 font-medium mb-2">🎉 You own your code!</p>
                  <p class="text-emerald-200/80 text-sm">
                    Any code you write in MCP Playground remains your intellectual property. We do not claim 
                    any ownership over your creations.
                  </p>
                </div>

                <h3 class="text-lg font-semibold text-white mt-6 mb-3">4.2 Our Content</h3>
                <p class="text-gray-300 leading-relaxed">
                  The Service itself, including its design, features, and documentation, is protected by copyright 
                  and other intellectual property laws. Our templates are provided under the MIT License and may 
                  be freely used, modified, and distributed.
                </p>
              </section>

              <!-- Code Execution -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">5.</span> Code Execution
                </h2>
                <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
                  <p class="text-amber-300 font-medium mb-2">⚠️ Important Notice</p>
                  <p class="text-amber-200/80 text-sm">
                    Code is executed in your browser using Pyodide. While we provide a sandboxed environment, 
                    you are responsible for the code you execute. Be cautious when running code from untrusted sources.
                  </p>
                </div>
                <p class="text-gray-300 leading-relaxed">
                  We do not monitor or review the code you execute. External API calls made by your code 
                  (such as to weather services) are subject to those services' terms and rate limits.
                </p>
              </section>

              <!-- Shared Code -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">6.</span> Shared Code
                </h2>
                <p class="text-gray-300 mb-4">When you share code via our sharing feature:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li>The code is encoded in the URL itself - we do not store it on our servers</li>
                  <li>Anyone with the link can view and execute the code</li>
                  <li>You are responsible for what you share</li>
                  <li>Do not share code containing sensitive information (API keys, passwords, etc.)</li>
                </ul>
              </section>

              <!-- Disclaimers -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">7.</span> Disclaimers
                </h2>
                <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                  <p class="text-red-300 font-medium mb-2 uppercase tracking-wide text-sm">No Warranty</p>
                  <p class="text-red-200/80 text-sm">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                </div>
                <p class="text-gray-300 leading-relaxed">
                  We do not warrant that the Service will be uninterrupted, secure, or error-free. 
                  We do not guarantee the accuracy or completeness of any information provided.
                </p>
              </section>

              <!-- Limitation of Liability -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">8.</span> Limitation of Liability
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MCP PLAYGROUND, ITS CREATORS, 
                  CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                  OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
                  OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
                </p>
                <ul class="list-disc list-inside text-gray-300 space-y-2 mt-4">
                  <li>Your use or inability to use the Service</li>
                  <li>Any unauthorized access to or alteration of your transmissions or data</li>
                  <li>Any code you execute using the Service</li>
                  <li>Any third-party content or services accessed through the Service</li>
                </ul>
              </section>

              <!-- Third-Party Services -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">9.</span> Third-Party Services
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  The Service may enable you to access third-party services and APIs (e.g., weather APIs, GitHub API). 
                  Your use of such services is subject to their respective terms of service and privacy policies. 
                  We are not responsible for the availability, content, or practices of third-party services.
                </p>
              </section>

              <!-- Termination -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">10.</span> Termination
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  We reserve the right to terminate or suspend access to the Service at any time, without notice, 
                  for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, 
                  or for any other reason at our sole discretion.
                </p>
              </section>

              <!-- Changes to Terms -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">11.</span> Changes to Terms
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                  by updating the "Last updated" date. Your continued use of the Service after changes constitutes 
                  acceptance of the new Terms.
                </p>
              </section>

              <!-- Governing Law -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">12.</span> Governing Law
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with applicable laws, 
                  without regard to conflict of law principles.
                </p>
              </section>

              <!-- Contact -->
              <section>
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">13.</span> Contact
                </h2>
                <p class="text-gray-300 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p class="text-gray-300">
                    📧 Email: <a href="mailto:legal@mcpplayground.com" class="text-violet-400 hover:text-violet-300">legal@mcpplayground.com</a>
                  </p>
                  <p class="text-gray-300 mt-2">
                    📝 Contact Form: <NuxtLink to="/contact" class="text-violet-400 hover:text-violet-300">Contact Us</NuxtLink>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>

        <!-- Agreement Button -->
        <div class="mt-8 text-center">
          <p class="text-gray-400 text-sm mb-4">
            By using MCP Playground, you acknowledge that you have read and agree to these Terms.
          </p>
          <NuxtLink 
            to="/editor"
            class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
          >
            <span>I Understand, Open Editor</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NuxtLink>
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
            <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
              Contact
            </NuxtLink>
            <NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: 'Terms of Service - MCP Playground',
  meta: [
    { name: 'description', content: 'Terms of Service for MCP Playground. Understand your rights and responsibilities when using our service.' }
  ]
})

const lastUpdated = 'January 16, 2026'
</script>
