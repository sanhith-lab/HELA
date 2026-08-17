export interface MemoryEntry {
  id: string;
  key: string;
  value: string;
  category: "short_term" | "long_term" | "episodic" | "preference";
  timestamp: string;
}

class MemoryEngine {
  private memoryStore: Map<string, MemoryEntry> = new Map();
  private conversationHistory: Array<{ role: "user" | "hela"; content: string; timestamp: string }> = [];

  constructor() {
    // Initialize default memory context
    this.save("user_os", "Windows 11 AI Desktop", "preference");
    this.save("assistant_identity", "HELA AI Operating System / AGI Assistant", "long_term");
  }

  save(key: string, value: string, category: MemoryEntry["category"] = "long_term"): MemoryEntry {
    const entry: MemoryEntry = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      key,
      value,
      category,
      timestamp: new Date().toISOString(),
    };
    this.memoryStore.set(key, entry);
    console.log(`[MemoryEngine] Saved (${category}): ${key} => ${value}`);
    return entry;
  }

  get(key: string): MemoryEntry | undefined {
    return this.memoryStore.get(key);
  }

  addInteraction(role: "user" | "hela", content: string) {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date().toISOString(),
    });
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift(); // Keep short-term buffer capped
    }
  }

  search(query: string): MemoryEntry[] {
    const q = query.toLowerCase();
    return Array.from(this.memoryStore.values()).filter(
      (m) => m.key.toLowerCase().includes(q) || m.value.toLowerCase().includes(q)
    );
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  getAllMemories(): MemoryEntry[] {
    return Array.from(this.memoryStore.values());
  }
}

export const memoryEngine = new MemoryEngine();
