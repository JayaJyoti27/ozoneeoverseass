import { useApplications } from "@/lib/candidate/hooks";

import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  const { data, isLoading } = useApplications();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.length) {
    return <div className="rounded-xl border p-12 text-center">No applications found.</div>;
  }

  return (
    <div className="space-y-5">
      {data.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
}
