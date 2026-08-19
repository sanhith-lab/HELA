import type { AgentName } from "../../core/CommandRouter";

export interface MCPToolResult {
  content?: Array<{ type: string; text?: string }>;
  isError?: boolean;
}

class MCPRuntimeService {
  private endpoint = import.meta.env.VITE_MCP_RUNTIME_URL || "http://127.0.0.1:8787";

  async health(): Promise<{ ok: boolean; tools: string[] }> {
    const response = await fetch(`${this.endpoint}/health`);
    if (!response.ok) throw new Error(`MCP runtime unavailable (${response.status}). Start the HELA MCP gateway.`);
    return response.json() as Promise<{ ok: boolean; tools: string[] }>;
  }

  async executeAgent(agentName: AgentName, command: string, context?: Record<string, unknown>): Promise<string> {
    const response = await fetch(`${this.endpoint}/execute`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool: "run_agent", arguments: { agentName, command, context: context ? JSON.stringify(context) : undefined } }) });
    const result = await response.json() as MCPToolResult & { error?: string };
    if (!response.ok || result.isError) throw new Error(result.error || result.content?.map((part) => part.text).filter(Boolean).join("\n") || `MCP agent execution failed (${response.status}).`);
    return result.content?.map((part) => part.text).filter(Boolean).join("\n") || "MCP returned no agent output.";
  }
}

export const mcpRuntimeService = new MCPRuntimeService();
