export interface InputElement {
  id: string;
  name?: string;
  type: string;
  placeholder?: string;
  label?: string;
  value?: string;
}

export interface PageContent {
  title: string;
  url: string;
  headings: string[];
  paragraphs: string[];
  inputElements: InputElement[];
  rawText: string;
  searchResults?: SearchResult[];
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

class BrowserService {
  private activeUrl = "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/";
  private pageHistory: string[] = ["https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/"];
  private tabs: Array<{ id: string; url: string; title: string }> = [
    { id: "tab-1", url: "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/", title: "LeetCode 1281" },
  ];

  getActiveUrl(): string {
    return this.activeUrl;
  }

  async searchWeb(query: string): Promise<SearchResult[]> {
    console.log("[BrowserService] Searching web for:", query);

    return [
      {
        title: `${query} - Comprehensive Overview & Research`,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        snippet: `Detailed analytical overview, key concepts, and documented findings regarding ${query}.`,
      },
      {
        title: `Latest Developments in ${query}`,
        url: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
        snippet: `Recent news updates, technological breakthroughs, and industry insights on ${query}.`,
      },
      {
        title: `${query} Guide & Documentation`,
        url: `https://docs.hela-ai.org/${encodeURIComponent(query)}`,
        snippet: `Official reference material and technical specifications for ${query}.`,
      },
    ];
  }

  async navigateTo(url: string): Promise<PageContent> {
    this.activeUrl = url;
    if (!this.pageHistory.includes(url)) {
      this.pageHistory.push(url);
    }
    console.log("[BrowserService] Navigated to:", url);

    const isLeetCode = url.includes("leetcode") || url.includes("subtract-the-product-and-sum");

    let searchQuery = "";
    try {
      const parsed = new URL(url);
      if ((parsed.hostname.includes("bing.com") || parsed.hostname.includes("google.com")) && parsed.pathname.includes("/search")) {
        searchQuery = parsed.searchParams.get("q") || "";
      }
    } catch {
      // The browser can still render non-standard local URLs below.
    }

    if (searchQuery) {
      const searchResults = await this.searchWeb(searchQuery);
      return {
        title: `${url.includes("bing.com") ? "Bing" : "Google"} Search — ${searchQuery}`,
        url,
        headings: [`Search results for “${searchQuery}”`],
        paragraphs: searchResults.map((result) => result.snippet),
        inputElements: [],
        rawText: searchResults.map((result) => `${result.title}. ${result.snippet}`).join(" "),
        searchResults,
      };
    }

    if (isLeetCode) {
      return {
        title: "LeetCode 1281. Subtract the Product and Sum of Digits of an Integer",
        url,
        headings: [
          "1281. Subtract the Product and Sum of Digits of an Integer (Easy)",
          "Problem Statement & Examples",
        ],
        paragraphs: [
          "Given an integer n, return the difference between the product of its digits and the sum of its digits.",
          "Example 1: Input: n = 234. Product = 2 * 3 * 4 = 24. Sum = 2 + 3 + 4 = 9. Result = 24 - 9 = 15.",
          "Example 2: Input: n = 4421. Product = 4 * 4 * 2 * 1 = 32. Sum = 4 + 4 + 2 + 1 = 11. Result = 32 - 11 = 21.",
          "Constraints: 1 <= n <= 10^5",
        ],
        inputElements: [
          {
            id: "leetcode_code_editor_q1281",
            name: "solution_code_editor",
            type: "textarea",
            placeholder: "// HELA Assignment Agent will write and autofill the complete solution code here...",
            label: "LeetCode Solution Editor",
            value: "",
          },
        ],
        rawText:
          "1281. Subtract the Product and Sum of Digits of an Integer. Given an integer n, return the difference between the product of its digits and the sum of its digits. Example 1: n = 234, Output: 15. Example 2: n = 4421, Output: 21.",
      };
    }

    const isAssignment = url.includes("assignment") || url.includes("exam") || url.includes("quiz") || url.includes("edu") || url.includes("academic");

    if (isAssignment) {
      return {
        title: "Academic Assignment Portal — Computer Science & AGI",
        url,
        headings: ["Course: Advanced Artificial Intelligence & Multi-Agent OS", "Question Prompt 1 of 5"],
        paragraphs: [
          "Describe the key architectural differences between a monolithic chatbot and a hierarchical multi-agent AI system.",
          "Ensure your answer covers agent specialization, task routing, executive oversight, and tool integration.",
        ],
        inputElements: [
          {
            id: "answer_textarea_q1",
            name: "question_1_response",
            type: "textarea",
            placeholder: "HELA Assignment Agent will autofill your answer solution draft here upon review...",
            label: "Answer Submission Textarea",
            value: "",
          },
        ],
        rawText:
          "Describe the key architectural differences between a monolithic chatbot and a hierarchical multi-agent AI system.",
      };
    }

    return {
      title: "Webpage",
      url,
      headings: ["Overview", "Key Features", "Technical Specifications"],
      paragraphs: [
        "Automated webpage DOM analysis is ready for this page.",
        "HELA Core Browser Controller active session.",
      ],
      inputElements: [],
      rawText: `Content extracted from ${url}.`,
    };
  }

  getTabs() {
    return this.tabs;
  }
}

export const browserService = new BrowserService();
