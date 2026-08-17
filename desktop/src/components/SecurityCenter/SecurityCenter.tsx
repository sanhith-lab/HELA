import "./SecurityCenter.css";
import {
  Shield,
  Lock,
  Bug,
  ScanSearch,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

export default function SecurityCenter() {
  return (
    <div className="security-window">

      <div className="security-header">

        <div>
          <h1>Security Center</h1>
          <p>Protect HELA and monitor your system security.</p>
        </div>

      </div>

      <div className="security-grid">

        <div className="security-card">
          <Shield size={34}/>
          <h3>Threat Monitor</h3>
          <p>Monitor security threats.</p>
        </div>

        <div className="security-card">
          <Lock size={34}/>
          <h3>Permissions</h3>
          <p>Manage application access.</p>
        </div>

        <div className="security-card">
          <Bug size={34}/>
          <h3>Malware Scan</h3>
          <p>Scan suspicious files.</p>
        </div>

        <div className="security-card">
          <ScanSearch size={34}/>
          <h3>Network Scan</h3>
          <p>Inspect network activity.</p>
        </div>

      </div>

      <div className="security-panel">

        <h2>
          <FileCheck size={20}/>
          Security Status
        </h2>

        <div className="security-item">
          System Protected
        </div>

        <div className="security-item">
          Firewall Active
        </div>

        <div className="security-item">
          No Threats Detected
        </div>

        <button className="scan-btn">
          <AlertTriangle size={18}/>
          Start Full Scan
        </button>

      </div>

    </div>
  );
}