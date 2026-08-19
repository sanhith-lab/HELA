import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

const provider = process.env.AI_PROVIDER || "gemini";
const model = process.env.AI_MODEL || (provider === "gemini" ? "gemini-3.6-flash" : provider === "openai" ? "gpt-4o-mini" : provider === "groq" ? "llama-3.3-70b-versatile" : "llama3");
const memory = new Map<string, string>();

function textResult(text: string) { return { content: [{ type: "text" as const, text }] }; }

async function generate(prompt: string, system: string): Promise<string> {
  const key = provider === "gemini" ? process.env.GEMINI_API_KEY : provider === "openai" ? process.env.OPENAI_API_KEY : provider === "groq" ? process.env.GROQ_API_KEY : "";
  if (provider !== "ollama" && !key) throw new Error(`${provider.toUpperCase()} credentials are missing from the MCP runtime environment.`);
  if (provider === "gemini") {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: `${system}\n\n${prompt}` }] }] }) });
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>; error?: { message?: string } };
    if (!response.ok) throw new Error(data.error?.message || `Gemini request failed (${response.status}).`);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "The model returned no text.";
  }
  if (provider === "ollama") {
    const response = await fetch("http://localhost:11434/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model, prompt: `${system}\n\n${prompt}`, stream: false }) });
    const data = await response.json() as { response?: string; error?: string };
    if (!response.ok) throw new Error(data.error || `Ollama request failed (${response.status}).`);
    return data.response || "The local model returned no text.";
  }
  const base = provider === "groq" ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";
  const response = await fetch(base, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ model, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) });
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
  if (!response.ok) throw new Error(data.error?.message || `${provider} request failed (${response.status}).`);
  return data.choices?.[0]?.message?.content || "The model returned no text.";
}

export function createServer() {
  const server = new McpServer({ name: "hela-agent-runtime", version: "1.0.0" }, { instructions: "HELA agents must use tools for actions and must never claim an external action without a tool result." });
  server.registerTool("run_agent", { description: "Execute any HELA agent through the configured live model.", inputSchema: z.object({ agentName: z.string(), command: z.string(), context: z.string().optional() }) }, async ({ agentName, command, context }) => textResult(await generate(context ? `${command}\n\nContext:\n${context}` : command, `You are the production ${agentName} agent in HELA. Execute the request with your specialist role. Be precise. Do not fabricate tool actions.`)));
  server.registerTool("memory_store", { description: "Store a named HELA memory.", inputSchema: z.object({ key: z.string(), value: z.string() }) }, async ({ key, value }) => { memory.set(key, value); return textResult(`Memory stored: ${key}`); });
  server.registerTool("memory_recall", { description: "Recall a named HELA memory.", inputSchema: z.object({ key: z.string() }) }, async ({ key }) => textResult(memory.get(key) || `No memory found for ${key}.`));
  server.registerTool("security_scan", { description: "Ask the live model to analyze a security target.", inputSchema: z.object({ target: z.string() }) }, async ({ target }) => textResult(await generate(`Perform a defensive security analysis of: ${target}`, "You are HELA Threat Detection. Identify risks, evidence needed, and safe remediation. Do not claim a scan was run unless an actual scan tool is available.")));
  server.registerTool("vision_analyze", { description: "Analyze an image description or attached media metadata through the live model.", inputSchema: z.object({ description: z.string() }) }, async ({ description }) => textResult(await generate(description, "You are HELA Vision and OCR. Analyze visual input carefully and state uncertainty.")));
  server.registerTool("workspace_status", { description: "Report the MCP runtime and provider status.", inputSchema: z.object({}) }, async () => textResult(JSON.stringify({ runtime: "hela-mcp", provider, model, memoryRecords: memory.size })));
  return server;
}

void serveStdio(createServer);
console.error(`HELA MCP server ready: ${provider}/${model}`);
