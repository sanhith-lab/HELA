import { create } from "zustand";

type OrbState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "executing"
  | "sleep";

interface UIStore {

  orbState: OrbState;

  sidebarOpen:boolean;

  setOrbState:(state:OrbState)=>void;

  toggleSidebar:()=>void;

}

export const useUIStore=create<UIStore>((set)=>({

orbState:"idle",

sidebarOpen:true,

setOrbState:(state)=>set({orbState:state}),

toggleSidebar:()=>set((s)=>({sidebarOpen:!s.sidebarOpen}))

}));