import { ArrowRight, CheckCircle2 } from "lucide-react";

type Row = {
  initials: string;
  role: string;
  meta: string;
  tag: string;
  match: number;
  accent: "brand" | "gold";
};

const rows: Row[] = [
  {
    initials: "RK",
    role: "Registered Nurse — ICU",
    meta: "6 yrs · Kerala, India",
    tag: "DHA Eligible",
    match: 95,
    accent: "brand",
  },
  {
    initials: "PS",
    role: "Site Engineer — Civil",
    meta: "9 yrs · Chennai, India",
    tag: "GCC Exp",
    match: 92,
    accent: "gold",
  },
  {
    initials: "MV",
    role: "OT Technician",
    meta: "4 yrs · Manila, PH",
    tag: "BLS Certified",
    match: 97,
    accent: "brand",
  },
  {
    initials: "AN",
    role: "Anesthesia Nurse",
    meta: "7 yrs · Colombo, LK",
    tag: "SCFHS Licensed",
    match: 98,
    accent: "gold",
  },
];

export function IncomingCandidatesCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative w-full ${compact ? "max-w-[420px]" : "max-w-[460px]"}`}>
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-30px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04]">
        <div className="flex items-center justify-between bg-[color:var(--navy)] px-5 py-3.5 text-white">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
              Incoming Candidates
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Live</span>
        </div>
        <ul className="divide-y divide-[color:var(--brand-soft)]">
          {rows.map((r) => (
            <li key={r.initials} className="flex items-center gap-3 px-5 py-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] font-[family-name:var(--font-display)] text-xs font-bold text-white">
                {r.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-[family-name:var(--font-display)] text-[13.5px] font-semibold text-[color:var(--navy)]">
                  {r.role}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[color:var(--muted-foreground)]">
                  <span className="truncate">{r.meta}</span>
                  <span className="text-[color:var(--brand-soft)]">•</span>
                  <span className="rounded-full bg-[color:var(--brand-soft)] px-2 py-0.5 font-medium text-[color:var(--brand)]">
                    {r.tag}
                  </span>
                </div>
              </div>
              <div
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  r.accent === "gold"
                    ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
                    : "bg-[color:var(--brand)]/10 text-[color:var(--brand)]"
                }`}
              >
                {r.match}% Match
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-[color:var(--brand-soft)] px-5 py-3.5 text-[12px]">
          <span className="text-[color:var(--muted-foreground)]">48h avg. first candidate</span>
          <a
            href="#"
            className="inline-flex items-center gap-1 font-semibold text-[color:var(--brand)] hover:text-[color:var(--navy)]"
          >
            View Talent Pool <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <div className="absolute -bottom-5 left-6 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-12px_rgba(11,31,58,0.35)] ring-1 ring-black/[0.04]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={16} />
        </span>
        <div className="text-[11.5px] leading-tight">
          <div className="font-[family-name:var(--font-display)] font-semibold text-[color:var(--navy)]">
            Just Verified — 12 ICU Nurses
          </div>
          <div className="text-[color:var(--muted-foreground)]">SCFHS Pass · Al Hammadi, KSA</div>
        </div>
      </div>
    </div>
  );
}
