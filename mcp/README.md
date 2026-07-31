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

## Fair-use allowances

Expressed **per minute**, not per day, because agent traffic is bursty: a daily quota either cuts a live conversation short or does nothing about a client stuck in a retry loop.

These are allowances to design against, **not hard caps**. Tool-call metering is deliberately loose and will usually let a burst through; sustained excess may be blocked at the network edge without warning.

| Plan | Tool calls / minute | Counted per |
| --- | --- | --- |
| Free (no key) | 20 | IP address |
| Pro | 240 | API key |
| Startup | 2,400 | API key |
| Enterprise | unmetered | API key |

Connecting, listing tools and pinging are counted separately at 120/min per anonymous IP, so reconnecting never spends your tool-call budget.

Exceeding an allowance returns a normal MCP tool result flagged `isError` — not a transport error — carrying `Retry-After` and an explanation of how to raise the ceiling, so the assistant can tell you what happened.

### Do not poll the discovery endpoint

`GET https://modelpricewatch.com/mcp` returns the discovery document. It changes only when the site is deployed, so fetch it once per session and cache it — sustained polling may be throttled at the edge. It returns an `ETag` and `Cache-Control: max-age=300`; a conditional request with `If-None-Match` gets a `304`. If you need a liveness check, every few minutes is ample — a short timer buys you nothing extra.

Normal tool use is `POST` and is unaffected by that limit.

To raise the ceiling, send your key as `X-API-Key` or `Authorization: Bearer` (set it in the `env` block of your MCP client config). Keys are issued by request: [modelpricewatch.com/contact](https://modelpricewatch.com/contact/?subject=MCP%20Access). Plans: [modelpricewatch.com/api-pricing](https://modelpricewatch.com/api-pricing/).

The pricing data itself is free and stays free — a paid tier buys throughput, a commercial license and an SLA, not access to the numbers. If you are being rate limited on bulk reads, the REST API serves the same dataset with no key at all.

## License

MIT (the bridge). Pricing data: free with attribution — [modelpricewatch.com](https://modelpricewatch.com).
