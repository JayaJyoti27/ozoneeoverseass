import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { createRequirement } from "@/lib/employer/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/Employer/job-orders/new")({
  component: NewJobOrderPage,
});

function NewJobOrderPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    role: "",
    country: "",
    sector: "",
    headcount: 1,
    timeline: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await createRequirement({
        ...form,
        headcount: Number(form.headcount),
      });

      navigate({
        to: "/Employer/job-orders",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to submit requirement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Job Order</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Company Name</Label>

                <Input
                  value={form.company_name}
                  onChange={(e) => update("company_name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Role</Label>

                <Input
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Country</Label>

                <Input
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Sector</Label>

                <Input
                  value={form.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Headcount</Label>

                <Input
                  type="number"
                  min={1}
                  value={form.headcount}
                  onChange={(e) => update("headcount", Number(e.target.value))}
                  required
                />
              </div>

              <div>
                <Label>Hiring Timeline</Label>

                <Input
                  placeholder="Within 30 days"
                  value={form.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Additional Notes</Label>

              <Textarea
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/Employer/job-orders",
                  })
                }
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Job Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
