import "./Robotics.css";
import {
  Bot,
  Gamepad2,
  Camera,
  Radio,
  Cpu,
  Play,
} from "lucide-react";

export default function Robotics() {
  return (
    <div className="robotics-window">

      <div className="robotics-header">

        <div>
          <h1>Robotics Workspace</h1>
          <p>Control robots, drones and IoT devices.</p>
        </div>

        <button className="connect-btn">
          <Radio size={18}/>
          Connect Device
        </button>

      </div>

      <div className="robot-grid">

        <div className="robot-card">
          <Bot size={34}/>
          <h3>Robot Status</h3>
          <p>Connected</p>
        </div>

        <div className="robot-card">
          <Camera size={34}/>
          <h3>Vision Feed</h3>
          <p>Live Camera</p>
        </div>

        <div className="robot-card">
          <Gamepad2 size={34}/>
          <h3>Manual Control</h3>
          <p>Joystick Mode</p>
        </div>

        <div className="robot-card">
          <Cpu size={34}/>
          <h3>AI Navigation</h3>
          <p>Enabled</p>
        </div>

      </div>

      <div className="robot-console">

        <h2>Mission Console</h2>

        <div className="mission-item">
          Patrol Area A
        </div>

        <div className="mission-item">
          Object Detection
        </div>

        <div className="mission-item">
          Return to Base
        </div>

        <button className="start-btn">
          <Play size={18}/>
          Start Mission
        </button>

      </div>

    </div>
  );
}