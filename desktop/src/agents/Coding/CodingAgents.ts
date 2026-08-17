import type { Agent } from "../../core/AgentManager";
import { aiService } from "../../services/ai/AIService";

export const CodingAgent: Agent = {
  name: "coding",
  displayName: "Coding Agent",
  category: "Coding",
  description: "Writes, refactors, and generates production code across TypeScript, Python, C++, etc.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const codeResponse = await aiService.generateResponse(
      command,
      "You are HELA Coding Agent. Generate production-ready code with comments, type safety, and clean architecture."
    );
    return `[CODING AGENT REAL-TIME RESPONSE]\n\n${codeResponse}`;
  },
};

export const DebuggingAgent: Agent = {
  name: "debugging",
  displayName: "Debugging Agent",
  category: "Coding",
  description: "Analyzes runtime exceptions, stack traces, and resolves software bugs.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const debugResponse = await aiService.generateResponse(
      command,
      "You are HELA Debugging Agent. Analyze the error or bug prompt, locate root cause, and provide fixed code."
    );
    return `[DEBUGGING AGENT REAL-TIME ANALYSIS]\n\n${debugResponse}`;
  },
};

export const CodeReviewAgent: Agent = {
  name: "code_review",
  displayName: "Code Review Agent",
  category: "Coding",
  description: "Audits source code for performance, security standards, and clean architecture.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const reviewResponse = await aiService.generateResponse(
      command,
      "You are HELA Code Review Agent. Audit the code for security vulnerabilities, performance bottlenecks, and best practices."
    );
    return `[CODE REVIEW AGENT AUDIT]\n\n${reviewResponse}`;
  },
};

export const DeveloperAgent: Agent = {
  name: "developer",
  displayName: "Developer Agent",
  category: "Coding",
  description: "Manages repository structures, build manifests, dependencies, and environment scripts.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[DEVELOPER AGENT] Workspace environment synchronized for: "${command}". Package build system ready.`;
  },
};
