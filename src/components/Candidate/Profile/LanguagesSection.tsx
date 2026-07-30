import { useEffect, useState } from "react";
import { Languages, Plus, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateProfile } from "@/lib/candidate/hooks";
import type { Candidate, LanguageEntry } from "@/lib/candidate/types";

const PROFICIENCIES = ["Native", "Fluent", "Professional", "Intermediate", "Basic"];

interface Props {
  candidate: Candidate;
}

export default function LanguagesSection({ candidate }: Props) {
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");
  const [languages, setLanguages] = useState<LanguageEntry[]>(candidate.languages ?? []);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    setLanguages(candidate.languages ?? []);
  }, [candidate]);

  async function persist(next: LanguageEntry[]) {
    setLanguages(next);
    await updateProfile.mutateAsync({ languages: next });
  }

  function addLanguage() {
    if (!language.trim()) return;

    persist([
      ...languages,
      {
        id: crypto.randomUUID(),
        language,
        proficiency,
      },
    ]);

    setLanguage("");
    setProficiency("Intermediate");
  }

  function remove(id: string) {
    persist(languages.filter((x) => x.id !== id));
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <Languages className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Languages</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <Select value={proficiency} onValueChange={setProficiency}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {PROFICIENCIES.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={addLanguage} disabled={updateProfile.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          Add Language
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {languages.length === 0 && (
          <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
            No languages added.
          </div>
        )}

        {languages.map((item) => (
          <Card key={item.id} className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{item.language}</h3>
              <p className="text-sm text-muted-foreground">{item.proficiency}</p>
            </div>

            <Button size="icon" variant="destructive" onClick={() => remove(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
}
