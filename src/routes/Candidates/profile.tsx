import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Globe2,
  MapPin,
  Briefcase,
  CalendarClock,
  IdCard,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { getCandidateProfile, updateCandidateProfile } from "@/api/candidate";
import { CandidateNav } from "@/components/Candidate/CandidateNav";

export const Route = createFileRoute("/Candidates/profile")({
  component: CandidateProfilePage,
});

type CandidateForm = {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  current_country: string;
  specialty: string;
  experience_years: string;
};

const EMPTY_FORM: CandidateForm = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  current_country: "",
  specialty: "",
  experience_years: "",
};

function CandidateProfilePage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["candidate-profile"],
    queryFn: getCandidateProfile,
  });

  const [form, setForm] = useState<CandidateForm>(EMPTY_FORM);
  const [showSaved, setShowSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: updateCandidateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        nationality: data.nationality ?? "",
        current_country: data.current_country ?? "",
        specialty: data.specialty ?? "",
        experience_years: String(data.experience_years ?? ""),
      });
    }
  }, [data]);

  const updateField = (key: keyof CandidateForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const filledCount = Object.values(form).filter((v) => v && v.toString().trim().length > 0).length;
  const completionPct = Math.round((filledCount / 7) * 100);
  const isComplete = completionPct === 100;

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
        {/* decorative dotted grid, echoes homepage hero */}
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <IdCard className="h-3.5 w-3.5" />
              CANDIDATE · MY PROFILE
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Your Profile, <span className="text-blue-600">Ready to be Found</span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-500">
              Keep your details current so employers and our matching engine can find you faster.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Left summary card */}
            <div className="h-fit space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A1F44] text-lg font-bold text-white">
                  {form.name?.trim()
                    ? form.name
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((n) => n[0]?.toUpperCase())
                        .join("")
                    : "CA"}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#0A1F44]">
                  {form.name || "Unnamed Candidate"}
                </h3>
                <p className="text-sm text-gray-500">{form.specialty || "Specialty not set"}</p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-blue-500" />
                    {form.email || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-blue-500" />
                    {form.phone || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {form.current_country || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe2 className="h-4 w-4 text-blue-500" />
                    {form.nationality || "—"}
                  </div>
                </div>
              </div>

              {/* Completion / stat card, mirrors homepage stat chips */}
              <div className="rounded-2xl bg-[#0A1F44] p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                  Profile Strength
                </p>
                <p className="mt-1 text-3xl font-extrabold">{completionPct}%</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-blue-400 transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-blue-200/80">
                  {isComplete
                    ? "Your profile is complete and visible to employers."
                    : "Complete every field to appear in employer matches."}
                </p>
              </div>
            </div>

            {/* Right form card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              {/* Personal info */}
              <div className="mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-[#0A1F44]">Personal Information</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  icon={<User className="h-4 w-4" />}
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  icon={<Mail className="h-4 w-4" />}
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder="name@email.com"
                  type="email"
                />
                <Field
                  label="Phone"
                  icon={<Phone className="h-4 w-4" />}
                  value={form.phone}
                  onChange={updateField("phone")}
                  placeholder="+91 00000 00000"
                />
                <Field
                  label="Nationality"
                  icon={<Globe2 className="h-4 w-4" />}
                  value={form.nationality}
                  onChange={updateField("nationality")}
                  placeholder="e.g. Indian"
                />
                <Field
                  label="Current Country"
                  icon={<MapPin className="h-4 w-4" />}
                  value={form.current_country}
                  onChange={updateField("current_country")}
                  placeholder="e.g. UAE"
                />
              </div>

              {/* Professional info */}
              <div className="mb-6 mt-8 flex items-center gap-2 border-t border-gray-100 pt-8">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-[#0A1F44]">Professional Information</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Specialty"
                  icon={<Briefcase className="h-4 w-4" />}
                  value={form.specialty}
                  onChange={updateField("specialty")}
                  placeholder="e.g. Registered Nurse"
                />
                <Field
                  label="Years of Experience"
                  icon={<CalendarClock className="h-4 w-4" />}
                  value={form.experience_years}
                  onChange={updateField("experience_years")}
                  placeholder="e.g. 5"
                  type="number"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
                <div
                  className={`flex items-center gap-2 text-sm font-medium transition-opacity ${
                    showSaved ? "opacity-100 text-emerald-600" : "opacity-0"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Profile saved
                </div>

                <button
                  onClick={() => mutation.mutate(form)}
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save Profile
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {mutation.isError && (
                <p className="mt-3 text-sm text-red-500">
                  Something went wrong saving your profile. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#0A1F44]">
        <span className="text-blue-500">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
