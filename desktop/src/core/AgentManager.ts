import type { AgentName } from "./CommandRouter";
import { aiService, AIQuotaError, type AIRequestContext } from "../services/ai/AIService";

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
      const toolBackedAgents = new Set<AgentName>([
        "browser", "web_navigation", "website_analysis", "research", "assignment",
        "coding", "debugging", "code_review", "memory", "context", "rag", "knowledge_graph",
      ]);
      const modelOwnedAgents = new Set<AgentName>([
        "chief_ai", "planner", "task_manager", "decision", "conversation", "personality", "voice", "language",
        "fact_checking", "summarization", "knowledge", "developer", "vision", "ocr", "image_analysis", "media",
        "security", "threat_detection", "privacy", "cyber_analysis", "system", "file", "application", "monitoring",
        "communication", "email_message", "world_model", "curiosity", "dream_simulation",
      ]);
      let finalResult: string;
      if (modelOwnedAgents.has(name) && !toolBackedAgents.has(name)) {
        // Model-owned agents no longer execute their old placeholder body.
        // The configured provider is the actual implementation of the agent.
        finalResult = await aiService.generateResponse(
          command,
          `You are the ${agent.displayName}, a production HELA agent. Execute the user's request using your specialized role. Never claim that a file, system, browser, camera, message, security scan, or external action was completed unless a real tool result is provided. Return a useful answer, clearly state limitations, and ask for required input when needed.`,
          context as AIRequestContext | undefined,
        );
      } else {
        const result = await agent.execute(command, context);
        finalResult = ["chief_ai", "coding", "debugging", "code_review", "assignment"].includes(name)
          ? result
          : await aiService.generateResponse(
              command,
              `You are the ${agent.displayName} inside HELA. Synthesize the real local/tool result below into a useful answer. Do not claim an action happened unless the result proves it.\n\nTool result:\n${result}`,
              context as AIRequestContext | undefined,
            );
      }
      this.setAgentStatus(name, "Active");
      return finalResult;
    } catch (err: unknown) {
      this.setAgentStatus(name, "Ready");
      // Do not convert provider/tool failures into successful-looking text.
      // The workflow runner must stop here so it cannot spend another model
      // request trying to verify an execution that already failed.
      if (err instanceof AIQuotaError) throw err;
      throw err instanceof Error ? err : new Error(String(err));
    }
  }
}

export const agentManager = new AgentManager();
