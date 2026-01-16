# Frequently Asked Questions (FAQ)

## General Questions

### What is MCP Playground?

MCP Playground is a browser-based development environment for building and testing Model Context Protocol (MCP) servers. It's like StackBlitz or CodeSandbox, but specifically designed for MCP development.

### Why did you build this?

Setting up a local Python environment, installing dependencies, and configuring MCP servers is tedious. This removes all that friction - you can start building MCP servers in seconds, not minutes or hours.

### Is it free?

Yes! The entire MVP is completely free and open source. No credit card, no sign-up required.

### Do I need to install anything?

Nope! Everything runs in your browser. No Python, no dependencies, no configuration files.

---

## Technical Questions

### How does Python run in the browser?

We use [Pyodide](https://pyodide.org), which is Python compiled to WebAssembly. It runs entirely in your browser with no server required.

### Does it support the full MCP SDK?

Currently, we're using a simplified mock implementation for the MVP. Full MCP SDK integration is coming in the next update.

### What Python version does it use?

Pyodide currently uses Python 3.11.

### Can I install packages?

Not yet in the MVP, but this is planned! Pyodide supports `micropip` for installing pure Python packages.

### Does my code leave my browser?

No! Everything runs client-side. Your code never touches our servers (because we don't have any servers yet!).

### What browsers are supported?

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (basic support)

---

## Feature Questions

### Can I save my projects?

Not yet! Currently, everything is stored in your browser's local storage. User accounts and cloud saving are coming soon.

### Can I share my MCP servers?

The UI is ready, but the backend isn't implemented yet. This is a high-priority feature for the next release.

### Can I collaborate with others?

Not yet, but real-time collaboration is on the roadmap!

### Can I use this with Claude Desktop?

Yes! Download your server code and follow Claude Desktop's instructions to add it as an MCP server.

### Can I deploy my server to production?

Absolutely! Download the code and deploy it anywhere that supports Python (Railway, Render, Fly.io, etc.).

---

## Usage Questions

### How do I get started?

1. Select a template from the dropdown
2. Click "Run Server" (or press ⌘+Enter)
3. Go to the Chat tab
4. Test your tools!

### How do I test my MCP server?

Use the Chat tab to simulate AI interactions. Type messages like "Greet John" or "What's the weather in London?" and see your tools in action.

### How do I see what tools are available?

Check the "Tools" tab to see all available tools, their descriptions, and parameter schemas.

### How do I debug errors?

Look at the "Console" tab for logs, errors, and debugging information.

### How do I download my code?

Click the "Download" button or press ⌘+S (Ctrl+S on Windows).

### Can I edit the code?

Yes! The Monaco editor (same as VS Code) supports full editing, including syntax highlighting, auto-completion, and more.

---

## Template Questions

### What templates are available?

Currently:
- **Hello World** - Simple greeting tool
- **Weather API** - Mock weather data
- **Calculator** - Math operations
- **Text Processor** - String manipulation
- **Todo List** - In-memory CRUD

### Can I add my own templates?

Yes! Check `utils/templates.ts` in the source code. Pull requests welcome!

### Can I request a template?

Absolutely! Open a GitHub issue or reach out on Twitter/Discord.

### How do I reset to the original template?

Click the reset button (↻) next to the template selector.

---

## Troubleshooting

### The editor isn't loading

Try:
1. Refresh the page
2. Clear your browser cache
3. Try a different browser
4. Check the browser console for errors

### My code isn't running

Check:
1. Is there a syntax error? (Check Console tab)
2. Did you click "Run Server"?
3. Is your browser supported?

### The chat isn't responding

Make sure:
1. The server is running (green indicator)
2. You're using the correct tool names
3. Your tools are properly defined

### I found a bug!

Great! Please:
1. Open a GitHub issue
2. Include steps to reproduce
3. Share your browser/OS info

---

## Comparison Questions

### How is this different from local development?

**MCP Playground:**
- ✅ No setup required
- ✅ Works anywhere
- ✅ Easy to share
- ❌ Limited to browser capabilities
- ❌ No file system access (yet)

**Local Development:**
- ✅ Full Python capabilities
- ✅ File system access
- ✅ Any package
- ❌ Setup required
- ❌ Harder to share

### How is this different from Replit?

Replit is a general-purpose coding environment. MCP Playground is specifically designed for MCP development with:
- Pre-configured MCP templates
- Built-in testing interface
- MCP-specific documentation
- Optimized workflow for MCP

### How is this different from fastmcp?

fastmcp is a framework for building MCP servers locally. MCP Playground is a cloud-based environment for building AND testing MCP servers without any local setup.

They're complementary - you can prototype in MCP Playground, then use fastmcp for production.

---

## Business Questions

### How will you make money?

The free tier will always exist! Potential premium features:
- Private projects
- More AI testing credits
- Team collaboration
- Custom domains
- Priority support

But we're focused on building a great product first.

### Can I use this commercially?

Yes! The code you write is yours. Do whatever you want with it.

### Is the project open source?

Yes! MIT licensed. Contributions welcome.

### Can I self-host this?

Yes! Clone the repo and deploy it yourself. Instructions in DEPLOYMENT.md.

---

## Contributing Questions

### How can I contribute?

- Report bugs
- Request features
- Submit pull requests
- Share with others
- Write tutorials
- Improve documentation

### What tech stack do you use?

- Nuxt 4 (Vue 3)
- Nuxt UI (TailwindCSS)
- Monaco Editor
- Pyodide
- TypeScript

### Where's the code?

[GitHub link will go here]

### How do I run it locally?

```bash
git clone [repo-url]
cd mcp-man
npm install
npm run dev
```

---

## Roadmap Questions

### What features are coming next?

Top priorities:
1. Full Pyodide + MCP SDK integration
2. Share functionality
3. Community gallery
4. Mobile optimization
5. More templates

See FEATURES.md for the complete roadmap.

### When will [feature] be ready?

Check FEATURES.md for the roadmap. We're prioritizing based on user feedback!

### Can I vote on features?

Yes! GitHub issues will have upvoting. Most requested features get prioritized.

---

## Community Questions

### Is there a Discord/Slack?

Not yet! For now, join the official MCP Discord and find us there.

### How do I stay updated?

- Follow on Twitter/X
- Star the GitHub repo
- Join MCP communities

### Can I showcase my MCP server?

Yes! We'll have a weekly showcase. Tag us on Twitter or submit via GitHub.

### How do I get help?

1. Check this FAQ
2. Read the documentation
3. Ask in MCP Discord
4. Open a GitHub issue

---

## Privacy & Security

### Do you collect my data?

We use basic analytics (page views, etc.) but don't collect your code or personal information.

### Is my code private?

Yes! Everything runs in your browser. We never see your code.

### Can others see my code?

Not unless you share it! (And sharing isn't implemented yet anyway.)

### Is it safe to use API keys?

For now, don't put real API keys in the playground. We'll add secure environment variable support soon.

---

## Performance Questions

### Why is it slow to load?

First load downloads Pyodide (~30MB). After that, it's cached and much faster.

### Can I use this offline?

Not yet, but service worker support is planned!

### Does it work on slow connections?

The initial load requires a decent connection. After that, everything is local.

---

## Educational Questions

### Is this good for learning MCP?

Yes! That's one of the main use cases. Try templates, modify them, see what happens.

### Can I use this for teaching?

Absolutely! It's perfect for workshops, tutorials, and courses.

### Are there tutorials?

Check the Docs tab in the playground. More tutorials coming soon!

### Can students use this?

Yes! No sign-up required, completely free.

---

## Miscellaneous

### Who built this?

Built with ❤️ for the MCP community. Check the GitHub repo for contributors.

### How long did it take to build?

The MVP was built in a few hours with AI assistance (Claude + Cursor).

### What's the tech behind the AI chat?

Currently, it's a simple pattern-matching simulation. Real AI integration coming soon!

### Can I embed this in my website?

Not yet, but embed functionality is planned!

### What's the long-term vision?

To become the go-to platform for MCP development, learning, and sharing. Think of it as the "CodePen for MCP."

---

## Still Have Questions?

- 📧 Email: [your-email]
- 🐦 Twitter: [your-twitter]
- 💬 Discord: Join MCP Discord
- 🐙 GitHub: [your-repo]

---

**Last Updated**: December 2024

This FAQ will be updated as the project evolves!

