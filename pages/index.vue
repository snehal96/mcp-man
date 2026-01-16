<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
    <!-- GitHub Corner -->
    <GitHubCorner repo-url="https://github.com/snehal96/mcp-man" />
    
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px]"></div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="MCP Playground" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-tight">MCP Playground</span>
            <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 rounded-full border border-violet-500/30">
              Beta
            </span>
          </div>
          
          <div class="hidden md:flex items-center gap-8">
            <a 
              href="https://modelcontextprotocol.io" 
              target="_blank" 
              class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/modelcontextprotocol" 
              target="_blank" 
              class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a 
              href="https://github.com/modelcontextprotocol/python-sdk" 
              target="_blank" 
              class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Python SDK
            </a>
          </div>

          <div class="flex items-center gap-3">
            <NuxtLink 
              to="/editor" 
              class="group relative px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
            >
              <span class="relative z-10">Open Editor</span>
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 pt-20 pb-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-fade-in">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-sm text-gray-300">Build MCP servers in your browser</span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              The Playground for
            </span>
            <br>
            <span class="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              MCP Servers
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100">
            Build, test, and experiment with Model Context Protocol servers directly in your browser. 
            No installation required. Just code and go.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <NuxtLink 
              to="/editor" 
              class="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Start Building</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/docs"
              class="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Read the Docs
            </NuxtLink>
          </div>
        </div>

        <!-- Code Preview -->
        <div class="mt-20 max-w-5xl mx-auto animate-fade-in-up delay-300">
          <div class="relative group">
            <!-- Glow effect -->
            <div class="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <div class="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <!-- Window controls -->
              <div class="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div class="flex-1 text-center">
                  <span class="text-xs text-gray-500 font-mono">mcp_server.py</span>
                </div>
              </div>
              
              <!-- Code content -->
              <div class="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre class="text-gray-300"><span class="text-fuchsia-400">from</span> <span class="text-cyan-300">mcp.server</span> <span class="text-fuchsia-400">import</span> Server
<span class="text-fuchsia-400">from</span> <span class="text-cyan-300">mcp.types</span> <span class="text-fuchsia-400">import</span> Tool, TextContent

server = Server(<span class="text-emerald-400">"weather-server"</span>)

<span class="text-violet-400">@server.list_tools()</span>
<span class="text-fuchsia-400">async def</span> <span class="text-yellow-300">list_tools</span>():
    <span class="text-fuchsia-400">return</span> [
        Tool(
            name=<span class="text-emerald-400">"get_weather"</span>,
            description=<span class="text-emerald-400">"Get current weather for a city"</span>,
            inputSchema={<span class="text-emerald-400">"type"</span>: <span class="text-emerald-400">"object"</span>, ...}
        )
    ]

<span class="text-violet-400">@server.call_tool()</span>
<span class="text-fuchsia-400">async def</span> <span class="text-yellow-300">call_tool</span>(name: <span class="text-cyan-300">str</span>, arguments: <span class="text-cyan-300">dict</span>):
    <span class="text-gray-500"># Your logic here ✨</span>
    <span class="text-fuchsia-400">return</span> [TextContent(type=<span class="text-emerald-400">"text"</span>, text=result)]</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 py-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to build
            <span class="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">MCP servers</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            A powerful development environment right in your browser
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Feature 1 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🐍</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Python in Browser</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Write MCP servers in Python using Pyodide. Full Python 3.11 runtime with no installation needed.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">💻</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">VS Code Editor</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Monaco Editor with syntax highlighting, auto-completion, and all the keyboard shortcuts you know.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🧪</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Live Testing</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Test your MCP tools with an AI chat interface. See inputs, outputs, and debug in real-time.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">📦</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Ready Templates</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Start quickly with pre-built templates for common patterns like weather APIs, calculators, and more.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tool Inspector</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Visualize your tools, see their schemas, and understand exactly what your MCP server exposes.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="group p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-2xl">📥</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Export & Share</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Download your server code when ready. Share with colleagues or deploy to production.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section class="relative z-10 py-24 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Perfect for
          </h2>
          <p class="text-gray-400 text-lg">
            Whether you're learning, prototyping, or teaching
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <span class="text-xl">📚</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1">Learning MCP</h3>
              <p class="text-gray-400 text-sm">Experiment with MCP concepts without any local setup or configuration.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <span class="text-xl">💡</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1">Rapid Prototyping</h3>
              <p class="text-gray-400 text-sm">Quickly test MCP server ideas before implementing them in production.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <span class="text-xl">👩‍🏫</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1">Teaching & Workshops</h3>
              <p class="text-gray-400 text-sm">Share interactive MCP examples with students or team members.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <span class="text-xl">📝</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg mb-1">Documentation</h3>
              <p class="text-gray-400 text-sm">Create interactive examples to accompany your MCP documentation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 py-24 border-t border-white/5">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">
          Ready to build your first
          <span class="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">MCP server</span>?
        </h2>
        <p class="text-gray-400 text-lg mb-10">
          Jump into the playground and start experimenting in seconds.
        </p>
        <NuxtLink 
          to="/editor" 
          class="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
        >
          <span>Launch Playground</span>
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="MCP Playground" class="w-8 h-8 object-contain" />
              <span class="text-lg font-bold">MCP Playground</span>
            </div>
            <p class="text-gray-400 text-sm max-w-md">
              Build and test Model Context Protocol servers in your browser. 
              An open-source tool for the MCP community.
            </p>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-semibold mb-4">Resources</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://modelcontextprotocol.io" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                  MCP Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/modelcontextprotocol/python-sdk" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                  Python SDK
                </a>
              </li>
              <li>
                <a href="https://github.com/modelcontextprotocol" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                  MCP GitHub
                </a>
              </li>
            </ul>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <NuxtLink to="/editor" class="text-gray-400 hover:text-white transition-colors">
                  Open Editor
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/docs" class="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-6">
            <p class="text-gray-500 text-sm">
              Built with ❤️ for the MCP community
            </p>
            <span class="text-gray-700">•</span>
            <NuxtLink to="/privacy" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms
            </NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <a 
              href="https://github.com/modelcontextprotocol" 
              target="_blank" 
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Set page metadata
useHead({
  title: 'MCP Playground - Build & Test MCP Servers in Your Browser',
  meta: [
    { name: 'description', content: 'Build, test, and share Model Context Protocol (MCP) servers in your browser. No installation required. The playground for MCP developers.' }
  ]
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>
