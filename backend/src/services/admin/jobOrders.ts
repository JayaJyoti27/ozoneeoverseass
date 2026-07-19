import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

interface JobOrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  employerId?: string;
  country?: string;
  search?: string;
}

/*
|--------------------------------------------------------------------------
| Job Order List
|--------------------------------------------------------------------------
*/

export async function getJobOrders(filters: JobOrderFilters) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("job_orders").select(
    `
      *,
      employer:employers(
        id,
        company_name,
        contact_person,
        email
      )
      `,
    {
      count: "exact",
    },
  );

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.country) {
    query = query.eq("country", filters.country);
  }

  if (filters.search) {
    query = query.or(
      `
      title.ilike.%${filters.search}%,
      country.ilike.%${filters.search}%,
      category.ilike.%${filters.search}%
      `,
    );
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new DatabaseError("Unable to fetch job orders.", error);
  }

  return {
    jobOrders: data ?? [],

    pagination: {
      page,

      limit,

      total: count ?? 0,

      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}

/*
|--------------------------------------------------------------------------
| Job Order Details
|--------------------------------------------------------------------------
*/

export async function getJobOrder(jobOrderId: string) {
  const { data, error } = await supabase
    .from("job_orders")
    .select(
      `
      *,

      employer:employers(*),

      requirement:requirements(*)
    `,
    )
    .eq("id", jobOrderId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Job order not found.");
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Update Job Order
|--------------------------------------------------------------------------
*/

export async function updateJobOrder(
  jobOrderId: string,
  payload: Partial<{
    salary_min: number;

    salary_max: number;

    currency: string;

    contract_duration: string;

    working_hours: string;

    accommodation: boolean;

    transport: boolean;

    food: boolean;

    job_description: string;

    requirements: string;

    benefits: string;

    remarks: string;

    title: string;

    category: string;

    vacancies: number;
  }>,
) {
  const { data, error } = await supabase
    .from("job_orders")
    .update({
      ...payload,

      updated_at: new Date().toISOString(),
    })
    .eq("id", jobOrderId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to update job order.", error);
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Open Recruitment
|--------------------------------------------------------------------------
*/

export async function openRecruitment(jobOrderId: string) {
  const { data, error } = await supabase
    .from("job_orders")
    .update({
      status: "recruitment_open",

      updated_at: new Date().toISOString(),
    })
    .eq("id", jobOrderId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to open recruitment.", error);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Close Recruitment
|--------------------------------------------------------------------------
*/

export async function closeRecruitment(jobOrderId: string) {
  const { data, error } = await supabase
    .from("job_orders")
    .update({
      status: "recruitment_closed",

      updated_at: new Date().toISOString(),
    })
    .eq("id", jobOrderId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to close recruitment.", error);
  }

  return data;
}
