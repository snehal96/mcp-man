export interface Template {
  id: string
  name: string
  description: string
  category: 'beginner' | 'api' | 'data' | 'utility'
  code: string
  tags: string[]
}

export const templates: Template[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Complete MCP example with Tools, Resources, and Prompts',
    category: 'beginner',
    tags: ['beginner', 'complete', 'tools', 'resources', 'prompts'],
    code: `from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Hello World Server")

# ========================================
# RESOURCES - Expose data to LLMs
# ========================================

@mcp.resource(uri="info://welcome", name="Welcome Message")
def welcome_resource() -> str:
    """A static welcome message for the server"""
    return "Welcome to MCP Playground! This server demonstrates Tools, Resources, and Prompts."

@mcp.resource(uri="info://about", name="About Server")
def about_resource() -> str:
    """Information about this MCP server"""
    return """MCP Playground Server
    
Features:
- Tools: Functions that LLMs can call
- Resources: Data that LLMs can read
- Prompts: Reusable prompt templates

Built with FastMCP for clean, Pythonic syntax."""

@mcp.resource(uri="data://stats", name="Server Stats")
def stats_resource() -> str:
    """Server statistics and metadata"""
    import json
    return json.dumps({
        "server_name": "Hello World Server",
        "version": "1.0.0",
        "tools_count": 2,
        "resources_count": 3,
        "prompts_count": 2
    }, indent=2)

# ========================================
# PROMPTS - Reusable prompt templates
# ========================================

@mcp.prompt(name="greeting_prompt", description="Generate a personalized greeting")
def greeting_prompt(name: str, style: str = "friendly") -> str:
    """Create a greeting prompt for the LLM
    
    Args:
        name: The name of the person to greet
        style: The greeting style (friendly, formal, casual)
    """
    styles = {
        "friendly": f"Generate a warm and friendly greeting for {name}. Be enthusiastic!",
        "formal": f"Generate a formal, professional greeting for {name}. Be polite and respectful.",
        "casual": f"Generate a casual, relaxed greeting for {name}. Keep it chill!"
    }
    return styles.get(style, styles["friendly"])

@mcp.prompt(name="farewell_prompt", description="Generate a farewell message")
def farewell_prompt(name: str, occasion: str = "general") -> str:
    """Create a farewell prompt for the LLM
    
    Args:
        name: The name of the person leaving
        occasion: The occasion (general, meeting, vacation, retirement)
    """
    occasions = {
        "general": f"Say goodbye to {name} in a friendly way.",
        "meeting": f"End a productive meeting by thanking {name} for their time.",
        "vacation": f"Wish {name} a wonderful vacation with travel wishes.",
        "retirement": f"Congratulate {name} on their retirement with heartfelt wishes."
    }
    return occasions.get(occasion, occasions["general"])

# ========================================
# TOOLS - Functions that LLMs can call
# ========================================

@mcp.tool()
def greet(name: str, language: str = "english") -> str:
    """Greet a person by name in different languages
    
    Args:
        name: The name of the person to greet
        language: The language for greeting (english, spanish, french, japanese)
    """
    greetings = {
        "english": f"Hello, {name}! Welcome to MCP Playground! 👋",
        "spanish": f"¡Hola, {name}! ¡Bienvenido al MCP Playground! 👋",
        "french": f"Bonjour, {name}! Bienvenue au MCP Playground! 👋",
        "japanese": f"こんにちは、{name}さん！MCP Playgroundへようこそ！👋"
    }
    return greetings.get(language.lower(), greetings["english"])

@mcp.tool()
def say_goodbye(name: str) -> str:
    """Say goodbye to someone
    
    Args:
        name: The name of the person to say goodbye to
    """
    return f"Goodbye, {name}! See you next time! 👋"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Get weather information for cities',
    category: 'api',
    tags: ['api', 'weather', 'data'],
    code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Weather Server")

# Mock weather data
WEATHER_DATA = {
    "new york": {"temp": 72, "condition": "Sunny", "humidity": 65},
    "london": {"temp": 61, "condition": "Cloudy", "humidity": 78},
    "tokyo": {"temp": 68, "condition": "Rainy", "humidity": 82},
    "paris": {"temp": 64, "condition": "Partly Cloudy", "humidity": 70},
    "sydney": {"temp": 75, "condition": "Clear", "humidity": 60},
}

@mcp.tool()
def get_weather(city: str) -> str:
    """Get current weather for a city
    
    Args:
        city: City name (e.g., 'New York', 'London', 'Tokyo')
    """
    weather = WEATHER_DATA.get(city.lower())
    
    if weather:
        return f"""🌤️ Weather in {city.title()}:
Temperature: {weather['temp']}°F
Condition: {weather['condition']}
Humidity: {weather['humidity']}%"""
    else:
        return f"❌ Weather data not available for {city}"

@mcp.tool()
def list_cities() -> str:
    """List all cities with available weather data"""
    cities = ", ".join([city.title() for city in WEATHER_DATA.keys()])
    return f"📍 Available cities: {cities}"

@mcp.tool()
def compare_weather(city1: str, city2: str) -> str:
    """Compare weather between two cities
    
    Args:
        city1: First city to compare
        city2: Second city to compare
    """
    w1 = WEATHER_DATA.get(city1.lower())
    w2 = WEATHER_DATA.get(city2.lower())
    
    if not w1:
        return f"❌ No data for {city1}"
    if not w2:
        return f"❌ No data for {city2}"
    
    temp_diff = w1['temp'] - w2['temp']
    warmer = city1 if temp_diff > 0 else city2
    
    return f"""📊 Weather Comparison:

{city1.title()}: {w1['temp']}°F, {w1['condition']}
{city2.title()}: {w2['temp']}°F, {w2['condition']}

🌡️ {warmer.title()} is warmer by {abs(temp_diff)}°F"""

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations',
    category: 'utility',
    tags: ['utility', 'math', 'calculator'],
    code: `from mcp.server.fastmcp import FastMCP
import math

mcp = FastMCP("Calculator Server")

@mcp.tool()
def add(a: float, b: float) -> str:
    """Add two numbers together
    
    Args:
        a: First number
        b: Second number
    """
    result = a + b
    return f"✅ {a} + {b} = {result}"

@mcp.tool()
def subtract(a: float, b: float) -> str:
    """Subtract second number from first
    
    Args:
        a: First number
        b: Second number to subtract
    """
    result = a - b
    return f"✅ {a} - {b} = {result}"

@mcp.tool()
def multiply(a: float, b: float) -> str:
    """Multiply two numbers
    
    Args:
        a: First number
        b: Second number
    """
    result = a * b
    return f"✅ {a} × {b} = {result}"

@mcp.tool()
def divide(a: float, b: float) -> str:
    """Divide first number by second
    
    Args:
        a: Dividend (number to divide)
        b: Divisor (number to divide by)
    """
    if b == 0:
        return "❌ Error: Division by zero"
    result = a / b
    return f"✅ {a} ÷ {b} = {result}"

@mcp.tool()
def power(base: float, exponent: float) -> str:
    """Raise a number to a power
    
    Args:
        base: The base number
        exponent: The power to raise to
    """
    result = base ** exponent
    return f"✅ {base}^{exponent} = {result}"

@mcp.tool()
def sqrt(number: float) -> str:
    """Calculate the square root of a number
    
    Args:
        number: The number to find square root of
    """
    if number < 0:
        return "❌ Error: Cannot calculate square root of negative number"
    result = math.sqrt(number)
    return f"✅ √{number} = {result}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'text-processor',
    name: 'Text Processor',
    description: 'Process and transform text strings',
    category: 'utility',
    tags: ['utility', 'text', 'string'],
    code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Text Processor Server")

@mcp.tool()
def uppercase(text: str) -> str:
    """Convert text to uppercase
    
    Args:
        text: The text to transform
    """
    return f"📝 Result: {text.upper()}"

@mcp.tool()
def lowercase(text: str) -> str:
    """Convert text to lowercase
    
    Args:
        text: The text to transform
    """
    return f"📝 Result: {text.lower()}"

@mcp.tool()
def title_case(text: str) -> str:
    """Convert text to title case
    
    Args:
        text: The text to transform
    """
    return f"📝 Result: {text.title()}"

@mcp.tool()
def reverse(text: str) -> str:
    """Reverse the text
    
    Args:
        text: The text to reverse
    """
    return f"📝 Result: {text[::-1]}"

@mcp.tool()
def word_count(text: str) -> str:
    """Count words in text
    
    Args:
        text: The text to analyze
    """
    words = len(text.split())
    chars = len(text)
    chars_no_space = len(text.replace(" ", ""))
    return f"""📊 Text Analysis:
Words: {words}
Characters (with spaces): {chars}
Characters (no spaces): {chars_no_space}"""

@mcp.tool()
def replace_text(text: str, find: str, replace: str) -> str:
    """Find and replace text
    
    Args:
        text: The original text
        find: Text to find
        replace: Text to replace with
    """
    result = text.replace(find, replace)
    count = text.count(find)
    return f"📝 Replaced {count} occurrence(s):\\n{result}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'todo-list',
    name: 'Todo List',
    description: 'Manage a simple todo list',
    category: 'data',
    tags: ['data', 'crud', 'storage'],
    code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Todo Server")

# In-memory todo storage
todos = []

@mcp.tool()
def add_todo(task: str) -> str:
    """Add a new todo item
    
    Args:
        task: The task description
    """
    todos.append({"task": task, "completed": False})
    return f"✅ Added: {task} (#{len(todos)})"
    
@mcp.tool()
def list_todos() -> str:
    """List all todo items"""
    if not todos:
        return "📝 No todos yet! Add one with add_todo."
    
    result = "📝 Your Todos:\\n\\n"
    for i, todo in enumerate(todos):
        status = "✓" if todo["completed"] else "○"
        result += f"{i + 1}. [{status}] {todo['task']}\\n"
    
    completed = sum(1 for t in todos if t["completed"])
    result += f"\\n📊 {completed}/{len(todos)} completed"
    return result

@mcp.tool()
def complete_todo(index: int) -> str:
    """Mark a todo as complete
    
    Args:
        index: The todo number (1-based)
    """
    idx = index - 1
    if 0 <= idx < len(todos):
        todos[idx]["completed"] = True
        return f"✓ Completed: {todos[idx]['task']}"
    else:
        return f"❌ Invalid todo number: {index}"

@mcp.tool()
def delete_todo(index: int) -> str:
    """Delete a todo item
    
    Args:
        index: The todo number to delete (1-based)
    """
    idx = index - 1
    if 0 <= idx < len(todos):
        removed = todos.pop(idx)
        return f"🗑️ Deleted: {removed['task']}"
    else:
        return f"❌ Invalid todo number: {index}"

@mcp.tool()
def clear_completed() -> str:
    """Remove all completed todos"""
    global todos
    before = len(todos)
    todos = [t for t in todos if not t["completed"]]
    removed = before - len(todos)
    return f"🧹 Cleared {removed} completed todo(s)"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'json-tools',
    name: 'JSON Tools',
    description: 'Parse, format, and manipulate JSON data',
    category: 'utility',
    tags: ['utility', 'json', 'data'],
    code: `from mcp.server.fastmcp import FastMCP
import json

mcp = FastMCP("JSON Tools Server")

@mcp.tool()
def format_json(json_string: str) -> str:
    """Pretty-print JSON with proper indentation
    
    Args:
        json_string: Raw JSON string to format
    """
    try:
        data = json.loads(json_string)
        formatted = json.dumps(data, indent=2)
        return f"✅ Formatted JSON:\\n{formatted}"
    except json.JSONDecodeError as e:
        return f"❌ Invalid JSON: {str(e)}"

@mcp.tool()
def minify_json(json_string: str) -> str:
    """Minify JSON by removing whitespace
    
    Args:
        json_string: JSON string to minify
    """
    try:
        data = json.loads(json_string)
        minified = json.dumps(data, separators=(',', ':'))
        return f"✅ Minified: {minified}"
    except json.JSONDecodeError as e:
        return f"❌ Invalid JSON: {str(e)}"

@mcp.tool()
def validate_json(json_string: str) -> str:
    """Check if a string is valid JSON
    
    Args:
        json_string: String to validate
    """
    try:
        data = json.loads(json_string)
        data_type = type(data).__name__
        if isinstance(data, dict):
            keys = len(data.keys())
            return f"✅ Valid JSON object with {keys} key(s)"
        elif isinstance(data, list):
            return f"✅ Valid JSON array with {len(data)} item(s)"
        else:
            return f"✅ Valid JSON {data_type}"
    except json.JSONDecodeError as e:
        return f"❌ Invalid JSON at position {e.pos}: {e.msg}"

@mcp.tool()
def get_json_keys(json_string: str) -> str:
    """Extract all keys from a JSON object
    
    Args:
        json_string: JSON object string
    """
    try:
        data = json.loads(json_string)
        if isinstance(data, dict):
            keys = list(data.keys())
            return f"🔑 Keys: {', '.join(keys)}"
        else:
            return "❌ Input is not a JSON object"
    except json.JSONDecodeError as e:
        return f"❌ Invalid JSON: {str(e)}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'utility',
    tags: ['utility', 'conversion', 'math'],
    code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Unit Converter Server")

@mcp.tool()
def celsius_to_fahrenheit(celsius: float) -> str:
    """Convert Celsius to Fahrenheit
    
    Args:
        celsius: Temperature in Celsius
    """
    fahrenheit = (celsius * 9/5) + 32
    return f"🌡️ {celsius}°C = {fahrenheit:.2f}°F"

@mcp.tool()
def fahrenheit_to_celsius(fahrenheit: float) -> str:
    """Convert Fahrenheit to Celsius
    
    Args:
        fahrenheit: Temperature in Fahrenheit
    """
    celsius = (fahrenheit - 32) * 5/9
    return f"🌡️ {fahrenheit}°F = {celsius:.2f}°C"

@mcp.tool()
def km_to_miles(kilometers: float) -> str:
    """Convert kilometers to miles
    
    Args:
        kilometers: Distance in kilometers
    """
    miles = kilometers * 0.621371
    return f"📏 {kilometers} km = {miles:.2f} miles"

@mcp.tool()
def miles_to_km(miles: float) -> str:
    """Convert miles to kilometers
    
    Args:
        miles: Distance in miles
    """
    kilometers = miles * 1.60934
    return f"📏 {miles} miles = {kilometers:.2f} km"

@mcp.tool()
def kg_to_lbs(kilograms: float) -> str:
    """Convert kilograms to pounds
    
    Args:
        kilograms: Weight in kilograms
    """
    pounds = kilograms * 2.20462
    return f"⚖️ {kilograms} kg = {pounds:.2f} lbs"

@mcp.tool()
def lbs_to_kg(pounds: float) -> str:
    """Convert pounds to kilograms
    
    Args:
        pounds: Weight in pounds
    """
    kilograms = pounds * 0.453592
    return f"⚖️ {pounds} lbs = {kilograms:.2f} kg"

@mcp.tool()
def liters_to_gallons(liters: float) -> str:
    """Convert liters to US gallons
    
    Args:
        liters: Volume in liters
    """
    gallons = liters * 0.264172
    return f"🫗 {liters} L = {gallons:.2f} gal"

@mcp.tool()
def gallons_to_liters(gallons: float) -> str:
    """Convert US gallons to liters
    
    Args:
        gallons: Volume in US gallons
    """
    liters = gallons * 3.78541
    return f"🫗 {gallons} gal = {liters:.2f} L"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'random-generator',
    name: 'Random Generator',
    description: 'Generate random numbers, strings, and data',
    category: 'utility',
    tags: ['utility', 'random', 'generator'],
    code: `from mcp.server.fastmcp import FastMCP
import math

mcp = FastMCP("Random Generator Server")

# Simple pseudo-random number generator (since we can't use random module easily)
_seed = 42

def _random():
    global _seed
    _seed = (_seed * 1103515245 + 12345) & 0x7fffffff
    return _seed / 0x7fffffff

@mcp.tool()
def random_number(min_val: int, max_val: int) -> str:
    """Generate a random integer in a range
    
    Args:
        min_val: Minimum value (inclusive)
        max_val: Maximum value (inclusive)
    """
    if min_val > max_val:
        return "❌ min_val must be less than or equal to max_val"
    
    result = min_val + int(_random() * (max_val - min_val + 1))
    return f"🎲 Random number: {result}"

@mcp.tool()
def random_float(min_val: float, max_val: float) -> str:
    """Generate a random float in a range
    
    Args:
        min_val: Minimum value
        max_val: Maximum value
    """
    if min_val > max_val:
        return "❌ min_val must be less than or equal to max_val"
    
    result = min_val + _random() * (max_val - min_val)
    return f"🎲 Random float: {result:.4f}"

@mcp.tool()
def random_choice(options: str) -> str:
    """Pick a random item from comma-separated options
    
    Args:
        options: Comma-separated list of options (e.g., "red,blue,green")
    """
    items = [item.strip() for item in options.split(",")]
    if not items:
        return "❌ No options provided"
    
    index = int(_random() * len(items))
    return f"🎯 Random choice: {items[index]}"

@mcp.tool()
def coin_flip() -> str:
    """Flip a coin"""
    result = "Heads" if _random() > 0.5 else "Tails"
    return f"🪙 {result}!"

@mcp.tool()
def dice_roll(sides: int) -> str:
    """Roll a die with specified number of sides
    
    Args:
        sides: Number of sides on the die (e.g., 6 for standard die)
    """
    if sides < 2:
        return "❌ Die must have at least 2 sides"
    
    result = 1 + int(_random() * sides)
    return f"🎲 Rolled d{sides}: {result}"

@mcp.tool()
def shuffle_list(items: str) -> str:
    """Shuffle a comma-separated list
    
    Args:
        items: Comma-separated items to shuffle
    """
    item_list = [item.strip() for item in items.split(",")]
    
    # Fisher-Yates shuffle
    for i in range(len(item_list) - 1, 0, -1):
        j = int(_random() * (i + 1))
        item_list[i], item_list[j] = item_list[j], item_list[i]
    
    return f"🔀 Shuffled: {', '.join(item_list)}"

if __name__ == "__main__":
    mcp.run()
`,
  },
]

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}

export function getTemplatesByCategory(category: Template['category']): Template[] {
  return templates.filter(t => t.category === category)
}
