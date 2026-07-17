import { useInterviews } from "@/lib/candidate/hooks";

import InterviewCard from "./InterviewCard";

export default function PastInterviews() {
  const { data } = useInterviews();

  const interviews = data?.filter((i) => i.status === "completed" || i.status === "missed") ?? [];

  if (!interviews.length) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Previous Interviews</h2>

      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
}
