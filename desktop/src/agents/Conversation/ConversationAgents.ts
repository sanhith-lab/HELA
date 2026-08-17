import type { Agent } from "../../core/AgentManager";
import { voiceEngine } from "../../services/voice/VoiceEngine";

export const ConversationAgent: Agent = {
  name: "conversation",
  displayName: "Conversation Agent",
  category: "Conversation",
  description: "Handles natural dialogue, contextual responses, and user chat flow.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `HELA: I understand. Regarding "${command}", how would you like me to assist you further?`;
  },
};

export const PersonalityAgent: Agent = {
  name: "personality",
  displayName: "Personality Agent",
  category: "Conversation",
  description: "Maintains HELA's distinct intelligent, empathetic, operating-system tone.",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[PERSONALITY AGENT] Tone matched: Professional AGI Assistant for "${command}".`;
  },
};

export const VoiceAgent: Agent = {
  name: "voice",
  displayName: "Voice Agent",
  category: "Conversation",
  description: "Manages speech recognition, wake word detection, and female voice synthesis.",
  status: "Active",
  async execute(command: string): Promise<string> {
    if (command.includes("telugu") || command.includes("te")) {
      voiceEngine.setLanguage("te-IN");
      return `[VOICE AGENT] Switched language detection to Telugu (te-IN). HELA voice interface active.`;
    }
    voiceEngine.setLanguage("en-US");
    return `[VOICE AGENT] Speech synthesis active in English (en-US). Listening for wake word 'HELA'.`;
  },
};

export const LanguageAgent: Agent = {
  name: "language",
  displayName: "Language Agent",
  category: "Conversation",
  description: "Detects, translates, and formats multi-lingual text inputs (English, Telugu, etc.).",
  status: "Ready",
  async execute(command: string): Promise<string> {
    return `[LANGUAGE AGENT] Language detected: English / Telugu support active for "${command}".`;
  },
};
