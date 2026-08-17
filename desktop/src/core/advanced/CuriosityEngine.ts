export interface ExplorationTopic {
  id: string;
  topic: string;
  priority: number;
  status: "queued" | "exploring" | "learned";
}

export class CuriosityEngine {
  private queue: ExplorationTopic[] = [];

  enqueueTopic(topic: string, priority = 1) {
    this.queue.push({
      id: `curiosity-${Date.now()}`,
      topic,
      priority,
      status: "queued",
    });
    console.log(`[CuriosityEngine] Enqueued novel concept for background learning: "${topic}"`);
  }

  getCuriosityQueue() {
    return this.queue;
  }
}

export const curiosityEngine = new CuriosityEngine();
