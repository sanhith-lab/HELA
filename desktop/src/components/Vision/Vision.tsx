import "./Vision.css";
import {
  Camera,
  Image,
  ScanText,
  Video,
  Eye,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { helaCore } from "../../core/HelaCore";

export default function Vision() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("No media selected.");
  const [preview, setPreview] = useState<string | null>(null);
  const analyzeFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result); setPreview(dataUrl); setStatus(`Analyzing ${file.name}…`);
      try { const result = await helaCore.execute({ command: `analyze this uploaded ${file.type.startsWith("image/") ? "image" : "video"}: ${file.name}`, source: "text", context: { attachments: [{ name: file.name, mimeType: file.type, dataUrl }] } }); setStatus(result.message); } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
    }; reader.readAsDataURL(file);
  };
  return (
    <div className="vision-window">

      <div className="vision-header">

        <div>
          <h1>Vision Workspace</h1>
          <p>Computer vision, OCR and media understanding.</p>
        </div>

        <input ref={inputRef} type="file" hidden accept="image/*,video/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) analyzeFile(file); }} />
        <button type="button" className="upload-btn" onClick={() => inputRef.current?.click()}>
          <Upload size={18}/>
          Upload Media
        </button>

      </div>

      <div className="vision-grid">

        <button type="button" className="vision-card" onClick={() => inputRef.current?.click()}>
          <Camera size={34}/>
          <h3>Live Camera</h3>
          <p>Analyze live camera feed.</p>
        </button>

        <button type="button" className="vision-card" onClick={() => inputRef.current?.click()}>
          <Image size={34}/>
          <h3>Image Analysis</h3>
          <p>Detect objects and scenes.</p>
        </button>

        <button type="button" className="vision-card" onClick={() => inputRef.current?.click()}>
          <ScanText size={34}/>
          <h3>OCR Scanner</h3>
          <p>Extract text from images.</p>
        </button>

        <button type="button" className="vision-card" onClick={() => inputRef.current?.click()}>
          <Video size={34}/>
          <h3>Video Intelligence</h3>
          <p>Analyze recorded videos.</p>
        </button>

      </div>

      <div className="vision-panel">

        <h2>
          <Eye size={20}/>
          Recent Analysis
        </h2>

        <div className="vision-item">
          Document OCR Completed
        </div>

        <div className="vision-item">
          Object Detection Finished
        </div>

        <div className="vision-item">{status}</div>
        {preview && <img src={preview} alt="Selected media preview" style={{ maxWidth: "100%", maxHeight: "260px", objectFit: "contain", borderRadius: "12px" }} />}

      </div>

    </div>
  );
}
