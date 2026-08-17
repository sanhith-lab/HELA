import "./CyberSecurity.css";
import {
  Shield,
  ScanSearch,
  Globe,
  Bug,
  Activity,
  Search,
} from "lucide-react";

export default function CyberSecurity() {
  return (
    <div className="cyber-window">

      <div className="cyber-header">

        <div>
          <h1>Cyber Security Workspace</h1>
          <p>Threat intelligence, malware analysis and OSINT.</p>
        </div>

      </div>

      <div className="cyber-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search domain, IP or hash..."
        />

      </div>

      <div className="cyber-grid">

        <div className="cyber-card">
          <Shield size={34}/>
          <h3>Threat Monitor</h3>
          <p>Live security events</p>
        </div>

        <div className="cyber-card">
          <Bug size={34}/>
          <h3>Malware Scanner</h3>
          <p>Analyze suspicious files</p>
        </div>

        <div className="cyber-card">
          <Globe size={34}/>
          <h3>OSINT</h3>
          <p>Open source intelligence</p>
        </div>

        <div className="cyber-card">
          <ScanSearch size={34}/>
          <h3>Vulnerability Scan</h3>
          <p>Security assessment</p>
        </div>

      </div>

      <div className="cyber-console">

        <h2>
          <Activity size={20}/>
          Live Security Feed
        </h2>

        <div className="cyber-item">
          Threat intelligence updated.
        </div>

        <div className="cyber-item">
          Malware scan completed.
        </div>

        <div className="cyber-item">
          Network scan running...
        </div>

      </div>

    </div>
  );
}