import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const docs = ["Passport", "Visa", "Employment Contract", "Medical Report", "Flight Ticket"];

export function DocumentChecklistCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {docs.map((doc) => (
          <div key={doc} className="flex items-center justify-between rounded-lg border p-4">
            <span>{doc}</span>

            <span className="text-green-600 text-sm font-medium">Uploaded</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
