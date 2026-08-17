import "./CyberDashboard.css";
import {
  ShieldAlert,
  Globe,
  Bug,
  Activity,
  TriangleAlert,
  Radar,
  ArrowUpRight,
} from "lucide-react";

export default function CyberDashboard() {
  return (
    <div className="cyber-window">

      <div className="cyber-header">

        <div>
          <h1>Cyber Intelligence Center</h1>
          <p>Live cyber threat monitoring and security intelligence.</p>
        </div>

        <button className="scan-btn">
          Scan Network
        </button>

      </div>

      <div className="cyber-stats">

        <div className="stat-card">
          <ShieldAlert size={32}/>
          <h2>128</h2>
          <span>Threat Alerts</span>
        </div>

        <div className="stat-card">
          <Bug size={32}/>
          <h2>54</h2>
          <span>Critical CVEs</span>
        </div>

        <div className="stat-card">
          <Globe size={32}/>
          <h2>192</h2>
          <span>Countries Monitored</span>
        </div>

        <div className="stat-card">
          <Activity size={32}/>
          <h2>99.98%</h2>
          <span>System Health</span>
        </div>

      </div>

      <div className="cyber-grid">

        <div className="panel">

          <h3>
            <Radar size={18}/>
            Live Threat Feed
          </h3>

          <div className="feed-item">
            <TriangleAlert size={18}/>
            <div>
              <strong>Ransomware Campaign</strong>
              <p>Detected across multiple regions.</p>
            </div>
          </div>

          <div className="feed-item">
            <TriangleAlert size={18}/>
            <div>
              <strong>Zero-Day Vulnerability</strong>
              <p>Critical advisory published.</p>
            </div>
          </div>

          <div className="feed-item">
            <TriangleAlert size={18}/>
            <div>
              <strong>Botnet Activity</strong>
              <p>Traffic spike detected.</p>
            </div>
          </div>

        </div>

        <div className="panel">

          <h3>
            <Globe size={18}/>
            Global Activity
          </h3>

          <div className="map-placeholder">

            <Globe size={80}/>

            <p>Interactive threat map will appear here.</p>

          </div>

        </div>

      </div>

      <div className="intel-panel">

        <h3>
          Recent Intelligence
        </h3>

        <div className="intel-item">
          <span>MITRE ATT&CK techniques updated</span>
          <ArrowUpRight size={18}/>
        </div>

        <div className="intel-item">
          <span>New phishing infrastructure detected</span>
          <ArrowUpRight size={18}/>
        </div>

        <div className="intel-item">
          <span>Government CERT advisory released</span>
          <ArrowUpRight size={18}/>
        </div>

      </div>

    </div>
  );
}