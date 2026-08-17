import "./Terminal.css";
import { Terminal as TerminalIcon, Play, Trash2 } from "lucide-react";

export default function Terminal() {
  return (
    <div className="terminal-window">

      <div className="terminal-header">

        <div className="terminal-title">
          <TerminalIcon size={20} />
          <span>HELA Terminal</span>
        </div>

        <div className="terminal-actions">

          <button>
            <Play size={16} />
            Run
          </button>

          <button className="danger">
            <Trash2 size={16} />
            Clear
          </button>

        </div>

      </div>

      <div className="terminal-screen">

        <p>
          <span className="prompt">hela@os:~$</span> system status
        </p>

        <p>✔ Neural Core Online</p>
        <p>✔ Voice Engine Ready</p>
        <p>✔ Memory Service Active</p>
        <p>✔ Agent Manager Running</p>

        <br />

        <p>
          <span className="prompt">hela@os:~$</span>
          <span className="cursor"></span>
        </p>

      </div>

    </div>
  );
}