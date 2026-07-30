import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useRecommendedJobs } from "@/lib/candidate/hooks";

import JobCard from "./JobCard";

export default function RecommendedJobs() {
  const { data, isLoading } = useRecommendedJobs();

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (!data?.length) {
    return null; // nothing to recommend yet — don't show an empty section
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Recommended for You</h2>
      </div>

      <div className="space-y-4">
        {data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Card>
  );
}
