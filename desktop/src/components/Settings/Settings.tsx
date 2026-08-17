import "./Settings.css";
import {
  User,
  Palette,
  Shield,
  Mic,
  Cpu,
  KeyRound,
} from "lucide-react";
import { useState } from "react";
import ModelManager from "../ModelManager/ModelManager";

export default function Settings() {
  const [selected, setSelected] = useState<string | null>(null);
  const cards = [
    ["Profile", User, "User account settings."], ["Appearance", Palette, "Themes and interface."],
    ["Voice", Mic, "Speech & assistant voice."], ["AI Models", Cpu, "Select AI providers."],
    ["Security", Shield, "Permissions and privacy."], ["Runtime Config", KeyRound, "View environment-backed model status."],
  ] as const;
  return (
    <div className="settings-window">

      <div className="settings-header">

        <div>
          <h1>Settings</h1>
          <p>Customize HELA and manage your AI environment.</p>
        </div>

      </div>

      <div className="settings-grid">{cards.map(([label, Icon, description]) => <button type="button" className="settings-card" key={label} onClick={() => setSelected(label)}><Icon size={34}/><h3>{label}</h3><p>{description}</p></button>)}</div>

      {selected === "AI Models" || selected === "Runtime Config" ? <ModelManager /> : selected && <div className="settings-panel"><h2>{selected}</h2><p>Settings for {selected} are ready. Use HELA Chat to apply changes through a live workflow.</p><button type="button" onClick={() => setSelected(null)}>Close</button></div>}

      <div className="settings-panel">

        <h2>Quick Settings</h2>

        <div className="settings-item">
          Theme: Dark
        </div>

        <div className="settings-item">
          AI Model: GPT
        </div>

        <div className="settings-item">
          Voice: Female
        </div>

      </div>

    </div>
  );
}
