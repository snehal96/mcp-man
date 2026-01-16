<template>
  <div class="min-h-screen bg-[#0a0a0f]">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all duration-300">
            ⚡
          </div>
          <span class="text-lg font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors">MCP Playground</span>
        </NuxtLink>
        
        <div class="flex items-center gap-3">
          <NuxtLink to="/editor">
            <UButton color="primary" variant="soft" size="sm" icon="i-heroicons-code-bracket">
              Open Editor
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-12">
      <!-- Hero -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-6">
          <UIcon name="i-heroicons-book-open" class="w-4 h-4" />
          Documentation
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          MCP Playground <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Docs</span>
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          Learn how to build, test, and understand Model Context Protocol servers directly in your browser.
        </p>
      </div>

      <!-- Quick Navigation -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <a href="#how-it-works" class="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-violet-500/30 transition-all group">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-violet-400 mb-2" />
          <h3 class="font-semibold text-white text-sm">How It Works</h3>
        </a>
        <a href="#tools-resources-prompts" class="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-fuchsia-500/30 transition-all group">
          <UIcon name="i-heroicons-wrench-screwdriver" class="w-6 h-6 text-fuchsia-400 mb-2" />
          <h3 class="font-semibold text-white text-sm">MCP Primitives</h3>
        </a>
        <a href="#using-editor" class="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group">
          <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-cyan-400 mb-2" />
          <h3 class="font-semibold text-white text-sm">Using the Editor</h3>
        </a>
        <a href="#external-docs" class="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all group">
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-6 h-6 text-emerald-400 mb-2" />
          <h3 class="font-semibold text-white text-sm">External Docs</h3>
        </a>
      </div>

      <!-- Section: How It Works -->
      <section id="how-it-works" class="mb-16 scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 text-violet-400" />
          </div>
          <h2 class="text-2xl font-bold text-white">How MCP Playground Works</h2>
        </div>

        <div class="prose prose-invert max-w-none">
          <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-6">
            <p class="text-gray-300 mb-4">
              MCP Playground is a <strong class="text-white">browser-based development environment</strong> for building and testing Model Context Protocol (MCP) servers. Unlike traditional setups that require local Python installation and complex configurations, everything runs directly in your browser.
            </p>
            
            <h3 class="text-lg font-semibold text-white mt-6 mb-3">🧠 The Technology Stack</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300 mt-0.5">1</span>
                <div>
                  <strong class="text-white">Pyodide</strong> - A Python runtime compiled to WebAssembly that runs entirely in your browser. This allows us to execute real Python code without a server.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded bg-fuchsia-500/20 flex items-center justify-center text-xs font-bold text-fuchsia-300 mt-0.5">2</span>
                <div>
                  <strong class="text-white">FastMCP Mock</strong> - We implement a mock version of the FastMCP library that mimics the real API, automatically generating JSON schemas from your Python type hints.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-300 mt-0.5">3</span>
                <div>
                  <strong class="text-white">Monaco Editor</strong> - The same code editor that powers VS Code, providing syntax highlighting, autocomplete, and a professional editing experience.
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-3">⚡ How Testing Works</h3>
            <p class="text-gray-300 mb-4">
              When you click "Run Server," the playground:
            </p>
            <ol class="space-y-2 text-gray-300">
              <li><strong class="text-violet-300">1.</strong> Parses your Python code to extract tool, resource, and prompt definitions</li>
              <li><strong class="text-fuchsia-300">2.</strong> Generates JSON schemas automatically from your function signatures and type hints</li>
              <li><strong class="text-cyan-300">3.</strong> Creates an interactive UI to test each function with real inputs</li>
              <li><strong class="text-emerald-300">4.</strong> Executes your Python code in the browser and displays the results</li>
            </ol>
            <p class="text-gray-400 mt-4 text-sm">
              <strong>Note:</strong> This is a testing/prototyping environment. To deploy your MCP server for real use with AI assistants, you'll need to run it locally or on a server with the actual FastMCP library.
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Tools, Resources, Prompts -->
      <section id="tools-resources-prompts" class="mb-16 scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5 text-fuchsia-400" />
          </div>
          <h2 class="text-2xl font-bold text-white">Understanding MCP Primitives</h2>
        </div>

        <p class="text-gray-400 mb-6">
          MCP servers expose three types of capabilities to AI models. Each serves a different purpose in enabling AI-human-tool interaction.
        </p>

        <!-- Tools -->
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-lg">🔧</span>
            <h3 class="text-xl font-semibold text-white">Tools</h3>
            <span class="px-2 py-0.5 text-xs font-bold uppercase bg-violet-500/20 text-violet-300 rounded-full">Actions</span>
          </div>
          <p class="text-gray-300 mb-4">
            Tools are <strong class="text-white">functions that perform actions</strong>. They're invoked by AI models to accomplish tasks like calculations, data processing, or external API calls.
          </p>
          <div class="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300"><span class="text-fuchsia-400">@mcp.tool()</span>
