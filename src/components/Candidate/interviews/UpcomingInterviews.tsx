import { useInterviews } from "@/lib/candidate/hooks";

import InterviewCard from "./InterviewCard";

export default function UpcomingInterviews() {
  const { data } = useInterviews();

  const interviews = data?.filter((i) => i.status === "scheduled") ?? [];

  if (!interviews.length) {
    return <div className="rounded-xl border p-10 text-center">No upcoming interviews.</div>;
  }

  return (
    <div className="space-y-5">
      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
}
