import { browserController } from "../../core/BrowserController";

export class InputDetector {
  async typeAnswerIntoPlatform(inputId: string, answerText: string): Promise<boolean> {
    console.log(`[InputDetector] Locating input element #${inputId} on active page...`);

    // 1. Update HELA Browser DOM State
    const result = await browserController.typeIntoInput(inputId, answerText);

    // 2. Copy code directly to system clipboard for instant paste into external website (LeetCode)
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(answerText);
        console.log("[InputDetector] Copied solution code directly to system clipboard.");
      } catch (err) {
        console.warn("[InputDetector] Could not copy to clipboard:", err);
      }
    }

    return result.success;
  }
}

export const inputDetector = new InputDetector();
