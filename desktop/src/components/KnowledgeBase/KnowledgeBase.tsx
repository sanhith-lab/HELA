import "./KnowledgeBase.css";
import {
  BookOpen,
  FileText,
  Globe,
  Search,
  Upload,
  Database,
} from "lucide-react";

export default function KnowledgeBase() {
  return (
    <div className="knowledge-window">

      <div className="knowledge-header">

        <div>
          <h1>Knowledge Base</h1>
          <p>Organize documents, research and AI knowledge.</p>
        </div>

        <button className="upload-btn">
          <Upload size={18}/>
          Add Knowledge
        </button>

      </div>

      <div className="knowledge-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search knowledge..."
        />

      </div>

      <div className="knowledge-grid">

        <div className="knowledge-card">
          <BookOpen size={34}/>
          <h3>Books</h3>
          <p>Store digital books.</p>
        </div>

        <div className="knowledge-card">
          <FileText size={34}/>
          <h3>Documents</h3>
          <p>PDFs and notes.</p>
        </div>

        <div className="knowledge-card">
          <Globe size={34}/>
          <h3>Web Sources</h3>
          <p>Saved websites.</p>
        </div>

        <div className="knowledge-card">
          <Database size={34}/>
          <h3>Knowledge Index</h3>
          <p>Semantic search database.</p>
        </div>

      </div>

      <div className="knowledge-panel">

        <h2>Recent Sources</h2>

        <div className="knowledge-item">
          Operating Systems.pdf
        </div>

        <div className="knowledge-item">
          Cyber Security Handbook
        </div>

        <div className="knowledge-item">
          Machine Learning Research
        </div>

      </div>

    </div>
  );
}