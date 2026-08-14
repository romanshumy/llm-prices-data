# Changelog — model launches & price changes

Newest first. Generated from the tracker's change detection; every price
links back to the provider's official pricing page on the site.

A **data correction** is our own published figure being fixed — the provider
did not re-price. It is listed here for the record, not as a market move.


## 2026-08-14

- **Granite 4 H Small** data correction — input $0.06 → $0.0636, output $0.25 → $0.265 per 1M tokens
  - Published $0.06/$0.25 was never IBM's printed price: it traces to a 2025-10-20 litellm-archive backfill (confidence: reconstructed) and was never read off IBM. IBM's watsonx.ai rate card — this row's own pricing_url, and its own committed 2026-08-09 receipt — prints granite-4h-small at USD 0.0636 per 1M tokens input / USD 0.265 output, and printed the same on us-en on 2026-08-14. The 6% gap is IBM's own uniform uplift over round base rates, applied across the whole table (granite-8b-code-instruct USD 0.636, granite-guardian-3-8b USD 0.212, llama-3-3-70b USD 0.7526, mistral-small-3-1 USD 0.106/0.318) — not tax (the footnote excludes taxes and duties) and not country variance (us-en is identical). The sibling row ibm-granite-embedding-278m already publishes the uplifted USD 0.106 off this same table. IBM did not re-price: this is our number being corrected to the rate card, not a market move.
- **DeepSeek V4 Pro** (DeepInfra) launched — $1.3 in / $2.6 out per 1M tokens
- **Granite 4 H Large** removed/retired
- **Granite 4 H Medium** removed/retired

## 2026-08-13

- **Gemini 3.6 Flash** price change — input $1.50 → $0.75, output $7.50 → $3.75 per 1M tokens
- **Gemini 3.7 Flash** (Google) launched — $0.75 in / $3.75 out per 1M tokens

## 2026-08-12

- **Grok 4.6** (xAI) launched — $2.0 in / $6.0 out per 1M tokens

## 2026-08-11

- **Sakana Namazu** (Sakana AI) launched — $0.95 in / $4.0 out per 1M tokens
- **Solar Pro 4** (Upstage) launched — $0.03 in / $0.12 out per 1M tokens

## 2026-08-10

- **LFM2.5 8B A1B** (Together) launched — $0.03 in / $0.12 out per 1M tokens
- **KAT-Coder-Pro V2.5** (Kwaipilot) launched — $0.741 in / $2.964 out per 1M tokens
- **KAT-Coder-Air V2.5** (Kwaipilot) launched — $0.148 in / $0.593 out per 1M tokens

## 2026-08-08

- **Llama Nemotron Ultra 253B** removed/retired

## 2026-08-07

- **Qwen3.6-Plus** (Alibaba) launched — $0.5 in / $3.0 out per 1M tokens
- **Qwen3.6-27B** (Alibaba) launched — $0.6 in / $3.6 out per 1M tokens
- **Qwen3.5-397B-A17B** (Alibaba) launched — $0.6 in / $3.6 out per 1M tokens
- **Qwen3-32B** (Alibaba) launched — $0.16 in / $0.64 out per 1M tokens
- **Fugu Ultra** (Sakana AI) launched — $5.0 in / $30.0 out per 1M tokens
- **Solar Pro 3** (Upstage) launched — $0.15 in / $0.6 out per 1M tokens
- **Relace Search** (Relace) launched — $1.0 in / $3.0 out per 1M tokens
- **Relace Apply 3** (Relace) launched — $0.8 in / $1.2 out per 1M tokens
- **Nemotron 3 Ultra** removed/retired

## 2026-08-06

- **Qwen3.6-Flash** (Alibaba) launched — $0.25 in / $1.5 out per 1M tokens
- **Qwen3.7-Flash** (Alibaba) launched — $0.03 in / $0.13 out per 1M tokens
- **Qwen3.7-Plus** (Alibaba) launched — $0.4 in / $1.6 out per 1M tokens
- **Muse Spark 1.2** (Meta) launched — $1.25 in / $4.25 out per 1M tokens

