import type { Agent } from "../../core/AgentManager";
import { browserController } from "../../core/BrowserController";
import { ragService } from "../../services/rag/RAGService";

const ResearchAgent: Agent = {
  name: "research",
  displayName: "Research Agent",
  category: "Research",
  description: "Researches web sources, gathers technical evidence, and compiles reports.",
  status: "Ready",

  async execute(command: string): Promise<string> {
    const searchRes = await browserController.search(command);
    const ragContext = ragService.retrieveContext(command);

    if (!searchRes.success) {
      return `Research agent could not complete web search for "${command}".`;
    }

    const snippets = searchRes.searchResults
      ?.map((s) => `• [${s.title}](${s.url}): ${s.snippet}`)
      .join("\n") || "Web results gathered.";

    const ragSummary = ragContext.length > 0
      ? `\n\nRetrieved RAG Context:\n${ragContext.map((c) => `> ${c}`).join("\n")}`
      : "";

    return `[RESEARCH REPORT FOR: "${command}"]\n\nKey Findings:\n${snippets}${ragSummary}\n\nConclusion: Research completed by HELA Research Agent.`;
  },
};

export default ResearchAgent;