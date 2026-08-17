import "./AppStore.css";
import {
  Search,
  Download,
  Monitor,
  Code2,
  Globe,
  Database,
  Box,
} from "lucide-react";

export default function AppStore() {
  return (
    <div className="appstore-window">

      <div className="appstore-header">

        <div>
          <h1>App Store</h1>
          <p>Install desktop applications and HELA apps.</p>
        </div>

      </div>

      <div className="appstore-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search applications..."
        />

      </div>

      <div className="app-grid">

        <div className="app-card">

          <Code2 size={34} />

          <h3>Visual Studio Code</h3>

          <p>Code editor</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

        <div className="app-card">

          <Globe size={34} />

          <h3>Google Chrome</h3>

          <p>Web browser</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

        <div className="app-card">

          <Database size={34} />

          <h3>PostgreSQL</h3>

          <p>Database Server</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

        <div className="app-card">

          <Box size={34} />

          <h3>Docker</h3>

          <p>Container Platform</p>

          <button>
            <Download size={16}/>
            Install
          </button>

        </div>

      </div>

      <div className="installed-apps">

        <h2>

          <Monitor size={20}/>

          Installed Applications

        </h2>

        <div className="installed-app">
          HELA Terminal
        </div>

        <div className="installed-app">
          HELA Browser
        </div>

        <div className="installed-app">
          HELA File Explorer
        </div>

      </div>

    </div>
  );
}