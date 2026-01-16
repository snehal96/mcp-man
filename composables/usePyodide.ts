import { loadPyodide, type PyodideInterface } from 'pyodide'

interface ExtractedTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, {
      type: string
      description?: string
      enum?: string[]
    }>
    required?: string[]
  }
}

interface ExtractedResource {
  uri: string
  name: string
  description: string
  mimeType: string
}

interface ExtractedPrompt {
  name: string
  description: string
  arguments: Array<{
    name: string
    description: string
    required: boolean
  }>
}

interface PyodideState {
  instance: PyodideInterface | null
  isLoading: boolean
  isReady: boolean
  loadProgress: string
  error: string | null
}

export const usePyodide = () => {
  const state = useState<PyodideState>('pyodide-state', () => ({
    instance: null,
    isLoading: false,
    isReady: false,
    loadProgress: '',
    error: null,
  }))

  const initialize = async (onProgress?: (msg: string) => void) => {
    if (state.value.instance) return state.value.instance

    try {
      state.value.isLoading = true
      state.value.error = null
      state.value.loadProgress = 'Loading Python runtime...'
      onProgress?.('Loading Python runtime...')

      // Load Pyodide
      const instance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/',
      })

      state.value.loadProgress = 'Setting up Python environment...'
      onProgress?.('Setting up Python environment...')

      // Run setup code with FastMCP support
      await instance.runPythonAsync(`
import json
import math
import inspect
import re

# Type mapping from Python types to JSON Schema
def python_type_to_json_schema(type_hint):
    """Convert Python type hints to JSON Schema types"""
    if type_hint is None:
        return {"type": "string"}
    
    type_str = str(type_hint)
    
    # Handle basic types
    if type_hint == int or 'int' in type_str:
        return {"type": "integer"}
    elif type_hint == float or 'float' in type_str:
        return {"type": "number"}
    elif type_hint == bool or 'bool' in type_str:
        return {"type": "boolean"}
    elif type_hint == str or 'str' in type_str:
        return {"type": "string"}
    elif type_hint == list or 'list' in type_str.lower():
        return {"type": "array"}
    elif type_hint == dict or 'dict' in type_str.lower():
        return {"type": "object"}
    else:
        return {"type": "string"}

def extract_param_description(docstring, param_name):
    """Extract parameter description from docstring"""
    if not docstring:
        return None
    
    # Look for :param name: description or Args: section
    patterns = [
        rf':param\\s+{param_name}\\s*:\\s*(.+?)(?=\\n|$)',
        rf'{param_name}\\s*[:\\-]\\s*(.+?)(?=\\n|$)',
        rf'Args:.*?{param_name}\\s*[:\\(].*?[:\\)]?\\s*(.+?)(?=\\n|$)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, docstring, re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()
    
    return None

# FastMCP mock implementation
class FastMCP:
    """Mock FastMCP class that mimics the real FastMCP API"""
    
    def __init__(self, name: str = "MCP Server"):
        self.name = name
        self._tools = {}
        self._resources = {}
        self._prompts = {}
        self._is_fastmcp = True  # Marker for duck typing
    
    def tool(self, name: str = None, description: str = None):
        """Decorator to register a tool"""
        def decorator(func):
            tool_name = name or func.__name__
            tool_desc = description or func.__doc__ or f"Execute {tool_name}"
            
            # Clean up the description (first line of docstring)
            if tool_desc:
                tool_desc = tool_desc.strip().split('\\n')[0]
            
            # Build input schema from type hints
            hints = {}
            try:
                hints = func.__annotations__.copy()
            except:
                pass
            
            # Remove return type from hints
            hints.pop('return', None)
            
            # Get parameter defaults
            sig = inspect.signature(func)
            params = sig.parameters
            
            properties = {}
            required = []
            
            for param_name, param in params.items():
                type_hint = hints.get(param_name)
                schema = python_type_to_json_schema(type_hint)
                
                # Try to extract description from docstring
                param_desc = extract_param_description(func.__doc__, param_name)
                if param_desc:
                    schema['description'] = param_desc
                else:
                    # Generate a default description
                    schema['description'] = f"The {param_name.replace('_', ' ')}"
                
                properties[param_name] = schema
                
                # Check if parameter has no default (is required)
                if param.default == inspect.Parameter.empty:
                    required.append(param_name)
            
            input_schema = {
                "type": "object",
                "properties": properties,
                "required": required
            }
            
            self._tools[tool_name] = {
                'func': func,
                'name': tool_name,
                'description': tool_desc,
                'inputSchema': input_schema
            }
            
            return func
        return decorator
    
    def resource(self, uri: str, name: str = None, description: str = None, mime_type: str = "text/plain"):
        """Decorator to register a resource"""
        def decorator(func):
            resource_name = name or func.__name__
            resource_desc = description or func.__doc__ or f"Resource: {resource_name}"
            
            # Clean up the description
            if resource_desc:
                resource_desc = resource_desc.strip().split('\\n')[0]
            
            self._resources[uri] = {
                'func': func,
                'uri': uri,
                'name': resource_name,
                'description': resource_desc,
                'mimeType': mime_type
            }
            
            return func
        return decorator
    
    def prompt(self, name: str = None, description: str = None):
        """Decorator to register a prompt template"""
        def decorator(func):
            prompt_name = name or func.__name__
            prompt_desc = description or func.__doc__ or f"Prompt: {prompt_name}"
            
            # Clean up the description
            if prompt_desc:
                prompt_desc = prompt_desc.strip().split('\\n')[0]
            
            # Build arguments schema from type hints
            hints = {}
            try:
                hints = func.__annotations__.copy()
            except:
                pass
            hints.pop('return', None)
            
            sig = inspect.signature(func)
            params = sig.parameters
            
            arguments = []
            for param_name, param in params.items():
                type_hint = hints.get(param_name)
                arg = {
                    'name': param_name,
                    'description': extract_param_description(func.__doc__, param_name) or f"The {param_name.replace('_', ' ')}",
                    'required': param.default == inspect.Parameter.empty
                }
                arguments.append(arg)
            
            self._prompts[prompt_name] = {
                'func': func,
                'name': prompt_name,
                'description': prompt_desc,
                'arguments': arguments
            }
            
            return func
        return decorator
    
    def get_tools(self):
        """Get all registered tools"""
        return [
            {
                'name': t['name'],
                'description': t['description'],
                'inputSchema': t['inputSchema']
            }
            for t in self._tools.values()
        ]
    
    def get_resources(self):
        """Get all registered resources"""
        return [
            {
                'uri': r['uri'],
                'name': r['name'],
                'description': r['description'],
                'mimeType': r['mimeType']
            }
            for r in self._resources.values()
        ]
    
    def get_prompts(self):
        """Get all registered prompts"""
        return [
            {
                'name': p['name'],
                'description': p['description'],
                'arguments': p['arguments']
            }
            for p in self._prompts.values()
        ]
    
    def call_tool(self, name: str, arguments: dict):
        """Call a tool by name with arguments"""
        if name not in self._tools:
            raise ValueError(f"Unknown tool: {name}")
        
        tool = self._tools[name]
        func = tool['func']
        
        # Call the function with arguments
        result = func(**arguments)
        return result
    
    def read_resource(self, uri: str):
        """Read a resource by URI"""
        if uri not in self._resources:
            raise ValueError(f"Unknown resource: {uri}")
        
        resource = self._resources[uri]
        func = resource['func']
        result = func()
        return result
    
    def get_prompt(self, name: str, arguments: dict = None):
        """Get a prompt by name with arguments"""
        if name not in self._prompts:
            raise ValueError(f"Unknown prompt: {name}")
        
        prompt = self._prompts[name]
        func = prompt['func']
        
        if arguments:
            result = func(**arguments)
        else:
            result = func()
        return result
    
    def run(self, transport="stdio"):
        """Mock run method - in playground, we don't actually start a server"""
        pass

def extract_tools_fastmcp(code):
    """Extract tools, resources, and prompts from FastMCP-style code"""
    global _fastmcp_instance, _fastmcp_ns
    
    tools = []
    resources = []
    prompts = []
    
    # Create a namespace with FastMCP
    _fastmcp_ns = {
        'FastMCP': FastMCP,
        'math': math,
        'json': json,
        'list': list,
        'dict': dict,
        'str': str,
        'int': int,
        'float': float,
        'bool': bool,
        'len': len,
        'range': range,
        'enumerate': enumerate,
        'print': print,
        '__builtins__': __builtins__,
    }
    
    # Clean up the code for execution
    clean_code = code
    clean_code = clean_code.replace('from mcp.server.fastmcp import FastMCP', '')
    clean_code = clean_code.replace('from fastmcp import FastMCP', '')
    clean_code = clean_code.replace('async def', 'def')
    clean_code = clean_code.replace('async with', 'with')
    clean_code = clean_code.replace('await ', '')
    
    try:
        exec(clean_code, _fastmcp_ns)
        
        # Find the FastMCP instance and store it globally
        _fastmcp_instance = None
        for k, v in _fastmcp_ns.items():
            if isinstance(v, FastMCP) or (hasattr(v, '_is_fastmcp') and v._is_fastmcp):
                _fastmcp_instance = v
                tools = v.get_tools()
                resources = v.get_resources()
                prompts = v.get_prompts()
                break
        
        return json.dumps({'success': True, 'tools': tools, 'resources': resources, 'prompts': prompts})
    except Exception as e:
        return json.dumps({'success': False, 'error': str(e)})

print('FastMCP ready')
`)

      state.value.instance = instance
      state.value.isReady = true
      state.value.loadProgress = 'Ready!'
      onProgress?.('Ready!')
      
      return instance
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Python'
      state.value.error = errorMessage
      throw err
    } finally {
      state.value.isLoading = false
    }
  }

  const extractToolsFromCode = async (code: string): Promise<{ 
    success: boolean
    tools?: ExtractedTool[]
    resources?: ExtractedResource[]
    prompts?: ExtractedPrompt[]
    error?: string 
  }> => {
    if (!state.value.instance) {
      await initialize()
    }

    if (!state.value.instance) {
      throw new Error('Pyodide not initialized')
    }

    try {
      state.value.instance.globals.set('_user_code', code)
      const resultJson = await state.value.instance.runPythonAsync(`extract_tools_fastmcp(_user_code)`)
      return JSON.parse(resultJson)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to extract tools'
      return { success: false, error: errorMessage }
    }
  }

  // Track the current code hash to know when to re-initialize
  const codeHash = ref<string>('')

  const executeToolCode = async (
    fullCode: string, 
    toolName: string, 
    args: Record<string, unknown>
  ): Promise<{ success: boolean; result?: string; error?: string }> => {
    if (!state.value.instance) {
      await initialize()
    }

    if (!state.value.instance) {
      throw new Error('Pyodide not initialized')
    }

    try {
      // Simple hash to detect code changes
      const newHash = fullCode.length.toString() + fullCode.slice(0, 100)
      const needsInit = newHash !== codeHash.value
      
      state.value.instance.globals.set('_user_code', fullCode)
      state.value.instance.globals.set('_tool_name', toolName)
      state.value.instance.globals.set('_tool_args_json', JSON.stringify(args))
      state.value.instance.globals.set('_needs_init', needsInit)

      const resultJson = await state.value.instance.runPythonAsync(`
# Persistent FastMCP namespace - only initialize once per code change
if '_fastmcp_ns' not in dir() or _needs_init:
    _fastmcp_ns = {
        'FastMCP': FastMCP,
        'math': math,
        'json': json,
        'list': list,
        'dict': dict,
        'str': str,
        'int': int,
        'float': float,
        'bool': bool,
        'len': len,
        'range': range,
        'enumerate': enumerate,
        'print': print,
        '__builtins__': __builtins__,
    }
    
    mc = _user_code
    mc = mc.replace('from mcp.server.fastmcp import FastMCP', '')
    mc = mc.replace('from fastmcp import FastMCP', '')
    mc = mc.replace('async def', 'def')
    mc = mc.replace('async with', 'with')
    mc = mc.replace('await ', '')
    
    _fastmcp_init_error = None
    _fastmcp_instance = None
    
    try:
        exec(mc, _fastmcp_ns)
        # Find the FastMCP instance
        for k, v in _fastmcp_ns.items():
            if isinstance(v, FastMCP) or (hasattr(v, '_is_fastmcp') and v._is_fastmcp):
                _fastmcp_instance = v
                break
    except Exception as e:
        _fastmcp_init_error = str(e)

result = json.dumps({'success': False, 'error': 'Unknown error'})

if '_fastmcp_init_error' in dir() and _fastmcp_init_error:
    result = json.dumps({'success': False, 'error': _fastmcp_init_error})
elif '_fastmcp_instance' in dir() and _fastmcp_instance:
    try:
        a = json.loads(_tool_args_json)
        r = _fastmcp_instance.call_tool(_tool_name, a)
        # Handle different return types
        if r is None:
            result = json.dumps({'success': True, 'result': 'Done'})
        elif isinstance(r, str):
            result = json.dumps({'success': True, 'result': r})
        elif isinstance(r, (int, float, bool)):
            result = json.dumps({'success': True, 'result': str(r)})
        elif isinstance(r, (list, dict)):
            result = json.dumps({'success': True, 'result': json.dumps(r, indent=2)})
        else:
            result = json.dumps({'success': True, 'result': str(r)})
    except Exception as e:
        result = json.dumps({'success': False, 'error': str(e)})
else:
    result = json.dumps({'success': False, 'error': 'No FastMCP instance found'})
result
`)
      
      // Update hash after successful execution
      if (needsInit) {
        codeHash.value = newHash
      }

      return JSON.parse(resultJson)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Tool execution failed'
      return { success: false, error: errorMessage }
    }
  }

  const runPython = async (code: string): Promise<string> => {
    if (!state.value.instance) {
      await initialize()
    }
    if (!state.value.instance) {
      throw new Error('Pyodide not initialized')
    }
    const result = await state.value.instance.runPythonAsync(code)
    return result !== undefined ? String(result) : ''
  }

  // Read a resource by URI
  const readResource = async (
    _fullCode: string,
    resourceUri: string
  ): Promise<{ success: boolean; result?: string; error?: string }> => {
    if (!state.value.instance) {
      await initialize()
    }

    if (!state.value.instance) {
      throw new Error('Pyodide not initialized')
    }

    try {
      state.value.instance.globals.set('_resource_uri', resourceUri)
      const resultJson = await state.value.instance.runPythonAsync(`
import json
result = None
if '_fastmcp_instance' in dir() and _fastmcp_instance:
    try:
        r = _fastmcp_instance.read_resource(_resource_uri)
        if r is None:
            result = json.dumps({'success': True, 'result': 'No content'})
        elif isinstance(r, str):
            result = json.dumps({'success': True, 'result': r})
        elif isinstance(r, (int, float, bool)):
            result = json.dumps({'success': True, 'result': str(r)})
        elif isinstance(r, (list, dict)):
            result = json.dumps({'success': True, 'result': json.dumps(r, indent=2)})
        else:
            result = json.dumps({'success': True, 'result': str(r)})
    except Exception as e:
        result = json.dumps({'success': False, 'error': str(e)})
else:
    result = json.dumps({'success': False, 'error': 'No FastMCP instance found. Run the server first.'})
result
`)
      return JSON.parse(resultJson)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Resource read failed'
      return { success: false, error: errorMessage }
    }
  }

  // Execute a prompt with arguments
  const executePrompt = async (
    _fullCode: string,
    promptName: string,
    args: Record<string, unknown>
  ): Promise<{ success: boolean; result?: string; error?: string }> => {
    if (!state.value.instance) {
      await initialize()
    }

    if (!state.value.instance) {
      throw new Error('Pyodide not initialized')
    }

    try {
      state.value.instance.globals.set('_prompt_name', promptName)
      state.value.instance.globals.set('_prompt_args_json', JSON.stringify(args))
      const resultJson = await state.value.instance.runPythonAsync(`
import json
result = None
if '_fastmcp_instance' in dir() and _fastmcp_instance:
    try:
        a = json.loads(_prompt_args_json)
        r = _fastmcp_instance.get_prompt(_prompt_name, a)
        if r is None:
            result = json.dumps({'success': True, 'result': 'No content'})
        elif isinstance(r, str):
            result = json.dumps({'success': True, 'result': r})
        elif isinstance(r, (int, float, bool)):
            result = json.dumps({'success': True, 'result': str(r)})
        elif isinstance(r, (list, dict)):
            result = json.dumps({'success': True, 'result': json.dumps(r, indent=2)})
        else:
            result = json.dumps({'success': True, 'result': str(r)})
    except Exception as e:
        result = json.dumps({'success': False, 'error': str(e)})
else:
    result = json.dumps({'success': False, 'error': 'No FastMCP instance found. Run the server first.'})
result
`)
      return JSON.parse(resultJson)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Prompt execution failed'
      return { success: false, error: errorMessage }
    }
  }

  const reset = () => {
    state.value = {
      instance: null,
      isLoading: false,
      isReady: false,
      loadProgress: '',
      error: null,
    }
    codeHash.value = '' // Clear code hash to force re-initialization
  }
  
  // Reset the FastMCP namespace without resetting Pyodide itself
  const resetMCPNamespace = async () => {
    codeHash.value = '' // Force re-exec on next tool call
    if (state.value.instance) {
      await state.value.instance.runPythonAsync(`
if '_fastmcp_ns' in dir():
    del _fastmcp_ns
if '_fastmcp_init_error' in dir():
    del _fastmcp_init_error
if '_fastmcp_instance' in dir():
    del _fastmcp_instance
`)
    }
  }

  return {
    state: computed(() => state.value),
    isLoading: computed(() => state.value.isLoading),
    isReady: computed(() => state.value.isReady),
    loadProgress: computed(() => state.value.loadProgress),
    error: computed(() => state.value.error),
    initialize,
    runPython,
    extractToolsFromCode,
    executeToolCode,
    readResource,
    executePrompt,
    reset,
    resetMCPNamespace,
  }
}
