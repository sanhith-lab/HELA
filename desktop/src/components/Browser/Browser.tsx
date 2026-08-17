import "./Browser.css";
import { useState, useEffect } from "react";
import {
  Globe,
  Search,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Shield,
  PanelsTopLeft,
  FileText,
  MousePointerClick,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { browserController } from "../../core/BrowserController";
import { helaCore } from "../../core/HelaCore";
import type { PageContent } from "../../services/browser/BrowserService";

export default function Browser() {
  const [url, setUrl] = useState(browserController.getCurrentUrl());
  const [inputUrl, setInputUrl] = useState(browserController.getCurrentUrl());
  const [pageContent, setPageContent] = useState<PageContent | null>(
    browserController.getCurrentPageContent()
  );

  useEffect(() => {
    const unsubscribe = browserController.onPageChange((newUrl, newContent) => {
      setUrl(newUrl);
      setInputUrl(newUrl);
      setPageContent(newContent);
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    if (inputUrl.includes(".") && !inputUrl.includes(" ")) {
      const formattedUrl = inputUrl.startsWith("http")
        ? inputUrl
        : `https://${inputUrl}`;
      browserController.open(formattedUrl);
    } else {
      browserController.search(inputUrl);
    }
  };

  const handleSolveAssignmentClick = () => {
    helaCore.execute({ command: "autofill assignment question", source: "text" });
  };

  return (
    <div className="browser-window">
      <div className="browser-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>HELA AI Browser</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
            Multi-agent browser session with live DOM input analysis & assignment typing assistance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSolveAssignmentClick}
          className="gradient-border-btn"
          style={{
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Sparkles size={16} style={{ color: "#38bdf8" }} />
          <span>Solve & Autofill Assignment</span>
        </button>
      </div>

      <form className="browser-toolbar" onSubmit={handleNavigate}>
        <button className="browser-btn" type="button" onClick={() => browserController.goBack()} title="Back">
          <ArrowLeft size={18} />
        </button>

        <button className="browser-btn" type="button" onClick={() => browserController.goForward()} title="Forward">
          <ArrowRight size={18} />
        </button>

        <button className="browser-btn" type="button" onClick={() => browserController.open(url)}>
          <RefreshCw size={18} />
        </button>

        <div className="address-bar">
          <Globe size={18} />
          <input
            type="text"
            placeholder="Search or enter URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </div>

        <button className="browser-btn" type="submit">
          <Search size={18} />
        </button>
      </form>

      <div className="browser-grid">
        <div
          className="browser-card"
          onClick={() => browserController.search("Latest AGI Architectures 2026")}
        >
          <Search size={30} />
          <h3>AI Research Search</h3>
          <p>Analyze web sources & papers.</p>
        </div>

        <div
          className="browser-card"
          onClick={() => browserController.open("https://academic-portal.edu/assignment")}
        >
          <FileText size={30} />
          <h3>Academic Assignment Portal</h3>
          <p>Scan questions & type answers.</p>
        </div>

        <div
          className="browser-card"
          onClick={() => browserController.open("https://hela-os.internal/security-audit")}
        >
          <Shield size={30} />
          <h3>ScamGuard Security Scan</h3>
          <p>Detect phishing and malicious scripts.</p>
        </div>

        <div className="browser-card" role="button" tabIndex={0} onClick={() => browserController.open("https://hela-os.internal/tabs")}>
          <PanelsTopLeft size={30} />
          <h3>Tab Manager</h3>
          <p>Multi-agent browser sessions active.</p>
        </div>
      </div>

      <div className="browser-preview">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2>Current Web Page View: {pageContent ? pageContent.title : url}</h2>
          <span style={{ fontSize: "0.85rem", color: "#38bdf8", fontFamily: "JetBrains Mono, monospace" }}>{url}</span>
        </div>

        <div className="web-preview" style={{ padding: "1.5rem", background: "rgba(10, 14, 23, 0.9)", borderRadius: "14px", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
          {pageContent ? (
            <div>
              <h3 style={{ color: "#38bdf8", marginBottom: "0.75rem", fontFamily: "Outfit, sans-serif", fontSize: "20px" }}>{pageContent.title}</h3>
              
              {pageContent.headings.map((h, i) => (
                <h4 key={i} style={{ color: "#e2e8f0", marginTop: "1rem", fontSize: "16px" }}>{h}</h4>
              ))}

              <div style={{ margin: "1rem 0" }}>
                {pageContent.paragraphs.map((p, i) => (
                  <p key={i} style={{ color: "#94a3b8", lineHeight: "1.6", marginBottom: "0.5rem", fontSize: "14px" }}>{p}</p>
                ))}
              </div>

              {pageContent.searchResults && <div style={{ display: "grid", gap: "10px", marginTop: "1rem" }}>
                {pageContent.searchResults.map((result) => <button key={result.url} type="button" onClick={() => browserController.open(result.url)} style={{ textAlign: "left", padding: "14px", borderRadius: "10px", border: "1px solid rgba(56,189,248,.18)", background: "rgba(15,23,42,.7)", cursor: "pointer" }}>
                  <strong style={{ color: "#38bdf8", display: "block" }}>{result.title}</strong>
                  <small style={{ color: "#64748b", display: "block", margin: "4px 0" }}>{result.url}</small>
                  <span style={{ color: "#94a3b8" }}>{result.snippet}</span>
                </button>)}
              </div>}

              {pageContent.inputElements.length > 0 && (
                <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(15, 23, 42, 0.8)", borderRadius: "12px", border: "1px dashed rgba(56, 189, 248, 0.4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h4 style={{ color: "#60a5fa", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                      <MousePointerClick size={16} /> Detected Website Form Textarea Target:
                    </h4>
                    <button
                      type="button"
                      onClick={handleSolveAssignmentClick}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Sparkles size={12} /> Auto-Type Solution
                    </button>
                  </div>

                  {pageContent.inputElements.map((el, i) => (
                    <div key={i} style={{ marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontFamily: "JetBrains Mono, monospace" }}>
                          Field ID: #{el.id} ({el.type})
                        </span>
                        {el.value && (
                          <span style={{ color: "#10b981", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
                            <CheckCircle2 size={12} /> HELA Answer Solution Injected
                          </span>
                        )}
                      </div>
                      <textarea
                        readOnly
                        value={el.value || ""}
                        placeholder={el.placeholder}
                        rows={8}
                        style={{
                          width: "100%",
                          marginTop: "0.5rem",
                          padding: "1rem",
                          background: "#030712",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                          borderRadius: "8px",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "13px",
                          lineHeight: "1.6",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: "#64748b" }}>No webpage currently loaded. Use the address bar above to enter a URL or search query.</p>
          )}
        </div>
      </div>
    </div>
  );
}
