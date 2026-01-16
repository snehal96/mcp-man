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
    id: 'weather-api',
    name: '🌤️ Weather API (Live)',
    description: 'Real weather data using Geocoding + Open-Meteo APIs - works with ANY city worldwide',
    category: 'api',
    tags: ['api', 'weather', 'http', 'geocoding', 'live-data'],
    code: `from mcp.server.fastmcp import FastMCP
import json
from pyodide.http import open_url
from urllib.parse import quote

mcp = FastMCP("Live Weather Server")

# ========================================
# HELPER - Geocoding API (converts city name to coordinates)
# ========================================

def geocode_city(city_name: str):
    """
    Uses Open-Meteo Geocoding API to get lat/long for ANY city worldwide.
    API: https://geocoding-api.open-meteo.com
    Free, no API key required!
    """
    encoded_city = quote(city_name)
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={encoded_city}&count=1&language=en&format=json"
    
    response = open_url(url)
    data = json.loads(response.read())
    results = data.get("results", [])
    
    if not results:
        return None
    
    location = results[0]
    return {
        "name": location.get("name"),
        "lat": location.get("latitude"),
        "lon": location.get("longitude"),
        "country": location.get("country", "Unknown"),
        "admin1": location.get("admin1", ""),  # State/Province
        "timezone": location.get("timezone", ""),
        "population": location.get("population", 0)
    }

def fetch_weather(lat: float, lon: float):
    """Fetch weather data from Open-Meteo API"""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto"
    response = open_url(url)
    return json.loads(response.read())

# Weather code descriptions (WMO codes)
WEATHER_CODES = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Foggy",
    48: "🌫️ Depositing rime fog",
    51: "🌧️ Light drizzle",
    53: "🌧️ Moderate drizzle",
    55: "🌧️ Dense drizzle",
    61: "🌧️ Slight rain",
    63: "🌧️ Moderate rain",
    65: "🌧️ Heavy rain",
    71: "🌨️ Slight snow",
    73: "🌨️ Moderate snow",
    75: "❄️ Heavy snow",
    80: "🌦️ Slight rain showers",
    81: "🌦️ Moderate rain showers",
    82: "⛈️ Violent rain showers",
    95: "⛈️ Thunderstorm",
    96: "⛈️ Thunderstorm with hail",
    99: "⛈️ Thunderstorm with heavy hail",
}

# ========================================
# RESOURCES - API Information
# ========================================

@mcp.resource(uri="weather://api-info", name="API Information")
def api_info_resource() -> str:
    """Information about the APIs being used"""
    return """🌍 Open-Meteo APIs (Free, No API Key Required)

1️⃣ GEOCODING API
   URL: geocoding-api.open-meteo.com
   Purpose: Convert any city/location name to coordinates
   Coverage: Worldwide (millions of locations)
   
2️⃣ WEATHER API  
   URL: api.open-meteo.com
   Purpose: Get current weather data
   Data: Temperature, humidity, wind, conditions
   
💡 How it works:
   1. Enter any city name (e.g., "Paris", "Mumbai", "São Paulo")
   2. Geocoding API finds the exact coordinates
   3. Weather API returns real-time weather data

🌐 No hardcoded cities - works with ANY location worldwide!"""

@mcp.resource(uri="weather://examples", name="Example Queries")
def examples_resource() -> str:
    """Example cities to try"""
    return json.dumps({
        "popular_cities": [
            "New York", "London", "Tokyo", "Paris", "Sydney",
            "Dubai", "Singapore", "Mumbai", "Berlin", "Toronto"
        ],
        "try_these": [
            "Reykjavik, Iceland",
            "Cape Town, South Africa", 
            "Buenos Aires, Argentina",
            "Kathmandu, Nepal",
            "Marrakech, Morocco"
        ],
        "tip": "You can search for any city, town, or location worldwide!"
    }, indent=2)

# ========================================
# PROMPTS - Weather report templates
# ========================================

@mcp.prompt(name="weather_report", description="Generate a weather report")
def weather_report_prompt(city: str, style: str = "brief") -> str:
    """Create a weather report prompt
    
    Args:
        city: The city for the weather report
        style: Report style (brief, detailed, casual)
    """
    styles = {
        "brief": f"Give a brief 1-2 sentence weather summary for {city}.",
        "detailed": f"Provide a comprehensive weather analysis for {city} including temperature trends, humidity, and recommendations.",
        "casual": f"Describe the weather in {city} like you're telling a friend about it."
    }
    return styles.get(style, styles["brief"])

@mcp.prompt(name="travel_weather", description="Weather advice for travelers")
def travel_weather_prompt(destination: str, duration: str = "weekend") -> str:
    """Create travel weather advice prompt
    
    Args:
        destination: Travel destination
        duration: Trip duration (weekend, week, month)
    """
    return f"""Based on the current weather in {destination}, provide travel advice for a {duration} trip:
1. What to pack (clothing recommendations)
2. Best outdoor activities for this weather
3. Any weather-related precautions
4. Best time of day for sightseeing"""

# ========================================
# TOOLS - Dynamic weather fetching for ANY location
# ========================================

@mcp.tool()
def search_location(location: str) -> str:
    """Search for a location and get its coordinates
    
    Args:
        location: Any city, town, or place name (e.g., "Paris", "Mumbai", "Kyoto")
    """
    try:
        encoded = quote(location)
        url = f"https://geocoding-api.open-meteo.com/v1/search?name={encoded}&count=5&language=en&format=json"
        response = open_url(url)
        data = json.loads(response.read())
        results = data.get("results", [])
        
        if not results:
            return f"🔍 No locations found for '{location}'. Try a different spelling or add country name."
        
        output = f"🔍 Found {len(results)} location(s) for '{location}':\\n\\n"
        
        for i, loc in enumerate(results, 1):
            name = loc.get("name", "Unknown")
            country = loc.get("country", "")
            admin1 = loc.get("admin1", "")  # State/Province
            lat = loc.get("latitude", 0)
            lon = loc.get("longitude", 0)
            pop = loc.get("population", 0)
            
            location_str = name
            if admin1:
                location_str += f", {admin1}"
            if country:
                location_str += f", {country}"
            
            output += f"{i}. 📍 {location_str}\\n"
            output += f"   Coordinates: {lat:.4f}, {lon:.4f}\\n"
            if pop > 0:
                output += f"   Population: {pop:,}\\n"
            output += "\\n"
        
        output += "💡 Use get_weather('city name') to get weather for any of these!"
        return output
        
    except Exception as e:
        return f"❌ Error searching: {str(e)}"

@mcp.tool()
def get_weather(location: str) -> str:
    """Get LIVE current weather for ANY location worldwide
    
    Args:
        location: Any city, town, or place name (e.g., "Paris", "Tokyo", "Nairobi")
    """
    try:
        # Step 1: Get coordinates from Geocoding API
        geo = geocode_city(location)
        
        if not geo:
            return f"""❌ Location '{location}' not found.

💡 Tips:
   • Check the spelling
   • Try adding the country (e.g., "Paris, France")
   • Use search_location() to find valid locations"""
        
        # Step 2: Fetch weather using coordinates
        weather_data = fetch_weather(geo['lat'], geo['lon'])
        current = weather_data.get("current", {})
        
        code = current.get("weather_code", 0)
        condition = WEATHER_CODES.get(code, "Unknown")
        
        # Build location string
        loc_parts = [geo['name']]
        if geo.get('admin1'):
            loc_parts.append(geo['admin1'])
        loc_parts.append(geo['country'])
        location_str = ", ".join(loc_parts)
        
        return f"""🌤️ LIVE Weather in {location_str}:

{condition}

🌡️ Temperature: {current.get('temperature_2m', 'N/A')}°C
💧 Humidity: {current.get('relative_humidity_2m', 'N/A')}%
💨 Wind: {current.get('wind_speed_10m', 'N/A')} km/h

📍 Coordinates: {geo['lat']:.4f}, {geo['lon']:.4f}
🌐 Timezone: {geo.get('timezone', 'N/A')}
🔗 Data from Open-Meteo API (live)"""
        
    except Exception as e:
        return f"❌ Error fetching weather: {str(e)}"

@mcp.tool()
def compare_weather(location1: str, location2: str) -> str:
    """Compare LIVE weather between any two locations worldwide
    
    Args:
        location1: First location (any city/town name)
        location2: Second location (any city/town name)
    """
    try:
        # Get coordinates for both locations
        geo1 = geocode_city(location1)
        geo2 = geocode_city(location2)
        
        if not geo1:
            return f"❌ Location '{location1}' not found. Try search_location() first."
        if not geo2:
            return f"❌ Location '{location2}' not found. Try search_location() first."
        
        # Fetch weather for both
        d1 = fetch_weather(geo1['lat'], geo1['lon'])
        d2 = fetch_weather(geo2['lat'], geo2['lon'])
        
        c1 = d1.get("current", {})
        c2 = d2.get("current", {})
        
        t1 = c1.get("temperature_2m", 0)
        t2 = c2.get("temperature_2m", 0)
        h1 = c1.get("relative_humidity_2m", 0)
        h2 = c2.get("relative_humidity_2m", 0)
        
        cond1 = WEATHER_CODES.get(c1.get("weather_code", 0), "Unknown")
        cond2 = WEATHER_CODES.get(c2.get("weather_code", 0), "Unknown")
        
        temp_diff = abs(t1 - t2)
        warmer = geo1['name'] if t1 > t2 else geo2['name']
        
        # Build location strings
        loc1_str = f"{geo1['name']}, {geo1['country']}"
        loc2_str = f"{geo2['name']}, {geo2['country']}"
        
        return f"""📊 LIVE Weather Comparison

🏙️ {loc1_str}:
   {cond1}
   🌡️ Temperature: {t1}°C
   💧 Humidity: {h1}%

🏙️ {loc2_str}:
   {cond2}
   🌡️ Temperature: {t2}°C
   💧 Humidity: {h2}%

📈 Analysis:
   • {warmer} is {temp_diff:.1f}°C warmer
   • Humidity difference: {abs(h1 - h2)}%
   • Distance: ~{calculate_distance(geo1['lat'], geo1['lon'], geo2['lat'], geo2['lon']):.0f} km apart"""
        
    except Exception as e:
        return f"❌ Error comparing weather: {str(e)}"

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate approximate distance between two coordinates (Haversine formula)"""
    import math
    R = 6371  # Earth's radius in km
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c

@mcp.tool()
def get_forecast(location: str, days: int = 3) -> str:
    """Get weather forecast for the next few days
    
    Args:
        location: Any city, town, or place name
        days: Number of days to forecast (1-7)
    """
    try:
        days = min(max(1, days), 7)  # Clamp to 1-7
        
        geo = geocode_city(location)
        if not geo:
            return f"❌ Location '{location}' not found."
        
        url = f"https://api.open-meteo.com/v1/forecast?latitude={geo['lat']}&longitude={geo['lon']}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days={days}"
        response = open_url(url)
        data = json.loads(response.read())
        daily = data.get("daily", {})
        
        dates = daily.get("time", [])
        codes = daily.get("weather_code", [])
        max_temps = daily.get("temperature_2m_max", [])
        min_temps = daily.get("temperature_2m_min", [])
        precip = daily.get("precipitation_probability_max", [])
        
        loc_str = f"{geo['name']}, {geo['country']}"
        result = f"📅 {days}-Day Forecast for {loc_str}:\\n\\n"
        
        for i in range(len(dates)):
            cond = WEATHER_CODES.get(codes[i] if i < len(codes) else 0, "❓")
            high = max_temps[i] if i < len(max_temps) else "N/A"
            low = min_temps[i] if i < len(min_temps) else "N/A"
            rain = precip[i] if i < len(precip) else 0
            
            result += f"📆 {dates[i]}:\\n"
            result += f"   {cond}\\n"
            result += f"   🌡️ High: {high}°C | Low: {low}°C\\n"
            result += f"   🌧️ Rain chance: {rain}%\\n\\n"
        
        return result
        
    except Exception as e:
        return f"❌ Error fetching forecast: {str(e)}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'todo-sqlite',
    name: '📝 Todo List (SQLite)',
    description: 'Persistent todo list with SQLite database - demonstrates data storage',
    category: 'data',
    tags: ['data', 'database', 'sqlite', 'crud', 'persistence'],
    code: `from mcp.server.fastmcp import FastMCP
