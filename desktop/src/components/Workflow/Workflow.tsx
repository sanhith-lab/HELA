import "./Workflow.css";
import { Workflow, Play, Save, Bot, ArrowRight, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { workflowEngine } from "../../core/WorkflowEngine";
import { useAppStore } from "../../store/appStore";

const templates = [
  "Research the latest AI agent market and produce an evidence-based startup brief",
  "Analyze this image and describe the interface, components, and user flows",
  "Review the HELA architecture and propose the highest-priority production fixes",
];

export default function WorkflowPage() {
  const [command, setCommand] = useState("");
  const { workflowRun } = useAppStore();
  const run = async (input = command) => {
    if (!input.trim()) return;
    setCommand(input);
    await workflowEngine.run(input).catch(() => undefined);
  };
  const previewSteps = workflowRun?.steps || [
    { id: "preview", label: "Real agent execution", agent: "router", status: "queued" as const },
    { id: "preview-verify", label: "Verification and synthesis", agent: "chief_ai", status: "queued" as const },
  ];

  return <div className="workflow-window">
    <div className="workflow-header"><div><h1>Workflow Automation</h1><p>Describe an outcome and HELA will execute, verify, and report each live agent step.</p></div><div className="workflow-actions">
      <button type="button" onClick={() => localStorage.setItem("hela_workflow_draft", command)}><Save size={18}/>Save</button>
      <button type="button" onClick={() => run()} disabled={!command.trim() || workflowRun?.status === "running"}><Play size={18}/>Run</button>
    </div></div>
    <div className="workflow-canvas" style={{ flexDirection: "column", padding: "28px" }}>
      <div style={{ width: "100%", display: "flex", gap: "10px" }}><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Describe the outcome you want HELA to execute..." style={{ flex: 1, padding: "14px 16px", borderRadius: "10px", border: "1px solid rgba(56,189,248,.3)", background: "#0b1220", color: "white" }} /><button type="button" onClick={() => run()} disabled={!command.trim() || workflowRun?.status === "running"} style={{ background: "#0ea5e9", color: "white", border: 0, borderRadius: "10px", padding: "0 20px", cursor: "pointer" }}>Execute</button></div>
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>{previewSteps.map((step, index) => <div key={step.id} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div className="workflow-node" style={{ border: step.status === "running" ? "1px solid #38bdf8" : undefined, opacity: step.status === "queued" ? .65 : 1 }}>{step.status === "running" ? <LoaderCircle size={28} className="spin" /> : step.status === "completed" ? <CheckCircle2 size={28} color="#34d399" /> : step.status === "failed" ? <XCircle size={28} color="#fb7185" /> : <Bot size={28} />}<span>{step.label}</span><small style={{ color: "#94a3b8" }}>{step.agent}</small></div>
        {index < previewSteps.length - 1 && <ArrowRight size={28} className="workflow-arrow" />}</div>)}</div>
      {workflowRun?.error && <div style={{ color: "#fb7185", width: "100%" }}>Run failed: {workflowRun.error}</div>}
    </div>
    <div className="workflow-library"><h2><Workflow size={20}/>Workflow Templates</h2>{templates.map((template) => <button type="button" className="template-card" key={template} onClick={() => run(template)}>{template}</button>)}</div>
  </div>;
}
