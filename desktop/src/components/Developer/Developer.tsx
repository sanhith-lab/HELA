import "./Developer.css";
import {
  Code2,
  Terminal,
  Bug,
  GitBranch,
  FolderOpen,
  Play,
} from "lucide-react";
import { useState } from "react";
import { helaCore } from "../../core/HelaCore";

export default function Developer() {
  const [status, setStatus] = useState("Select a developer tool to start a live workflow.");
  const runTool = async (command: string) => { setStatus("Working…"); const result = await helaCore.execute({ command, source: "text" }); setStatus(result.message); };
  return (
    <div className="developer-window">

      <div className="developer-header">

        <div>
          <h1>Developer Workspace</h1>
          <p>Build, debug and deploy applications with AI.</p>
        </div>

      </div>

      <div className="developer-grid">

        <button type="button" className="developer-card" onClick={() => runTool("write production code") }>
          <Code2 size={34}/>
          <h3>AI Code Assistant</h3>
          <p>Generate and explain code.</p>
        </button>

        <button type="button" className="developer-card" onClick={() => runTool("open developer terminal") }>
          <Terminal size={34}/>
          <h3>Terminal</h3>
          <p>Execute shell commands.</p>
        </button>

        <button type="button" className="developer-card" onClick={() => runTool("debug the current project") }>
          <Bug size={34}/>
          <h3>Debugger</h3>
          <p>Find and fix issues.</p>
        </button>

        <button type="button" className="developer-card" onClick={() => runTool("review git repository changes") }>
          <GitBranch size={34}/>
          <h3>Git Manager</h3>
          <p>Manage repositories.</p>
        </button>

      </div>

      <div className="developer-panel">

        <h2>
          <FolderOpen size={20}/>
          Recent Projects
        </h2>

        <div className="project-item">
          HELA Desktop
        </div>

        <div className="project-item">
          ScamGuard
        </div>

        <div className="project-item">
          AI Voice Assistant
        </div>

        <p style={{ color: "#94a3b8", whiteSpace: "pre-wrap", maxHeight: "180px", overflow: "auto" }}>{status}</p>
        <button type="button" className="run-btn" onClick={() => runTool("run HELA Desktop project") }>
          <Play size={18}/>
          Run Project
        </button>

      </div>

    </div>
  );
}
