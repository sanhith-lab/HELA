import "./Sidebar.css";
import {
  LayoutDashboard,
  MessageSquare,
  Globe,
  Search,
  Camera,
  Code2,
  Shield,
  Settings,
  Cpu,
  Workflow,
  ListChecks,
  PanelLeftClose,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

export default function Sidebar() {
  const { currentPage, setCurrentPage, toggleSidebar } = useAppStore();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "browser", label: "Browser", icon: Globe },
    { id: "research", label: "Research", icon: Search },
    { id: "vision", label: "Vision", icon: Camera },
    { id: "developer", label: "Developer", icon: Code2 },
    { id: "security", label: "Security", icon: Shield },
    { id: "system", label: "System", icon: Cpu },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "setup", label: "Setup Guide", icon: ListChecks },
  ] as const;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>HELA OS</span>
        <button type="button" className="sidebar-toggle" aria-label="Close navigation panel" title="Close navigation panel" onClick={toggleSidebar}><PanelLeftClose size={17} /></button>
      </div>

      <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              className={`menu-item ${isActive ? "active" : ""}`}
              onClick={() => setCurrentPage(item.id)}
              type="button"
            >
              <IconComponent size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
