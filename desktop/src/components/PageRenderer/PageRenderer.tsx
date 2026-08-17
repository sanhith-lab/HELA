import { useAppStore } from "../../store/appStore";

import Dashboard from "../Dashboard/Dashboard";
import Chat from "../Chat/Chat";
import Browser from "../Browser/Browser";
import Research from "../Research/Research";
import Analytics from "../Analytics/Analytics";
import Communication from "../Communication/Communication";
import Vision from "../Vision/Vision";
import MediaStudio from "../MediaStudio/MediaStudio";
import Developer from "../Developer/Developer";
import SecurityCenter from "../SecurityCenter/SecurityCenter";
import Settings from "../Settings/Settings";
import SystemMonitor from "../SystemMonitor/SystemMonitor";
import WorkflowPage from "../Workflow/Workflow";
import SetupGuide from "../SetupGuide/SetupGuide";

export default function PageRenderer() {
  const { currentPage } = useAppStore();

  switch (currentPage) {
    case "dashboard":
      return <Dashboard />;

    case "chat":
      return <Chat />;

    case "browser":
      return <Browser />;

    case "research":
      return <Research />;

    case "analytics":
      return <Analytics />;

    case "communication":
      return <Communication />;

    case "vision":
      return <Vision />;

    case "media":
      return <MediaStudio />;

    case "developer":
      return <Developer />;

    case "security":
      return <SecurityCenter />;

    case "system":
      return <SystemMonitor />;

    case "settings":
      return <Settings />;

    case "workflow":
      return <WorkflowPage />;

    case "setup":
      return <SetupGuide />;

    default:
      return <Dashboard />;
  }
}