import sqlite3
import json
from datetime import datetime

mcp = FastMCP("SQLite Todo Server")

# ========================================
# DATABASE SETUP
# ========================================

# Create in-memory SQLite database
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Create todos table with full schema
cursor.execute("""
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium',
    category TEXT DEFAULT 'general',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
)
""")

# Create categories table
cursor.execute("""
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#6366f1'
)
""")

# Insert default categories
cursor.execute("INSERT OR IGNORE INTO categories (name, color) VALUES ('general', '#6366f1')")
cursor.execute("INSERT OR IGNORE INTO categories (name, color) VALUES ('work', '#f59e0b')")
cursor.execute("INSERT OR IGNORE INTO categories (name, color) VALUES ('personal', '#10b981')")
cursor.execute("INSERT OR IGNORE INTO categories (name, color) VALUES ('shopping', '#ec4899')")
conn.commit()

# ========================================
# RESOURCES - Database information
# ========================================

@mcp.resource(uri="db://schema", name="Database Schema")
def schema_resource() -> str:
    """View the database schema"""
    cursor.execute("SELECT sql FROM sqlite_master WHERE type='table'")
    schemas = cursor.fetchall()
    return "\\n\\n".join([s[0] for s in schemas if s[0]])

@mcp.resource(uri="db://stats", name="Database Stats")
def stats_resource() -> str:
    """Get database statistics"""
    cursor.execute("SELECT COUNT(*) FROM todos")
    total = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = TRUE")
    completed = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM categories")
    categories = cursor.fetchone()[0]
    
    cursor.execute("SELECT priority, COUNT(*) FROM todos GROUP BY priority")
    by_priority = dict(cursor.fetchall())
    
    return json.dumps({
        "total_todos": total,
        "completed": completed,
        "pending": total - completed,
        "completion_rate": f"{(completed/total*100):.1f}%" if total > 0 else "0%",
        "categories": categories,
        "by_priority": by_priority
    }, indent=2)