<span class="text-violet-400">def</span> <span class="text-cyan-300">calculate</span>(operation: <span class="text-emerald-400">str</span>, a: <span class="text-emerald-400">float</span>, b: <span class="text-emerald-400">float</span>) -> <span class="text-emerald-400">float</span>:
    <span class="text-gray-500">"""Perform a mathematical operation."""</span>
    <span class="text-violet-400">if</span> operation == <span class="text-amber-300">"add"</span>:
        <span class="text-violet-400">return</span> a + b
    <span class="text-violet-400">elif</span> operation == <span class="text-amber-300">"multiply"</span>:
        <span class="text-violet-400">return</span> a * b</pre>
          </div>
        </div>

        <!-- Resources -->
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-4">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">📄</span>
            <h3 class="text-xl font-semibold text-white">Resources</h3>
            <span class="px-2 py-0.5 text-xs font-bold uppercase bg-blue-500/20 text-blue-300 rounded-full">Data</span>
          </div>
          <p class="text-gray-300 mb-4">
            Resources provide <strong class="text-white">read-only data access</strong>. They expose files, configurations, or dynamic content that AI models can read to understand context.
          </p>
          <div class="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300"><span class="text-fuchsia-400">@mcp.resource</span>(<span class="text-amber-300">"config://settings"</span>)
<span class="text-violet-400">def</span> <span class="text-cyan-300">get_settings</span>() -> <span class="text-emerald-400">dict</span>:
    <span class="text-gray-500">"""Current application settings."""</span>
    <span class="text-violet-400">return</span> {
        <span class="text-amber-300">"theme"</span>: <span class="text-amber-300">"dark"</span>,
        <span class="text-amber-300">"language"</span>: <span class="text-amber-300">"en"</span>
    }</pre>
          </div>
        </div>

        <!-- Prompts -->
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-lg">💬</span>
            <h3 class="text-xl font-semibold text-white">Prompts</h3>
            <span class="px-2 py-0.5 text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 rounded-full">Templates</span>
          </div>
          <p class="text-gray-300 mb-4">
            Prompts are <strong class="text-white">reusable message templates</strong>. They help standardize interactions by providing pre-built prompt structures that AI models can use.
          </p>
          <div class="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300"><span class="text-fuchsia-400">@mcp.prompt</span>(name=<span class="text-amber-300">"code_review"</span>)
