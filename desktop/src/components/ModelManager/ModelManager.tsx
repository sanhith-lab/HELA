import "./ModelManager.css";
import { CheckCircle2, Cpu, LockKeyhole, Server } from "lucide-react";
import { aiService } from "../../services/ai/AIService";

export default function ModelManager() {
  const status = aiService.getStatus();
  return <div className="model-window">
    <div className="model-header"><h1>AI Runtime Configuration</h1><p style={{ color: "#94a3b8", fontSize: "14px" }}>Provider credentials are loaded from the application environment. They are not entered or stored in the browser.</p></div>
    <div className="model-config-panel" style={{ background: "rgba(13,18,30,.8)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(56,189,248,.2)", marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: status.configured ? "#34d399" : "#fbbf24" }}><CheckCircle2 size={18}/>{status.configured ? "Runtime provider configured" : "No external provider configured"}</div>
      <p style={{ color: "#cbd5e1", marginTop: "14px" }}>Active provider: <strong>{status.provider.toUpperCase()}</strong><br/>Model: <strong>{status.model}</strong></p>
      <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>Set <code>VITE_AI_PROVIDER</code>, <code>VITE_AI_MODEL</code>, and the matching <code>VITE_GEMINI_API_KEY</code>, <code>VITE_OPENAI_API_KEY</code>, or <code>VITE_GROQ_API_KEY</code> before starting Vite. Ollama uses the local <code>llama3</code> model without an API key.</p>
    </div>
    <div className="model-grid">
      <div className="model-card"><Server size={30} style={{ color: "#38bdf8" }}/><h3>Gemini</h3><p>Set VITE_GEMINI_API_KEY and use gemini-3.6-flash.</p></div>
      <div className="model-card"><Cpu size={30} style={{ color: "#a855f7" }}/><h3>OpenAI / Groq</h3><p>Set the matching environment key and provider.</p></div>
      <div className="model-card"><LockKeyhole size={30} style={{ color: "#34d399" }}/><h3>Ollama Local</h3><p>Run Ollama locally with llama3 for private inference.</p></div>
    </div>
  </div>;
}
