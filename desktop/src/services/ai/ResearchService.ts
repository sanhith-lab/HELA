export interface ResearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function researchTopic(
  query: string
): Promise<ResearchResult[]> {
  console.log("Researching:", query);

  // Web-search API will be connected here.
  // Keeping this separate allows us to change providers later.

  return [];
}