@mcp.resource(uri="db://categories", name="Categories")
def categories_resource() -> str:
    """List all available categories"""
    cursor.execute("SELECT name, color FROM categories")
    cats = cursor.fetchall()
    return json.dumps([{"name": c[0], "color": c[1]} for c in cats], indent=2)

# ========================================
# PROMPTS - Todo templates
# ========================================

@mcp.prompt(name="task_breakdown", description="Break down a complex task")
def task_breakdown_prompt(task: str) -> str:
    """Generate a prompt to break down a complex task
    
    Args:
        task: The complex task to break down
    """
    return f"""Break down this task into smaller, actionable sub-tasks:

Task: {task}

For each sub-task, suggest:
1. A clear, specific title
2. Priority (high/medium/low)
3. Estimated time
4. Dependencies on other tasks"""

# ========================================
# TOOLS - CRUD operations
# ========================================

@mcp.tool()
def add_todo(title: str, description: str = "", priority: str = "medium", category: str = "general") -> str:
    """Add a new todo item to the database
    
    Args:
        title: The todo title
        description: Optional detailed description
        priority: Priority level (high, medium, low)
        category: Category (general, work, personal, shopping)
    """
    if priority not in ["high", "medium", "low"]:
        priority = "medium"
    
    cursor.execute("""
        INSERT INTO todos (title, description, priority, category)
        VALUES (?, ?, ?, ?)
    """, (title, description, priority, category))
    conn.commit()
    
    todo_id = cursor.lastrowid
    
    priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    return f"""✅ Todo added successfully!

📝 #{todo_id}: {title}
{priority_emoji.get(priority, "🟡")} Priority: {priority}
📁 Category: {category}
📄 Description: {description or '(none)'}

💡 Use list_todos() to see all todos"""

