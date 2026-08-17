import "./Dashboard.css";
import NeuralCore from "../NeuralCore";
import CommandBar from "../CommandBar";
import { useAppStore } from "../../store/appStore";
import { helaCore } from "../../core/HelaCore";
import { aiService } from "../../services/ai/AIService";
import {
  ShieldCheck,
  Zap,
  Search,
  FileText,
  Key,
  Globe,
  Radio,
  Sliders,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const { helaState, setCurrentPage } = useAppStore();

  const handleQuickAction = (prompt: string, page?: string) => {
    if (page === "browser") {
      setCurrentPage("browser");
    }
    helaCore.execute({ command: prompt, source: "text" });
  };

  const hasKey = aiService.hasActiveKey();

  return (
    <main className="dashboard">
      <div className="dashboard-grid" />
      <div className="dashboard-glow" />

      {/* Cyber HUD Multi-Deck Layout (Matching Image 1 & 2) */}
      <div className="cyber-hud-layout">
        {/* Left HUD Panel: System Telemetry & World Intelligence */}
        <aside className="hud-panel left-panel">
          <div className="hud-box gauge-box">
            <div className="hud-box-header">
              <Activity size={14} className="cyan" />
              <span>SYSTEM TELEMETRY</span>
            </div>
            <div className="gauge-grid">
              <div className="circle-gauge">
                <div className="circle-val">14%</div>
                <small>CPU</small>
              </div>
              <div className="circle-gauge purple">
                <div className="circle-val">28%</div>
                <small>RAM</small>
              </div>
              <div className="circle-gauge emerald">
                <div className="circle-val">98%</div>
                <small>NET</small>
              </div>
            </div>
          </div>

          {/* World Intelligence Feed */}
          <div className="hud-box intelligence-box">
            <div className="hud-box-header">
              <Globe size={14} className="purple" />
              <span>WORLD INTELLIGENCE</span>
            </div>
            <ul className="intelligence-feed">
              <li>• Tech Giant announces next-gen AGI kernel...</li>
              <li>• Security Alert: ScamGuard detected 0 vulnerabilities...</li>
              <li>• Quantum Computing benchmark updated...</li>
              <li>• Academic Assignment Portal active on port 443...</li>
            </ul>
          </div>
        </aside>

        {/* Center Main Stage: Constellation AGI Reactor Core & Command Bar */}
        <section className="hud-center">
          {/* Welcome Header */}
          <div className="welcome">
            <div className="status-pill-group">
              <span className="status-pill">
                <span className="status-indicator-dot" />
                AGI KERNEL {helaState.toUpperCase()}
              </span>

              <button
                type="button"
                className="api-key-badge-btn"
                onClick={() => setCurrentPage("settings")}
                title="View runtime provider configuration"
              >
                <Key size={12} />
                {hasKey ? `RUNTIME LIVE (${aiService.getProvider().toUpperCase()})` : "CONFIGURE RUNTIME ENVIRONMENT"}
              </button>
            </div>

            <h1 className="welcome-title">
              Welcome Back, <span className="gradient-text">Chief Operator</span>
            </h1>
            <p className="welcome-subtitle">
              Interactive 41-Agent AGI Operating System Ready for Commands.
            </p>
          </div>

          {/* Neural Core Constellation */}
          <div className="orb-container">
            <NeuralCore />
          </div>

          {/* Quick Action Chips */}
          <div className="quick-actions">
            <button
              type="button"
              className="action-chip"
              onClick={() => handleQuickAction("autofill assignment question", "browser")}
            >
              <FileText size={15} className="chip-icon text-cyan" />
              <span>Solve Assignment</span>
            </button>

            <button
              type="button"
              className="action-chip"
              onClick={() => handleQuickAction("research latest AI news")}
            >
              <Search size={15} className="chip-icon text-purple" />
              <span>Deep AI Research</span>
            </button>

            <button
              type="button"
              className="action-chip"
              onClick={() => handleQuickAction("check system security vulnerabilities")}
            >
              <ShieldCheck size={15} className="chip-icon text-emerald" />
              <span>Security Audit</span>
            </button>

            <button
              type="button"
              className="action-chip"
              onClick={() => handleQuickAction("write typescript helper function")}
            >
              <Zap size={15} className="chip-icon text-pink" />
              <span>Write Code</span>
            </button>
          </div>

          {/* Command Input Bar */}
          <div className="command-container">
            <CommandBar />
          </div>
        </section>

        {/* Right HUD Panel: Smart Controls & Sensors */}
        <aside className="hud-panel right-panel">
          <div className="hud-box control-box">
            <div className="hud-box-header">
              <Sliders size={14} className="cyan" />
              <span>SYSTEM CONTROL</span>
            </div>
            <div className="control-item">
              <span>AGI Core Engine</span>
              <span className="badge-active">ONLINE</span>
            </div>
            <div className="control-item">
              <span>ScamGuard Threat Filter</span>
              <span className="badge-active">ACTIVE</span>
            </div>
            <div className="control-item">
              <span>Voice Engine (Female)</span>
              <span className="badge-active">READY</span>
            </div>
          </div>

          <div className="hud-box sensor-box">
            <div className="hud-box-header">
              <Radio size={14} className="emerald" />
              <span>ENVIRONMENT SENSORS</span>
            </div>
            <div className="sensor-grid">
              <div className="sensor-chip">
                <span>API Latency</span>
                <strong>24 ms</strong>
              </div>
              <div className="sensor-chip">
                <span>Thermal</span>
                <strong>38 °C</strong>
              </div>
              <div className="sensor-chip">
                <span>GPU Load</span>
                <strong>12 %</strong>
              </div>
              <div className="sensor-chip">
                <span>Memory Store</span>
                <strong>Active</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
