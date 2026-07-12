import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Building2,
  User,
  Mail,
  Globe2,
  Briefcase,
  Settings2,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Lock,
  KeyRound,
  Bell,
  Users,
  ImageIcon,
  LogOut,
} from "lucide-react";
import { getCompanyProfile, updateCompanyProfile } from "@/api/employer";
import { EmployerNavbar } from "@/components/Employer/EmployerNav";
export const Route = createFileRoute("/Employer/settings")({
  component: SettingsPage,
});

type SettingsForm = {
  company_name: string;
  contact_name: string;
  email: string;
  country: string;
  sector: string;
};

const EMPTY_FORM: SettingsForm = {
  company_name: "",
  contact_name: "",
  email: "",
  country: "",
  sector: "",
};

const UPCOMING_FEATURES = [
  {
    icon: KeyRound,
    title: "Change Password",
    desc: "Update your login credentials securely.",
  },
  {
    icon: Bell,
    title: "Notification Preferences",
    desc: "Control what emails and alerts you receive.",
  },
  {
    icon: Users,
    title: "Team Members",
    desc: "Invite colleagues to manage this account.",
  },
  {
    icon: ImageIcon,
    title: "Company Logo Upload",
    desc: "Add your branding across the platform.",
  },
];

function SettingsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["company-settings"],
    queryFn: getCompanyProfile,
  });

  const [form, setForm] = useState<SettingsForm>(EMPTY_FORM);
  const [showSaved, setShowSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-settings"] });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2500);
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        company_name: data.company_name ?? "",
        contact_name: data.contact_name ?? "",
        email: data.email ?? "",
        country: data.country ?? "",
        sector: data.sector ?? "",
      });
    }
  }, [data]);

  const updateField = (key: keyof SettingsForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-[#0A1F44]" />
      </div>
    );
  }

  return (
    <>
      <EmployerNavbar />
      <div className="relative min-h-screen bg-[#F6F8FC]">
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
              <Settings2 className="h-3.5 w-3.5" />
              EMPLOYER · SETTINGS
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Account <span className="text-blue-600">Settings</span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-500">
              Manage your company information and preferences.
            </p>
          </div>

          {/* Company info card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-[#0A1F44]">Company Information</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Company Name"
                icon={<Building2 className="h-4 w-4" />}
                value={form.company_name}
                onChange={updateField("company_name")}
                placeholder="e.g. Ozone Overseas"
              />
              <Field
                label="Contact Person"
                icon={<User className="h-4 w-4" />}
                value={form.contact_name}
                onChange={updateField("contact_name")}
                placeholder="Full name"
              />
              <Field
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={updateField("email")}
                placeholder="name@company.com"
                type="email"
              />
              <Field
                label="Country"
                icon={<Globe2 className="h-4 w-4" />}
                value={form.country}
                onChange={updateField("country")}
                placeholder="e.g. UAE"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Sector"
                  icon={<Briefcase className="h-4 w-4" />}
                  value={form.sector}
                  onChange={updateField("sector")}
                  placeholder="e.g. Hospitality"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-opacity ${
                  showSaved ? "opacity-100 text-emerald-600" : "opacity-0"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Changes saved
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
                    Save Changes
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {mutation.isError && (
              <p className="mt-3 text-sm text-red-500">
                Something went wrong saving your settings. Please try again.
              </p>
            )}
          </div>

          {/* Coming soon section */}
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-400" />
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                Coming Soon
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {UPCOMING_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 opacity-80 shadow-sm transition hover:opacity-100"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <f.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-[#0A1F44]">{f.title}</p>
                      <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Soon
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Logout, kept separate + functional-looking, not locked */}
            <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
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
