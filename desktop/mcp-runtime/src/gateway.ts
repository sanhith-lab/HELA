import { createServer } from "node:http";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const compiled = root.endsWith("dist");
const serverEntry = join(root, compiled ? "server.js" : "server.ts");
const client = new Client({ name: "hela-desktop", version: "1.0.0" });
const transport = new StdioClientTransport({ command: process.execPath, args: compiled ? [serverEntry] : ["--import", "tsx", serverEntry], env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" } });

await client.connect(transport);
const discovered = await client.listTools();
console.error(`HELA MCP gateway connected with ${discovered.tools.length} tools.`);

function json(res: import("node:http").ServerResponse, status: number, body: unknown) { res.writeHead(status, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }); res.end(JSON.stringify(body)); }
const gateway = createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" }); return res.end(); }
  if (req.url === "/health") return json(res, 200, { ok: true, tools: discovered.tools.map((tool) => tool.name) });
  if (req.url === "/tools") return json(res, 200, discovered);
  if (req.method !== "POST" || req.url !== "/execute") return json(res, 404, { error: "Not found" });
  let raw = ""; req.on("data", (chunk) => { raw += chunk; }); req.on("end", async () => { try { const body = JSON.parse(raw) as { tool: string; arguments?: Record<string, unknown> }; const result = await client.callTool({ name: body.tool, arguments: body.arguments || {} }); json(res, result.isError ? 500 : 200, result); } catch (error) { json(res, 500, { error: error instanceof Error ? error.message : String(error) }); } });
});
gateway.listen(Number(process.env.MCP_PORT || 8787), "127.0.0.1", () => console.error("HELA MCP gateway listening on http://127.0.0.1:8787"));
