import { useState } from "react";
import { Briefcase, Pencil, Plus, Trash2, Save, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Experience {
  id: string;
  company: string;
  designation: string;
  location: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
}

export default function ExperienceSection() {
  const [editing, setEditing] = useState(false);

  const [experience, setExperience] = useState<Experience>([
    {
      id: crypto.randomUUID(),
      company: "",
      designation: "",
      location: "",
      start_date: "",
      end_date: "",
      currently_working: false,
      description: "",
    },
  ]);

  function update(index: number, key: keyof Experience, value: any) {
    const copy = [...experience];

    copy[index][key] = value;

    setExperience(copy);
  }

  function addExperience() {
    setExperience((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        company: "",
        designation: "",
        location: "",
        start_date: "",
        end_date: "",
        currently_working: false,
        description: "",
      },
    ]);
  }

  function removeExperience(id: string) {
    setExperience((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h2>

          <p className="text-muted-foreground">Add your previous employment.</p>
        </div>

        {!editing ? (
          <Button onClick={() => setEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-6">
        {experience.map((item, index) => (
          <Card key={item.id} className="border p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold">Experience #{index + 1}</h3>

              {editing && experience.length > 1 && (
                <Button variant="destructive" size="icon" onClick={() => removeExperience(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label>Company</Label>
                <Input
                  disabled={!editing}
                  value={item.company}
                  onChange={(e) => update(index, "company", e.target.value)}
                />
              </div>

              <div>
                <Label>Designation</Label>
                <Input
                  disabled={!editing}
                  value={item.designation}
                  onChange={(e) => update(index, "designation", e.target.value)}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  disabled={!editing}
                  value={item.location}
                  onChange={(e) => update(index, "location", e.target.value)}
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  disabled={!editing}
                  value={item.start_date}
                  onChange={(e) => update(index, "start_date", e.target.value)}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  disabled={!editing}
                  value={item.end_date}
                  onChange={(e) => update(index, "end_date", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5">
              <Label>Job Description</Label>

              <Textarea
                disabled={!editing}
                value={item.description}
                onChange={(e) => update(index, "description", e.target.value)}
                rows={5}
              />
            </div>
          </Card>
        ))}
      </div>

      {editing && (
        <Button className="mt-6" onClick={addExperience}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      )}
    </Card>
  );
}
