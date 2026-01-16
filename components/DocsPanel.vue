<template>
  <div class="text-gray-300 max-w-none space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white mb-2">FastMCP Quick Reference</h1>
      <p class="text-gray-400">Build MCP servers with minimal code using FastMCP</p>
    </div>
    
    <!-- What is MCP -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-sm">📖</span>
        What is MCP?
      </h2>
      <div class="bg-white/[0.02] border border-white/10 rounded-xl p-4">
        <p class="leading-relaxed text-gray-300">
      Model Context Protocol (MCP) is an open protocol that enables seamless integration 
          between AI applications and external data sources. <strong class="text-violet-400">FastMCP</strong> is the 
          recommended way to build MCP servers — it uses decorators and type hints to 
          automatically generate tool schemas.
        </p>
      </div>
    </section>

    <!-- Basic Structure -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm">🏗️</span>
        Basic Server Structure
      </h2>
      <div class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <pre class="relative bg-[#0d0d12] border border-white/10 rounded-xl p-4 overflow-x-auto"><code class="text-sm font-mono text-gray-300"><span class="text-fuchsia-400">from</span> <span class="text-cyan-300">mcp.server.fastmcp</span> <span class="text-fuchsia-400">import</span> FastMCP

<span class="text-gray-500"># Create your MCP server</span>
mcp = FastMCP(<span class="text-emerald-400">"My Server"</span>)

<span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">greet</span>(name: <span class="text-cyan-300">str</span>) -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""Greet someone by name"""</span>
    <span class="text-fuchsia-400">return</span> <span class="text-emerald-400">f"Hello, </span>{name}<span class="text-emerald-400">!"</span>

<span class="text-fuchsia-400">if</span> __name__ == <span class="text-emerald-400">"__main__"</span>:
    mcp.run()</code></pre>
      </div>
      <p class="text-gray-400 text-sm">
        That's it! FastMCP automatically generates the JSON Schema from your type hints.
      </p>
    </section>

    <!-- Defining Tools -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm">🔧</span>
        Defining Tools
      </h2>
      <p class="text-gray-400 text-sm">Use the <code class="text-violet-400">@mcp.tool()</code> decorator with type hints:</p>
      <pre class="bg-[#0d0d12] border border-white/10 rounded-xl p-4 overflow-x-auto"><code class="text-sm font-mono text-gray-300"><span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">calculate</span>(a: <span class="text-cyan-300">float</span>, b: <span class="text-cyan-300">float</span>, operation: <span class="text-cyan-300">str</span>) -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""Perform a calculation
    
    Args:
        a: First number
        b: Second number  
        operation: add, subtract, multiply, or divide
    """</span>
    <span class="text-fuchsia-400">if</span> operation == <span class="text-emerald-400">"add"</span>:
        <span class="text-fuchsia-400">return</span> <span class="text-emerald-400">f"</span>{a + b}<span class="text-emerald-400">"</span>
    <span class="text-gray-500"># ... more operations</span></code></pre>
      <div class="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 mt-3">
        <p class="text-sm text-gray-300">
          <span class="text-violet-400 font-bold">💡 Tip:</span> FastMCP extracts parameter descriptions from your docstring's <code class="text-violet-300">Args:</code> section!
        </p>
      </div>
    </section>

    <!-- Type Hints -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm">📝</span>
        Supported Types
      </h2>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">str</code>
          <span class="text-gray-500 text-sm ml-2">→ string</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">int</code>
          <span class="text-gray-500 text-sm ml-2">→ integer</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">float</code>
          <span class="text-gray-500 text-sm ml-2">→ number</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">bool</code>
          <span class="text-gray-500 text-sm ml-2">→ boolean</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">list</code>
          <span class="text-gray-500 text-sm ml-2">→ array</span>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-lg p-3">
          <code class="text-cyan-400">dict</code>
          <span class="text-gray-500 text-sm ml-2">→ object</span>
        </div>
      </div>
    </section>

    <!-- Common Patterns -->
    <section class="space-y-4">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-sm">⚡</span>
        Common Patterns
      </h2>
      
      <!-- Multiple Tools -->
      <div class="space-y-2">
        <h3 class="font-semibold text-white text-sm flex items-center gap-2">
          <span class="text-violet-400">→</span> Multiple Tools
        </h3>
        <pre class="bg-[#0d0d12] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm"><code class="font-mono text-gray-300">mcp = FastMCP(<span class="text-emerald-400">"Multi-Tool Server"</span>)

<span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">add</span>(a: <span class="text-cyan-300">int</span>, b: <span class="text-cyan-300">int</span>) -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""Add two numbers"""</span>
    <span class="text-fuchsia-400">return</span> str(a + b)

