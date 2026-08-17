import "./FileExplorer.css";
import {
  Folder,
  FolderOpen,
  FileText,
  Image,
  Video,
  FileCode,
  Download,
} from "lucide-react";

export default function FileExplorer() {
  return (
    <div className="file-window">

      <div className="file-header">
        <h1>File Explorer</h1>

        <button className="upload-btn">
          <Download size={18}/>
          Upload File
        </button>
      </div>

      <div className="folder-grid">

        <div className="folder-card">
          <FolderOpen size={42}/>
          <h3>Projects</h3>
          <span>14 Items</span>
        </div>

        <div className="folder-card">
          <Folder size={42}/>
          <h3>Documents</h3>
          <span>86 Files</span>
        </div>

        <div className="folder-card">
          <Image size={42}/>
          <h3>Images</h3>
          <span>245 Files</span>
        </div>

        <div className="folder-card">
          <Video size={42}/>
          <h3>Videos</h3>
          <span>32 Files</span>
        </div>

      </div>

      <div className="recent-files">

        <h2>Recent Files</h2>

        <div className="recent-file">
          <FileCode size={20}/>
          <span>main.tsx</span>
          <small>Today</small>
        </div>

        <div className="recent-file">
          <FileText size={20}/>
          <span>Cyber_Report.pdf</span>
          <small>Yesterday</small>
        </div>

        <div className="recent-file">
          <Image size={20}/>
          <span>Screenshot.png</span>
          <small>2 days ago</small>
        </div>

      </div>

    </div>
  );
}