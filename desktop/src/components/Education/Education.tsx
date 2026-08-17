import "./Education.css";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Brain,
  Upload,
  Search,
} from "lucide-react";

export default function Education() {
  return (
    <div className="education-window">

      <div className="education-header">

        <div>
          <h1>Education Workspace</h1>
          <p>Assignments, notes, PDFs and AI learning tools.</p>
        </div>

        <button className="upload-btn">
          <Upload size={18}/>
          Upload Material
        </button>

      </div>

      <div className="education-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search notes, assignments or subjects..."
        />

      </div>

      <div className="education-grid">

        <div className="edu-card">
          <GraduationCap size={34}/>
          <h3>Assignment Agent</h3>
          <p>Generate assignment answers.</p>
        </div>

        <div className="edu-card">
          <BookOpen size={34}/>
          <h3>Study Notes</h3>
          <p>Create AI-generated notes.</p>
        </div>

        <div className="edu-card">
          <FileText size={34}/>
          <h3>PDF Analyzer</h3>
          <p>Understand books and documents.</p>
        </div>

        <div className="edu-card">
          <Brain size={34}/>
          <h3>Quiz Generator</h3>
          <p>Create quizzes from any topic.</p>
        </div>

      </div>

      <div className="recent-study">

        <h2>Recent Learning</h2>

        <div className="study-item">
          Operating Systems Assignment
        </div>

        <div className="study-item">
          Machine Learning Notes
        </div>

        <div className="study-item">
          Database Management PDF
        </div>

      </div>

    </div>
  );
}