## 2026-08-03

- **Qwen3.8-Max** (Alibaba) launched — $2.0 in / $6.0 out per 1M tokens

## 2026-08-01

- **GPT-5.6 Terra** price change — input $2.50 → $2.00, output $15.00 → $12.00, cached input $0.25 → $0.20 per 1M tokens
- **GPT-5.6 Luna** price change — input $1.00 → $0.20, output $6.00 → $1.20, cached input $0.10 → $0.02 per 1M tokens
- **Gemini 3 Pro Image** (Google) launched — $2.0 in / $120.0 out per 1M tokens
- **Gemini 3.1 Flash Image** (Google) launched — $0.5 in / $60.0 out per 1M tokens
- **Gemini 3.1 Flash Lite Image** (Google) launched — $0.25 in / $30.0 out per 1M tokens
- **Inkling** (Thinking Machines) launched — $1.0 in / $4.05 out per 1M tokens
- **Inkling Small** (Thinking Machines) launched — $0.3 in / $1.2 out per 1M tokens
- **Muse Spark 1.1** (Meta) launched — $1.25 in / $4.25 out per 1M tokens

## 2026-07-29

- **Grok 4.20** data correction — input $2.00 → $1.25, output $6.00 → $2.50 per 1M tokens
  - Published $2.00/$6.00 was grok-4.5's price, not grok-4.20's. xAI's official per-model table (docs.x.ai/docs/pricing, receipt sha 8cea267d7b) lists Grok 4.20 at $1.25 in / $2.50 out (cached $0.20); grok-4.5 is the $2.00/$6.00 SKU. Our prior receipt anchored on developers/models, which renders only grok-4.5's hero price, so a sibling model's number was published on this row. Data correction, not a market move: xAI did not cut Grok 4.20's price on 2026-07-28. Supersedes the wrong baseline+carry-forward span. Corroborated by the docs/models embedded JSON (grok-4.20 12500/25000 per-token = $1.25/$2.50) and OpenRouter x-ai/grok-4.20 ($1.25/$2.50).

## 2026-07-28

- **Qwen-Flash** data correction — input $0.115 → $0.05, output $0.46 → $0.40 per 1M tokens
  - Published $0.115/$0.46 matched no qwen-flash price in any Alibaba region or tier. Alibaba Model Studio lists qwen-flash International (Singapore) at $0.05 in / $0.40 out for the 0<Token≤256K tier (256K–1M tier bills $0.25/$2.00). Data correction, not a market move: Alibaba did not cut this price on 2026-07-28. Supersedes the wrong baseline+carry-forward span. Root cause: all 6 Alibaba rows cited /model-studio/models, a page carrying no prices, so the row could never be re-verified.
- **Llama 4 Maverick** data correction — input $0.15 → $0.20, output $0.60 → $0.80 per 1M tokens
  - Published $0.15/$0.60 was never first-party-substantiated: DeepInfra serves this SKU as 'Llama-4-Maverick-17B-128E' at $0.20/$0.80 (first-party, data/evidence/deepinfra-llama-4-maverick/2026-07-27.txt line 103). The 07-15 and 07-20 'verified' points carried a source capture that never contained the model row, so the $0.15/$0.60 rotted uncaught. Data correction, not a market move: DeepInfra did not raise this price on 2026-07-28. Supersedes the wrong baseline and carried-forward span.

## 2026-07-25

- **Qwen3.7-Max** (Alibaba) launched — $2.5 in / $7.5 out per 1M tokens
- **Claude Opus 5** (Anthropic) launched — $5.0 in / $25.0 out per 1M tokens

## 2026-07-21

- **Gemini 3.6 Flash** (Google) launched — $1.5 in / $7.5 out per 1M tokens
- **Gemini 3.5 Flash-Lite** (Google) launched — $0.3 in / $2.5 out per 1M tokens

## 2026-07-19

- **GLM-5.2** price change — cached input $0.26 → $0.14 per 1M tokens

## 2026-07-16