<span class="text-violet-400">def</span> <span class="text-cyan-300">code_review_prompt</span>(code: <span class="text-emerald-400">str</span>, language: <span class="text-emerald-400">str</span>) -> <span class="text-emerald-400">str</span>:
    <span class="text-gray-500">"""Generate a code review prompt."""</span>
    <span class="text-violet-400">return</span> <span class="text-amber-300">f"""Review this {language} code:
```{language}
{code}
```
Provide feedback on readability, performance, and best practices."""</span></pre>
          </div>
        </div>
      </section>

      <!-- Section: Using the Editor -->
      <section id="using-editor" class="mb-16 scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-cyan-400" />
          </div>
          <h2 class="text-2xl font-bold text-white">Using the Editor</h2>
        </div>

        <div class="space-y-4">
          <!-- Step 1 -->
          <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <span class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">1</span>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">Choose or Write Your Code</h3>
                <p class="text-gray-400">
                  Start with a template from the dropdown menu, or write your own FastMCP server code. The editor supports Python with full syntax highlighting.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <span class="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">2</span>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">Run the Server</h3>
                <p class="text-gray-400">
                  Click the <span class="text-emerald-400 font-medium">"Run Server"</span> button. The playground will parse your code, extract all tools/resources/prompts, and display them in the Test panel.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <span class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">3</span>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">Test Your Functions</h3>
                <p class="text-gray-400">
                  Switch between <span class="text-violet-400">Tools</span>, <span class="text-blue-400">Resources</span>, and <span class="text-emerald-400">Prompts</span> tabs. Fill in parameters and click execute to test each function with real inputs.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <span class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">4</span>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">Download & Deploy</h3>
                <p class="text-gray-400">
                  Once satisfied, download your code using the <span class="text-amber-400 font-medium">"Download"</span> button. You can then run it locally with <code class="px-1.5 py-0.5 bg-black/40 rounded text-violet-300">python your_server.py</code> or configure it in Cursor/Claude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Connecting to AI Assistants -->
      <section id="connecting" class="mb-16 scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-link" class="w-5 h-5 text-amber-400" />
          </div>
          <h2 class="text-2xl font-bold text-white">Connecting to AI Assistants</h2>
        </div>

        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-4">
          <h3 class="text-lg font-semibold text-white mb-4">🖥️ Cursor IDE</h3>
          <p class="text-gray-400 mb-4">
            To connect your MCP server to Cursor, edit <code class="px-1.5 py-0.5 bg-black/40 rounded text-violet-300">~/.cursor/mcp.json</code>:
          </p>
          <div class="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300">{
  <span class="text-cyan-300">"mcpServers"</span>: {
    <span class="text-cyan-300">"my-server"</span>: {
      <span class="text-cyan-300">"command"</span>: <span class="text-amber-300">"python"</span>,
      <span class="text-cyan-300">"args"</span>: [<span class="text-amber-300">"/path/to/your_server.py"</span>]
    }
  }
}</pre>
          </div>
        </div>

        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">🤖 Claude Desktop</h3>
          <p class="text-gray-400 mb-4">
            For Claude Desktop, edit <code class="px-1.5 py-0.5 bg-black/40 rounded text-violet-300">~/Library/Application Support/Claude/claude_desktop_config.json</code>:
          </p>
          <div class="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre class="text-gray-300">{
  <span class="text-cyan-300">"mcpServers"</span>: {
    <span class="text-cyan-300">"my-server"</span>: {
      <span class="text-cyan-300">"command"</span>: <span class="text-amber-300">"python"</span>,
      <span class="text-cyan-300">"args"</span>: [<span class="text-amber-300">"/path/to/your_server.py"</span>]
    }
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- Section: External Documentation -->
      <section id="external-docs" class="mb-16 scroll-mt-24">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5 text-emerald-400" />
          </div>
          <h2 class="text-2xl font-bold text-white">External Documentation</h2>
        </div>

        <p class="text-gray-400 mb-6">
          For comprehensive documentation on the MCP protocol and FastMCP library, refer to the official resources:
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- MCP Docs -->
          <a 
            href="https://modelcontextprotocol.io" 
            target="_blank"
            class="group block bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <span class="text-2xl">📚</span>
              </div>
              <div>
                <h3 class="font-semibold text-white group-hover:text-violet-300 transition-colors">MCP Official Docs</h3>
                <p class="text-sm text-gray-500">modelcontextprotocol.io</p>
              </div>
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-gray-500 ml-auto group-hover:text-violet-400 transition-colors" />
            </div>
            <p class="text-sm text-gray-400">
              Complete specification, tutorials, and reference documentation for the Model Context Protocol.
            </p>
          </a>

          <!-- FastMCP Docs -->
          <a 
            href="https://github.com/jlowin/fastmcp" 
            target="_blank"
            class="group block bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-fuchsia-500/30 transition-all"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center">
                <span class="text-2xl">⚡</span>
              </div>
              <div>
                <h3 class="font-semibold text-white group-hover:text-fuchsia-300 transition-colors">FastMCP GitHub</h3>
                <p class="text-sm text-gray-500">github.com/jlowin/fastmcp</p>
              </div>
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-gray-500 ml-auto group-hover:text-fuchsia-400 transition-colors" />
            </div>
            <p class="text-sm text-gray-400">
              FastMCP library source code, examples, and API documentation for building MCP servers with Python.
            </p>
          </a>

          <!-- Python SDK -->
          <a 
            href="https://github.com/modelcontextprotocol/python-sdk" 
            target="_blank"
            class="group block bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                <span class="text-2xl">🐍</span>
              </div>
              <div>
                <h3 class="font-semibold text-white group-hover:text-cyan-300 transition-colors">Python SDK</h3>
                <p class="text-sm text-gray-500">MCP Python SDK</p>
              </div>
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-gray-500 ml-auto group-hover:text-cyan-400 transition-colors" />
            </div>
            <p class="text-sm text-gray-400">
              Official Python SDK for MCP with lower-level APIs and advanced customization options.
            </p>
          </a>

          <!-- TypeScript SDK -->
          <a 
            href="https://github.com/modelcontextprotocol/typescript-sdk" 
            target="_blank"
            class="group block bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <span class="text-2xl">💎</span>
              </div>
              <div>
                <h3 class="font-semibold text-white group-hover:text-emerald-300 transition-colors">TypeScript SDK</h3>
                <p class="text-sm text-gray-500">MCP TypeScript SDK</p>
              </div>
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-gray-500 ml-auto group-hover:text-emerald-400 transition-colors" />
            </div>
            <p class="text-sm text-gray-400">
              Build MCP servers in TypeScript/JavaScript with the official TypeScript SDK.
            </p>
          </a>
        </div>
      </section>

      <!-- CTA -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-white mb-4">Ready to build?</h2>
          <p class="text-gray-400 mb-6 max-w-lg mx-auto">
            Start building your MCP server now with our browser-based editor. No installation required.
          </p>
          <NuxtLink to="/editor">
            <UButton color="primary" size="lg" icon="i-heroicons-rocket-launch">
              Open Editor
            </UButton>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/10 mt-16">
      <div class="max-w-4xl mx-auto px-4 py-8 text-center">
        <p class="text-gray-500 text-sm">
          Built with ❤️ for the MCP community
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Documentation - MCP Playground',
  meta: [
    { name: 'description', content: 'Learn how to build, test, and understand Model Context Protocol servers with MCP Playground.' }
  ]
})
</script>

<style scoped>
.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
