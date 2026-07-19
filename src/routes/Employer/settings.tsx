import { createFileRoute } from "@tanstack/react-router";

import { SettingsTabs } from "@/components/Employer/Settings/SettingsTabs";

export const Route = createFileRoute("/Employer/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-muted-foreground">Manage your company account and preferences.</p>
      </div>

      <SettingsTabs />
    </div>
  );
}
