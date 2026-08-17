import "./Chat.css";
import Message from "../Message";
import CommandBar from "../CommandBar";
import { useAppStore } from "../../store/appStore";
import { useEffect, useRef } from "react";
import { Bot, User, Trash2 } from "lucide-react";

export default function Chat() {
  const { messages, clearMessages } = useAppStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>HELA Chat Interface</h2>
            <p>Interactive AGI Operating System Dialogue</p>
          </div>
          <button
            type="button"
            className="clear-chat-btn"
            onClick={clearMessages}
            title="Clear Chat History"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#94a3b8",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
            }}
          >
            <Trash2 size={14} /> Clear History
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "4px",
                fontSize: "11px",
                color: "#64748b",
                fontFamily: "JetBrains Mono, monospace",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.sender === "user" ? (
                <>
                  <span>YOU</span>
                  <User size={12} style={{ color: "#38bdf8" }} />
                </>
              ) : (
                <>
                  <Bot size={12} style={{ color: "#a855f7" }} />
                  <span>HELA [{msg.agent ? msg.agent.toUpperCase() : "AGI"}]</span>
                </>
              )}
              <span>• {msg.timestamp}</span>
            </div>
            <Message sender={msg.sender} text={msg.text} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <CommandBar />
      </div>
    </div>
  );
}