<span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">multiply</span>(a: <span class="text-cyan-300">int</span>, b: <span class="text-cyan-300">int</span>) -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""Multiply two numbers"""</span>
    <span class="text-fuchsia-400">return</span> str(a * b)</code></pre>
      </div>

      <!-- State Management -->
      <div class="space-y-2">
        <h3 class="font-semibold text-white text-sm flex items-center gap-2">
          <span class="text-violet-400">→</span> State Management
        </h3>
        <pre class="bg-[#0d0d12] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm"><code class="font-mono text-gray-300">mcp = FastMCP(<span class="text-emerald-400">"Stateful Server"</span>)

<span class="text-gray-500"># Global state</span>
items = []

<span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">add_item</span>(item: <span class="text-cyan-300">str</span>) -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""Add an item to the list"""</span>
    items.append(item)
    <span class="text-fuchsia-400">return</span> <span class="text-emerald-400">f"Added: </span>{item}<span class="text-emerald-400">"</span>

<span class="text-violet-400">@mcp.tool()</span>
<span class="text-fuchsia-400">def</span> <span class="text-yellow-300">list_items</span>() -> <span class="text-cyan-300">str</span>:
    <span class="text-emerald-400">"""List all items"""</span>
    <span class="text-fuchsia-400">return</span> <span class="text-emerald-400">"\\n"</span>.join(items) <span class="text-fuchsia-400">or</span> <span class="text-emerald-400">"No items"</span></code></pre>
      </div>
    </section>

    <!-- Running Locally -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center text-sm">🚀</span>
        Running Locally
      </h2>
      <div class="space-y-3">
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p class="text-sm text-gray-300 mb-3">1. Install the MCP SDK:</p>
          <pre class="bg-black/30 rounded-lg p-2 text-sm"><code class="text-emerald-400">pip install mcp</code></pre>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p class="text-sm text-gray-300 mb-3">2. Save your code and run:</p>
          <pre class="bg-black/30 rounded-lg p-2 text-sm"><code class="text-emerald-400">python server.py</code></pre>
        </div>
        <div class="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p class="text-sm text-gray-300 mb-3">3. Add to Cursor's <code class="text-violet-400">~/.cursor/mcp.json</code>:</p>
          <pre class="bg-black/30 rounded-lg p-2 text-sm overflow-x-auto"><code class="text-gray-300">{
  <span class="text-cyan-400">"mcpServers"</span>: {
    <span class="text-cyan-400">"my-server"</span>: {
      <span class="text-cyan-400">"command"</span>: <span class="text-emerald-400">"python"</span>,
      <span class="text-cyan-400">"args"</span>: [<span class="text-emerald-400">"/path/to/server.py"</span>]
    }
  }
}</code></pre>
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">🔗</span>
        Resources
      </h2>
      <div class="grid sm:grid-cols-3 gap-3">
        <a 
          href="https://modelcontextprotocol.io" 
          target="_blank" 
          class="group flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-violet-500/10 hover:border-violet-500/30 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            📚
          </div>
          <div class="text-sm">
            <div class="font-medium text-white">Official Docs</div>
            <div class="text-xs text-gray-500">modelcontextprotocol.io</div>
          </div>
        </a>
        <a 
          href="https://github.com/modelcontextprotocol" 
          target="_blank" 
          class="group flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="text-sm">
            <div class="font-medium text-white">MCP GitHub</div>
            <div class="text-xs text-gray-500">Source & Examples</div>
          </div>
        </a>
        <a 
          href="https://github.com/modelcontextprotocol/python-sdk" 
          target="_blank" 
          class="group flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
        >
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            🐍
          </div>
          <div class="text-sm">
            <div class="font-medium text-white">Python SDK</div>
            <div class="text-xs text-gray-500">pip install mcp</div>
          </div>
        </a>
      </div>
    </section>

    <!-- Tips -->
    <section class="space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <span class="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-sm">💡</span>
        Pro Tips
      </h2>
      <div class="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4">
        <ul class="space-y-2 text-sm text-gray-300">
          <li class="flex items-start gap-2">
            <span class="text-violet-400 mt-0.5">✓</span>
            <span>Use clear function names — they become your tool names</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-violet-400 mt-0.5">✓</span>
            <span>Write detailed docstrings — AI uses these to understand your tools</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-violet-400 mt-0.5">✓</span>
            <span>Always add type hints — they generate the JSON Schema automatically</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-violet-400 mt-0.5">✓</span>
            <span>Return strings for best compatibility with AI responses</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-violet-400 mt-0.5">✓</span>
            <span>Test in this playground before deploying locally!</span>
          </li>
    </ul>
      </div>
    </section>
  </div>
</template>