- **Kimi K3** (Moonshot) launched — $3.0 in / $15.0 out per 1M tokens

## 2026-07-10

- **DeepSeek V4 Flash** (DeepInfra) launched — $0.09 in / $0.18 out per 1M tokens
- **Qwen3-32B** (DeepInfra) launched — $0.08 in / $0.28 out per 1M tokens
- **Llama 4 Scout** (DeepInfra) launched — $0.1 in / $0.3 out per 1M tokens
- **Llama 4 Maverick** (DeepInfra) launched — $0.15 in / $0.6 out per 1M tokens

## 2026-07-09

- **GPT-5.6 Sol** (OpenAI) launched — $5.0 in / $30.0 out per 1M tokens
- **GPT-5.6 Terra** (OpenAI) launched — $2.5 in / $15.0 out per 1M tokens
- **GPT-5.6 Luna** (OpenAI) launched — $1.0 in / $6.0 out per 1M tokens

## 2026-07-08

- **Grok 4.5** (xAI) launched — $2.0 in / $6.0 out per 1M tokens
- **GPT-5.2** (OpenAI) launched — $1.75 in / $14.0 out per 1M tokens
- **GPT-5.2 Pro** (OpenAI) launched — $21.0 in / $168.0 out per 1M tokens
- **GPT-5.2 Codex** (OpenAI) launched — $1.75 in / $14.0 out per 1M tokens
- **GPT-5.2 Chat** (OpenAI) launched — $1.75 in / $14.0 out per 1M tokens
- **Gemini 3 Flash Preview** (Google) launched — $0.5 in / $3.0 out per 1M tokens
- **Hunyuan Hy3** (Tencent) launched — $0.147 in / $0.588 out per 1M tokens

## 2026-07-06

- **LongCat-2.0** (Meituan) launched — $0.75 in / $2.95 out per 1M tokens

## 2026-07-05

- **Mistral Small 3.2 24B** price change — input $0.08 → $0.10, output $0.20 → $0.30 per 1M tokens
- **Mixtral 8x7B Instruct** price change — input $0.54 → $0.70, output $0.54 → $0.70 per 1M tokens

## 2026-07-04

- **Gemini 2.5 Flash** price change — input $0.075 → $0.30, output $0.30 → $2.50 per 1M tokens
- **Gemini 3.1 Pro** price change — cached input newly tracked at $0.20 per 1M tokens
- **GPT-OSS 120B** price change — output $1.00 → $0.60 per 1M tokens
- **GPT-OSS 20B** price change — output $1.00 → $0.30 per 1M tokens
- **Llama 3.1 8B Instant** price change — output $1.00 → $0.08 per 1M tokens
- **Llama 3.3 70B Versatile** price change — output $1.00 → $0.79 per 1M tokens
- **Llama 4 Scout** price change — output $1.00 → $0.34 per 1M tokens
- **Qwen3.6-27B** price change — output $1.00 → $3.00 per 1M tokens
- **Qwen3-32B** price change — output $1.00 → $0.59 per 1M tokens
- **GPT-4.1 mini** price change — cached input $0.20 → $0.10 per 1M tokens
- **GPT-4.1 nano** price change — cached input $0.05 → $0.025 per 1M tokens
- **o4-mini** price change — cached input $0.55 → $0.275 per 1M tokens

## 2026-07-03

- **GPT-5.5 Pro** (OpenAI) launched — $30.0 in / $180.0 out per 1M tokens
- **GPT-5.4 Pro** (OpenAI) launched — $30.0 in / $180.0 out per 1M tokens
- **GPT-5.4 nano** (OpenAI) launched — $0.2 in / $1.25 out per 1M tokens
- **GPT-5.3 Chat** (OpenAI) launched — $1.75 in / $14.0 out per 1M tokens
- **GPT-5.3 Codex** (OpenAI) launched — $1.75 in / $14.0 out per 1M tokens

## 2026-06-30

- **Claude Sonnet 5** (Anthropic) launched — $2.0 in / $10.0 out per 1M tokens
