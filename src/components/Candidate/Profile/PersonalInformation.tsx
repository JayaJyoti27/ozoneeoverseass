import { useEffect, useState } from "react";
import { Save, X, Pencil } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useUpdateProfile } from "@/lib/candidate/hooks";

import type { Candidate } from "@/lib/candidate/types";

const schema = z.object({
  full_name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().optional(),

  nationality: z.string().optional(),

  gender: z.string().optional(),

  dob: z.string().optional(),
  preferred_country: z.string().optional(),
  expected_salary: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  candidate: Candidate;
}

export default function PersonalInformation({ candidate }: Props) {
  const [editing, setEditing] = useState(false);

  const updateProfile = useUpdateProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      nationality: "",
      gender: "",
      dob: "",
      preferred_country: "",
      expected_salary: "",
    },
  });

  useEffect(() => {
    form.reset({
      full_name: candidate.full_name,

      email: candidate.email,

      phone: candidate.phone ?? "",

      nationality: candidate.nationality ?? "",

      gender: candidate.gender ?? "",

      dob: candidate.dob ?? "",
      preferred_country: candidate.preferred_country ?? "",
      expected_salary: candidate.expected_salary?.toString() ?? "",
    });
  }, [candidate]);

  async function onSubmit(values: FormValues) {
    await updateProfile.mutateAsync({
      ...values,
      dob: values.dob || null,
      expected_salary: values.expected_salary ? Number(values.expected_salary) : null,
    });

    setEditing(false);
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <p className="text-muted-foreground">Update your personal details.</p>
        </div>

        {!editing ? (
          <Button onClick={() => setEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditing(false);

                form.reset();
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button onClick={form.handleSubmit(onSubmit)} disabled={updateProfile.isPending}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <Form {...form}>
        <form className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>

                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>

                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>

                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>

                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>

                <FormControl>
                  <Input type="date" {...field} disabled={!editing} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferred_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Country</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} placeholder="e.g. UAE, Saudi Arabia" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expected_salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Salary (USD/month)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled={!editing} placeholder="e.g. 1500" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
}
