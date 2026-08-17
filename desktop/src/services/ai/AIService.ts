export type AIProvider = "gemini" | "openai" | "groq" | "ollama";

export interface AIServiceConfig {
  provider: AIProvider;
  modelName: string;
  baseUrl?: string;
}

export interface AIInputAttachment {
  name: string;
  mimeType: string;
  dataUrl: string;
}

export interface AIRequestContext {
  attachments?: AIInputAttachment[];
}

export class AIQuotaError extends Error {
  retryAfterSeconds?: number;
  constructor(message: string, retryAfterSeconds?: number) {
    super(message);
    this.name = "AIQuotaError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

class AIService {
  private config: AIServiceConfig = {
    provider: "gemini",
    modelName: DEFAULT_GEMINI_MODEL,
  };
  private apiKey = "";

  constructor() {
    // Provider credentials are build-time/server configuration, never browser storage.
    if (typeof import.meta !== "undefined" && import.meta.env) {
      const env = import.meta.env;
      const envProvider = env.VITE_AI_PROVIDER as AIProvider | undefined;
      const credentials: Record<AIProvider, string> = {
        gemini: env.VITE_GEMINI_API_KEY || "",
        openai: env.VITE_OPENAI_API_KEY || "",
        groq: env.VITE_GROQ_API_KEY || "",
        ollama: "local",
      };
      this.config.provider = envProvider || (credentials.gemini ? "gemini" : credentials.openai ? "openai" : credentials.groq ? "groq" : "ollama");
      this.apiKey = credentials[this.config.provider];
      this.config.modelName = env.VITE_AI_MODEL || (this.config.provider === "openai" ? "gpt-4o-mini" : this.config.provider === "groq" ? "llama-3.3-70b-versatile" : this.config.provider === "ollama" ? "llama3" : DEFAULT_GEMINI_MODEL);
    }
  }

  getProvider(): AIProvider {
    return this.config.provider;
  }

  getModelName(): string {
    return this.config.modelName;
  }

  hasActiveKey(): boolean {
    return !!this.apiKey || this.config.provider === "ollama";
  }

  getStatus() {
    return {
      provider: this.config.provider,
      model: this.config.modelName,
      configured: this.hasActiveKey(),
    };
  }

  async testConnection(): Promise<string> {
    return this.generateResponse("Reply with exactly: HELA connection test passed.", "You are a connection test. Do not add anything else.");
  }

  async generateResponse(prompt: string, systemInstruction?: string, context?: AIRequestContext): Promise<string> {
    const apiKey = this.apiKey;
    const provider = this.getProvider();

    if (!apiKey && provider !== "ollama") {
      throw new Error(`No ${provider.toUpperCase()} API key is configured. Open Settings → Models and connect a provider.`);
    }

    console.log(`[AIService] Live request → ${provider}/${this.config.modelName}`);

    const attachments = context?.attachments || [];
    const imageParts = attachments.filter((file) => file.mimeType.startsWith("image/"));

    // 1. GEMINI API DIRECT REST CALL
    if (provider === "gemini" && apiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.modelName || DEFAULT_GEMINI_MODEL}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [
              { text: systemInstruction ? `${systemInstruction}\n\nUser Request: ${prompt}` : prompt },
              ...imageParts.map((file) => ({ inline_data: { mime_type: file.mimeType, data: file.dataUrl.split(",")[1] } })),
            ] }],
          }),
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }
        if (response.status === 429 || data.error?.code === 429 || data.error?.status === "RESOURCE_EXHAUSTED") {
          throw new AIQuotaError(this.formatQuotaMessage(data.error?.message), this.extractRetryAfter(data.error?.message));
        }
        throw new Error(data.error?.message || `Gemini request failed (${response.status}).`);
      } catch (err) {
        if (err instanceof AIQuotaError) throw err;
        throw new Error(`Gemini: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // 2. OPENAI API / GROQ API REST CALL
    if ((provider === "openai" || provider === "groq") && apiKey) {
      try {
        const baseUrl = provider === "groq"
          ? "https://api.groq.com/openai/v1/chat/completions"
          : "https://api.openai.com/v1/chat/completions";

        const model = provider === "groq" ? "llama-3.3-70b-versatile" : (this.config.modelName || "gpt-4o-mini");

        const userContent = imageParts.length && provider === "openai"
          ? [{ type: "text", text: prompt }, ...imageParts.map((file) => ({ type: "image_url", image_url: { url: file.dataUrl } }))]
          : prompt;
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
              { role: "user", content: userContent },
            ],
          }),
        });

        const data = await response.json();
        if (data.choices && data.choices[0]?.message?.content) {
          return data.choices[0].message.content;
        }
        throw new Error(data.error?.message || `${provider} request failed (${response.status}).`);
      } catch (err) {
        throw new Error(`${provider.toUpperCase()}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // 3. OLLAMA LOCAL LLM REST CALL
    if (provider === "ollama") {
      try {
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3",
            prompt: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt,
            stream: false,
          }),
        });
        const data = await response.json();
        if (data.response) {
          return data.response;
        }
        throw new Error(data.error || `Ollama request failed (${response.status}).`);
      } catch (err) {
        throw new Error(`OLLAMA: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  private extractRetryAfter(message?: string): number | undefined {
    const match = message?.match(/retry in\s+([\d.]+)s/i);
    return match ? Math.ceil(Number(match[1])) : undefined;
  }

  private formatQuotaMessage(message?: string): string {
    const seconds = this.extractRetryAfter(message);
    return seconds ? `Gemini quota exceeded. Retry in about ${seconds} seconds, or enable billing/use another provider.` : "Gemini quota exceeded. Check billing or use another provider.";
  }
}

export const aiService = new AIService();
