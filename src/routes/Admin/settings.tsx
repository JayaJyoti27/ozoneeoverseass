import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings2,
  User,
  Building2,
  ShieldCheck,
  Bell,
  Wrench,
  UserCheck,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { AdminNav } from "@/components/Admin/AdminNav";
export const Route = createFileRoute("/Admin/settings")({
  component: SettingsPage,
});

type SaveState = "idle" | "saving" | "saved";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@ozoneoverseas.com",
  });
  const [profileState, setProfileState] = useState<SaveState>("idle");

  const [portal, setPortal] = useState({
    portalName: "Ozone Overseas",
    supportEmail: "support@ozoneoverseas.com",
    contactNumber: "",
  });
  const [portalState, setPortalState] = useState<SaveState>("idle");

  const [security, setSecurity] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [securityState, setSecurityState] = useState<SaveState>("idle");

  const [system, setSystem] = useState({
    emailNotifications: true,
    maintenanceMode: false,
    autoApproveEmployers: false,
  });
  const [confirmMaintenance, setConfirmMaintenance] = useState(false);

  // --- Handlers (stubbed — wire to your real API calls) ---
  const saveWithState = (setState: (s: SaveState) => void, fn?: () => Promise<any>) => {
    setState("saving");
    // TODO: replace with real mutation, e.g. await updateAdminProfile(profile)
    setTimeout(() => {
      setState("saved");
      setTimeout(() => setState("idle"), 2000);
    }, 600);
  };

  const passwordsMatch =
    security.newPassword.length > 0 && security.newPassword === security.confirmPassword;
  const passwordLongEnough = security.newPassword.length >= 8;
  const canSubmitPassword = security.oldPassword.length > 0 && passwordsMatch && passwordLongEnough;

  const toggleMaintenance = () => {
    if (!system.maintenanceMode) {
      setConfirmMaintenance(true);
    } else {
      setSystem({ ...system, maintenanceMode: false });
    }
  };

  return (
    <>
      <AdminNav />
      <div className="relative min-h-screen bg-[#F6F8FC]">
        <div className="pointer-events-none absolute left-6 top-8 grid grid-cols-6 gap-1.5 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#0A1F44]/30" />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              <Settings2 className="h-3.5 w-3.5" />
              ADMIN · SETTINGS
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">
              Platform <span className="text-blue-600">Settings</span>
            </h1>
            <p className="mt-2 max-w-lg text-gray-500">
              Manage your admin profile, portal details, security, and system behavior.
            </p>
          </div>

          <div className="space-y-6">
            {/* Admin Profile */}
            <SettingsCard icon={<User className="h-5 w-5 text-blue-600" />} title="Admin Profile">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  icon={<User className="h-4 w-4" />}
                  value={profile.name}
                  onChange={(v) => setProfile({ ...profile, name: v })}
                />
                <Field
                  label="Email"
                  icon={<Mail className="h-4 w-4" />}
                  value={profile.email}
                  onChange={(v) => setProfile({ ...profile, email: v })}
                  type="email"
                />
              </div>
              <SaveRow
                state={profileState}
                onSave={() => saveWithState(setProfileState)}
                label="Save Profile"
              />
            </SettingsCard>

            {/* Portal Settings */}
            <SettingsCard
              icon={<Building2 className="h-5 w-5 text-blue-600" />}
              title="Portal Settings"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Portal Name"
                  icon={<Building2 className="h-4 w-4" />}
                  value={portal.portalName}
                  onChange={(v) => setPortal({ ...portal, portalName: v })}
                />
                <Field
                  label="Support Email"
                  icon={<Mail className="h-4 w-4" />}
                  value={portal.supportEmail}
                  onChange={(v) => setPortal({ ...portal, supportEmail: v })}
                  type="email"
                />
                <Field
                  label="Contact Number"
                  icon={<Phone className="h-4 w-4" />}
                  value={portal.contactNumber}
                  onChange={(v) => setPortal({ ...portal, contactNumber: v })}
                />
              </div>
              <SaveRow
                state={portalState}
                onSave={() => saveWithState(setPortalState)}
                label="Save Portal"
              />
            </SettingsCard>

            {/* Change Password */}
            <SettingsCard
              icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
              title="Change Password"
            >
              <div className="mb-4 flex items-center justify-end">
                <button
                  onClick={() => setShowPasswords((s) => !s)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-[#0A1F44]"
                >
                  {showPasswords ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  {showPasswords ? "Hide" : "Show"} passwords
                </button>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">
                    Old Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={security.oldPassword}
                    onChange={(e) => setSecurity({ ...security, oldPassword: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">
                    New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 outline-none transition focus:ring-2 ${
                      security.newPassword && !passwordLongEnough
                        ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">
                    Confirm Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-white p-3 text-sm text-gray-800 outline-none transition focus:ring-2 ${
                      security.confirmPassword && !passwordsMatch
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {security.newPassword && !passwordLongEnough && (
                <p className="mt-2 text-xs text-amber-600">
                  Password should be at least 8 characters.
                </p>
              )}
              {security.confirmPassword && !passwordsMatch && (
                <p className="mt-2 text-xs text-red-600">Passwords don't match.</p>
              )}

              <div className="mt-5 flex items-center gap-3">
                <button
                  disabled={!canSubmitPassword || securityState === "saving"}
                  onClick={() => {
                    saveWithState(setSecurityState);
                    setSecurity({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {securityState === "saving" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  Update Password
                </button>
                {securityState === "saved" && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Password updated
                  </span>
                )}
              </div>
            </SettingsCard>

            {/* System */}
            <SettingsCard icon={<Wrench className="h-5 w-5 text-blue-600" />} title="System">
              <div className="space-y-1">
                <ToggleRow
                  icon={<Bell className="h-4 w-4" />}
                  label="Email Notifications"
                  description="Receive email alerts for new applications and requirements."
                  checked={system.emailNotifications}
                  onChange={(v) => setSystem({ ...system, emailNotifications: v })}
                />
                <ToggleRow
                  icon={<Wrench className="h-4 w-4" />}
                  label="Maintenance Mode"
                  description="Takes the public site offline for all visitors. Use with caution."
                  checked={system.maintenanceMode}
                  onChange={toggleMaintenance}
                  danger
                />
                <ToggleRow
                  icon={<UserCheck className="h-4 w-4" />}
                  label="Auto Approve Employers"
                  description="New employer signups skip manual review and go live immediately."
                  checked={system.autoApproveEmployers}
                  onChange={(v) => setSystem({ ...system, autoApproveEmployers: v })}
                />
              </div>
            </SettingsCard>
          </div>
        </div>

        {/* Maintenance mode confirmation */}
        {confirmMaintenance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <button
                  onClick={() => setConfirmMaintenance(false)}
                  className="text-gray-400 transition hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0A1F44]">Enable maintenance mode?</h3>
              <p className="mt-1 text-sm text-gray-500">
                This will take the public site offline for all visitors, including active candidates
                and employers, until you turn it off again.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmMaintenance(false)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSystem({ ...system, maintenanceMode: true });
                    setConfirmMaintenance(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  <Wrench className="h-4 w-4" />
                  Enable
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SettingsCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-bold text-[#0A1F44]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
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
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SaveRow({
  state,
  onSave,
  label,
}: {
  state: SaveState;
  onSave: () => void;
  label: string;
}) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <button
        onClick={onSave}
        disabled={state === "saving"}
        className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "saving" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {label}
      </button>
      {state === "saved" && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Saved
        </span>
      )}
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl px-2 py-3 transition hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            danger ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0A1F44]">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? (danger ? "bg-amber-500" : "bg-[#0A1F44]") : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
