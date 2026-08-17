import "./Communication.css";
import {
  Mail,
  MessageSquare,
  Phone,
  Video,
  Bell,
  Send,
} from "lucide-react";

export default function Communication() {
  return (
    <div className="communication-window">

      <div className="communication-header">

        <div>
          <h1>Communication Workspace</h1>
          <p>Emails, messages, calls and notifications.</p>
        </div>

      </div>

      <div className="communication-grid">

        <div className="communication-card">
          <Mail size={34}/>
          <h3>Email</h3>
          <p>Manage emails with AI.</p>
        </div>

        <div className="communication-card">
          <MessageSquare size={34}/>
          <h3>Messages</h3>
          <p>Unified messaging center.</p>
        </div>

        <div className="communication-card">
          <Phone size={34}/>
          <h3>Voice Calls</h3>
          <p>Call management.</p>
        </div>

        <div className="communication-card">
          <Video size={34}/>
          <h3>Video Meetings</h3>
          <p>Join and schedule meetings.</p>
        </div>

      </div>

      <div className="communication-panel">

        <h2>
          <Bell size={20}/>
          Recent Activity
        </h2>

        <div className="communication-item">
          New Email Received
        </div>

        <div className="communication-item">
          Meeting starts in 30 minutes
        </div>

        <div className="communication-item">
          Message sent successfully
        </div>

        <button className="compose-btn">
          <Send size={18}/>
          Compose
        </button>

      </div>

    </div>
  );
}