import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileSettings } from "./ProfileSettings";
import { CompanySettings } from "./CompanySettings";
import { SecuritySettings } from "./SecuritySettings";
import { NotificationSettings } from "./NotificationSettings";
import { TeamSettings } from "./TeamSettings";
import { DocumentsSettings } from "./DocumentsSettings";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { AuditLogSettings } from "./AuditLogSettings";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="profile">Profile</TabsTrigger>

        <TabsTrigger value="company">Company</TabsTrigger>

        <TabsTrigger value="security">Security</TabsTrigger>

        <TabsTrigger value="notifications">Notifications</TabsTrigger>

        <TabsTrigger value="team">Team</TabsTrigger>

        <TabsTrigger value="documents">Documents</TabsTrigger>

        <TabsTrigger value="integrations">Integrations</TabsTrigger>

        <TabsTrigger value="audit">Audit</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="company">
        <CompanySettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="team">
        <TeamSettings />
      </TabsContent>

      <TabsContent value="documents">
        <DocumentsSettings />
      </TabsContent>

      <TabsContent value="integrations">
        <IntegrationsSettings />
      </TabsContent>

      <TabsContent value="audit">
        <AuditLogSettings />
      </TabsContent>
    </Tabs>
  );
}
