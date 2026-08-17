export type AgentName =
  // Executive Layer
  | "chief_ai"
  | "planner"
  | "task_manager"
  | "decision"
  // Conversation Layer
  | "conversation"
  | "personality"
  | "voice"
  | "language"
  // Research Layer
  | "research"
  | "fact_checking"
  | "summarization"
  | "knowledge"
  // Browser/Web Layer
  | "browser"
  | "web_navigation"
  | "website_analysis"
  | "assignment"
  // Coding Layer
  | "coding"
  | "debugging"
  | "code_review"
  | "developer"
  // Vision/Media Layer
  | "vision"
  | "ocr"
  | "image_analysis"
  | "media"
  // Memory Layer
  | "memory"
  | "context"
  | "knowledge_graph"
  | "rag"
  // Security Layer
  | "security"
  | "threat_detection"
  | "privacy"
  | "cyber_analysis"
  // System Layer
  | "system"
  | "file"
  | "application"
  | "monitoring"
  // Communication Layer
  | "communication"
  | "email_message"
  // Advanced Intelligence Layer
  | "world_model"
  | "curiosity"
  | "dream_simulation";

export interface RoutedCommand {
  command: string;
  agent: AgentName;
  confidence: number;
}

class CommandRouter {
  route(command: string): RoutedCommand {
    const text = command.toLowerCase().trim();

    // Assignment & Web autofill detection
    if (
      text.includes("assignment") ||
      text.includes("solve assignment") ||
      text.includes("autofill answer") ||
      text.includes("homework") ||
      text.includes("quiz") ||
      text.includes("test paper")
    ) {
      return { command, agent: "assignment", confidence: 0.95 };
    }

    // Chief AI / Orchestration
    if (
      text.includes("chief") ||
      text.includes("hela, plan") ||
      text.includes("orchestrate") ||
      text.includes("complex task")
    ) {
      return { command, agent: "chief_ai", confidence: 0.9 };
    }

    // Planner
    if (
      text.includes("plan") ||
      text.includes("roadmap") ||
      text.includes("schedule task") ||
      text.includes("step by step")
    ) {
      return { command, agent: "planner", confidence: 0.85 };
    }

    // Research
    if (
      text.includes("search") ||
      text.includes("research") ||
      text.includes("find info") ||
      text.includes("look up") ||
      text.includes("investigate")
    ) {
      return { command, agent: "research", confidence: 0.9 };
    }

    // Browser
    if (
      text.includes("browser") ||
      text.includes("website") ||
      text.includes("open url") ||
      text.includes("navigate to") ||
      text.includes("http")
    ) {
      return { command, agent: "browser", confidence: 0.9 };
    }

    // Coding & Developer
    if (
      text.includes("code") ||
      text.includes("program") ||
      text.includes("function") ||
      text.includes("script") ||
      text.includes("python") ||
      text.includes("typescript") ||
      text.includes("react")
    ) {
      return { command, agent: "coding", confidence: 0.9 };
    }

    if (text.includes("debug") || text.includes("error") || text.includes("fix bug")) {
      return { command, agent: "debugging", confidence: 0.9 };
    }

    // Vision & OCR
    if (
      text.includes("ocr") ||
      text.includes("extract text from image") ||
      text.includes("read text in photo")
    ) {
      return { command, agent: "ocr", confidence: 0.95 };
    }

    if (
      text.includes("image") ||
      text.includes("photo") ||
      text.includes("camera") ||
      text.includes("picture") ||
      text.includes("visual")
    ) {
      return { command, agent: "vision", confidence: 0.9 };
    }

    // Security & Threat Detection
    if (
      text.includes("scam") ||
      text.includes("phishing") ||
      text.includes("malware") ||
      text.includes("vulnerability")
    ) {
      return { command, agent: "threat_detection", confidence: 0.95 };
    }

    if (
      text.includes("security") ||
      text.includes("cyber") ||
      text.includes("audit") ||
      text.includes("firewall")
    ) {
      return { command, agent: "security", confidence: 0.9 };
    }

    // Memory & RAG
    if (
      text.includes("document") ||
      text.includes("rag") ||
      text.includes("file context") ||
      text.includes("pdf")
    ) {
      return { command, agent: "rag", confidence: 0.9 };
    }

    if (
      text.includes("remember") ||
      text.includes("recall") ||
      text.includes("memory") ||
      text.includes("save context")
    ) {
      return { command, agent: "memory", confidence: 0.9 };
    }

    // Voice & Language
    if (text.includes("voice") || text.includes("speak") || text.includes("telugu")) {
      return { command, agent: "voice", confidence: 0.85 };
    }

    // Communication
    if (
      text.includes("email") ||
      text.includes("send message") ||
      text.includes("contact")
    ) {
      return { command, agent: "email_message", confidence: 0.9 };
    }

    // System Monitoring
    if (
      text.includes("cpu") ||
      text.includes("ram") ||
      text.includes("system status") ||
      text.includes("performance")
    ) {
      return { command, agent: "monitoring", confidence: 0.9 };
    }

    // World Model & Curiosity
    if (text.includes("curiosity") || text.includes("explore background")) {
      return { command, agent: "curiosity", confidence: 0.85 };
    }

    if (text.includes("world model") || text.includes("environment")) {
      return { command, agent: "world_model", confidence: 0.85 };
    }

    if (text.includes("dream") || text.includes("simulate")) {
      return { command, agent: "dream_simulation", confidence: 0.85 };
    }

    // Default Fallback
    return { command, agent: "chief_ai", confidence: 0.7 };
  }
}

export const commandRouter = new CommandRouter();