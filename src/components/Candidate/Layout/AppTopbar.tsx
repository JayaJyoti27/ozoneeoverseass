import { Bell, Search, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex w-full max-w-md items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />

        <Input placeholder="Search..." className="border-0 shadow-none focus-visible:ring-0" />
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <Button size="icon" variant="ghost">
          <Sun className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
