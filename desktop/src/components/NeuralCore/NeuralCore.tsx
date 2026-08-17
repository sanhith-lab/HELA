import "./NeuralCore.css";
import { useAppStore } from "../../store/appStore";
import { useState } from "react";
import { Sparkles, Activity } from "lucide-react";

export interface AgentNode {
  id: string;
  name: string;
  category: string;
  angle: number; // Angle in degrees around orbit
  distance: number; // Radius distance in px
  status: "active" | "ready" | "thinking";
  color: string;
}

export default function NeuralCore() {
  const { helaState } = useAppStore();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  // 18 Constellation Nodes matching Reference Image 2
  const constellationNodes: AgentNode[] = [
    { id: "chief", name: "Chief AI", category: "Executive", angle: 280, distance: 220, status: "active", color: "#38bdf8" },
    { id: "strategist", name: "Strategist", category: "Executive", angle: 320, distance: 235, status: "ready", color: "#38bdf8" },
    { id: "researcher", name: "Researcher", category: "Research", angle: 350, distance: 250, status: "ready", color: "#c084fc" },
    { id: "developer", name: "Developer", category: "Coding", angle: 25, distance: 240, status: "active", color: "#f472b6" },
    { id: "sales", name: "Sales", category: "Communication", angle: 55, distance: 230, status: "ready", color: "#fbbf24" },
    { id: "marketing", name: "Marketing", category: "Communication", angle: 85, distance: 225, status: "ready", color: "#fbbf24" },
    { id: "ops", name: "Ops", category: "System", angle: 110, distance: 220, status: "ready", color: "#34d399" },
    { id: "analytics", name: "Analytics", category: "System", angle: 130, distance: 240, status: "ready", color: "#34d399" },
    { id: "social", name: "Social", category: "Communication", angle: 155, distance: 230, status: "ready", color: "#fbbf24" },
    { id: "crm", name: "CRM", category: "Communication", angle: 175, distance: 245, status: "ready", color: "#38bdf8" },
    { id: "engineering", name: "Engineering", category: "Coding", angle: 195, distance: 240, status: "ready", color: "#f472b6" },
    { id: "calendar", name: "Calendar", category: "System", angle: 215, distance: 255, status: "ready", color: "#34d399" },
    { id: "design", name: "Design", category: "Vision", angle: 235, distance: 235, status: "ready", color: "#38bdf8" },
    { id: "email", name: "Email", category: "Communication", angle: 255, distance: 245, status: "ready", color: "#fbbf24" },
    { id: "memory", name: "Memory", category: "Memory", angle: 15, distance: 260, status: "active", color: "#38bdf8" },
    { id: "editor", name: "Editor", category: "Browser", angle: 40, distance: 265, status: "ready", color: "#c084fc" },
    { id: "finance", name: "Finance", category: "Executive", angle: 300, distance: 250, status: "ready", color: "#38bdf8" },
    { id: "drive", name: "Drive", category: "System", angle: 65, distance: 260, status: "ready", color: "#34d399" },
  ];

  const getStateColor = () => {
    switch (helaState) {
      case "listening":
        return "#ec4899";
      case "thinking":
        return "#a855f7";
      case "executing":
        return "#3b82f6";
      case "speaking":
        return "#10b981";
      default:
        return "#38bdf8";
    }
  };

  const currentColor = getStateColor();

  return (
    <div className="neural-core-constellation">
      {/* SVG Laser Tendrils Connecting Center to Orbiting Agent Nodes */}
      <svg className="tendril-svg-canvas" width="600" height="600" viewBox="0 0 600 600">
        <defs>
          <radialGradient id="centerGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={currentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={currentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="4 6" />
        <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(56, 189, 248, 0.12)" />

        {/* Tendril Lines & Data Pulses */}
        {constellationNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 300 + node.distance * Math.cos(rad);
          const y = 300 + node.distance * Math.sin(rad);
          const isHighlighted = activeNode === node.id || helaState !== "idle";

          return (
            <g key={node.id}>
              <line
                x1="300"
                y1="300"
                x2={x}
                y2={y}
                stroke={isHighlighted ? node.color : "rgba(56, 189, 248, 0.22)"}
                strokeWidth={isHighlighted ? "1.5" : "1"}
                strokeDasharray={isHighlighted ? "none" : "3 4"}
              />
              <circle
                cx={300 + (node.distance * 0.5) * Math.cos(rad)}
                cy={300 + (node.distance * 0.5) * Math.sin(rad)}
                r="2"
                fill={node.color}
                className="data-pulse-dot"
              />
            </g>
          );
        })}
      </svg>

      {/* Orbiting Agent Constellation Nodes */}
      <div className="orbit-nodes-container">
        {constellationNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 300 + node.distance * Math.cos(rad) - 300;
          const y = 300 + node.distance * Math.sin(rad) - 300;

          return (
            <div
              key={node.id}
              className={`constellation-node ${activeNode === node.id ? "active" : ""}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <span
                className="node-dot"
                style={{
                  background: node.color,
                  boxShadow: `0 0 12px ${node.color}`,
                }}
              />
              <span className="node-label" style={{ color: node.color }}>
                {node.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Central AGI Reactor Core (Image 2 Match) */}
      <div className="central-agi-core">
        <div
          className="agi-ambient-ring"
          style={{ background: `radial-gradient(circle, ${currentColor}44 0%, transparent 70%)` }}
        />

        <div className="agi-ring agi-ring-outer" style={{ borderTopColor: currentColor }} />
        <div className="agi-ring agi-ring-middle" />
        <div className="agi-ring agi-ring-inner" style={{ borderBottomColor: currentColor }} />

        <div className="agi-reactor-orb">
          <div className="agi-orb-content">
            <span className="agi-core-icon">
              <Sparkles size={20} style={{ color: currentColor }} />
            </span>
            <strong className="agi-title">HELA AGI</strong>
            <small className="agi-status">{helaState.toUpperCase()}</small>
          </div>
        </div>

        {/* Frequency Soundwave Visualizer Bar (Bottom of Core) */}
        <div className="soundwave-bar">
          <div className="wave-bar bar-1" style={{ background: currentColor }} />
          <div className="wave-bar bar-2" style={{ background: currentColor }} />
          <div className="wave-bar bar-3" style={{ background: currentColor }} />
          <div className="wave-bar bar-4" style={{ background: currentColor }} />
          <div className="wave-bar bar-5" style={{ background: currentColor }} />
        </div>
      </div>

      {/* Node Context Hover Pill */}
      {activeNode && (
        <div className="node-context-hud">
          <Activity size={14} style={{ color: currentColor }} />
          <span>Agent Node: {constellationNodes.find((n) => n.id === activeNode)?.name}</span>
          <small>({constellationNodes.find((n) => n.id === activeNode)?.category})</small>
        </div>
      )}
    </div>
  );
}
