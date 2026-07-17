import { useState } from "react";
import { Plus, Trash2, Wrench } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const suggestedSkills = [
  "Welding",
  "Electrician",
  "Plumbing",
  "HVAC",
  "Construction",
  "Carpentry",
  "Nursing",
  "Driving",
  "Cooking",
  "Cleaning",
  "Warehouse",
  "Forklift",
  "Sales",
  "Customer Service",
  "MS Office",
  "Excel",
  "AutoCAD",
];

export default function SkillsSection() {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function addSkill(skill: string) {
    const value = skill.trim();

    if (!value) return;

    if (skills.includes(value)) return;

    setSkills([...skills, value]);

    setInput("");
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <Wrench className="h-5 w-5" />

        <h2 className="text-xl font-semibold">Skills</h2>
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Add a skill..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              addSkill(input);
            }
          }}
        />

        <Button onClick={() => addSkill(input)}>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} className="flex items-center gap-2 px-3 py-2">
              {skill}

              <Trash2 className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="mb-3 font-medium">Suggested Skills</h3>

        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter((skill) => !skills.includes(skill))
            .map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer transition hover:bg-primary hover:text-primary-foreground"
                onClick={() => addSkill(skill)}
              >
                + {skill}
              </Badge>
            ))}
        </div>
      </div>
    </Card>
  );
}
