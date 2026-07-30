import type { Candidate } from "@/lib/candidate/types";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useDocuments, useProfileCompletion } from "@/lib/candidate/hooks";

interface Props {
  candidate: Candidate;
}

export default function ProfileSidebar({ candidate }: Props) {
  const { data: completion } = useProfileCompletion();
  const { data: documents } = useDocuments();

  const percent = completion?.completion ?? 0;

  const checklist = [
    { label: "Personal Information", done: Boolean(candidate.full_name && candidate.phone) },
    { label: "Passport", done: Boolean(candidate.passport_number) },
    { label: "Resume", done: Boolean(documents?.some((d) => d.document_type === "resume")) },
    { label: "Experience", done: Boolean(candidate.experience?.length) },
    { label: "Education", done: Boolean(candidate.education?.length) },
    { label: "Skills", done: Boolean(candidate.skills?.length) },
  ];

  return (
    <Card className="sticky top-6 rounded-2xl p-6">
      <h2 className="font-semibold">Profile Completion</h2>

      <div className="mt-8 space-y-3 text-sm">
        {checklist.map((item) => (
          <div key={item.label} className={item.done ? "" : "text-muted-foreground"}>
            {item.done ? "✓" : "○"} {item.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
