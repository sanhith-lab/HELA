import { agentManager } from "../core/AgentManager";

// Executive Layer
import ChiefAIAgent from "./Executive/ChiefAIAgent";
import { PlannerAgent, TaskManagerAgent, DecisionAgent } from "./Executive/ExecutiveAgents";

// Conversation Layer
import { ConversationAgent, PersonalityAgent, VoiceAgent, LanguageAgent } from "./Conversation/ConversationAgents";

// Research Layer
import ResearchAgent from "./ResearchAgent/ResearchAgent";
import { FactCheckingAgent, SummarizationAgent, KnowledgeAgent } from "./Research/ResearchAgents";

// Browser/Web Layer
import { BrowserAgent, WebNavigationAgent, WebsiteAnalysisAgent } from "./Browser/BrowserAgents";
import AssignmentAgent from "./AssignmentAgent/AssignmentAgent";

// Coding Layer
import { CodingAgent, DebuggingAgent, CodeReviewAgent, DeveloperAgent } from "./Coding/CodingAgents";

// Vision/Media Layer
import { VisionAgent, OCRAgent, ImageAnalysisAgent, MediaAgent } from "./Vision/VisionAgents";

// Memory Layer
import { MemoryAgent, ContextAgent, KnowledgeGraphAgent, RAGAgent } from "./Memory/MemoryAgents";

// Security Layer
import { SecurityAgent, ThreatDetectionAgent, PrivacyAgent, CyberAnalysisAgent } from "./Security/SecurityAgents";

// System Layer
import { SystemAgent, FileAgent, ApplicationAgent, MonitoringAgent } from "./System/SystemAgents";

// Communication Layer
import { CommunicationAgent, EmailMessageAgent } from "./Communication/CommunicationAgents";

// Advanced Intelligence Layer
import { WorldModelAgent, CuriosityAgent, DreamSimulationAgent } from "./Advanced/AdvancedAgents";

export function registerAgents() {
  // Executive Layer (4)
  agentManager.register(ChiefAIAgent);
  agentManager.register(PlannerAgent);
  agentManager.register(TaskManagerAgent);
  agentManager.register(DecisionAgent);

  // Conversation Layer (4)
  agentManager.register(ConversationAgent);
  agentManager.register(PersonalityAgent);
  agentManager.register(VoiceAgent);
  agentManager.register(LanguageAgent);

  // Research Layer (4)
  agentManager.register(ResearchAgent);
  agentManager.register(FactCheckingAgent);
  agentManager.register(SummarizationAgent);
  agentManager.register(KnowledgeAgent);

  // Browser/Web Layer (4)
  agentManager.register(BrowserAgent);
  agentManager.register(WebNavigationAgent);
  agentManager.register(WebsiteAnalysisAgent);
  agentManager.register(AssignmentAgent);

  // Coding Layer (4)
  agentManager.register(CodingAgent);
  agentManager.register(DebuggingAgent);
  agentManager.register(CodeReviewAgent);
  agentManager.register(DeveloperAgent);

  // Vision/Media Layer (4)
  agentManager.register(VisionAgent);
  agentManager.register(OCRAgent);
  agentManager.register(ImageAnalysisAgent);
  agentManager.register(MediaAgent);

  // Memory Layer (4)
  agentManager.register(MemoryAgent);
  agentManager.register(ContextAgent);
  agentManager.register(KnowledgeGraphAgent);
  agentManager.register(RAGAgent);

  // Security Layer (4)
  agentManager.register(SecurityAgent);
  agentManager.register(ThreatDetectionAgent);
  agentManager.register(PrivacyAgent);
  agentManager.register(CyberAnalysisAgent);

  // System Layer (4)
  agentManager.register(SystemAgent);
  agentManager.register(FileAgent);
  agentManager.register(ApplicationAgent);
  agentManager.register(MonitoringAgent);

  // Communication Layer (2)
  agentManager.register(CommunicationAgent);
  agentManager.register(EmailMessageAgent);

  // Advanced Intelligence Layer (3)
  agentManager.register(WorldModelAgent);
  agentManager.register(CuriosityAgent);
  agentManager.register(DreamSimulationAgent);

  console.log(`[registerAgents] Successfully registered ${agentManager.listAgents().length} specialized agents across 11 functional clusters.`);
}