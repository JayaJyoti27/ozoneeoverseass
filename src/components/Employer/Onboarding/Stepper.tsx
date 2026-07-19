import { cn } from "@/lib/utils";

const steps = ["Company", "Contact", "Address", "Registration", "Documents", "Review", "Complete"];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const active = index + 1 <= currentStep;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border font-medium",
                active ? "bg-primary text-primary-foreground" : "bg-background",
              )}
            >
              {index + 1}
            </div>

            <div className="ml-3">
              <p
                className={cn(
                  "text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div className={cn("mx-4 h-px flex-1", active ? "bg-primary" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
