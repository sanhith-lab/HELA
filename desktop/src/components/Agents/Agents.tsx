import "./Agents.css";
import {
  Cpu,
  Search,
  Shield,
  Code2,
  Camera,
  Brain,
  Play,
  Pause,
} from "lucide-react";

export default function Agents() {
  return (
    <div className="agents-window">

      <div className="agents-header">

        <div>
          <h1>AI Agents</h1>
          <p>Manage all HELA autonomous agents.</p>
        </div>

        <button className="create-agent">
          + New Agent
        </button>

      </div>

      <div className="agents-grid">

        <div className="agent-card">

          <div className="agent-icon">
            <Search size={30}/>
          </div>

          <h3>Research Agent</h3>

          <p>
            Searches trusted sources and prepares reports.
          </p>

          <div className="agent-footer">

            <span className="running">
              Running
            </span>

            <button>
              <Pause size={16}/>
            </button>

          </div>

        </div>

        <div className="agent-card">

          <div className="agent-icon">
            <Shield size={30}/>
          </div>

          <h3>Cyber Agent</h3>

          <p>
            Monitors cyber threats and security alerts.
          </p>

          <div className="agent-footer">

            <span className="running">
              Running
            </span>

            <button>
              <Pause size={16}/>
            </button>

          </div>

        </div>

        <div className="agent-card">

          <div className="agent-icon">
            <Camera size={30}/>
          </div>

          <h3>Vision Agent</h3>

          <p>
            Understands images, videos and screenshots.
          </p>

          <div className="agent-footer">

            <span className="stopped">
              Stopped
            </span>

            <button>
              <Play size={16}/>
            </button>

          </div>

        </div>

        <div className="agent-card">

          <div className="agent-icon">
            <Code2 size={30}/>
          </div>

          <h3>Developer Agent</h3>

          <p>
            Writes, reviews and debugs code.
          </p>

          <div className="agent-footer">

            <span className="running">
              Running
            </span>

            <button>
              <Pause size={16}/>
            </button>

          </div>

        </div>

        <div className="agent-card">

          <div className="agent-icon">
            <Brain size={30}/>
          </div>

          <h3>Memory Agent</h3>

          <p>
            Organizes memories and retrieves knowledge.
          </p>

          <div className="agent-footer">

            <span className="running">
              Running
            </span>

            <button>
              <Pause size={16}/>
            </button>

          </div>

        </div>

        <div className="agent-card">

          <div className="agent-icon">
            <Cpu size={30}/>
          </div>

          <h3>Automation Agent</h3>

          <p>
            Executes workflows and background tasks.
          </p>

          <div className="agent-footer">

            <span className="stopped">
              Stopped
            </span>

            <button>
              <Play size={16}/>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}