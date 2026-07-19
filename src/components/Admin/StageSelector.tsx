import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { updateApplicationStage } from "@/lib/recruitment/api";

const STAGES = [
  "applied",
  "screening",
  "shortlisted",
  "interview",
  "documents",
  "medical",
  "visa",
  "deployment",
  "completed",
];

interface Props {
  applicationId: string;
  currentStage: string;
  onUpdated?: () => void;
}

export default function StageSelector({ applicationId, currentStage, onUpdated }: Props) {
  const [stage, setStage] = useState(currentStage);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      await updateApplicationStage(applicationId, stage, notes);

      onUpdated?.();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Select value={stage} onValueChange={setStage}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {STAGES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Admin notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Button disabled={saving} onClick={save}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Stage"
        )}
      </Button>
    </div>
  );
}
