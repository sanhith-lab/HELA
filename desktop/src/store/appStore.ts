import { create } from "zustand";

export type Page =
  | "dashboard"
  | "chat"
  | "research"
  | "analytics"
  | "communication"
  | "vision"
  | "media"
  | "developer"
  | "security"
  | "settings"
  | "system"
  | "browser"
  | "workflow"
  | "setup";

export type HELAState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "executing";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  agent?: string;
  timestamp: string;
}

export interface WorkflowStepState {
  id: string;
  label: string;
  agent: string;
  status: "queued" | "running" | "completed" | "failed";
  output?: string;
}

export interface WorkflowRunState {
  id: string;
  command: string;
  status: "idle" | "running" | "completed" | "failed";
  steps: WorkflowStepState[];
  startedAt?: string;
  finishedAt?: string;
  error?: string;
}

interface AppStore {
  currentPage: Page;
  helaState: HELAState;
  messages: ChatMessage[];
  workflowRun: WorkflowRunState | null;
  isAgentPanelOpen: boolean;
  isSidebarOpen: boolean;

  setCurrentPage: (page: Page) => void;
  setHelaState: (state: HELAState) => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  startWorkflow: (run: WorkflowRunState) => void;
  updateWorkflowStep: (stepId: string, update: Partial<WorkflowStepState>) => void;
  finishWorkflow: (status: WorkflowRunState["status"], error?: string) => void;
  setAgentPanelOpen: (open: boolean) => void;
  toggleAgentPanel: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPage: "dashboard",
  helaState: "idle",
  messages: [
    {
      id: "msg-init-1",
      sender: "assistant",
      text: "Greetings! HELA AI Operating System is fully initialized. Ready for voice, text, browser research, and assignment writing commands.",
      agent: "chief_ai",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  workflowRun: null,
  isAgentPanelOpen: typeof window === "undefined" ? true : localStorage.getItem("hela_agent_panel_open") !== "false",
  isSidebarOpen: typeof window === "undefined" ? true : localStorage.getItem("hela_sidebar_open") !== "false",

  setCurrentPage: (page) => set({ currentPage: page }),
  setHelaState: (state) => set({ helaState: state }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),
  startWorkflow: (run) => set({ workflowRun: run, helaState: "executing" }),
  updateWorkflowStep: (stepId, update) => set((state) => ({
    workflowRun: state.workflowRun ? {
      ...state.workflowRun,
      steps: state.workflowRun.steps.map((step) => step.id === stepId ? { ...step, ...update } : step),
    } : null,
  })),
  finishWorkflow: (status, error) => set((state) => ({
    helaState: status === "completed" ? "speaking" : "idle",
    workflowRun: state.workflowRun ? { ...state.workflowRun, status, error, finishedAt: new Date().toISOString() } : null,
  })),
  setAgentPanelOpen: (open) => { if (typeof window !== "undefined") localStorage.setItem("hela_agent_panel_open", String(open)); set({ isAgentPanelOpen: open }); },
  toggleAgentPanel: () => set((state) => { const open = !state.isAgentPanelOpen; if (typeof window !== "undefined") localStorage.setItem("hela_agent_panel_open", String(open)); return { isAgentPanelOpen: open }; }),
  setSidebarOpen: (open) => { if (typeof window !== "undefined") localStorage.setItem("hela_sidebar_open", String(open)); set({ isSidebarOpen: open }); },
  toggleSidebar: () => set((state) => { const open = !state.isSidebarOpen; if (typeof window !== "undefined") localStorage.setItem("hela_sidebar_open", String(open)); return { isSidebarOpen: open }; }),
}));
