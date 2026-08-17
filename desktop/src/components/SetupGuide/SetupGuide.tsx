import "./SetupGuide.css";
import { Activity, Camera, CheckCircle2, Code2, Lock, Brain, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import { aiService } from "../../services/ai/AIService";

const steps = [
  ["Access the Dashboard", "Open Dashboard → HELA OS AGI CORE ONLINE. Confirm the core status and familiarize yourself with Chat, Browser, Research, Vision, Developer, Security, System, Settings, and Workflow.", Activity, "dashboard"],
  ["Configure Vision Workspace", "Upload media, enable Live Camera, run Image Analysis, OCR Scanner, and Video Intelligence.", Camera, "vision"],
  ["Activate Agents Ecosystem", "Confirm Planner, Task Manager, Conversation, Research, Coding, Security, and Memory agents are Ready or Active. Start with Conversation Agent.", Brain, "chat"],
  ["Enable Coding & Debugging", "Use Coding Agent, Debugging Agent, and Code Review Agent for programming work.", Code2, "developer"],
  ["Set Up Security Monitoring", "Activate Threat Detection, Privacy, and Cyber Analysis workflows.", Lock, "security"],
  ["Utilize Memory & Knowledge Graph", "Use Memory, Context, Knowledge Graph, and RAG agents for persistent context.", Brain, "workflow"],
  ["Run Advanced World Model", "Use World Model, Curiosity, and Dream & Simulation agents for scenario planning.", Globe, "workflow"],
] as const;

export default function SetupGuide() {
  const { setCurrentPage } = useAppStore();
  const [done, setDone] = useState<number[]>([]);
  const status = aiService.getStatus();
  const complete = (index: number, page: typeof steps[number][3]) => { setDone((items) => items.includes(index) ? items : [...items, index]); setCurrentPage(page); };
  return <main className="setup-window"><div className="setup-hero"><div><span className="setup-kicker">HELA AGI OPERATING SYSTEM</span><h1>Startup Setup Guide</h1><p>Follow the seven operating steps to activate HELA’s dashboard, vision, agents, coding, security, memory, and advanced reasoning workspaces.</p></div><div className={`setup-status ${status.configured ? "online" : "attention"}`}><Activity size={18}/>{status.configured ? "AGI CORE ONLINE" : "AGI CORE NEEDS PROVIDER"}</div></div><div className="setup-grid">{steps.map(([title, description, Icon, page], index) => <article className={`setup-step ${done.includes(index) ? "done" : ""}`} key={title}><div className="setup-step-top"><span className="setup-number">{String(index + 1).padStart(2, "0")}</span><Icon size={26}/>{done.includes(index) && <CheckCircle2 size={18} color="#34d399"/>}</div><h2>{title}</h2><p>{description}</p><button type="button" onClick={() => complete(index, page)}>Open Workspace <ArrowRight size={16}/></button></article>)}</div></main>;
}
