import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/employer/api";

type CompanyProfile = {
  contact_person: string;
};

export function HRContactCard() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>HR Contact</CardTitle>
        </CardHeader>

        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>HR Contact</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{profile.contact_person}</h3>

            <p className="text-muted-foreground">HR Contact</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>—</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>—</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
