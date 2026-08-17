import "./Healthcare.css";
import {
  HeartPulse,
  FileText,
  Activity,
  Pill,
  Upload,
  Search,
} from "lucide-react";

export default function Healthcare() {
  return (
    <div className="healthcare-window">

      <div className="healthcare-header">

        <div>
          <h1>Healthcare Workspace</h1>
          <p>Manage reports, prescriptions and health records.</p>
        </div>

        <button className="upload-btn">
          <Upload size={18}/>
          Upload Report
        </button>

      </div>

      <div className="healthcare-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search reports..."
        />

      </div>

      <div className="healthcare-grid">

        <div className="health-card">
          <HeartPulse size={34}/>
          <h3>Health Summary</h3>
          <p>View overall health insights.</p>
        </div>

        <div className="health-card">
          <FileText size={34}/>
          <h3>Medical Reports</h3>
          <p>Organize uploaded reports.</p>
        </div>

        <div className="health-card">
          <Activity size={34}/>
          <h3>Vitals</h3>
          <p>Track health metrics.</p>
        </div>

        <div className="health-card">
          <Pill size={34}/>
          <h3>Prescriptions</h3>
          <p>Store medication details.</p>
        </div>

      </div>

      <div className="health-records">

        <h2>Recent Records</h2>

        <div className="record-item">
          Blood Test Report
        </div>

        <div className="record-item">
          Annual Health Checkup
        </div>

        <div className="record-item">
          Prescription History
        </div>

      </div>

    </div>
  );
}