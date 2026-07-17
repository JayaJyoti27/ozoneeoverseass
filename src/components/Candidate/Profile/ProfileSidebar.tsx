import type { Candidate } from "@/lib/candidate/types";

import { Card } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

interface Props {
  candidate: Candidate;
}

export default function ProfileSidebar({ candidate }: Props) {
  return (
    <Card className="sticky top-6 rounded-2xl p-6">
      <h2 className="font-semibold">Profile Completion</h2>

      <Progress className="mt-5" value={candidate.profile_completion} />

      <div className="mt-4 text-center">
        <p className="text-4xl font-bold">{candidate.profile_completion ?? 0}%</p>
      </div>

      <div className="mt-8 space-y-3 text-sm">
        <div>✓ Personal Information</div>

        <div>✓ Contact</div>

        <div>✓ Passport</div>

        <div>✓ Resume</div>

        <div>✓ Experience</div>

        <div>✓ Skills</div>
      </div>
    </Card>
  );
}
