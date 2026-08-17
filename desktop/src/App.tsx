import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AgentPanel from "./components/AgentPanel";
import PageRenderer from "./components/PageRenderer";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useAppStore } from "./store/appStore";

function App() {
  const { isAgentPanelOpen, toggleAgentPanel, isSidebarOpen, toggleSidebar } = useAppStore();
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#050505",
        overflow: "hidden",
      }}
    >
      {isSidebarOpen ? <Sidebar /> : <button type="button" aria-label="Open navigation panel" title="Open navigation panel" onClick={toggleSidebar} style={{ position: "fixed", left: 16, top: 84, zIndex: 30, width: 42, height: 42, borderRadius: "12px", border: "1px solid rgba(56,189,248,.45)", background: "rgba(8,12,22,.9)", color: "#38bdf8", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,.35)" }}><PanelLeftOpen size={19} /></button>}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Topbar />

        <PageRenderer />
      </div>

      {isAgentPanelOpen ? <AgentPanel /> : <button type="button" aria-label="Open agent panel" title="Open agent panel" onClick={toggleAgentPanel} style={{ position: "fixed", right: 16, top: 84, zIndex: 30, width: 42, height: 42, borderRadius: "12px", border: "1px solid rgba(56,189,248,.45)", background: "rgba(8,12,22,.9)", color: "#38bdf8", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,.35)" }}><PanelRightOpen size={19} /></button>}
    </div>
  );
}

export default App;
