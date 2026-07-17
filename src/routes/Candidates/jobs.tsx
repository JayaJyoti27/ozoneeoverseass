import { createFileRoute } from "@tanstack/react-router";

import JobFilters from "@/components/Candidate/Jobs/JobFilters";
import JobSearch from "@/components/Candidate/Jobs/JobSearch";
import JobList from "@/components/Candidate/Jobs/JobList";
import SavedJobsSidebar from "@/components/Candidate/Jobs/SavedJobsSidebar";

export const Route = createFileRoute("/Candidates/jobs")({
  component: JobsPage,
});

function JobsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      <div className="space-y-6">
        <JobSearch />

        <JobFilters />

        <SavedJobsSidebar />
      </div>

      <div className="xl:col-span-3">
        <JobList />
      </div>
    </div>
  );
}
