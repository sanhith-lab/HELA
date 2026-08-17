import { registerAgents } from "../agents/registerAgents";
import { browserController } from "./BrowserController";
import { workflowEngine } from "./WorkflowEngine";

export interface HelaCommand {
  command: string;
  source?: "text" | "voice" | "system";
  context?: Record<string, unknown>;
}

export interface HelaResponse {
  success: boolean;
  message: string;
  agent?: string;
  confidence?: number;
  data?: Record<string, unknown>;
}

class HelaCore {
  private initialized = false;

  initialize() {
    if (this.initialized) return;

    registerAgents();
    this.initialized = true;
    console.log("HELA Core initialized with 41-Agent Architecture");
  }

  getBrowserController() {
    return browserController;
  }

  async execute(helaCommand: HelaCommand): Promise<HelaResponse> {
    if (!this.initialized) {
      this.initialize();
    }

    const trimmed = helaCommand.command.trim();
    if (!trimmed) {
      return { success: false, message: "Empty command provided." };
    }

    try {
      const result = await workflowEngine.run(trimmed, helaCommand.context as { attachments?: Array<{ name: string; mimeType: string; dataUrl: string }> } | undefined);
      return {
        success: true,
        message: result,
        agent: "workflow",
        confidence: 1,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const fallbackResult = `Execution error in HELA workflow: ${errorMsg}`;

      return {
        success: false,
        message: fallbackResult,
        agent: "workflow",
      };
    }
  }

  isReady() {
    return this.initialized;
  }
}

export const helaCore = new HelaCore();
