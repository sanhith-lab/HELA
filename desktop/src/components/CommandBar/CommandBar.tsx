import "./CommandBar.css";
import {
  Paperclip,
  Mic,
  MicOff,
  Globe,
  Camera,
  Zap,
  SendHorizontal,
} from "lucide-react";
import { useRef, useState } from "react";
import { helaCore } from "../../core/HelaCore";
import { voiceEngine } from "../../services/voice/VoiceEngine";
import { useAppStore } from "../../store/appStore";
import type { AIInputAttachment } from "../../services/ai/AIService";

export default function CommandBar() {
  const [command, setCommand] = useState("");
  const [attachment, setAttachment] = useState<AIInputAttachment | null>(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { helaState, setCurrentPage } = useAppStore();

  const isListening = helaState === "listening";

  const executeCommand = async () => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    if (isSending) return;
    console.log("HELA Command execute:", trimmedCommand);
    setCommand("");
    setIsSending(true);

    try {
      const result = await helaCore.execute({
        command: trimmedCommand,
        source: "text",
        context: attachment ? { attachments: [attachment] } : undefined,
      });
      console.log("HELA Response:", result);
    } finally {
      setAttachment(null);
      setIsSending(false);
    }
  };

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAttachment({ name: file.name, mimeType: file.type, dataUrl: String(reader.result) });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeCommand();
    }
  };

  const toggleVoice = () => {
    voiceEngine.toggleListening();
  };

  return (
    <div className="command-bar">
      <input ref={fileInputRef} type="file" accept="image/*,.txt,.md,.json,.csv,.pdf" hidden onChange={handleAttachment} />
      <button className={`cmd-btn ${attachment ? "active-mic" : ""}`} type="button" title="Attach file / image" onClick={() => fileInputRef.current?.click()}>
        <Paperclip size={18} />
      </button>

      <input
        className="command-input"
        type="text"
        disabled={isSending}
        placeholder={
          isListening
            ? "Listening for voice command... (Say 'HELA ...')"
            : attachment ? `Attached: ${attachment.name} — ask HELA anything...` : "Ask HELA anything..."
        }
        value={command}
        onChange={(event) => setCommand(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className={`cmd-btn ${isListening ? "active-mic" : ""}`}
        type="button"
        onClick={toggleVoice}
        title={isListening ? "Stop Listening" : "Wake HELA Voice"}
        style={isListening ? { color: "#ec4899" } : {}}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      <button
        className="cmd-btn"
        type="button"
        onClick={() => setCurrentPage("browser")}
        title="Open Browser"
      >
        <Globe size={18} />
      </button>

      <button
        className="cmd-btn"
        type="button"
        onClick={() => setCurrentPage("vision")}
        title="Vision Analysis"
      >
        <Camera size={18} />
      </button>

      <button
        className="cmd-btn"
        type="button"
        onClick={() => setCurrentPage("developer")}
        title="Developer Mode"
      >
        <Zap size={18} />
      </button>

      <button className="send-btn" type="button" onClick={executeCommand} disabled={isSending}>
        <SendHorizontal size={18} />
      </button>
    </div>
  );
}
