# LLM Prices — daily-verified LLM API pricing data

[![Cheapest model](https://modelpricewatch.com/badge/cheapest.svg)](https://modelpricewatch.com/)
[![Models tracked](https://modelpricewatch.com/badge/models.svg)](https://modelpricewatch.com/)
[![Glama MCP server](https://glama.ai/mcp/servers/romanshumy/llm-prices-data/badge)](https://glama.ai/mcp/servers/romanshumy/llm-prices-data)

Machine-readable LLM API pricing for **176 current models** across
**27 providers** (OpenAI, Anthropic, Google, Mistral, xAI, DeepSeek,
Meta, Groq, Together, …), maintained by [modelpricewatch.com](https://modelpricewatch.com).
Every price links to the provider's **official pricing page**; prices are
cross-checked daily against an independent reference and top models are
re-read weekly from the provider pages with dated receipts.

*Last sync: 2026-07-22. This repo is updated automatically after each refresh cycle.*

## Files

| File | What it is |
|---|---|
| [`models.json`](models.json) | Every tracked model: input/output/cached $ per 1M tokens, context window, modality, category, status, source URL |
| [`providers.json`](providers.json) | Provider metadata + official pricing-page URLs |
| [`price-history.json`](price-history.json) / [`price-history.csv`](price-history.csv) | Per-model price timeline (4437 dated points; see caveats) |
| [`llm-price-index.csv`](llm-price-index.csv) | **The LLM Price Index** — one number for the blended cost of frontier intelligence, daily series |
| [`CHANGELOG.md`](CHANGELOG.md) | Human-readable launches & price changes |
| [`mcp/`](mcp/) | MCP server: query these prices live from Claude/Cursor — `npx -y @modelpricewatch/mcp` or HTTP `https://modelpricewatch.com/mcp` |

## Live API (no key required)

The same data, always current, CORS-open:

```
https://modelpricewatch.com/api/v1/models.json
https://modelpricewatch.com/api/v1/price-history.json
```

Docs: https://modelpricewatch.com/api/ · Price-change feed (Atom): https://modelpricewatch.com/news/feed.xml

## The LLM Price Index

A fixed, equal-weighted basket of frontier flagship models, blended 3:1
input:output, re-verified daily — a single citeable number for "what does a
million tokens of frontier intelligence cost?"
Methodology: https://modelpricewatch.com/price-index/methodology/

## Caveats (honesty first)

- History points are labelled by `source`: our own `verified`/snapshot captures
  vs `litellm-archive` (reconstructed from the open-source LiteLLM repo's git
  history — marked, never mixed silently).
- A deeper 2024→2026 history backfill is in progress; some models currently
  have short timelines. Known baseline discontinuities are under audit.

## License & attribution

Data: **CC-BY-4.0** — free for any use, with attribution to
[modelpricewatch.com](https://modelpricewatch.com). MCP bridge code: MIT.
