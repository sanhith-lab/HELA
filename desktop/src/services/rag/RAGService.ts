export interface RAGDocument {
  id: string;
  title: string;
  content: string;
  chunks: string[];
}

class RAGService {
  private documents: Map<string, RAGDocument> = new Map();

  constructor() {
    this.ingestDocument(
      "hela_architecture_spec",
      "HELA Blueprint & Architecture Specification",
      "HELA is an AI Operating System designed as a hierarchical multi-agent assistant with Chief AI orchestrator, 41 specialized agents, shared BrowserController, MemoryEngine, VoiceEngine, and AssignmentAgent."
    );
  }

  ingestDocument(id: string, title: string, content: string): RAGDocument {
    const chunks = this.chunkText(content, 200);
    const doc: RAGDocument = { id, title, content, chunks };
    this.documents.set(id, doc);
    console.log(`[RAGService] Ingested document '${title}' with ${chunks.length} chunks.`);
    return doc;
  }

  retrieveContext(query: string): string[] {
    const qTerms = query.toLowerCase().split(/\s+/);
    const matchedChunks: Array<{ chunk: string; score: number }> = [];

    for (const doc of this.documents.values()) {
      for (const chunk of doc.chunks) {
        const lower = chunk.toLowerCase();
        let score = 0;
        for (const term of qTerms) {
          if (term.length > 2 && lower.includes(term)) {
            score += 1;
          }
        }
        if (score > 0) {
          matchedChunks.push({ chunk, score });
        }
      }
    }

    matchedChunks.sort((a, b) => b.score - a.score);
    return matchedChunks.map((m) => m.chunk).slice(0, 3);
  }

  private chunkText(text: string, chunkSize: number): string[] {
    const sentences = text.split(/(?<=[.?!])\s+/);
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += " " + sentence;
      }
    }
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    return chunks;
  }
}

export const ragService = new RAGService();
