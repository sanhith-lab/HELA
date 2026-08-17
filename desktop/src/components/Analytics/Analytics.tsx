import "./Analytics.css";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  FileBarChart,
  Download,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="analytics-window">

      <div className="analytics-header">

        <div>
          <h1>Analytics Workspace</h1>
          <p>AI-powered dashboards, reports and insights.</p>
        </div>

      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <BarChart3 size={34}/>
          <h3>Dashboards</h3>
          <p>Interactive visual analytics.</p>
        </div>

        <div className="analytics-card">
          <PieChart size={34}/>
          <h3>Charts</h3>
          <p>Generate dynamic graphs.</p>
        </div>

        <div className="analytics-card">
          <TrendingUp size={34}/>
          <h3>Predictions</h3>
          <p>AI forecasting engine.</p>
        </div>

        <div className="analytics-card">
          <Activity size={34}/>
          <h3>Live Metrics</h3>
          <p>Monitor real-time activity.</p>
        </div>

      </div>

      <div className="analytics-panel">

        <h2>
          <FileBarChart size={20}/>
          Recent Reports
        </h2>

        <div className="analytics-item">
          Weekly Performance Report
        </div>

        <div className="analytics-item">
          System Usage Statistics
        </div>

        <div className="analytics-item">
          AI Agent Performance
        </div>

        <button className="export-btn">
          <Download size={18}/>
          Export Dashboard
        </button>

      </div>

    </div>
  );
}