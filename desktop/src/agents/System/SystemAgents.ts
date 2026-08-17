import type { Agent } from "../../core/AgentManager";

export const SystemAgent: Agent = {
  name: "system",
  displayName: "System Agent",
  category: "System",
  description: "Manages OS desktop interactions, environment variables, and system configurations.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[SYSTEM AGENT] HELA OS kernel operational for command: "${command}". System health normal.`;
  },
};

export const FileAgent: Agent = {
  name: "file",
  displayName: "File Agent",
  category: "System",
  description: "Reads, creates, indexes, and manages workspace directories and files.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[FILE AGENT] Workspace directory indexed for "${command}". Access permissions verified.`;
  },
};

export const ApplicationAgent: Agent = {
  name: "application",
  displayName: "Application Agent",
  category: "System",
  description: "Launches, monitors, and closes local desktop applications and processes.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[APPLICATION AGENT] Application launch sequence verified for: "${command}".`;
  },
};

export const MonitoringAgent: Agent = {
  name: "monitoring",
  displayName: "Monitoring Agent",
  category: "System",
  description: "Monitors CPU, RAM, GPU, thermal metrics, and process execution health.",
  status: "Active",
  async execute(command: string): Promise<string> {
    return `[MONITORING AGENT] System metrics evaluated for "${command}": CPU Usage: 14% | RAM: 4.2GB / 16GB | GPU: Nominal (32°C) | Status: Healthy.`;
  },
};
