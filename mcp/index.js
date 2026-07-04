#!/usr/bin/env node
/*
 * @modelpricewatch/mcp — stdio bridge to the Model Price Watch MCP server.
 *
 * The real server is remote and stateless (https://modelpricewatch.com/mcp,
 * streamable-http): this package exists only so stdio-only MCP clients — and
 * anyone who reaches for `npx` — can use it. Zero dependencies by design:
 * there is no data baked in, so the package never goes stale and never needs
 * releases when prices change (the maintenance-free property is the point).
 *
 * Clients with native HTTP transport support don't need this bridge at all:
 *   claude mcp add --transport http modelpricewatch https://modelpricewatch.com/mcp
 */

"use strict";

const ENDPOINT = process.env.MPW_MCP_ENDPOINT || "https://modelpricewatch.com/mcp";

async function forward(message) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(message),
  });
  const text = await res.text();
  if (!text) return null; // notifications / 202-accepted
  return JSON.parse(text);
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
  try {
    const reply = await forward(msg);
    // Notifications (no id) expect no response; requests always get one.
    if (hasId) {
      if (reply) write(reply);
      else write({ jsonrpc: "2.0", id: msg.id, result: {} });
    }
  } catch (e) {
    if (hasId) {
      write({
        jsonrpc: "2.0",
        id: msg.id,
        error: { code: -32000, message: `modelpricewatch.com unreachable: ${e.message}` },
      });
    }
  }
}
