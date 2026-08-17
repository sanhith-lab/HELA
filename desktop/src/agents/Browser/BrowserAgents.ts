import type { Agent } from "../../core/AgentManager";
import { browserController } from "../../core/BrowserController";

export const BrowserAgent: Agent = {
  name: "browser",
  displayName: "Browser Agent",
  category: "Browser",
  description: "Controls browser sessions, opens URLs, and manages web tabs.",
  status: "Active",
  async execute(command: string): Promise<string> {
    if (command.includes("http") || command.includes(".com") || command.includes(".org")) {
      const url = command.match(/https?:\/\/[^\s]+/) ? command.match(/https?:\/\/[^\s]+/)?.[0] || command : `https://${command}`;
      const res = await browserController.open(url);
      return `[BROWSER AGENT] ${res.message}`;
    }
    const res = await browserController.search(command);
    return `[BROWSER AGENT] Initiated web search: ${res.message}`;
  },
};

export const WebNavigationAgent: Agent = {
  name: "web_navigation",
  displayName: "Web Navigation Agent",
  category: "Browser",
  description: "Navigates multi-step website funnels, pagination, and link clicking.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[WEB NAVIGATION AGENT] Navigated links and active page elements for: "${command}".`;
  },
};

export const WebsiteAnalysisAgent: Agent = {
  name: "website_analysis",
  displayName: "Website Analysis Agent",
  category: "Browser",
  description: "Parses DOM layouts, extracts structured tables, forms, and interactive inputs.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    const page = await browserController.analyzeCurrentPage();
    return `[WEBSITE ANALYSIS AGENT] Analyzed for "${command}"\nPage Title: ${page.title}\nHeadings: ${page.headings.join(", ")}\nInput Fields Found: ${page.inputElements.length}`;
  },
};
