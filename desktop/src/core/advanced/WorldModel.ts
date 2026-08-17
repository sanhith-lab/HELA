export interface SystemNode {
  id: string;
  name: string;
  type: "application" | "service" | "user_concept" | "file" | "device";
  attributes: Record<string, unknown>;
}

export class WorldModel {
  private nodes: Map<string, SystemNode> = new Map();
  private edges: Array<{ from: string; to: string; relation: string }> = [];

  constructor() {
    this.addNode({ id: "os_node", name: "HELA AI OS Core", type: "service", attributes: { version: "2.0.0" } });
    this.addNode({ id: "user_twin", name: "User Digital Twin", type: "user_concept", attributes: { role: "Administrator" } });
  }

  addNode(node: SystemNode) {
    this.nodes.set(node.id, node);
  }

  addEdge(from: string, to: string, relation: string) {
    this.edges.push({ from, to, relation });
  }

  getWorldStateSummary() {
    return {
      totalNodes: this.nodes.size,
      totalEdges: this.edges.length,
      nodes: Array.from(this.nodes.values()),
    };
  }
}

export const worldModel = new WorldModel();
