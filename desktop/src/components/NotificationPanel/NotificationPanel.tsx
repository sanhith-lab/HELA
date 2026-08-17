import "./NotificationPanel.css";

export default function NotificationPanel() {
  return (
    <div className="notification-panel">

      <h2>Notifications</h2>

      <div className="notification-item">
        <div className="dot green"></div>
        <div>
          <h4>Memory Synced</h4>
          <p>2 min ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="dot blue"></div>
        <div>
          <h4>Research Completed</h4>
          <p>5 min ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="dot yellow"></div>
        <div>
          <h4>Cyber Alert</h4>
          <p>12 min ago</p>
        </div>
      </div>

      <div className="notification-item">
        <div className="dot gray"></div>
        <div>
          <h4>Vision Ready</h4>
          <p>30 min ago</p>
        </div>
      </div>

    </div>
  );
}