@mcp.tool()
def list_todos(category: str = "", show_completed: bool = False) -> str:
    """List all todos from the database
    
    Args:
        category: Filter by category (optional)
        show_completed: Include completed todos (default: False)
    """
    query = "SELECT id, title, priority, category, completed, created_at FROM todos WHERE 1=1"
    params = []
    
    if not show_completed:
        query += " AND completed = FALSE"
    
    if category:
        query += " AND category = ?"
        params.append(category)
    
    query += " ORDER BY CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END, created_at DESC"
    
    cursor.execute(query, params)
    todos = cursor.fetchall()
    
    if not todos:
        return "📝 No todos found! Add one with add_todo('Your task')"
    
    priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    
    result = f"📝 Todo List ({len(todos)} items):\\n\\n"
    
    for todo in todos:
        id_, title, priority, cat, completed, created = todo
        status = "✓" if completed else "○"
        emoji = priority_emoji.get(priority, "🟡")
        result += f"  [{status}] #{id_} {emoji} {title}\\n"
        result += f"      📁 {cat} | Created: {created[:10]}\\n\\n"
    
    # Stats
    cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = FALSE")
    pending = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = TRUE")
    done = cursor.fetchone()[0]
    
    result += f"\\n📊 Stats: {pending} pending, {done} completed"
    return result

