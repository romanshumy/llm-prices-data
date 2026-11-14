#!/usr/bin/env node
/*
 * @modelpricewatch/mcp — stdio bridge to the Model Price Watch MCP server.
 *
 * The real server is remote and stateless (https://modelpricewatch.com/mcp,
 * streamable-http): this package exists only so stdio-only MCP clients — and
 * anyone who reaches for `npx` — can use it. Zero dependencies by design:
 * there is no data baked in, so the package never goes stale when prices
 * change. It is released only when the bridge itself or its npm page changes
 * (.github/workflows/mcp-publish.yml publishes on a version bump).
 *
 * Clients with native HTTP transport support don't need this bridge at all:
 *   claude mcp add --transport http modelpricewatch https://modelpricewatch.com/mcp
 *
 * Env:
 *   MPW_API_KEY       paid-tier key, sent as X-API-Key (unset = free tier)
 *   MPW_MCP_ENDPOINT  override the remote endpoint (testing)
 */

"use strict";

const ENDPOINT = process.env.MPW_MCP_ENDPOINT || "https://modelpricewatch.com/mcp";
const API_KEY = (process.env.MPW_API_KEY || "").trim();

// Returns { status, retryAfter, reply } — reply is the parsed JSON-RPC body,
// null for an empty body (notifications / 202), or undefined if the body was
// not JSON-RPC (an edge 429/5xx HTML page).
async function forward(message) {
  const headers = {
    "Content-Type": "application/json",
    // Streamable-http requires POST clients to accept both; the server answers JSON.
    "Accept": "application/json, text/event-stream",
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;
  const res = await fetch(ENDPOINT, { method: "POST", headers, body: JSON.stringify(message) });
  const text = await res.text();
  const out = { status: res.status, retryAfter: res.headers.get("Retry-After"), reply: undefined };
  if (!text) { out.reply = null; return out; }
  const ctype = res.headers.get("Content-Type") || "";
  // An SSE-framed reply carries the JSON-RPC message in its last `data:` line.
  const body = ctype.includes("text/event-stream")
    ? text.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).pop() || ""
    : text;
  try { out.reply = JSON.parse(body); } catch { /* not JSON — reported by status below */ }
  return out;
}

function write(message) {
  process.stdout.write(JSON.stringify(message) + "\n");
}

let buffer = "";
let pending = 0;
let stdinClosed = false;

function maybeExit() {
  if (stdinClosed && pending === 0) process.exit(0);
}

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    pending++;
    handleLine(line).finally(() => { pending--; maybeExit(); });
  }
});
// Drain in-flight requests before exiting — exiting on 'end' immediately
// would drop responses for anything still awaiting the remote.
process.stdin.on("end", () => { stdinClosed = true; maybeExit(); });

async function handleLine(line) {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    // Not valid JSON-RPC — nothing sane to reply to (no id); drop it.
    return;
  }
  const hasId = msg && Object.prototype.hasOwnProperty.call(msg, "id") && msg.id !== null;
  let res;
  try {
    res = await forward(msg);
  } catch (e) {
    if (hasId) error(msg.id, `modelpricewatch.com unreachable: ${e.message}`);
    return;
  }
  // Notifications (no id) expect no response; requests always get one.
  if (!hasId) return;
  const { reply, status, retryAfter } = res;
  if (reply && typeof reply === "object" && !Array.isArray(reply)) {
    // Errors raised before the server reads the request (e.g. a rejected API
    // key) carry id:null; a client only matches replies by id, so it would wait
    // forever. The bridge handles one request per POST, so the id is known.
    if (reply.id === null || reply.id === undefined) reply.id = msg.id;
    write(reply);
  } else if (reply === null && status < 400) {
    write({ jsonrpc: "2.0", id: msg.id, result: {} });
  } else {
    error(msg.id, `modelpricewatch.com returned HTTP ${status}` +
      (retryAfter ? ` (Retry-After: ${retryAfter})` : "") +
      (status === 429 ? " — rate limited; see https://modelpricewatch.com/api-pricing/" : ""));
  }
}

function error(id, message) {
  write({ jsonrpc: "2.0", id, error: { code: -32000, message } });
}
