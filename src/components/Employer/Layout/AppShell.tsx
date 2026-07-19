import { ReactNode } from "react";

import { AppSidebar } from "./AppSidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}

      <AppSidebar />

      {/* Main */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}

        {/* Page */}

        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
