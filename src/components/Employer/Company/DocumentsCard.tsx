import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { BadgeCheck, Clock3, Upload } from "lucide-react";

import { documents } from "./mock";

export function DocumentsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Company Documents</CardTitle>

        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-xl border p-5">
            <div>
              <h3 className="font-medium">{doc.name}</h3>
            </div>

            {doc.status === "Verified" ? (
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                <BadgeCheck className="h-4 w-4" />
                Verified
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                <Clock3 className="h-4 w-4" />
                Pending
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