@mcp.tool()
def complete_todo(todo_id: int) -> str:
    """Mark a todo as complete
    
    Args:
        todo_id: The ID of the todo to complete
    """
    cursor.execute("SELECT title FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()
    
    if not todo:
        return f"❌ Todo #{todo_id} not found"
    
    cursor.execute("""
        UPDATE todos 
        SET completed = TRUE, completed_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    """, (todo_id,))
    conn.commit()
    
    return f"✅ Completed: #{todo_id} - {todo[0]}"

@mcp.tool()
def delete_todo(todo_id: int) -> str:
    """Delete a todo from the database
    
    Args:
        todo_id: The ID of the todo to delete
    """
    cursor.execute("SELECT title FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()
    
    if not todo:
        return f"❌ Todo #{todo_id} not found"
    
    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()
    
    return f"🗑️ Deleted: #{todo_id} - {todo[0]}"

@mcp.tool()
def update_priority(todo_id: int, priority: str) -> str:
    """Update the priority of a todo
    
    Args:
        todo_id: The ID of the todo to update
        priority: New priority (high, medium, low)
    """
    if priority not in ["high", "medium", "low"]:
        return "❌ Priority must be: high, medium, or low"
    
    cursor.execute("SELECT title FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()
    
    if not todo:
        return f"❌ Todo #{todo_id} not found"
    
    cursor.execute("UPDATE todos SET priority = ? WHERE id = ?", (priority, todo_id))
    conn.commit()
    
    priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    return f"{priority_emoji[priority]} Updated #{todo_id} priority to {priority}"

@mcp.tool()
def search_todos(query: str) -> str:
    """Search todos by title or description
    
    Args:
        query: Search query string
    """
    cursor.execute("""
        SELECT id, title, description, priority, category, completed 
        FROM todos 
        WHERE title LIKE ? OR description LIKE ?
    """, (f"%{query}%", f"%{query}%"))
    
    results = cursor.fetchall()
    
    if not results:
        return f"🔍 No todos found matching '{query}'"
    
    priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    
    output = f"🔍 Found {len(results)} todo(s) matching '{query}':\\n\\n"
    for r in results:
        id_, title, desc, priority, cat, completed = r
        status = "✓" if completed else "○"
        emoji = priority_emoji.get(priority, "🟡")
        output += f"  [{status}] #{id_} {emoji} {title}\\n"
        if desc:
            output += f"      📄 {desc[:50]}...\\n"
    
    return output

@mcp.tool()
def get_stats() -> str:
    """Get detailed statistics about your todos"""
    cursor.execute("SELECT COUNT(*) FROM todos")
    total = cursor.fetchone()[0]
    
    if total == 0:
        return "📊 No todos yet! Add some with add_todo()"
    
    cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = TRUE")
    completed = cursor.fetchone()[0]
    
    cursor.execute("""
        SELECT category, COUNT(*) as count 
        FROM todos 
        GROUP BY category 
        ORDER BY count DESC
    """)
    by_category = cursor.fetchall()
    
    cursor.execute("""
        SELECT priority, COUNT(*) as count 
        FROM todos 
        WHERE completed = FALSE
        GROUP BY priority
    """)
    by_priority = cursor.fetchall()
    
    result = f"""📊 Todo Statistics:

📈 Overview:
   • Total todos: {total}
   • Completed: {completed}
   • Pending: {total - completed}
   • Completion rate: {(completed/total*100):.1f}%

📁 By Category:"""
    
    for cat, count in by_category:
        result += f"\\n   • {cat}: {count}"
    
    result += "\\n\\n🎯 Pending by Priority:"
    priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
    for priority, count in by_priority:
        result += f"\\n   {priority_emoji.get(priority, '•')} {priority}: {count}"
    
    return result

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'github-api',
    name: '🐙 GitHub API',
    description: 'Fetch GitHub user and repository data - demonstrates REST API integration',
    category: 'api',
    tags: ['api', 'github', 'http', 'rest'],
    code: `from mcp.server.fastmcp import FastMCP
import json
from pyodide.http import open_url

mcp = FastMCP("GitHub API Server")

# ========================================
# RESOURCES - GitHub API Information
# ========================================

@mcp.resource(uri="github://api-info", name="API Info")
def api_info() -> str:
    """Information about GitHub API usage"""
    return """GitHub REST API Integration

🔗 Base URL: https://api.github.com
🔑 Authentication: Not required for public data
📊 Rate Limit: 60 requests/hour (unauthenticated)

Available endpoints:
• /users/{username} - User profile
• /users/{username}/repos - User repositories
• /repos/{owner}/{repo} - Repository details
• /repos/{owner}/{repo}/languages - Languages used"""

@mcp.resource(uri="github://popular-repos", name="Popular Repos")
def popular_repos() -> str:
    """List of popular repositories to explore"""
    return json.dumps([
        {"owner": "facebook", "repo": "react", "desc": "React JavaScript library"},
        {"owner": "vuejs", "repo": "vue", "desc": "Vue.js framework"},
        {"owner": "microsoft", "repo": "vscode", "desc": "Visual Studio Code"},
        {"owner": "torvalds", "repo": "linux", "desc": "Linux kernel"},
        {"owner": "openai", "repo": "whisper", "desc": "Speech recognition"},
    ], indent=2)

# ========================================
# PROMPTS - GitHub analysis templates
# ========================================

@mcp.prompt(name="repo_review", description="Review a GitHub repository")
def repo_review_prompt(owner: str, repo: str) -> str:
    """Generate a prompt to review a repository
    
    Args:
        owner: Repository owner
        repo: Repository name
    """
    return f"""Analyze the GitHub repository {owner}/{repo}:

1. What is the main purpose of this project?
2. What technologies/languages does it use?
3. How active is the development (based on stars, forks, recent updates)?
4. Would you recommend this project? Why or why not?"""

# ========================================
# TOOLS - GitHub API calls
# ========================================

@mcp.tool()
def get_user(username: str) -> str:
    """Get GitHub user profile information
    
    Args:
        username: GitHub username (e.g., 'torvalds', 'gaearon')
    """
    try:
        url = f"https://api.github.com/users/{username}"
        response = open_url(url)
        data = json.loads(response.read())
        
        if "message" in data:
            return f"❌ User not found: {username}"
        
        return f"""👤 GitHub User: @{data.get('login', username)}

📛 Name: {data.get('name', 'Not specified')}
📝 Bio: {data.get('bio', 'No bio')}
🏢 Company: {data.get('company', 'Not specified')}
📍 Location: {data.get('location', 'Not specified')}
🌐 Blog: {data.get('blog', 'None')}

📊 Statistics:
   • Public repos: {data.get('public_repos', 0)}
   • Public gists: {data.get('public_gists', 0)}
   • Followers: {data.get('followers', 0)}
   • Following: {data.get('following', 0)}

🔗 Profile: {data.get('html_url', f'https://github.com/{username}')}
📅 Joined: {data.get('created_at', 'Unknown')[:10]}"""
        
    except Exception as e:
        return f"❌ Error fetching user: {str(e)}"

@mcp.tool()
def get_repos(username: str, limit: int = 5) -> str:
    """List a user's public repositories
    
    Args:
        username: GitHub username
        limit: Maximum number of repos to show (default: 5)
    """
    try:
        url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page={limit}"
        response = open_url(url)
        repos = json.loads(response.read())
        
        if isinstance(repos, dict) and "message" in repos:
            return f"❌ User not found: {username}"
        
        if not repos:
            return f"📦 No public repositories found for @{username}"
        
        result = f"📦 Repositories for @{username} (showing {len(repos)}):\\n\\n"
        
        for repo in repos:
            stars = repo.get('stargazers_count', 0)
            forks = repo.get('forks_count', 0)
            lang = repo.get('language', 'Unknown')
            
            result += f"  📁 {repo['name']}\\n"
            result += f"     ⭐ {stars} | 🍴 {forks} | 💻 {lang}\\n"
            if repo.get('description'):
                desc = repo['description'][:60] + "..." if len(repo.get('description', '')) > 60 else repo.get('description', '')
                result += f"     📝 {desc}\\n"
            result += "\\n"
        
        return result
        
    except Exception as e:
        return f"❌ Error fetching repos: {str(e)}"

@mcp.tool()
def get_repo_details(owner: str, repo: str) -> str:
    """Get detailed information about a repository
    
    Args:
        owner: Repository owner (username or org)
        repo: Repository name
    """
    try:
        url = f"https://api.github.com/repos/{owner}/{repo}"
        response = open_url(url)
        data = json.loads(response.read())
        
        if "message" in data:
            return f"❌ Repository not found: {owner}/{repo}"
        
        # Format size
        size_kb = data.get('size', 0)
        size_str = f"{size_kb/1024:.1f} MB" if size_kb > 1024 else f"{size_kb} KB"
        
        return f"""📁 Repository: {data.get('full_name')}

📝 Description: {data.get('description', 'No description')}

📊 Statistics:
   ⭐ Stars: {data.get('stargazers_count', 0):,}
   🍴 Forks: {data.get('forks_count', 0):,}
   👀 Watchers: {data.get('subscribers_count', 0):,}
   ❗ Open Issues: {data.get('open_issues_count', 0):,}
   📦 Size: {size_str}

💻 Technical:
   • Language: {data.get('language', 'Unknown')}
   • Default branch: {data.get('default_branch', 'main')}
   • License: {data.get('license', {}).get('name', 'Not specified') if data.get('license') else 'Not specified'}

🔗 Links:
   • Repository: {data.get('html_url')}
   • Homepage: {data.get('homepage') or 'None'}

📅 Dates:
   • Created: {data.get('created_at', '')[:10]}
   • Updated: {data.get('updated_at', '')[:10]}
   • Pushed: {data.get('pushed_at', '')[:10]}"""
        
    except Exception as e:
        return f"❌ Error fetching repo: {str(e)}"

@mcp.tool()
def get_languages(owner: str, repo: str) -> str:
    """Get languages used in a repository
    
    Args:
        owner: Repository owner
        repo: Repository name
    """
    try:
        url = f"https://api.github.com/repos/{owner}/{repo}/languages"
        response = open_url(url)
        data = json.loads(response.read())
        
        if "message" in data:
            return f"❌ Repository not found: {owner}/{repo}"
        
        if not data:
            return f"📊 No language data available for {owner}/{repo}"
        
        total = sum(data.values())
        
        result = f"💻 Languages in {owner}/{repo}:\\n\\n"
        
        for lang, bytes_count in sorted(data.items(), key=lambda x: x[1], reverse=True):
            percentage = (bytes_count / total) * 100
            bar_length = int(percentage / 5)
            bar = "█" * bar_length + "░" * (20 - bar_length)
            result += f"  {lang:15} {bar} {percentage:5.1f}%\\n"
        
        return result
        
    except Exception as e:
        return f"❌ Error fetching languages: {str(e)}"

@mcp.tool()
def search_repos(query: str, limit: int = 5) -> str:
    """Search GitHub repositories
    
    Args:
        query: Search query (e.g., 'machine learning', 'react components')
        limit: Maximum results to return (default: 5)
    """
    from urllib.parse import quote
    
    try:
        encoded_query = quote(query)
        url = f"https://api.github.com/search/repositories?q={encoded_query}&sort=stars&per_page={limit}"
        response = open_url(url)
        data = json.loads(response.read())
        
        items = data.get('items', [])
        total = data.get('total_count', 0)
        
        if not items:
            return f"🔍 No repositories found for '{query}'"
        
        result = f"🔍 Search: '{query}' ({total:,} total results)\\n\\n"
        
        for repo in items:
            result += f"  📁 {repo['full_name']}\\n"
            result += f"     ⭐ {repo.get('stargazers_count', 0):,} | 💻 {repo.get('language', 'Unknown')}\\n"
            if repo.get('description'):
                desc = repo['description'][:70] + "..." if len(repo.get('description', '')) > 70 else repo['description']
                result += f"     📝 {desc}\\n"
            result += "\\n"
        
        return result
        
    except Exception as e:
        return f"❌ Error searching: {str(e)}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'data-analysis',
    name: '📊 Data Analysis',
    description: 'Statistical analysis and data processing tools',
    category: 'data',
    tags: ['data', 'statistics', 'analysis', 'math'],
    code: `from mcp.server.fastmcp import FastMCP
import json
import math

mcp = FastMCP("Data Analysis Server")

# ========================================
# RESOURCES - Sample datasets
# ========================================

SAMPLE_DATA = {
    "sales": [120, 150, 180, 210, 190, 220, 250, 280, 260, 300, 320, 350],
    "temperatures": [32, 35, 42, 55, 68, 78, 85, 82, 75, 58, 45, 35],
    "scores": [85, 92, 78, 95, 88, 76, 91, 83, 97, 80, 89, 94],
}

@mcp.resource(uri="data://samples", name="Sample Datasets")
def samples_resource() -> str:
    """Available sample datasets for analysis"""
    return json.dumps({
        "datasets": list(SAMPLE_DATA.keys()),
        "sales": "Monthly sales figures ($K)",
        "temperatures": "Monthly temperatures (°F)",
        "scores": "Student test scores"
    }, indent=2)

@mcp.resource(uri="data://formulas", name="Statistical Formulas")
def formulas_resource() -> str:
    """Statistical formulas reference"""
    return """Statistical Formulas Reference:

📊 Central Tendency:
   • Mean = Σx / n
   • Median = middle value (sorted)
   • Mode = most frequent value

📈 Dispersion:
   • Range = max - min
   • Variance = Σ(x - μ)² / n
   • Std Dev = √Variance
   
📉 Other:
   • Percentile: value below which P% of data falls
   • Z-score: (x - μ) / σ"""

# ========================================
# PROMPTS - Analysis templates
# ========================================

@mcp.prompt(name="interpret_stats", description="Interpret statistical results")
def interpret_stats_prompt(data_type: str, mean: float, std_dev: float) -> str:
    """Generate a prompt to interpret statistics
    
    Args:
        data_type: Type of data being analyzed
        mean: Calculated mean value
        std_dev: Calculated standard deviation
    """
    return f"""Interpret these statistics for {data_type} data:

Mean: {mean}
Standard Deviation: {std_dev}

Please explain:
1. What does this mean value tell us?
2. Is the standard deviation high or low for this type of data?
3. What insights can we draw from these numbers?
4. What additional analysis would be helpful?"""

# ========================================
# TOOLS - Statistical analysis
# ========================================

@mcp.tool()
def analyze(numbers: str) -> str:
    """Perform comprehensive statistical analysis on a dataset
    
    Args:
        numbers: Comma-separated numbers (e.g., "10, 20, 30, 40, 50")
    """
    try:
        data = [float(x.strip()) for x in numbers.split(",")]
    except ValueError:
        return "❌ Invalid input. Please provide comma-separated numbers."
    
    if len(data) < 2:
        return "❌ Need at least 2 numbers for analysis"
    
    n = len(data)
    total = sum(data)
    mean = total / n
    
    # Sort for median and percentiles
    sorted_data = sorted(data)
    
    # Median
    mid = n // 2
    median = sorted_data[mid] if n % 2 else (sorted_data[mid-1] + sorted_data[mid]) / 2
    
    # Mode (simplified - first mode if multiple)
    freq = {}
    for x in data:
        freq[x] = freq.get(x, 0) + 1
    mode = max(freq, key=freq.get)
    mode_count = freq[mode]
    
    # Variance and Std Dev
    variance = sum((x - mean) ** 2 for x in data) / n
    std_dev = math.sqrt(variance)
    
    # Range
    data_min, data_max = min(data), max(data)
    data_range = data_max - data_min
    
    # Quartiles
    q1_idx = int(n * 0.25)
    q3_idx = int(n * 0.75)
    q1 = sorted_data[q1_idx]
    q3 = sorted_data[q3_idx]
    iqr = q3 - q1
    
    return f"""📊 Statistical Analysis

📈 Central Tendency:
   • Mean: {mean:.2f}
   • Median: {median:.2f}
   • Mode: {mode} (appears {mode_count}x)

📉 Dispersion:
   • Range: {data_range:.2f}
   • Variance: {variance:.2f}
   • Std Deviation: {std_dev:.2f}
   • Coefficient of Variation: {(std_dev/mean*100):.1f}%

📊 Distribution:
   • Minimum: {data_min}
   • Q1 (25th percentile): {q1}
   • Median (50th): {median:.2f}
   • Q3 (75th percentile): {q3}
   • Maximum: {data_max}
   • IQR: {iqr}

📝 Sample:
   • Count: {n}
   • Sum: {total:.2f}"""

@mcp.tool()
def load_sample(dataset: str) -> str:
    """Load and analyze a sample dataset
    
    Args:
        dataset: Dataset name (sales, temperatures, scores)
    """
    if dataset.lower() not in SAMPLE_DATA:
        available = ", ".join(SAMPLE_DATA.keys())
        return f"❌ Dataset '{dataset}' not found. Available: {available}"
    
    data = SAMPLE_DATA[dataset.lower()]
    data_str = ", ".join(map(str, data))
    
    # Add context based on dataset
    context = {
        "sales": "Monthly Sales Data ($K) - Jan to Dec",
        "temperatures": "Monthly Temperatures (°F) - Jan to Dec",
        "scores": "Student Test Scores"
    }
    
    return f"""📂 Loaded Dataset: {context.get(dataset.lower(), dataset)}

Data: {data_str}

Use analyze("{data_str}") for full statistical analysis!"""

@mcp.tool()
def calculate_growth(numbers: str) -> str:
    """Calculate growth rates between consecutive values
    
    Args:
        numbers: Comma-separated numbers (e.g., "100, 110, 120")
    """
    try:
        data = [float(x.strip()) for x in numbers.split(",")]
    except ValueError:
        return "❌ Invalid input. Please provide comma-separated numbers."
    
    if len(data) < 2:
        return "❌ Need at least 2 numbers"
    
    growth_rates = []
    for i in range(1, len(data)):
        if data[i-1] != 0:
            rate = ((data[i] - data[i-1]) / data[i-1]) * 100
            growth_rates.append(rate)
    
    avg_growth = sum(growth_rates) / len(growth_rates) if growth_rates else 0
    total_growth = ((data[-1] - data[0]) / data[0]) * 100 if data[0] != 0 else 0
    
    result = "📈 Growth Analysis:\\n\\n"
    result += "Period-over-Period Growth:\\n"
    
    for i, rate in enumerate(growth_rates, 1):
        arrow = "📈" if rate > 0 else "📉" if rate < 0 else "➡️"
        result += f"  {i} → {i+1}: {arrow} {rate:+.1f}%\\n"
    
    result += f"""
📊 Summary:
   • Average growth: {avg_growth:+.1f}%
   • Total growth (first to last): {total_growth:+.1f}%
   • Starting value: {data[0]}
   • Ending value: {data[-1]}"""
    
    return result

@mcp.tool()
def find_outliers(numbers: str) -> str:
    """Identify outliers using the IQR method
    
    Args:
        numbers: Comma-separated numbers
    """
    try:
        data = [float(x.strip()) for x in numbers.split(",")]
    except ValueError:
        return "❌ Invalid input. Please provide comma-separated numbers."
    
    n = len(data)
    if n < 4:
        return "❌ Need at least 4 numbers for outlier detection"
    
    sorted_data = sorted(data)
    
    q1_idx = int(n * 0.25)
    q3_idx = int(n * 0.75)
    q1 = sorted_data[q1_idx]
    q3 = sorted_data[q3_idx]
    iqr = q3 - q1
    
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    
    outliers = [x for x in data if x < lower_bound or x > upper_bound]
    normal = [x for x in data if lower_bound <= x <= upper_bound]
    
    result = f"""🔍 Outlier Analysis (IQR Method)

📊 Quartiles:
   • Q1 (25th): {q1}
   • Q3 (75th): {q3}
   • IQR: {iqr}

📏 Bounds:
   • Lower: {lower_bound:.2f}
   • Upper: {upper_bound:.2f}

"""
    
    if outliers:
        result += f"⚠️ Outliers Found ({len(outliers)}): {', '.join(map(str, outliers))}\\n"
    else:
        result += "✅ No outliers detected\\n"
    
    result += f"\\n📈 Normal values: {len(normal)} / {len(data)}"
    
    return result

@mcp.tool()
def correlation(x_values: str, y_values: str) -> str:
    """Calculate Pearson correlation between two datasets
    
    Args:
        x_values: First dataset (comma-separated)
        y_values: Second dataset (comma-separated)
    """
    try:
        x = [float(v.strip()) for v in x_values.split(",")]
        y = [float(v.strip()) for v in y_values.split(",")]
    except ValueError:
        return "❌ Invalid input. Please provide comma-separated numbers."
    
    if len(x) != len(y):
        return f"❌ Datasets must have same length. X has {len(x)}, Y has {len(y)}"
    
    if len(x) < 3:
        return "❌ Need at least 3 data points"
    
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    
    # Pearson correlation
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denom_x = math.sqrt(sum((xi - mean_x) ** 2 for xi in x))
    denom_y = math.sqrt(sum((yi - mean_y) ** 2 for yi in y))
    
    if denom_x == 0 or denom_y == 0:
        return "❌ Cannot calculate correlation (no variance in data)"
    
    r = numerator / (denom_x * denom_y)
    r_squared = r ** 2
    
    # Interpretation
    if abs(r) >= 0.7:
        strength = "Strong"
    elif abs(r) >= 0.4:
        strength = "Moderate"
    else:
        strength = "Weak"
    
    direction = "positive" if r > 0 else "negative"
    
    return f"""📊 Correlation Analysis

Pearson Correlation (r): {r:.4f}
R-squared (r²): {r_squared:.4f}

📈 Interpretation:
   • {strength} {direction} correlation
   • {r_squared*100:.1f}% of variance in Y is explained by X

💡 Meaning:
   • r = 1: Perfect positive correlation
   • r = 0: No correlation
   • r = -1: Perfect negative correlation"""

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'calculator',
    name: '🔢 Calculator',
    description: 'Mathematical calculations and formulas',
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

@mcp.tool()
def percentage(value: float, total: float) -> str:
    """Calculate what percentage a value is of a total
    
    Args:
        value: The part value
        total: The total/whole value
    """
    if total == 0:
        return "❌ Error: Total cannot be zero"
    pct = (value / total) * 100
    return f"✅ {value} is {pct:.2f}% of {total}"

if __name__ == "__main__":
    mcp.run()
`,
  },
  {
    id: 'text-processor',
    name: '📝 Text Processor',
    description: 'Process and transform text strings',
    category: 'utility',
    tags: ['utility', 'text', 'string'],
    code: `from mcp.server.fastmcp import FastMCP
import json

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
def word_count(text: str) -> str:
    """Analyze text and count words, characters, sentences
    
    Args:
        text: The text to analyze
    """
    words = len(text.split())
    chars = len(text)
    chars_no_space = len(text.replace(" ", ""))
    sentences = text.count('.') + text.count('!') + text.count('?')
    paragraphs = len([p for p in text.split('\\n\\n') if p.strip()])
    
    return f"""📊 Text Analysis:

📝 Content:
   • Words: {words}
   • Characters (with spaces): {chars}
   • Characters (no spaces): {chars_no_space}
   • Sentences: {sentences}
   • Paragraphs: {paragraphs}

📈 Averages:
   • Avg word length: {chars_no_space/words:.1f} chars
   • Avg words/sentence: {words/sentences:.1f}""" if sentences > 0 else f"""📊 Text Analysis:

   • Words: {words}
   • Characters: {chars}
   • No sentences detected"""

@mcp.tool()
def reverse(text: str) -> str:
    """Reverse the text
    
    Args:
        text: The text to reverse
    """
    return f"📝 Result: {text[::-1]}"

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
]

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}

export function getTemplatesByCategory(category: Template['category']): Template[] {
  return templates.filter(t => t.category === category)
}
