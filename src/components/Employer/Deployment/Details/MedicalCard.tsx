import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { deployment } from "./mock";

export function MedicalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Clearance</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="font-medium">{deployment.medicalStatus}</p>
      </CardContent>
    </Card>
  );
}
