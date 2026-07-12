import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2, UserPlus } from "lucide-react";
import { createCandidate } from "@/api/admin";
import { AdminNav } from "@/components/Admin/AdminNav";
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  specialty: "",
  experience_years: "",
  target_countries: [] as string[],
};

export function AddCandidateModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(EMPTY_FORM);

  const mutation = useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-candidates"] });
      onClose();
    },
  });

  const set = (key: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isValid =
    form.name.trim().length > 1 && form.email.trim().length > 3 && form.phone.trim().length > 5;

  return (
    <>
      <AdminNav />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F44]/40 p-6 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-[#0A1F44]">Add Candidate</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 transition hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.name} onChange={set("name")} />
            <Field label="Email" value={form.email} onChange={set("email")} type="email" />
            <Field label="Phone" value={form.phone} onChange={set("phone")} />
            <Field label="Nationality" value={form.nationality} onChange={set("nationality")} />
            <Field label="Specialty" value={form.specialty} onChange={set("specialty")} />
            <Field
              label="Experience (years)"
              value={form.experience_years}
              onChange={set("experience_years")}
              type="number"
            />
          </div>

          {mutation.isError && (
            <p className="mt-3 text-sm text-red-500">
              Something went wrong. Please check the fields and try again.
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                mutation.mutate({
                  ...form,
                  experience_years: Number(form.experience_years) || 0,
                })
              }
              disabled={!isValid || mutation.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2a5c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              Add Candidate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#0A1F44]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
