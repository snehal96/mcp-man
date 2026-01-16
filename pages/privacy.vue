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
            <img src="/logo.png" alt="MCP Playground" class="w-10 h-10 object-contain" />
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
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 mb-6">
            <span class="text-2xl">🔒</span>
            <span class="text-sm text-blue-300">Your privacy matters</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Privacy Policy
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
              
              <!-- Introduction -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">1.</span> Introduction
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  Welcome to MCP Playground ("we," "our," or "us"). We are committed to protecting your privacy 
                  and ensuring the security of your personal information. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
              </section>

              <!-- Information We Collect -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">2.</span> Information We Collect
                </h2>
                
                <h3 class="text-lg font-semibold text-white mt-6 mb-3">2.1 Information You Provide</h3>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Contact Information:</strong> When you use our contact form, we collect your name, email address, and message content.</li>
                  <li><strong>Code:</strong> Any code you write in the editor is processed locally in your browser and is not sent to our servers unless you explicitly choose to share it.</li>
                </ul>

                <h3 class="text-lg font-semibold text-white mt-6 mb-3">2.2 Information Collected Automatically</h3>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our service.</li>
                  <li><strong>Browser Information:</strong> When reporting bugs, browser information may be included to help us diagnose issues.</li>
                  <li><strong>Local Storage:</strong> We use browser local storage to save your preferences and recently written code for your convenience.</li>
                </ul>
              </section>

              <!-- How We Use Your Information -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">3.</span> How We Use Your Information
                </h2>
                <p class="text-gray-300 mb-4">We use the information we collect to:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send you updates about our service (only if you opt-in)</li>
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>Detect and prevent technical issues or abuse</li>
                </ul>
              </section>

              <!-- Data Storage and Security -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">4.</span> Data Storage and Security
                </h2>
                <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-4">
                  <p class="text-emerald-300 font-medium mb-2">🛡️ Client-Side Processing</p>
                  <p class="text-emerald-200/80 text-sm">
                    Your code is executed entirely in your browser using Pyodide. We do not send your code to any server 
                    unless you explicitly share it via the share feature.
                  </p>
                </div>
                <p class="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information. However, no method of transmission over the Internet is 100% secure, and we cannot 
                  guarantee absolute security.
                </p>
              </section>

              <!-- Cookies and Tracking -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">5.</span> Cookies and Tracking
                </h2>
                <p class="text-gray-300 mb-4">We use the following types of storage:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Local Storage:</strong> Used to save your code and preferences locally in your browser</li>
                  <li><strong>Analytics:</strong> We may use privacy-respecting analytics to understand how our service is used</li>
                </ul>
              </section>

              <!-- Third-Party Services -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">6.</span> Third-Party Services
                </h2>
                <p class="text-gray-300 mb-4">Our service may use the following third-party services:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Pyodide (Mozilla):</strong> For running Python code in the browser</li>
                  <li><strong>CDN Services:</strong> For delivering static assets</li>
                  <li><strong>External APIs:</strong> When using templates that fetch data from public APIs (e.g., weather data)</li>
                </ul>
                <p class="text-gray-300 mt-4">
                  These third-party services have their own privacy policies, and we encourage you to review them.
                </p>
              </section>

              <!-- Your Rights -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">7.</span> Your Rights
                </h2>
                <p class="text-gray-300 mb-4">You have the right to:</p>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p class="text-gray-300 mt-4">
                  To exercise these rights, please contact us at 
                  <a href="mailto:privacy@mcpplayground.com" class="text-violet-400 hover:text-violet-300">privacy@mcpplayground.com</a>
                </p>
              </section>

              <!-- Children's Privacy -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">8.</span> Children's Privacy
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  Our service is not directed to children under 13. We do not knowingly collect personal information 
                  from children under 13. If you believe we have collected information from a child under 13, 
                  please contact us immediately.
                </p>
              </section>

              <!-- Changes to This Policy -->
              <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">9.</span> Changes to This Policy
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of 
                  the service after changes constitutes acceptance of the new policy.
                </p>
              </section>

              <!-- Contact Us -->
              <section>
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span class="text-violet-400">10.</span> Contact Us
                </h2>
                <p class="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p class="text-gray-300">
                    📧 Email: <a href="mailto:privacy@mcpplayground.com" class="text-violet-400 hover:text-violet-300">privacy@mcpplayground.com</a>
                  </p>
                  <p class="text-gray-300 mt-2">
                    📝 Contact Form: <NuxtLink to="/contact" class="text-violet-400 hover:text-violet-300">Contact Us</NuxtLink>
                  </p>
                </div>
              </section>

            </div>
          </div>
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
  title: 'Privacy Policy - MCP Playground',
  meta: [
    { name: 'description', content: 'Privacy Policy for MCP Playground. Learn how we collect, use, and protect your data.' }
  ]
})

const lastUpdated = 'January 16, 2026'
</script>
