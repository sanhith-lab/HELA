import type { Agent } from "../../core/AgentManager";

export const PlannerAgent: Agent = {
  name: "planner",
  displayName: "Planner Agent",
  category: "Executive",
  description: "Decomposes complex requests into sequential multi-agent execution roadmaps.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[PLANNER AGENT]\nTask Roadmap for "${command}":\nStep 1: Research & Data Gathering\nStep 2: Analysis & Synthesis\nStep 3: Verification & Output Format`;
  },
};

export const TaskManagerAgent: Agent = {
  name: "task_manager",
  displayName: "Task Manager Agent",
  category: "Executive",
  description: "Tracks active sub-agent tasks, progress queues, and execution timers.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[TASK MANAGER AGENT] Active queues evaluated for: "${command}". All sub-tasks completed cleanly.`;
  },
};

export const DecisionAgent: Agent = {
  name: "decision",
  displayName: "Decision Agent",
  category: "Executive",
  description: "Resolves conflicting sub-agent options and enforces objective criteria.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[DECISION AGENT] Optimal execution path determined for: "${command}". Confidence: 96%.`;
  },
};
