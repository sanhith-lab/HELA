import { browserController } from "../../core/BrowserController";
import type { PageContent } from "../../services/browser/BrowserService";

export interface AnalyzedAssignment {
  questionText: string;
  instructions: string;
  hasInputTarget: boolean;
  targetInputId: string;
  pageTitle: string;
}

export class AssignmentAnalyzer {
  async analyzeActivePage(customPrompt?: string): Promise<AnalyzedAssignment> {
    const page: PageContent = await browserController.analyzeCurrentPage();

    let questionText = customPrompt && customPrompt.trim().length > 5
      ? customPrompt.replace(/hela,|write assignment on|solve assignment|autofill answer|write an essay on/gi, "").trim()
      : "";

    if (!questionText) {
      questionText =
        page.paragraphs.join(" ") ||
        page.headings.join(" ") ||
        "Describe the key architectural differences between a monolithic chatbot and a hierarchical multi-agent AI system.";
    }

    const inputTarget = page.inputElements.find(
      (el) => el.type === "textarea" || el.type === "text"
    );

    return {
      questionText,
      instructions: "Draft a comprehensive, well-reasoned solution.",
      hasInputTarget: true,
      targetInputId: inputTarget?.id || "answer_textarea_q1",
      pageTitle: page.title || "Academic Assignment Portal",
    };
  }
}

export const assignmentAnalyzer = new AssignmentAnalyzer();
