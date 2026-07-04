# Glama MCP server check: start the stdio bridge (@modelpricewatch/mcp).
# The bridge is a zero-dependency proxy to the live streamable-http endpoint
# at https://modelpricewatch.com/mcp — no data baked in, nothing to build.
FROM node:22-alpine
WORKDIR /app
COPY mcp/package.json mcp/index.js ./
CMD ["node", "index.js"]
