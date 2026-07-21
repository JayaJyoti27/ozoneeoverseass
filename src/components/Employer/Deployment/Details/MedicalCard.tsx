import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MedicalCard({ deployment }: { deployment: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Clearance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{deployment.medical?.status ?? "Pending"}</p>
      </CardContent>
    </Card>
  );
}
