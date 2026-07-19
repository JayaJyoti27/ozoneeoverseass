import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const docs = ["Passport", "CV", "Nursing License", "Degree Certificate", "Medical Report"];

export function CandidateDocumentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {docs.map((doc) => (
          <div key={doc} className="flex items-center justify-between rounded-lg border p-4">
            <span>{doc}</span>

            <span className="text-sm font-medium text-green-600">Available</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
