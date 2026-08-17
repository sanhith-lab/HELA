import type { Agent } from "../../core/AgentManager";

export const CommunicationAgent: Agent = {
  name: "communication",
  displayName: "Communication Agent",
  category: "Communication",
  description: "Drafts, formats, and manages outbound notifications and user communication.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[COMMUNICATION AGENT] Outbound communication drafted for: "${command}". Ready for dispatch.`;
  },
};

export const EmailMessageAgent: Agent = {
  name: "email_message",
  displayName: "Email & Message Agent",
  category: "Communication",
  description: "Formats emails, Slack messages, and automated status reports.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[EMAIL & MESSAGE AGENT] Message template generated:\nSubject: Update regarding ${command}\nBody: HELA OS notification generated automatically.`;
  },
};
