import { Mail, Phone, Globe, Pencil } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import type { Candidate } from "@/lib/candidate/types";

interface Props {
  candidate: Candidate;
}

export default function ProfileHeader({ candidate }: Props) {
  return (
    <div className="rounded-2xl border bg-background p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-3xl">
            {candidate.full_name
              ?.split(" ")
              .map((x) => x[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{candidate.full_name}</h1>

              <p className="text-muted-foreground">Overseas Candidate</p>
            </div>

            <Button>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />

              {candidate.email}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />

              {candidate.phone || "-"}
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />

              {candidate.nationality || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
