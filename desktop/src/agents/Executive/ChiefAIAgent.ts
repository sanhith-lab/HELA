import type { Agent } from "../../core/AgentManager";
import { memoryEngine } from "../../core/memory/MemoryEngine";
import { aiService } from "../../services/ai/AIService";

const ChiefAIAgent: Agent = {
  name: "chief_ai",
  displayName: "Chief AI Orchestrator",
  category: "Executive",
  description: "Executive leader of HELA AI OS. Evaluates high-level prompts, delegates tasks, and synthesizes answers.",
  status: "Active",

  async execute(command: string): Promise<string> {
    console.log("[ChiefAIAgent] Executive handling prompt:", command);
    memoryEngine.addInteraction("user", command);

    const systemPrompt = `You are Chief AI, the executive orchestrator of HELA AI Operating System.
Provide an intelligent, executive-level response for the user's request. Be authoritative, precise, and helpful.`;

    const aiOutput = await aiService.generateResponse(command, systemPrompt);

    memoryEngine.addInteraction("hela", aiOutput);
    return aiOutput;
  },
};

export default ChiefAIAgent;
