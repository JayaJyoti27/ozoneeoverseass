import { supabase } from "../config/supabase";

export async function applyForJob(application: any) {
  try {
    // ======================================================
    // 1. CHECK JOB EXISTS
    // ======================================================

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("id,title,status")
      .eq("id", application.job_id)
      .maybeSingle();

    if (jobError) {
      return {
        success: false,
        status: 500,
        message: jobError.message,
      };
    }

    if (!job) {
      return {
        success: false,
        status: 404,
        message: "Job not found.",
      };
    }

    if (job.status !== "active") {
      return {
        success: false,
        status: 409,
        message: "This vacancy is no longer accepting applications.",
      };
    }

    // ======================================================
    // 2. FIND CANDIDATE
    // ======================================================

    const { data: existingCandidate } = await supabase
      .from("candidates")
      .select("*")
      .eq("email", application.email)
      .maybeSingle();

    let candidate;

    // ======================================================
    // 3. CREATE OR UPDATE
    // ======================================================

    if (!existingCandidate) {
      const { data, error } = await supabase
        .from("candidates")
        .insert({
          name: application.name,
          email: application.email,
          phone: application.phone,
          nationality: application.nationality,
          specialty: application.specialty,
          experience_years: application.experience_years,
          target_countries: application.target_countries,
          cv_url: application.cv_url,
          status: "active",
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          status: 500,
          message: error.message,
        };
      }

      candidate = data;
    } else {
      const { data, error } = await supabase
        .from("candidates")
        .update({
          phone: application.phone,
          nationality: application.nationality,
          specialty: application.specialty,
          experience_years: application.experience_years,
          target_countries: application.target_countries,
          cv_url: application.cv_url,
        })
        .eq("id", existingCandidate.id)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          status: 500,
          message: error.message,
        };
      }

      candidate = data;
    }

    // ======================================================
    // 4. DUPLICATE APPLICATION
    // ======================================================

    const { data: duplicate } = await supabase
      .from("applications")
      .select("id")
      .eq("candidate_id", candidate.id)
      .eq("job_id", application.job_id)
      .maybeSingle();

    if (duplicate) {
      return {
        success: false,
        status: 409,
        message: "You have already applied for this job.",
      };
    }

    // ======================================================
    // 5. CREATE APPLICATION
    // ======================================================

    const { data: newApplication, error: applicationError } = await supabase
      .from("applications")
      .insert({
        candidate_id: candidate.id,
        job_id: application.job_id,
        status: "applied",
        notes: "",
      })
      .select()
      .single();

    if (applicationError) {
      return {
        success: false,
        status: 500,
        message: applicationError.message,
      };
    }

    // ======================================================
    // 6. SUCCESS
    // ======================================================

    return {
      success: true,
      status: 201,
      message: "Application submitted successfully.",

      candidate: {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
      },

      application: newApplication,

      job: {
        id: job.id,
        title: job.title,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
}
