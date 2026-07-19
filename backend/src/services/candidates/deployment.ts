import { supabase } from "../../config/supabase";
import { DatabaseError, NotFoundError } from "../../../../src/utils/AppError";

/*
|--------------------------------------------------------------------------
| My Deployments
|--------------------------------------------------------------------------
*/

export async function getCandidateDeployments(candidateId: string) {
  const { data, error } = await supabase
    .from("deployments")
    .select("*")
    .eq("candidate_id", candidateId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new DatabaseError("Unable to fetch deployments.", error);
  }

  return data ?? [];
}

/*
|--------------------------------------------------------------------------
| Deployment Details
|--------------------------------------------------------------------------
*/

export async function getCandidateDeployment(candidateId: string, deploymentId: string) {
  const { data, error } = await supabase
    .from("deployments")
    .select("*")
    .eq("candidate_id", candidateId)
    .eq("id", deploymentId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Deployment not found.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Latest Deployment
|--------------------------------------------------------------------------
*/

export async function getLatestDeployment(candidateId: string) {
  const deployments = await getCandidateDeployments(candidateId);

  return deployments[0] ?? null;
}

/*
|--------------------------------------------------------------------------
| Deployment Status
|--------------------------------------------------------------------------
*/

export async function getDeploymentStatus(candidateId: string) {
  const latest = await getLatestDeployment(candidateId);

  return {
    status: latest?.status ?? "pending",

    ticketNumber: latest?.ticket_number ?? null,

    airline: latest?.airline_name ?? null,

    flightNumber: latest?.flight_number ?? null,

    departureAirport: latest?.departure_airport ?? null,

    arrivalAirport: latest?.arrival_airport ?? null,

    departureTime: latest?.departure_time ?? null,

    arrivalTime: latest?.arrival_time ?? null,

    remarks: latest?.remarks ?? null,
  };
}
