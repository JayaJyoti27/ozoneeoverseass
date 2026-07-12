import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FileText,
  LinkIcon,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { getCandidateProfile, updateResume } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/resume")({
  component: ResumePage,
});

function isValidUrl(value: string) {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function ResumePage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["candidate-resume"],
    queryFn: getCandidateProfile,
  });

  const [cvUrl, setCvUrl] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: updateResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-resume"] });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  useEffect(() => {
    if (data?.cv_url) {
      setCvUrl(data.cv_url);
    }
  }, [data]);

  const hasSavedResume = Boolean(data?.cv_url);
  const urlTouched = cvUrl.length > 0;
  const urlValid = isValidUrl(cvUrl);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  return (
    <>
      <CandidateNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <FileText className="h-3.5 w-3.5" />
              CANDIDATE · RESUME
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Your <span className="text-blue-600">Resume</span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-500">
              Keep an up-to-date resume link so employers can review your background instantly.
            </p>
          </div>

          {/* Status card */}
          <div
            className={`mb-6 flex items-center gap-4 rounded-2xl border p-5 shadow-sm ${
              hasSavedResume
                ? "border-emerald-200 bg-emerald-50/60"
                : "border-amber-200 bg-amber-50/60"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                hasSavedResume ? "bg-emerald-100" : "bg-amber-100"
              }`}
            >
              {hasSavedResume ? (
                <FileCheck2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
            </div>
            <div>
              <p
                className={`font-semibold ${hasSavedResume ? "text-emerald-800" : "text-amber-800"}`}
              >
                {hasSavedResume ? "Resume on file" : "No resume added yet"}
              </p>
              <p
                className={`text-sm ${hasSavedResume ? "text-emerald-700/80" : "text-amber-700/80"}`}
              >
                {hasSavedResume
                  ? "Employers can view this when they open your profile."
                  : "Add a link so employers can review your background."}
              </p>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Resume Link</h2>
            </div>

            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#0A1F44]">
              <LinkIcon className="h-4 w-4 text-blue-500" />
              Resume URL
            </label>
            <input
              className={`w-full rounded-xl border p-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                urlTouched && !urlValid
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
              placeholder="https://drive.google.com/your-resume.pdf"
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
            />
            {urlTouched && !urlValid && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                Enter a valid URL, e.g. a Google Drive or Dropbox share link.
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Tip: use a Google Drive, Dropbox, or direct PDF link with public "anyone with the
              link" access.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-opacity ${
                  showSaved ? "opacity-100 text-emerald-600" : "opacity-0"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Resume saved
              </div>

              <div className="flex flex-wrap gap-3">
                {cvUrl && urlValid && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-[#0A1F44] transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    View Resume
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  onClick={() => mutation.mutate({ cv_url: cvUrl })}
                  disabled={mutation.isPending || !urlValid}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {hasSavedResume ? "Update Resume" : "Save Resume"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {mutation.isError && (
              <p className="mt-3 text-sm text-red-500">
                Something went wrong saving your resume. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
