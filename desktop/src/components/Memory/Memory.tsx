import "./Memory.css";
import {
  Brain,
  Database,
  Search,
  Clock3,
  Network,
  Trash2,
} from "lucide-react";

export default function Memory() {
  return (
    <div className="memory-window">

      <div className="memory-header">

        <div>
          <h1>Memory Workspace</h1>
          <p>Manage conversations, knowledge and long-term memory.</p>
        </div>

      </div>

      <div className="memory-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search memories..."
        />

      </div>

      <div className="memory-grid">

        <div className="memory-card">
          <Brain size={34}/>
          <h3>Long-Term Memory</h3>
          <p>Persistent AI memory.</p>
        </div>

        <div className="memory-card">
          <Database size={34}/>
          <h3>Vector Database</h3>
          <p>Semantic knowledge storage.</p>
        </div>

        <div className="memory-card">
          <Network size={34}/>
          <h3>Memory Graph</h3>
          <p>Relationships between memories.</p>
        </div>

        <div className="memory-card">
          <Clock3 size={34}/>
          <h3>Timeline</h3>
          <p>Conversation history.</p>
        </div>

      </div>

      <div className="memory-panel">

        <h2>Recent Memories</h2>

        <div className="memory-item">
          HELA Project Discussion
        </div>

        <div className="memory-item">
          Cyber Research Notes
        </div>

        <div className="memory-item">
          Assignment History
        </div>

        <button className="clear-btn">
          <Trash2 size={18}/>
          Clear Memory
        </button>

      </div>

    </div>
  );
}