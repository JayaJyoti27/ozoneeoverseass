import { Activity, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMedicals } from "@/lib/candidate/hooks";

type MedicalStatus = "Pending" | "Scheduled" | "Completed" | "Rejected";

const statusConfig = {
  Pending: {
    icon: Clock3,
    color: "text-yellow-500",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  },
  Scheduled: {
    icon: Activity,
    color: "text-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  Completed: {
    icon: CheckCircle2,
    color: "text-green-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  Rejected: {
    icon: XCircle,
    color: "text-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
};

export default function MedicalStatusCard() {
  const { data, isLoading, isError } = useMedicals();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">Loading medical status...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">Unable to load medical status.</CardContent>
      </Card>
    );
  }

  const medical = data?.[0];

  if (!medical) {
    return (
      <Card>
        <CardContent className="p-6">No medical record found.</CardContent>
      </Card>
    );
  }

  const status = medical.status as MedicalStatus;
  const hospital = medical.hospital_name;
  const appointmentDate = medical.appointment_date;
  const reportDate = medical.expiry_date;

  const config = statusConfig[status] ?? statusConfig.Pending;
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Status</CardTitle>

        <span className={`rounded-full px-3 py-1 text-xs font-medium ${config.badge}`}>
          {status}
        </span>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-muted p-3">
            <Icon className={`h-6 w-6 ${config.color}`} />
          </div>

          <div>
            <p className="font-semibold">{status}</p>

            <p className="text-sm text-muted-foreground">Current medical verification status.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Hospital</p>

            <p className="mt-1 font-medium">{hospital || "-"}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Appointment</p>

            <p className="mt-1 font-medium">
              {appointmentDate ? new Date(appointmentDate).toLocaleDateString() : "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Report Date</p>

            <p className="mt-1 font-medium">
              {reportDate ? new Date(reportDate).toLocaleDateString() : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
