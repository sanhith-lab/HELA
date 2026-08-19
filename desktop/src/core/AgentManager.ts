import type { AgentName } from "./CommandRouter";
import { mcpRuntimeService } from "../services/mcp/MCPRuntimeService";

export type AgentStatus =
  | "Active"
  | "Ready"
  | "Searching"
  | "Processing"
  | "Thinking"
  | "Idle"
  | "Offline";

export type AgentExecutionMode = "live-tool" | "live-model";

export interface Agent {
  name: AgentName;
  displayName: string;
  category:
    | "Executive"
    | "Conversation"
    | "Research"
    | "Browser"
    | "Coding"
    | "Vision"
    | "Memory"
    | "Security"
    | "System"
    | "Communication"
    | "Advanced";
  description: string;
  status: AgentStatus;
  executionMode?: AgentExecutionMode;
  execute: (command: string, context?: Record<string, unknown>) => Promise<string>;
}

class AgentManager {
  private agents = new Map<AgentName, Agent>();
  private statusListeners: Array<(agents: Agent[]) => void> = [];

  register(agent: Agent) {
    this.agents.set(agent.name, agent);
    this.notifyListeners();
  }

  getAgent(name: AgentName) {
    return this.agents.get(name);
  }

  hasAgent(name: AgentName) {
    return this.agents.has(name);
  }

  setAgentStatus(name: AgentName, status: AgentStatus) {
    const agent = this.agents.get(name);
    if (agent) {
      agent.status = status;
      this.notifyListeners();
    }
  }

  listAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getExecutionMode(name: AgentName): AgentExecutionMode {
    const agent = this.agents.get(name);
    if (agent?.executionMode) return agent.executionMode;
    if (name === "chief_ai") return "live-model";
    if (["browser", "web_navigation", "website_analysis", "research", "assignment", "coding", "debugging", "code_review", "memory", "context", "rag", "knowledge_graph"].includes(name)) return "live-tool";
    return "live-model";
  }

  onAgentsChanged(listener: (agents: Agent[]) => void) {
    this.statusListeners.push(listener);
    listener(this.listAgents());
    return () => {
      this.statusListeners = this.statusListeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    const list = this.listAgents();
    this.statusListeners.forEach((listener) => listener(list));
  }

  async execute(name: AgentName, command: string, context?: Record<string, unknown>): Promise<string> {
    const agent = this.getAgent(name);

    if (!agent) {
      return `Agent "${name}" is not registered. Directing to Chief AI.`;
    }

    this.setAgentStatus(name, "Processing");
    try {
      const finalResult = await mcpRuntimeService.executeAgent(name, command, context);
      this.setAgentStatus(name, "Active");
      return finalResult;
    } catch (err: unknown) {
      this.setAgentStatus(name, "Ready");
      throw err instanceof Error ? err : new Error(String(err));
    }
  }
}

export const agentManager = new AgentManager();
