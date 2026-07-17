import { Outlet } from "@tanstack/react-router";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function CandidateLayout() {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
