import { Badge } from "@/components/ui/badge";

import { candidate } from "./mock";

export function CandidateHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{candidate.name}</h1>

        <p className="text-muted-foreground">{candidate.id}</p>
      </div>

      <Badge className="px-4 py-2">{candidate.status}</Badge>
    </div>
  );
}
