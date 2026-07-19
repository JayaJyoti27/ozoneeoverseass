import { ReactNode } from "react";
import AppSidebar, { SidebarItem } from "./AppSidebar";
import AppTopbar from "./AppTopbar";

interface AppShellProps {
  title: string;
  items: SidebarItem[];
  user: {
    name: string;
    email: string;
  };
  children: ReactNode;
}

export default function AppShell({ title, items, user, children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar title={title} items={items} user={user} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopbar />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
