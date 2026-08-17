import "./Topbar.css";
import { Bell, Mic, Settings, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { voiceEngine } from "../../services/voice/VoiceEngine";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <h1>HELA OS</h1>
        </div>

        <div className="online-pill">
          <span className="online-dot" />
          <span>AGI CORE ONLINE</span>
        </div>
      </div>

      <div className="search-box">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search commands, 41 agents, memories, files..."
        />
      </div>

      <div className="topbar-right">
        <button type="button" title="System Security Active">
          <ShieldCheck size={18} style={{ color: "#10b981" }} />
        </button>

        <button type="button" title="Notifications">
          <Bell size={18} />
        </button>

        <button
          type="button"
          title="Toggle Voice Engine"
          onClick={() => voiceEngine.toggleListening()}
        >
          <Mic size={18} />
        </button>

        <button type="button" title="Settings">
          <Settings size={18} />
        </button>

        <div className="avatar" title="Chief Operator">
          H
        </div>

        <div className="clock">{time}</div>
      </div>
    </header>
  );
}