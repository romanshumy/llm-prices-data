# @modelpricewatch/mcp

MCP server for **live LLM API pricing** — current input/output token prices, side-by-side comparisons, and cheapest-model lookups for **150+ models across 20+ providers** (OpenAI, Anthropic, Google, Mistral, xAI, DeepSeek, …), re-verified against official provider pricing pages by [modelpricewatch.com](https://modelpricewatch.com).

Unlike MCP servers that bake a pricing snapshot into each release, this one is a thin bridge to a **live API** — prices are never stale between package releases, and every price links back to the provider's official pricing page.

## Tools

| Tool | What it answers |
|---|---|
| `search_models` | "How much does *model* cost?" / "What models does *provider* offer?" |
| `get_model_pricing` | Full pricing + capabilities for one model (input/output/cached $/1M tokens, context, modality) |
| `compare_models` | 2–5 models side by side, with a cheapest-verdict |
| `cheapest_models` | Cheapest models ranked by input/output/blended cost, filterable by category / open-source |
| `list_providers` | All tracked providers with model counts |

## Setup

**Claude Code** (HTTP transport — no install needed):

```bash
claude mcp add --transport http modelpricewatch https://modelpricewatch.com/mcp
```

**Claude Desktop / stdio-only clients** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "modelpricewatch": {
      "command": "npx",
      "args": ["-y", "@modelpricewatch/mcp"]
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "modelpricewatch": { "url": "https://modelpricewatch.com/mcp" }
  }
}
```

## How it works

This package is a zero-dependency stdio↔HTTPS bridge to `https://modelpricewatch.com/mcp` (streamable-http, stateless). No API key required. Data is CC-BY: cite modelpricewatch.com. The underlying JSON API is also free and CORS-open — see [modelpricewatch.com/api](https://modelpricewatch.com/api/).

## License

MIT (the bridge). Pricing data: free with attribution — [modelpricewatch.com](https://modelpricewatch.com).
