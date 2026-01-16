"""
MCP Tool Extraction Utilities
This file is loaded by Pyodide to parse MCP server code
"""

import json
import math
from io import StringIO

# Store for tool metadata
_mcp_tool_metadata = {}

def find_string_value(text, key):
    """Find a string value after a key like name= or description="""
    # Look for key=
    key_patterns = [key + '=', key + ' =']
    start = -1
    for pattern in key_patterns:
        pos = text.find(pattern)
        if pos != -1:
            start = pos + len(pattern)
            break
    
    if start == -1:
        return None
    
    # Skip whitespace
    while start < len(text) and text[start] in ' \t\n':
        start += 1
    
    if start >= len(text):
        return None
    
    # Find opening quote
    if text[start] not in '"\'':
        return None
    
    quote = text[start]
    start += 1
    
    # Find closing quote
    end = text.find(quote, start)
    if end == -1:
        return None
    
    return text[start:end]

def extract_json_block(text, start_key):
    """Extract a JSON object block starting after a key"""
    key_pos = text.find(start_key)
    if key_pos == -1:
        return None
    
    # Find first {
    brace_pos = text.find('{', key_pos)
    if brace_pos == -1:
        return None
    
    # Count braces to find matching }
    count = 1
    i = brace_pos + 1
    while i < len(text) and count > 0:
        if text[i] == '{':
            count += 1
        elif text[i] == '}':
            count -= 1
        i += 1
    
    if count == 0:
        return text[brace_pos:i]
    return None

def extract_tools(code):
    """Parse MCP server code and extract tool definitions"""
    global _mcp_tool_metadata
    _mcp_tool_metadata = {}
    
    tools = []
    
    # Find all Tool( blocks
    pos = 0
    while True:
        tool_start = code.find('Tool(', pos)
        if tool_start == -1:
            break
        
        # Find matching )
        paren_count = 1
        i = tool_start + 5
        while i < len(code) and paren_count > 0:
            if code[i] == '(':
                paren_count += 1
            elif code[i] == ')':
                paren_count -= 1
            i += 1
        
        if paren_count == 0:
            block = code[tool_start:i]
            
            name = find_string_value(block, 'name')
            desc = find_string_value(block, 'description') or 'No description'
            
            schema = {'type': 'object', 'properties': {}, 'required': []}
            schema_str = extract_json_block(block, 'inputSchema')
            if schema_str:
                try:
                    schema = json.loads(schema_str)
                except:
                    pass
            
            if name:
                tool = {
                    'name': name,
                    'description': desc,
                    'inputSchema': schema
                }
                tools.append(tool)
                _mcp_tool_metadata[name] = tool
        
        pos = i
    
    return json.dumps({'success': True, 'tools': tools})

print("MCP utilities loaded")

