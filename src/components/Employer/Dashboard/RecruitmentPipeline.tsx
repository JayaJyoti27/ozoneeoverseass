import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecruitmentPipelineProps {
  dashboard?: {
    activeJobOrders?: number;
    jobOrdersUnderReview?: number;
    legalizationInProgress?: number;
    jobsOpenForRecruitment?: number;
    interviewsScheduled?: number;
    candidatesDeployed?: number;
  };
}

export function RecruitmentPipeline({ dashboard }: RecruitmentPipelineProps) {
  const pipeline = [
    {
      stage: "Requirement Submitted",
      count: dashboard?.activeJobOrders ?? 0,
      color: "bg-blue-500",
    },
    {
      stage: "Admin Review",
      count: dashboard?.jobOrdersUnderReview ?? 0,
      color: "bg-amber-500",
    },
    {
      stage: "Legalization",
      count: dashboard?.legalizationInProgress ?? 0,
      color: "bg-purple-500",
    },
    {
      stage: "Recruitment",
      count: dashboard?.jobsOpenForRecruitment ?? 0,
      color: "bg-green-500",
    },
    {
      stage: "Interviews",
      count: dashboard?.interviewsScheduled ?? 0,
      color: "bg-cyan-500",
    },
    {
      stage: "Deployment",
      count: dashboard?.candidatesDeployed ?? 0,
      color: "bg-emerald-600",
    },
  ];

  const max = Math.max(1, ...pipeline.map((p) => p.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Pipeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {pipeline.map((item) => (
          <div key={item.stage}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{item.stage}</span>

              <span className="text-sm font-semibold">{item.count}</span>
            </div>

            <div className="h-2 rounded-full bg-muted">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
