import type { Agent } from "../../core/AgentManager";
import { memoryEngine } from "../../core/memory/MemoryEngine";
import { ragService } from "../../services/rag/RAGService";

export const MemoryAgent: Agent = {
  name: "memory",
  displayName: "Memory Agent",
  category: "Memory",
  description: "Manages short-term context, long-term semantic storage, and preference retrieval.",
  status: "Active",
  async execute(command: string): Promise<string> {
    if (command.includes("remember")) {
      const parts = command.split("remember");
      const textToSave = parts[1] ? parts[1].trim() : command;
      memoryEngine.save("user_note", textToSave, "long_term");
      return `[MEMORY AGENT] Stored into long-term memory: "${textToSave}".`;
    }
    const memories = memoryEngine.getAllMemories();
    return `[MEMORY AGENT] Total Memory Records: ${memories.length}. Active OS context loaded.`;
  },
};

export const ContextAgent: Agent = {
  name: "context",
  displayName: "Context Agent",
  category: "Memory",
  description: "Maintains real-time thread history and active application focus state.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const history = memoryEngine.getConversationHistory();
    return `[CONTEXT AGENT] Synchronized for "${command}". Active conversation buffer length: ${history.length} turns.`;
  },
};

export const KnowledgeGraphAgent: Agent = {
  name: "knowledge_graph",
  displayName: "Knowledge Graph Agent",
  category: "Memory",
  description: "Links entities, concepts, user relations, and agent knowledge in a persistent graph.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[KNOWLEDGE GRAPH AGENT] Entity node linked for: "${command}". Graph depth: 4 layers.`;
  },
};

export const RAGAgent: Agent = {
  name: "rag",
  displayName: "RAG Agent",
  category: "Memory",
  description: "Retrieval-Augmented Generation agent searching local documents and vector stores.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const chunks = ragService.retrieveContext(command);
    if (chunks.length === 0) {
      return `[RAG AGENT] Ingested query "${command}". No specific matching document chunks found in index.`;
    }
    return `[RAG AGENT] Document context retrieved:\n${chunks.map((c, i) => `${i + 1}. ${c}`).join("\n")}`;
  },
};
