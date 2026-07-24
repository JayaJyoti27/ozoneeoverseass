import { Request, Response } from "express";
import * as EmployerService from "../services/employer";

const DEMO_EMPLOYER_ID = "3d730a29-057f-4588-9c03-0df22e724c3a";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getDocuments(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerDocuments(DEMO_EMPLOYER_ID);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerDashboard(DEMO_EMPLOYER_ID);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

export async function getProfile(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerProfile(DEMO_EMPLOYER_ID);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const data = await EmployerService.updateEmployerProfile(DEMO_EMPLOYER_ID, req.body);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Requirements
|--------------------------------------------------------------------------
*/

export async function getRequirements(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerRequirements({
      employerId: DEMO_EMPLOYER_ID,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      status: req.query.status as string,
      search: req.query.search as string,
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getRequirement(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerRequirementDetails(
      DEMO_EMPLOYER_ID,
      String(req.params.id),
    );

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function createRequirement(req: Request, res: Response) {
  try {
    const data = await EmployerService.createRequirement(DEMO_EMPLOYER_ID, req.body);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateRequirement(req: Request, res: Response) {
  try {
    const data = await EmployerService.updateRequirement(
      DEMO_EMPLOYER_ID,
      String(req.params.id),
      req.body,
    );

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function withdrawRequirement(req: Request, res: Response) {
  try {
    const data = await EmployerService.withdrawRequirement(DEMO_EMPLOYER_ID, String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Interviews
|--------------------------------------------------------------------------
*/

export async function getInterviews(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerInterviews({
      employerId: DEMO_EMPLOYER_ID,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      status: req.query.status as string,
      jobOrderId: req.query.jobOrderId as string,
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function confirmInterview(req: Request, res: Response) {
  try {
    const data = await EmployerService.confirmInterview(DEMO_EMPLOYER_ID, String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Deployments
|--------------------------------------------------------------------------
*/

export async function getDeployments(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerDeployments({
      employerId: DEMO_EMPLOYER_ID,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      status: req.query.status as string,
      jobOrderId: req.query.jobOrderId as string,
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getDeployment(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerDeployment(
      DEMO_EMPLOYER_ID,
      String(req.params.id),
    );

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

export async function getNotifications(req: Request, res: Response) {
  try {
    const data = await EmployerService.getEmployerNotifications({
      employerId: DEMO_EMPLOYER_ID,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      unreadOnly: req.query.unreadOnly === "true",
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function markNotificationRead(req: Request, res: Response) {
  try {
    const data = await EmployerService.markNotificationRead(
      DEMO_EMPLOYER_ID,
      String(req.params.id),
    );

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function markAllNotificationsRead(req: Request, res: Response) {
  try {
    const data = await EmployerService.markAllNotificationsRead(DEMO_EMPLOYER_ID);

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
import { getEmployerCandidate } from "../services/employer/candidate";

export async function getCandidate(req: Request, res: Response) {
  const data = await getEmployerCandidate(String(req.params.id));
  res.json(data);
}
