import { Check } from "lucide-react";

type Step = { label: string; sub: string; state: "done" | "active" | "upcoming" };

const STEPS: Step[] = [
  { label: "Applied", sub: "Day 1", state: "done" },
  { label: "Verified", sub: "Week 1", state: "done" },
  { label: "Visa", sub: "Week 6 · in progress", state: "active" },
  { label: "Placed", sub: "Week 10", state: "upcoming" },
];

export function CandidateTracker({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative bg-white rounded-3xl shadow-[var(--shadow-card)] overflow-hidden border border-border/60 ${compact ? "w-full max-w-sm" : "w-full max-w-md"}`}
    >
      {/* Top strip */}
      <div className="bg-navy px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 live-dot" />
            <span className="relative rounded-full w-2.5 h-2.5 bg-emerald-400" />
          </span>
          <div className="text-white font-display font-semibold text-sm tracking-tight">
            Candidate Tracker
          </div>
        </div>
        <div className="text-[10px] font-medium tracking-widest text-white/60 uppercase">Live</div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold tracking-widest text-blue uppercase">
              Role · #ON-2141
            </div>
            <h3 className="mt-1 font-display font-bold text-navy text-lg leading-tight">
              ICU Nurse
            </h3>
            <p className="text-sm text-muted-foreground">Riyadh, Saudi Arabia</p>
          </div>
          <div className="rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 border border-emerald-200">
            On Track
          </div>
        </div>

        <div className="mt-6 relative">
          {STEPS.map((s, i) => (
            <div key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
              {i < STEPS.length - 1 && (
                <span
                  className={`absolute left-[15px] top-9 bottom-0 w-px ${s.state === "done" ? "bg-gold/60" : "bg-border"}`}
                />
              )}
              <StepNode step={s} index={i + 1} />
              <div className="pt-1">
                <div
                  className={`font-display font-semibold text-[15px] ${s.state === "upcoming" ? "text-muted-foreground" : "text-navy"}`}
                >
                  {s.label}
                </div>
                <div
                  className={`text-xs mt-0.5 ${s.state === "active" ? "text-blue font-medium" : "text-muted-foreground"}`}
                >
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepNode({ step, index }: { step: Step; index: number }) {
  if (step.state === "done") {
    return (
      <div className="relative shrink-0 w-8 h-8 rounded-full bg-gold grid place-items-center shadow-sm">
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (step.state === "active") {
    return (
      <div className="relative shrink-0 w-8 h-8">
        <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full ring-spin">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="oklch(0.46 0.13 260 / 0.15)"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="oklch(0.46 0.13 260)"
            strokeWidth="2.5"
            strokeDasharray="60 100"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-1 rounded-full bg-blue-soft grid place-items-center">
          <span className="text-blue font-display font-bold text-sm">{index}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="shrink-0 w-8 h-8 rounded-full bg-secondary border border-border grid place-items-center">
      <span className="text-muted-foreground font-display font-semibold text-sm">{index}</span>
    </div>
  );
}
