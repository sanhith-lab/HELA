import "./Research.css";
import {
  Search,
  Globe,
  FileText,
  BookOpen,
  Sparkles,
  Download,
} from "lucide-react";
import { useState } from "react";
import { helaCore } from "../../core/HelaCore";

export default function Research() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState("");
  const runResearch = async (topic = query) => {
    if (!topic.trim()) return;
    setQuery(topic);
    const result = await helaCore.execute({ command: `research ${topic}`, source: "text" });
    setReport(result.message);
  };
  const exportReport = () => {
    if (!report) return;
    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "hela-research-report.txt"; link.click(); URL.revokeObjectURL(link.href);
  };
  return (
    <div className="research-window">

      <div className="research-header">

        <div>
          <h1>Research Workspace</h1>
          <p>AI-powered research, reports and knowledge discovery.</p>
        </div>

      </div>

      <div className="research-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search a topic..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") runResearch(); }}
        />

      </div>

      <div className="research-grid">

        <button type="button" className="research-card" onClick={() => runResearch(query || "latest AI agent architectures")}>
          <Globe size={34}/>
          <h3>Web Research</h3>
          <p>Search trusted websites.</p>
        </button>

        <button type="button" className="research-card" onClick={() => runResearch(query || "document analysis") }>
          <FileText size={34}/>
          <h3>Document Analysis</h3>
          <p>Analyze PDFs and reports.</p>
        </button>

        <button type="button" className="research-card" onClick={() => runResearch(query || "academic research sources") }>
          <BookOpen size={34}/>
          <h3>Academic Sources</h3>
          <p>Research journals and papers.</p>
        </button>

        <button type="button" className="research-card" onClick={() => runResearch(query || "summarize current research") }>
          <Sparkles size={34}/>
          <h3>AI Summary</h3>
          <p>Generate comprehensive reports.</p>
        </button>

      </div>

      <div className="research-panel">

        <h2>Recent Research</h2>

        <div className="research-item">
          Artificial Intelligence Trends
        </div>

        <div className="research-item">
          Cyber Security Report
        </div>

        <div className="research-item">
          Machine Learning Survey
        </div>

        {report && <pre style={{ whiteSpace: "pre-wrap", color: "#94a3b8", maxHeight: "240px", overflow: "auto" }}>{report}</pre>}
        <button type="button" className="export-btn" onClick={exportReport} disabled={!report}>
          <Download size={18}/>
          Export Report
        </button>

      </div>

    </div>
  );
}
