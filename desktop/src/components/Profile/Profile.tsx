import "./Profile.css";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Award,
  MapPin,
  Edit3,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="profile-window">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={60} />
        </div>

        <div className="profile-info">
          <h1>HELA User</h1>
          <p>AI Operating System Administrator</p>
        </div>

        <button className="edit-profile">
          <Edit3 size={18} />
          Edit Profile
        </button>
      </div>

      <div className="profile-grid">

        <div className="profile-card">
          <Mail size={20} />
          <div>
            <h3>Email</h3>
            <p>user@example.com</p>
          </div>
        </div>

        <div className="profile-card">
          <Shield size={20} />
          <div>
            <h3>Access Level</h3>
            <p>Administrator</p>
          </div>
        </div>

        <div className="profile-card">
          <Calendar size={20} />
          <div>
            <h3>Joined</h3>
            <p>July 2026</p>
          </div>
        </div>

        <div className="profile-card">
          <Award size={20} />
          <div>
            <h3>Status</h3>
            <p>Premium User</p>
          </div>
        </div>

        <div className="profile-card">
          <MapPin size={20} />
          <div>
            <h3>Location</h3>
            <p>India</p>
          </div>
        </div>

      </div>

      <div className="profile-stats">

        <div className="stat-box">
          <h2>124</h2>
          <span>Chats</span>
        </div>

        <div className="stat-box">
          <h2>38</h2>
          <span>Research Tasks</span>
        </div>

        <div className="stat-box">
          <h2>15</h2>
          <span>AI Agents</span>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <span>System Health</span>
        </div>

      </div>
    </div>
  );
}