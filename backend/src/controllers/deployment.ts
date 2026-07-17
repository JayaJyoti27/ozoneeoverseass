import { Request, Response } from "express";

import * as DeploymentService from "../services/deployment";

import {
  CreateDeploymentSchema,
  BookTicketSchema,
  ConfirmTravelSchema,
  DepartSchema,
  ArriveSchema,
  CompleteDeploymentSchema,
  CancelDeploymentSchema,
} from "../validators/deploymentSchema";

/*
|--------------------------------------------------------------------------
| Temporary IDs
|--------------------------------------------------------------------------
| Replace with req.user after authentication
*/

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

/*
|--------------------------------------------------------------------------
| Create Deployment
|--------------------------------------------------------------------------
*/

export async function createDeployment(req: Request, res: Response) {
  try {
    const parsed = CreateDeploymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.createDeployment(DEMO_ADMIN_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Deployment created successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to create deployment.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Book Ticket
|--------------------------------------------------------------------------
*/

export async function bookTicket(req: Request, res: Response) {
  try {
    const parsed = BookTicketSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.bookTicket(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Ticket booked successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to book ticket.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Confirm Travel
|--------------------------------------------------------------------------
*/

export async function confirmTravel(req: Request, res: Response) {
  try {
    const parsed = ConfirmTravelSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.confirmTravel(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Travel confirmed successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to confirm travel.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Depart Candidate
|--------------------------------------------------------------------------
*/

export async function departCandidate(req: Request, res: Response) {
  try {
    const parsed = DepartSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.departCandidate(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Departure recorded successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to record departure.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Arrive Candidate
|--------------------------------------------------------------------------
*/

export async function arriveCandidate(req: Request, res: Response) {
  try {
    const parsed = ArriveSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.arriveCandidate(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Arrival recorded successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to record arrival.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Complete Deployment
|--------------------------------------------------------------------------
*/

export async function completeDeployment(req: Request, res: Response) {
  try {
    const parsed = CompleteDeploymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.completeDeployment(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Deployment completed successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to complete deployment.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Cancel Deployment
|--------------------------------------------------------------------------
*/

export async function cancelDeployment(req: Request, res: Response) {
  try {
    const parsed = CancelDeploymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await DeploymentService.cancelDeployment(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Deployment cancelled successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to cancel deployment.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Get Deployment
|--------------------------------------------------------------------------
*/

export async function getDeployment(req: Request, res: Response) {
  try {
    const data = await DeploymentService.getDeployment(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Deployment not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| List Deployments
|--------------------------------------------------------------------------
*/

export async function listDeployments(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await DeploymentService.listDeployments({
      page,

      limit,

      candidateId: req.query.candidateId as string,

      employerId: req.query.employerId as string,

      applicationId: req.query.applicationId as string,

      jobOrderId: req.query.jobOrderId as string,

      status: req.query.status as string,
    });

    return res.json({
      success: true,

      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,

      message: err.message ?? "Unable to fetch deployments.",
    });
  }
}
