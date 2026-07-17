import { useJobs } from "@/lib/candidate/hooks";

import JobCard from "./JobCard";

export default function JobList() {
  const { data, isLoading } = useJobs();

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (!data?.length) {
    return <div className="rounded-xl border p-12 text-center">No jobs found.</div>;
  }

  return (
    <div className="space-y-5">
      {data.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
