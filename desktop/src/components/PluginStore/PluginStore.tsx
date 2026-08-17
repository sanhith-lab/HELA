import "./PluginStore.css";
import {
  Puzzle,
  Search,
  Download,
  CheckCircle,
  Store,
  Cpu,
} from "lucide-react";

export default function PluginStore() {
  return (
    <div className="plugin-window">

      <div className="plugin-header">

        <div>
          <h1>Plugin Store</h1>
          <p>Install plugins, MCP servers and integrations.</p>
        </div>

      </div>

      <div className="plugin-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search plugins..."
        />

      </div>

      <div className="plugin-grid">

        <div className="plugin-card">

          <Puzzle size={34}/>

          <h3>GitHub</h3>

          <p>Repository management</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

        <div className="plugin-card">

          <Store size={34}/>

          <h3>Notion</h3>

          <p>Workspace integration</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

        <div className="plugin-card">

          <Cpu size={34}/>

          <h3>MCP Server</h3>

          <p>External AI tools</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

      </div>

      <div className="installed-section">

        <h2>
          <CheckCircle size={20}/>
          Installed Plugins
        </h2>

        <div className="installed-item">
          <span>Filesystem MCP</span>
          <small>Enabled</small>
        </div>

        <div className="installed-item">
          <span>GitHub Integration</span>
          <small>Enabled</small>
        </div>

        <div className="installed-item">
          <span>Browser Automation</span>
          <small>Enabled</small>
        </div>

      </div>

    </div>
  );
}