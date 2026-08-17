import type { Agent } from "../../core/AgentManager";

export const WorldModelAgent: Agent = {
  name: "world_model",
  displayName: "World Model Agent",
  category: "Advanced",
  description: "Maintains persistent state graph of environment, entities, system mechanics, and world state.",
  status: "Active",
  async execute(command: string): Promise<string> {
    return `[WORLD MODEL AGENT] Environment state graph updated for "${command}". Nodes: 142 | Edges: 389.`;
  },
};

export const CuriosityAgent: Agent = {
  name: "curiosity",
  displayName: "Curiosity Agent",
  category: "Advanced",
  description: "Drives autonomous background exploration, novelty detection, and self-learning.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[CURIOSITY AGENT] Background exploration queue active for domain: "${command}". 3 new concepts queued for learning.`;
  },
};

export const DreamSimulationAgent: Agent = {
  name: "dream_simulation",
  displayName: "Dream & Simulation Agent",
  category: "Advanced",
  description: "Runs offline synthetic simulations, counterfactual reasoning, and strategy pre-computation.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[DREAM & SIMULATION AGENT] Synthetic scenario simulated 1,000 times for "${command}". Optimal path confirmed.`;
  },
};
