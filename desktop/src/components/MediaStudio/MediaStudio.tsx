import "./MediaStudio.css";
import {
  Image,
  Video,
  Music4,
  Mic,
  Wand2,
  Download,
} from "lucide-react";

export default function MediaStudio() {
  return (
    <div className="media-window">

      <div className="media-header">

        <div>
          <h1>Media Studio</h1>
          <p>Create, edit and enhance multimedia using AI.</p>
        </div>

      </div>

      <div className="media-grid">

        <div className="media-card">
          <Image size={34}/>
          <h3>Images</h3>
          <p>Edit and generate images.</p>
        </div>

        <div className="media-card">
          <Video size={34}/>
          <h3>Videos</h3>
          <p>Edit and enhance videos.</p>
        </div>

        <div className="media-card">
          <Music4 size={34}/>
          <h3>Audio</h3>
          <p>Music and sound processing.</p>
        </div>

        <div className="media-card">
          <Mic size={34}/>
          <h3>Voice Studio</h3>
          <p>Speech generation and cloning.</p>
        </div>

      </div>

      <div className="media-panel">

        <h2>
          <Wand2 size={20}/>
          Recent Projects
        </h2>

        <div className="media-item">
          AI Generated Image
        </div>

        <div className="media-item">
          Podcast Recording
        </div>

        <div className="media-item">
          Video Enhancement
        </div>

        <button className="export-btn">
          <Download size={18}/>
          Export
        </button>

      </div>

    </div>
  );
}