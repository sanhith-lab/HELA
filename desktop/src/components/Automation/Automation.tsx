import "./Automation.css";
import {
  Workflow,
  Play,
  Clock3,
  Bot,
  Plus,
  History,
} from "lucide-react";

export default function Automation() {
  return (
    <div className="automation-window">

      <div className="automation-header">

        <div>
          <h1>Automation Workspace</h1>
          <p>Create AI workflows and automate repetitive tasks.</p>
        </div>

        <button className="create-btn">
          <Plus size={18}/>
          New Workflow
        </button>

      </div>

      <div className="automation-grid">

        <div className="automation-card">
          <Workflow size={34}/>
          <h3>Workflow Builder</h3>
          <p>Design automation pipelines.</p>
        </div>

        <div className="automation-card">
          <Bot size={34}/>
          <h3>AI Automation</h3>
          <p>Delegate tasks to HELA.</p>
        </div>

        <div className="automation-card">
          <Clock3 size={34}/>
          <h3>Scheduled Tasks</h3>
          <p>Run jobs automatically.</p>
        </div>

        <div className="automation-card">
          <History size={34}/>
          <h3>Execution History</h3>
          <p>Review completed workflows.</p>
        </div>

      </div>

      <div className="automation-panel">

        <h2>Recent Workflows</h2>

        <div className="workflow-item">
          Backup Documents
        </div>

        <div className="workflow-item">
          Daily Cyber News Collection
        </div>

        <div className="workflow-item">
          Assignment Auto Research
        </div>

        <button className="run-btn">
          <Play size={18}/>
          Run Workflow
        </button>

      </div>

    </div>
  );
}