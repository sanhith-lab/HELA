import "./SystemMonitor.css";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Activity,
  RefreshCw,
} from "lucide-react";

export default function SystemMonitor() {
  return (
    <div className="system-window">

      <div className="system-header">

        <div>
          <h1>System Monitor</h1>
          <p>Monitor hardware resources and system health.</p>
        </div>

        <button className="refresh-btn">
          <RefreshCw size={18}/>
          Refresh
        </button>

      </div>

      <div className="system-grid">

        <div className="system-card">
          <Cpu size={34}/>
          <h3>CPU</h3>
          <p>Usage: 28%</p>
        </div>

        <div className="system-card">
          <MemoryStick size={34}/>
          <h3>Memory</h3>
          <p>Used: 8.2 GB</p>
        </div>

        <div className="system-card">
          <HardDrive size={34}/>
          <h3>Storage</h3>
          <p>Free: 420 GB</p>
        </div>

        <div className="system-card">
          <Wifi size={34}/>
          <h3>Network</h3>
          <p>Connected</p>
        </div>

      </div>

      <div className="system-panel">

        <h2>
          <Activity size={20}/>
          Live Activity
        </h2>

        <div className="system-item">
          HELA Core Running
        </div>

        <div className="system-item">
          AI Agents Active
        </div>

        <div className="system-item">
          No System Errors
        </div>

      </div>

    </div>
  );
}