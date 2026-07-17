import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Props {
  completion: number;
}

const PROFILE_STEPS = [
  "Personal Information",
  "Passport Details",
  "Education",
  "Work Experience",
  "Resume Uploaded",
];

export default function ProfileCompletion({ completion }: Props) {
  const completed = Math.round((completion / 100) * PROFILE_STEPS.length);

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Profile Completion</h2>

          <p className="text-sm text-muted-foreground">
            Complete your profile to improve your chances of getting hired.
          </p>
        </div>

        <span className="text-3xl font-bold text-primary">{completion}%</span>
      </div>

      <Progress value={completion} className="mt-6 h-3" />

      <div className="mt-6 space-y-3">
        {PROFILE_STEPS.map((step, index) => {
          const done = index < completed;

          return (
            <div key={step} className="flex items-center gap-3">
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}

              <span className={done ? "font-medium" : "text-muted-foreground"}>{step}</span>
            </div>
          );
        })}
      </div>

      <Button asChild className="mt-6 w-full">
        <Link to="/Candidates/profile">
          Complete Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
