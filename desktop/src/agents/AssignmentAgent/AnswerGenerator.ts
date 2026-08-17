import { aiService } from "../../services/ai/AIService";

export interface SolutionDraft {
  summary: string;
  topic: string;
  reasoningSteps: string[];
  finalAnswerText: string;
}

export class AnswerGenerator {
  async generateAnswer(questionOrTopic: string): Promise<SolutionDraft> {
    console.log("[AnswerGenerator] Real AI Reasoning over question/topic:", questionOrTopic);

    // Call live AI Service (Gemini / OpenAI / Groq / Ollama / Heuristic)
    const systemPrompt = `You are HELA AI OS Assignment Agent. 
Write a complete, production-ready, highly accurate academic assignment or code solution for the given prompt.
If the prompt is a coding problem (e.g. LeetCode / HackerRank), provide clean, production-ready Python3 or TypeScript code with full comments and test cases.`;

    const aiGeneratedResponse = await aiService.generateResponse(questionOrTopic, systemPrompt);

    const topic = questionOrTopic.length > 60
      ? questionOrTopic.substring(0, 60) + "..."
      : questionOrTopic;

    return {
      summary: `Real AI Solution for: ${topic}`,
      topic,
      reasoningSteps: [
        "1. Analyzed prompt via AI Service (Gemini / OpenAI / Multi-Agent Engine).",
        "2. Decomposed constraints into logical reasoning steps.",
        "3. Synthesized production solution draft.",
        "4. Prepared clipboard & DOM input injection target.",
      ],
      finalAnswerText: aiGeneratedResponse,
    };
  }
}

export const answerGenerator = new AnswerGenerator();
