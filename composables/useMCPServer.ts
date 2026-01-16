interface MCPToolParameter {
  type: string
  description?: string
  enum?: string[]
}

interface MCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, MCPToolParameter>
    required?: string[]
  }
}

interface MCPResource {
  uri: string
  name: string
  description: string
  mimeType: string
}

interface MCPPrompt {
  name: string
  description: string
  arguments: Array<{
    name: string
    description: string
    required: boolean
  }>
}

interface LogEntry {
  type: 'info' | 'success' | 'error' | 'warning' | 'log'
  message: string
  timestamp: string
}

interface ExecutionResult {
  success: boolean
  result?: string
  error?: string
  executionTime?: number
}

interface MCPServerState {
  isRunning: boolean
  isLoading: boolean
  tools: MCPTool[]
  resources: MCPResource[]
  prompts: MCPPrompt[]
  logs: LogEntry[]
  currentCode: string
  validationErrors: string[]
}

export const useMCPServer = () => {
  const { 
    initialize, 
    extractToolsFromCode, 
    executeToolCode, 
    readResource: pyodideReadResource,
    executePrompt: pyodideExecutePrompt,
    isReady, 
    isLoading: pyodideLoading, 
    loadProgress 
  } = usePyodide()
  
  const state = useState<MCPServerState>('mcp-server', () => ({
    isRunning: false,
    isLoading: false,
    tools: [],
    resources: [],
    prompts: [],
    logs: [],
    currentCode: '',
    validationErrors: [],
  }))

  const addLog = (type: LogEntry['type'], message: string) => {
    state.value.logs.push({
      type,
      message,
      timestamp: new Date().toISOString(),
    })
    // Keep only last 100 logs
    if (state.value.logs.length > 100) {
      state.value.logs = state.value.logs.slice(-100)
    }
  }

  const clearLogs = () => {
    state.value.logs = []
  }

  const validateCode = (code: string): string[] => {
    const errors: string[] = []
    
    // Check if it's FastMCP style or classic style
    const isFastMCP = code.includes('FastMCP') || code.includes('@mcp.tool()')
    const isClassicMCP = code.includes('from mcp.server import Server') || code.includes('@server.list_tools()')
    
    if (isFastMCP) {
      // FastMCP validation
      if (!code.includes('FastMCP(')) {
        errors.push('No FastMCP instance found')
      }
      // At least one decorator should be present
      const hasDecorators = code.includes('@mcp.tool()') || 
                           code.includes('@mcp.resource(') || 
                           code.includes('@mcp.prompt(')
      if (!hasDecorators) {
        errors.push('No @mcp decorators found (tool, resource, or prompt)')
      }
    } else if (isClassicMCP) {
      // Classic MCP validation
      if (!code.includes('Server(')) {
        errors.push('No Server instance found')
      }
      if (!code.includes('@server.list_tools()') && !code.includes('.list_tools()')) {
        errors.push('Missing @server.list_tools() decorator')
      }
      if (!code.includes('@server.call_tool()') && !code.includes('.call_tool()')) {
        errors.push('Missing @server.call_tool() decorator')
      }
      if (!code.includes('Tool(')) {
        errors.push('No Tool definitions found')
      }
    } else {
      errors.push('No MCP server pattern detected. Use FastMCP or classic MCP style.')
    }
    
    return errors
  }

  const startServer = async (code: string, onProgress?: (msg: string) => void) => {
    state.value.isLoading = true
    state.value.validationErrors = []
    
    try {
      // Validate code structure
      addLog('info', '🔍 Validating MCP server code...')
      onProgress?.('Validating code...')
      
      const validationErrors = validateCode(code)
      if (validationErrors.length > 0) {
        state.value.validationErrors = validationErrors
        addLog('warning', `Found ${validationErrors.length} validation warning(s): ${validationErrors.join(', ')}`)
      }
      
      // Initialize Pyodide if not ready
      if (!isReady.value) {
        addLog('info', '🐍 Loading Python runtime...')
        onProgress?.('Loading Python runtime...')
        await initialize((msg) => {
          addLog('info', msg)
          onProgress?.(msg)
        })
      }
      
      // Extract tools, resources, and prompts from the code
      addLog('info', '📦 Extracting definitions...')
      onProgress?.('Extracting tools, resources, prompts...')
      
      const result = await extractToolsFromCode(code)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to extract definitions')
      }
      
      const tools = result.tools || []
      const resources = result.resources || []
      const prompts = result.prompts || []
      
      state.value.tools = tools
      state.value.resources = resources
      state.value.prompts = prompts
      state.value.currentCode = code
      state.value.isRunning = true
      
      // Log summary
      const totalItems = tools.length + resources.length + prompts.length
      addLog('success', `✅ Server started! Found ${totalItems} item(s).`)
      
      if (tools.length > 0) {
        addLog('info', `📌 Tools (${tools.length}):`)
        for (const tool of tools) {
          addLog('info', `   • ${tool.name}: ${tool.description}`)
        }
      }
      
      if (resources.length > 0) {
        addLog('info', `📄 Resources (${resources.length}):`)
        for (const resource of resources) {
          addLog('info', `   • ${resource.name}: ${resource.uri}`)
        }
      }
      
      if (prompts.length > 0) {
        addLog('info', `💬 Prompts (${prompts.length}):`)
        for (const prompt of prompts) {
          addLog('info', `   • ${prompt.name}: ${prompt.description}`)
        }
      }
      
      if (totalItems === 0) {
        addLog('warning', '⚠️ No definitions were extracted. Check your decorators.')
      }
      
      onProgress?.('Server running!')
      
      return { success: true, tools, resources, prompts }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      addLog('error', `❌ Failed to start server: ${errorMessage}`)
      state.value.isRunning = false
      throw err
    } finally {
      state.value.isLoading = false
    }
  }

  const stopServer = () => {
    state.value.isRunning = false
    state.value.tools = []
    state.value.resources = []
    state.value.prompts = []
    state.value.currentCode = ''
    addLog('info', '🛑 Server stopped.')
  }

  const callTool = async (toolName: string, args: Record<string, unknown>): Promise<ExecutionResult> => {
    if (!state.value.isRunning) {
      return { success: false, error: 'Server is not running' }
    }

    const tool = state.value.tools.find(t => t.name === toolName)
    if (!tool) {
      return { success: false, error: `Tool '${toolName}' not found` }
    }

    addLog('info', `🔧 Executing tool: ${toolName}`)
    addLog('log', `   Input: ${JSON.stringify(args)}`)
    
    const startTime = performance.now()
    
    try {
      const result = await executeToolCode(state.value.currentCode, toolName, args)
      const executionTime = Math.round(performance.now() - startTime)
      
      if (result.success) {
        addLog('success', `✅ Tool executed in ${executionTime}ms`)
        addLog('log', `   Output: ${result.result}`)
        return { ...result, executionTime }
      } else {
        addLog('error', `❌ Tool execution failed: ${result.error}`)
        return result
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Execution failed'
      addLog('error', `❌ Tool execution error: ${errorMessage}`)
      return { success: false, error: errorMessage }
    }
  }

  const readResource = async (resourceUri: string): Promise<ExecutionResult> => {
    if (!state.value.isRunning) {
      return { success: false, error: 'Server is not running' }
    }

    const resource = state.value.resources.find(r => r.uri === resourceUri)
    if (!resource) {
      return { success: false, error: `Resource '${resourceUri}' not found` }
    }

    addLog('info', `📄 Reading resource: ${resource.name}`)
    addLog('log', `   URI: ${resourceUri}`)
    
    const startTime = performance.now()
    
    try {
      const result = await pyodideReadResource(state.value.currentCode, resourceUri)
      const executionTime = Math.round(performance.now() - startTime)
      
      if (result.success) {
        addLog('success', `✅ Resource read in ${executionTime}ms`)
        addLog('log', `   Content: ${result.result?.substring(0, 100)}${(result.result?.length || 0) > 100 ? '...' : ''}`)
        return { ...result, executionTime }
      } else {
        addLog('error', `❌ Resource read failed: ${result.error}`)
        return result
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Read failed'
      addLog('error', `❌ Resource read error: ${errorMessage}`)
      return { success: false, error: errorMessage }
    }
  }

  const callPrompt = async (promptName: string, args: Record<string, unknown>): Promise<ExecutionResult> => {
    if (!state.value.isRunning) {
      return { success: false, error: 'Server is not running' }
    }

    const prompt = state.value.prompts.find(p => p.name === promptName)
    if (!prompt) {
      return { success: false, error: `Prompt '${promptName}' not found` }
    }

    addLog('info', `💬 Executing prompt: ${promptName}`)
    addLog('log', `   Args: ${JSON.stringify(args)}`)
    
    const startTime = performance.now()
    
    try {
      const result = await pyodideExecutePrompt(state.value.currentCode, promptName, args)
      const executionTime = Math.round(performance.now() - startTime)
      
      if (result.success) {
        addLog('success', `✅ Prompt executed in ${executionTime}ms`)
        addLog('log', `   Output: ${result.result}`)
        return { ...result, executionTime }
      } else {
        addLog('error', `❌ Prompt execution failed: ${result.error}`)
        return result
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Execution failed'
      addLog('error', `❌ Prompt execution error: ${errorMessage}`)
      return { success: false, error: errorMessage }
    }
  }

  // Quick code analysis without starting server
  const analyzeCode = async (code: string): Promise<{ tools: MCPTool[]; resources: MCPResource[]; prompts: MCPPrompt[]; errors: string[] }> => {
    const errors = validateCode(code)
    
    if (!isReady.value) {
      return { tools: [], resources: [], prompts: [], errors: [...errors, 'Python runtime not loaded yet'] }
    }
    
    try {
      const result = await extractToolsFromCode(code)
      return {
        tools: result.tools || [],
        resources: result.resources || [],
        prompts: result.prompts || [],
        errors: result.success ? errors : [...errors, result.error || 'Failed to parse definitions']
      }
    } catch {
      return { tools: [], resources: [], prompts: [], errors: [...errors, 'Failed to analyze code'] }
    }
  }

  return {
    serverState: state,
    isLoading: computed(() => state.value.isLoading || pyodideLoading.value),
    isRunning: computed(() => state.value.isRunning),
    tools: computed(() => state.value.tools),
    resources: computed(() => state.value.resources),
    prompts: computed(() => state.value.prompts),
    logs: computed(() => state.value.logs),
    validationErrors: computed(() => state.value.validationErrors),
    pyodideReady: isReady,
    pyodideProgress: loadProgress,
    startServer,
    stopServer,
    callTool,
    readResource,
    callPrompt,
    analyzeCode,
    addLog,
    clearLogs,
  }
}
