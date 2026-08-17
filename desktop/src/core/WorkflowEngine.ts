import { agentManager } from "./AgentManager";
import { commandRouter } from "./CommandRouter";
import { useAppStore, type WorkflowStepState } from "../store/appStore";
import { AIQuotaError } from "../services/ai/AIService";

export interface WorkflowContext {
  attachments?: Array<{ name: string; mimeType: string; dataUrl: string }>;
}

class WorkflowEngine {
  async run(command: string, context?: WorkflowContext): Promise<string> {
    const trimmed = command.trim();
    if (!trimmed) throw new Error("Workflow input cannot be empty.");

    const routed = commandRouter.route(trimmed);
    const steps: WorkflowStepState[] = [
      { id: "execute", label: `Execute ${routed.agent}`, agent: routed.agent, status: "queued" },
    ];
    if (routed.agent !== "chief_ai") {
      steps.push({ id: "verify", label: "Verify and synthesize result", agent: "chief_ai", status: "queued" });
    }

    const store = useAppStore.getState();
    store.addMessage({ sender: "user", text: trimmed });
    store.startWorkflow({
      id: `run-${Date.now()}`,
      command: trimmed,
      status: "running",
      steps,
      startedAt: new Date().toISOString(),
    });

    try {
      store.updateWorkflowStep("execute", { status: "running" });
      const execution = await agentManager.execute(routed.agent, trimmed, context as Record<string, unknown> | undefined);
      store.updateWorkflowStep("execute", { status: "completed", output: execution });

      let finalOutput = execution;
      if (steps.length > 1) {
        store.updateWorkflowStep("verify", { status: "running" });
        try {
          finalOutput = await agentManager.execute(
            "chief_ai",
            `Verify and synthesize this completed agent result for the original request. Original request: ${trimmed}\n\nAgent result:\n${execution}`,
            context as Record<string, unknown> | undefined,
          );
          store.updateWorkflowStep("verify", { status: "completed", output: finalOutput });
        } catch (error) {
          if (!(error instanceof AIQuotaError)) throw error;
          finalOutput = `${execution}\n\nVerification was skipped because the provider quota is exhausted. ${error.message}`;
          store.updateWorkflowStep("verify", { status: "failed", output: error.message });
        }
      }

      store.addMessage({ sender: "assistant", text: finalOutput, agent: routed.agent });
      store.finishWorkflow("completed");
      return finalOutput;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const current = useAppStore.getState().workflowRun;
      const runningStep = current?.steps.find((step) => step.status === "running");
      if (runningStep) store.updateWorkflowStep(runningStep.id, { status: "failed", output: message });
      store.addMessage({ sender: "assistant", text: `Workflow failed: ${message}`, agent: routed.agent });
      store.finishWorkflow("failed", message);
      throw error;
    }
  }
}

export const workflowEngine = new WorkflowEngine();
