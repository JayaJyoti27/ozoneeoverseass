import { useState } from "react";
import { GraduationCap, Pencil, Plus, Trash2, Save, X } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface Education {
  id: string;

  institution: string;

  degree: string;

  field: string;

  country: string;

  start_year: string;

  end_year: string;

  grade: string;
}

export default function EducationSection() {
  const [editing, setEditing] = useState(false);

  const [education, setEducation] = useState<Education[]>([
    {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      country: "",
      start_year: "",
      end_year: "",
      grade: "",
    },
  ]);

  function update(index: number, key: keyof Education, value: string) {
    const copy = [...education];

    copy[index][key] = value;

    setEducation(copy);
  }

  function addEducation() {
    setEducation((prev) => [
      ...prev,

      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        country: "",
        start_year: "",
        end_year: "",
        grade: "",
      },
    ]);
  }

  function removeEducation(id: string) {
    setEducation((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <GraduationCap className="h-5 w-5" />
            Education
          </h2>

          <p className="text-muted-foreground">Add all your educational qualifications.</p>
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
        {education.map((item, index) => (
          <Card key={item.id} className="border p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold">Education #{index + 1}</h3>

              {editing && education.length > 1 && (
                <Button variant="destructive" size="icon" onClick={() => removeEducation(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label>Institution</Label>

                <Input
                  disabled={!editing}
                  value={item.institution}
                  onChange={(e) => update(index, "institution", e.target.value)}
                />
              </div>

              <div>
                <Label>Degree</Label>

                <Input
                  disabled={!editing}
                  value={item.degree}
                  onChange={(e) => update(index, "degree", e.target.value)}
                />
              </div>

              <div>
                <Label>Field of Study</Label>

                <Input
                  disabled={!editing}
                  value={item.field}
                  onChange={(e) => update(index, "field", e.target.value)}
                />
              </div>

              <div>
                <Label>Country</Label>

                <Input
                  disabled={!editing}
                  value={item.country}
                  onChange={(e) => update(index, "country", e.target.value)}
                />
              </div>

              <div>
                <Label>Start Year</Label>

                <Input
                  disabled={!editing}
                  value={item.start_year}
                  onChange={(e) => update(index, "start_year", e.target.value)}
                />
              </div>

              <div>
                <Label>End Year</Label>

                <Input
                  disabled={!editing}
                  value={item.end_year}
                  onChange={(e) => update(index, "end_year", e.target.value)}
                />
              </div>

              <div>
                <Label>Grade / CGPA</Label>

                <Input
                  disabled={!editing}
                  value={item.grade}
                  onChange={(e) => update(index, "grade", e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editing && (
        <Button className="mt-6" onClick={addEducation}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      )}
    </Card>
  );
}
