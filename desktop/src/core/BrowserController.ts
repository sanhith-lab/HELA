import { browserService, type PageContent } from "../services/browser/BrowserService";

export interface BrowserResult {
  success: boolean;
  message: string;
  url?: string;
  pageContent?: PageContent;
  searchResults?: Array<{ title: string; url: string; snippet: string }>;
}

class BrowserController {
  private currentUrl = "https://academic-portal.edu/assignment";
  private currentPageContent: PageContent | null = null;
  private listeners: Array<(url: string, page: PageContent | null) => void> = [];
  private history: string[] = [this.currentUrl];
  private historyIndex = 0;

  constructor() {
    // Pre-initialize default academic assignment portal
    browserService.navigateTo(this.currentUrl).then((content) => {
      this.currentPageContent = content;
      this.notifyListeners();
    });
  }

  async open(url: string): Promise<BrowserResult> {
    try {
      const pageContent = await browserService.navigateTo(url);
      this.currentUrl = url;
      this.recordHistory(url);
      this.currentPageContent = pageContent;
      this.notifyListeners();

      return {
        success: true,
        message: `Successfully opened ${url}`,
        url,
        pageContent,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message: `Failed to open ${url}: ${errorMsg}`,
      };
    }
  }

  async search(query: string): Promise<BrowserResult> {
    const searchResults = await browserService.searchWeb(query);
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    this.currentUrl = searchUrl;
    this.recordHistory(searchUrl);
    this.currentPageContent = {
      title: `Google Search - ${query}`,
      url: searchUrl,
      headings: [`Search Results for "${query}"`],
      paragraphs: searchResults.map((r) => `${r.title}: ${r.snippet}`),
      inputElements: [],
      rawText: searchResults.map((r) => `${r.title} ${r.snippet}`).join(" "),
      searchResults,
    };

    this.notifyListeners();

    return {
      success: true,
      message: `Search completed for query: "${query}"`,
      url: searchUrl,
      searchResults,
      pageContent: this.currentPageContent,
    };
  }

  async analyzeCurrentPage(): Promise<PageContent> {
    if (!this.currentPageContent) {
      this.currentPageContent = await browserService.navigateTo(this.currentUrl);
    }
    return this.currentPageContent;
  }

  async typeIntoInput(elementId: string, text: string): Promise<{ success: boolean; message: string }> {
    console.log(`[BrowserController] Autofilling element #${elementId} with answer text length ${text.length}`);

    if (!this.currentPageContent) {
      this.currentPageContent = await browserService.navigateTo(this.currentUrl);
    }

    let targetEl = this.currentPageContent.inputElements.find((el) => el.id === elementId);

    if (!targetEl) {
      targetEl = {
        id: elementId,
        type: "textarea",
        placeholder: "Typed answer...",
        value: text,
      };
      this.currentPageContent.inputElements.push(targetEl);
    } else {
      targetEl.value = text;
    }

    this.notifyListeners();

    return {
      success: true,
      message: `Typed answer solution into target element #${elementId} successfully.`,
    };
  }

  getCurrentUrl() {
    return this.currentUrl;
  }

  getCurrentPageContent() {
    return this.currentPageContent;
  }

  onPageChange(listener: (url: string, page: PageContent | null) => void) {
    this.listeners.push(listener);
    listener(this.currentUrl, this.currentPageContent);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l(this.currentUrl, this.currentPageContent));
  }

  async close(): Promise<BrowserResult> {
    this.currentUrl = "";
    this.currentPageContent = null;
    this.notifyListeners();

    return {
      success: true,
      message: "Browser session closed.",
    };
  }

  async goBack() { return this.goToHistory(this.historyIndex - 1); }
  async goForward() { return this.goToHistory(this.historyIndex + 1); }

  private recordHistory(url: string) {
    if (this.history[this.historyIndex] === url) return;
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(url);
    this.historyIndex = this.history.length - 1;
  }

  private async goToHistory(index: number): Promise<BrowserResult> {
    if (index < 0 || index >= this.history.length) return { success: false, message: "No more browser history in this direction." };
    this.historyIndex = index;
    const result = await browserService.navigateTo(this.history[index]);
    this.currentUrl = this.history[index];
    this.currentPageContent = result;
    this.notifyListeners();
    return { success: true, message: `Navigated to ${this.currentUrl}`, url: this.currentUrl, pageContent: result };
  }
}

export const browserController = new BrowserController();
