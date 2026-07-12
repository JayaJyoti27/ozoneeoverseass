import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  MapPin,
  Check,
  Loader2,
  ArrowLeft,
  ClipboardCheck,
  Search,
  Users,
  FileText,
  Plane,
  Stamp,
  PartyPopper,
} from "lucide-react";
import { getApplicationById } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";
export const Route = createFileRoute("/Candidates/applications/$id")({
  component: ApplicationPage,
});

type ApplicationDetail = {
  job_title: string;
  country: string;
  status: string;
  company_name?: string;
  applied_at?: string;
};

const STAGES = [
  { key: "applied", label: "Applied", icon: ClipboardCheck },
  { key: "screening", label: "Screening", icon: Search },
  { key: "interview", label: "Interview", icon: Users },
  { key: "documentation", label: "Documentation", icon: FileText },
  { key: "visa", label: "Visa", icon: Stamp },
  { key: "travel", label: "Travel", icon: Plane },
  { key: "placed", label: "Placed", icon: PartyPopper },
] as const;

const STATUS_LABEL: Record<string, string> = {
  applied: "Applied",
  screening: "In Screening",
  interview: "Interview Stage",
  documentation: "Documentation",
  visa: "Visa Processing",
  travel: "Travel Arranged",
  placed: "Placed",
};

function ApplicationPage() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  const application = data as ApplicationDetail;
  const currentIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.key === application.status?.toLowerCase()),
  );

  return (
    <>
      <CandidateNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-12">
          {/* Back link */}
          <Link
            to="/Candidates/applications"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#0A1F44]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to applications
          </Link>

          {/* Header */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
            <Briefcase className="h-3.5 w-3.5" />
            APPLICATION DETAILS
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
            {application.job_title}
          </h1>

          {/* Job summary card */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A1F44]">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#0A1F44]">
                    {application.company_name || application.job_title}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    {application.country}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {STATUS_LABEL[application.status?.toLowerCase()] || application.status}
              </span>
            </div>
          </div>

          {/* Timeline card */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-8 text-lg font-bold text-[#0A1F44]">Recruitment Progress</h3>

            <ol className="relative">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isDone = i < currentIndex;
                const isCurrent = i === currentIndex;
                const isLast = i === STAGES.length - 1;

                return (
                  <li key={stage.key} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* connecting line */}
                    {!isLast && (
                      <span
                        className={`absolute left-[19px] top-10 h-full w-0.5 ${
                          isDone ? "bg-[#0A1F44]" : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* icon node */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        isDone
                          ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                          : isCurrent
                            ? "border-blue-500 bg-blue-50 text-blue-600 ring-4 ring-blue-100"
                            : "border-gray-200 bg-white text-gray-300"
                      }`}
                    >
                      {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>

                    <div className="pt-1.5">
                      <p
                        className={`text-sm font-semibold ${
                          isDone || isCurrent ? "text-[#0A1F44]" : "text-gray-400"
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isDone ? "Completed" : isCurrent ? "In progress" : "Upcoming"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
