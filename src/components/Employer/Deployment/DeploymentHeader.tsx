import { Plane } from "lucide-react";
import { UpdateDeploymentDialog } from "./UpdateDeploymentDialog";

import { Button } from "@/components/ui/button";

export function DeploymentHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Deployment</h1>

        <p className="text-muted-foreground">Track visa, medical and travel progress.</p>
      </div>

      <Button>
        <Plane className="mr-2 h-4 w-4" />
        <UpdateDeploymentDialog />
      </Button>
    </div>
  );
}
