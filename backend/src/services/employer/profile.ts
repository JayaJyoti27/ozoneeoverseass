import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../utils/AppError";

/*
|--------------------------------------------------------------------------
| Get Company Profile
|--------------------------------------------------------------------------
*/

export async function getEmployerProfile(employerId: string) {
  const { data, error } = await supabase
    .from("employers")
    .select(
      `
      id,
      company_name,
      contact_person,
      designation,
      email,
      phone,
      website,
      country,
      industry,
      logo_url,
      employee_count,
      head_office,
      license_number,
      license_expiry,
      approval_status,
      status,
      created_at,
      updated_at
    `,
    )
    .eq("id", employerId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Employer profile not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Update Company Profile
|--------------------------------------------------------------------------
*/

interface UpdateEmployerProfileDto {
  company_name?: string;

  contact_person?: string;

  designation?: string;

  phone?: string;

  website?: string;

  industry?: string;

  logo_url?: string;

  employee_count?: number;

  head_office?: string;
}

export async function updateEmployerProfile(employerId: string, payload: UpdateEmployerProfileDto) {
  /*
  |--------------------------------------------------------------------------
  | Check Employer Exists
  |--------------------------------------------------------------------------
  */

  const { data: employer } = await supabase
    .from("employers")
    .select("id")
    .eq("id", employerId)
    .single();

  if (!employer) {
    throw new NotFoundError("Employer not found.");
  }

  /*
  |--------------------------------------------------------------------------
  | Update Editable Fields Only
  |--------------------------------------------------------------------------
  */

  const { data, error } = await supabase
    .from("employers")
    .update({
      company_name: payload.company_name,
      contact_person: payload.contact_person,
      designation: payload.designation,
      phone: payload.phone,
      website: payload.website,
      industry: payload.industry,
      logo_url: payload.logo_url,
      employee_count: payload.employee_count,
      head_office: payload.head_office,
      updated_at: new Date().toISOString(),
    })
    .eq("id", employerId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update company profile.", error);
  }

  /*
  |--------------------------------------------------------------------------
  | Activity Log
  |--------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: employerId,

    action: "Company Profile Updated",

    entity: "employer",

    entity_id: employerId,

    metadata: payload,
  });

  return data;
}

/*
|--------------------------------------------------------------------------
| Upload Company Logo
|--------------------------------------------------------------------------
*/

export async function updateEmployerLogo(employerId: string, logoUrl: string) {
  const { data, error } = await supabase
    .from("employers")
    .update({
      logo_url: logoUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", employerId)
    .select()
    .single();

  if (error || !data) {
    throw new DatabaseError("Unable to update company logo.", error);
  }

  return data;
}
