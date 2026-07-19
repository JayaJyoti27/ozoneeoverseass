import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  getSettings,
  getCountries,
  getJobCategories,
  getEmailTemplates,
} from "@/lib/admin/settings";

import SettingsTable from "@/components/Admin/SettingsTable";

export const Route = createFileRoute("/Admin/settings/")({
  component: SettingsPage,
});

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
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="jobs">Job Categories</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>

            <CardContent>
              {settings ? (
                <div className="space-y-3">
                  <div>
                    <strong>Site Name:</strong> {settings.site_name}
                  </div>

                  <div>
                    <strong>Support Email:</strong> {settings.support_email}
                  </div>

                  <div>
                    <strong>Support Phone:</strong> {settings.support_phone}
                  </div>

                  <div>
                    <strong>Company Address:</strong> {settings.company_address}
                  </div>
                </div>
              ) : (
                <p>No settings found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>Countries</CardTitle>
            </CardHeader>

            <CardContent>
              <SettingsTable headers={["name"]} rows={countries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Categories</CardTitle>
            </CardHeader>

            <CardContent>
              <SettingsTable headers={["name", "description"]} rows={categories} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>

            <CardContent>
              <SettingsTable headers={["name", "subject"]} rows={templates} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
