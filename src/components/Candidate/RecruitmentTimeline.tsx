import { Check } from "lucide-react";
import { STAGES, type Stage } from "@/lib/candidate/candidate-mock";
import { cn } from "@/lib/utils";

type Props = {
  currentStage: Stage | "Rejected";
  compact?: boolean;
};

export function RecruitmentTimeline({ currentStage, compact = false }: Props) {
  const currentIdx = currentStage === "Rejected" ? -1 : STAGES.indexOf(currentStage);

  return (
    <ol className="relative">
      {STAGES.map((stage, i) => {
        const completed = i < currentIdx;
        const active = i === currentIdx;
        const upcoming = i > currentIdx;
        const last = i === STAGES.length - 1;

        return (
          <li key={stage} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-8 bottom-0 w-px",
                  completed ? "bg-[var(--ozone-gold)]" : "bg-border",
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                completed &&
                  "border-[var(--ozone-gold)] bg-[var(--ozone-gold)] text-[var(--ozone-navy)]",
                active &&
                  "border-[var(--ozone-blue)] bg-[var(--ozone-blue)] text-white shadow-[0_0_0_4px_oklch(0.42_0.13_258/0.15)]",
                upcoming && "border-border bg-background text-muted-foreground",
              )}
            >
              {completed ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </div>
            <div className={cn("pt-1", compact && "pt-0.5")}>
              <p
                className={cn(
                  "text-sm",
                  active && "font-semibold text-[var(--ozone-navy)]",
                  completed && "text-[var(--ozone-navy)]",
                  upcoming && "text-muted-foreground",
                )}
              >
                {stage}
              </p>
              {!compact && active && (
                <p className="mt-0.5 text-xs text-muted-foreground">In progress</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
