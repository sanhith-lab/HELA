import "./AgentPanel.css";
import { useState, useEffect } from "react";
import { agentManager, type Agent } from "../../core/AgentManager";
import { Sparkles, Layers, PanelRightClose } from "lucide-react";
import { useAppStore } from "../../store/appStore";

export default function AgentPanel() {
  const toggleAgentPanel = useAppStore((state) => state.toggleAgentPanel);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const unsubscribe = agentManager.onAgentsChanged((updatedAgents) => {
      setAgents(updatedAgents);
    });
    return unsubscribe;
  }, []);

  const categories = ["All", "Executive", "Research", "Browser", "Coding", "Security", "Memory", "Vision"];

  const filteredAgents = selectedCategory === "All"
    ? agents
    : agents.filter((a) => a.category === selectedCategory);

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "Active":
        return "#10b981"; // Emerald Green
      case "Processing":
        return "#3b82f6"; // Blue
      case "Searching":
      case "Thinking":
        return "#c084fc"; // Purple
      case "Ready":
        return "#38bdf8"; // Cyan
      default:
        return "#64748b"; // Gray
    }
  };

  return (
    <aside className="agent-panel">
      <div className="panel-header">
        <div className="panel-title-wrapper">
          <Layers size={18} className="panel-title-icon" />
          <h2>41 AGENTS ECOSYSTEM</h2>
          <button type="button" aria-label="Close agent panel" title="Close agent panel" onClick={toggleAgentPanel} style={{ marginLeft: "auto", width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 8, border: "1px solid rgba(148,163,184,.2)", background: "rgba(255,255,255,.04)", color: "#94a3b8", cursor: "pointer" }}><PanelRightClose size={16} /></button>
        </div>
        <span className="agent-count-badge">
          <Sparkles size={12} /> {agents.length} Online
        </span>
      </div>

      {/* Category Filter Bar */}
      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Agent List */}
      <div className="agent-list">
        {filteredAgents.map((agent) => (
          <div className="agent-card" key={agent.name}>
            <div
              className="agent-dot"
              style={{
                background: getStatusColor(agent.status),
                boxShadow: `0 0 10px ${getStatusColor(agent.status)}`,
              }}
            />

            <div className="agent-info">
              <div className="agent-info-header">
                <h3>{agent.displayName}</h3>
                <span className="category-tag">{agent.category}</span>
              </div>
              <p
                className="agent-status-text"
                style={{ color: getStatusColor(agent.status) }}
              >
                ● {agent.status}
              </p>
              <small style={{ color: "#64748b", fontSize: "10px", letterSpacing: "0.04em" }}>
                {agentManager.getExecutionMode(agent.name).toUpperCase()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
