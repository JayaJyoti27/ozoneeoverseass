import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  getSettings,
  getCountries,
  getJobCategories,
  getEmailTemplates,
} from "@/lib/admin/settings";

import SettingsTable from "@/components/Admin/SettingsTable";
import { DotGrid, Blob } from "@/components/site/decor";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/Admin/settings/")({
  component: SettingsPage,
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-border bg-white p-6 shadow-[0_12px_40px_-28px_rgba(11,31,58,0.35)]">
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [s, c, j, e] = await Promise.all([
        getSettings(),
        getCountries(),
        getJobCategories(),
        getEmailTemplates(),
      ]);

      setSettings(s);
      setCountries(c);
      setCategories(j);
      setTemplates(e);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero banner — matches Dashboard */}
      <div className="relative overflow-hidden rounded-[28px] bg-blue-wash px-8 py-8">
        <Blob
          className="-right-16 -top-24 h-72 w-72 opacity-60"
          color="var(--color-blue-soft, #DCE9FB)"
        />
        <DotGrid className="left-8 top-6 h-20 w-24 opacity-70" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue backdrop-blur">
            <SettingsIcon className="h-3.5 w-3.5" /> Configuration
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-navy">Settings</h1>
          <p className="mt-1 text-ink">Platform-wide configuration and reference data</p>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="rounded-full bg-blue-wash p-1">
          <TabsTrigger
            value="general"
            className="rounded-full data-[state=active]:bg-navy data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="countries"
            className="rounded-full data-[state=active]:bg-navy data-[state=active]:text-white"
          >
            Countries
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="rounded-full data-[state=active]:bg-navy data-[state=active]:text-white"
          >
            Job Categories
          </TabsTrigger>
          <TabsTrigger
            value="emails"
            className="rounded-full data-[state=active]:bg-navy data-[state=active]:text-white"
          >
            Email Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Panel title="General Settings">
            {settings ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <SettingRow label="Site Name" value={settings.site_name} />
                <SettingRow label="Support Email" value={settings.support_email} />
                <SettingRow label="Support Phone" value={settings.support_phone} />
                <SettingRow label="Company Address" value={settings.company_address} />
              </div>
            ) : (
              <p className="text-sm text-ink">No settings found.</p>
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="countries" className="mt-6">
          <Panel title="Countries">
            <SettingsTable headers={["name"]} rows={countries} />
          </Panel>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <Panel title="Job Categories">
            <SettingsTable headers={["name", "description"]} rows={categories} />
          </Panel>
        </TabsContent>

        <TabsContent value="emails" className="mt-6">
          <Panel title="Email Templates">
            <SettingsTable headers={["name", "subject"]} rows={templates} />
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-blue-wash/40 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-blue">{label}</p>
      <h4 className="mt-1.5 font-semibold text-navy">{value || "-"}</h4>
    </div>
  );
}
