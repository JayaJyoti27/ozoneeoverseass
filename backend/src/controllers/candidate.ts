import { Request, Response } from "express";
import * as CandidateService from "../services/candidates";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDashboard(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
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
    const data = await CandidateService.getCandidateProfile(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const data = await CandidateService.updateCandidateProfile(req.candidateId!, req.body);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getProfileCompletion(req: Request, res: Response) {
  try {
    const data = await CandidateService.getProfileCompletion(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

export async function getJobs(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateJobs(req.candidateId!, {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      country: req.query.country as string,
      category: req.query.category as string,
      search: req.query.search as string,
    });

    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getJob(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateJob(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function saveJob(req: Request, res: Response) {
  try {
    const data = await CandidateService.saveJob(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function removeSavedJob(req: Request, res: Response) {
  try {
    const data = await CandidateService.removeSavedJob(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Applications
|--------------------------------------------------------------------------
*/

export async function getApplications(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateApplications(req.candidateId!, {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      status: req.query.status as string,
    });

    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getApplication(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateApplication(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function apply(req: Request, res: Response) {
  try {
    const data = await CandidateService.applyForJob(req.candidateId!, String(req.params.jobId));

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function withdrawApplication(req: Request, res: Response) {
  try {
    const data = await CandidateService.withdrawApplication(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getApplicationTimeline(req: Request, res: Response) {
  try {
    const data = await CandidateService.getApplicationTimeline(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Documents
|--------------------------------------------------------------------------
*/

export async function getDocuments(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDocuments(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getDocument(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDocument(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function uploadDocument(req: Request, res: Response) {
  try {
    const data = await CandidateService.uploadCandidateDocument(req.candidateId!, req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function replaceDocument(req: Request, res: Response) {
  try {
    const data = await CandidateService.replaceCandidateDocument(
      req.candidateId!,
      String(req.params.id),
      req.body,
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function deleteDocument(req: Request, res: Response) {
  try {
    const data = await CandidateService.deleteCandidateDocument(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
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
    const data = await CandidateService.getCandidateInterviews(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getInterview(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateInterview(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getUpcomingInterview(req: Request, res: Response) {
  try {
    const data = await CandidateService.getUpcomingInterview(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Offers
|--------------------------------------------------------------------------
*/

export async function getOffers(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateOffers(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getOffer(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateOffer(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function acceptOffer(req: Request, res: Response) {
  try {
    const data = await CandidateService.acceptOffer(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function rejectOffer(req: Request, res: Response) {
  try {
    const data = await CandidateService.rejectOffer(
      req.candidateId!,
      String(req.params.id),
      req.body.reason,
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Medical
|--------------------------------------------------------------------------
*/

export async function getMedicals(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateMedicals(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getMedical(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateMedical(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getMedicalStatus(req: Request, res: Response) {
  try {
    const data = await CandidateService.getMedicalStatus(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Visa
|--------------------------------------------------------------------------
*/

export async function getVisas(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateVisas(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getVisa(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateVisa(req.candidateId!, String(req.params.id));

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getVisaStatus(req: Request, res: Response) {
  try {
    const data = await CandidateService.getVisaStatus(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Deployment
|--------------------------------------------------------------------------
*/

export async function getDeployments(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDeployments(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getDeployment(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDeployment(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getDeploymentStatus(req: Request, res: Response) {
  try {
    const data = await CandidateService.getDeploymentStatus(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
/*
|--------------------------------------------------------------------------
| Timeline
|--------------------------------------------------------------------------
*/

export async function getTimeline(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateTimeline(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
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
    const data = await CandidateService.getCandidateNotifications({
      candidateId: req.candidateId!,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      unreadOnly: req.query.unreadOnly === "true",
    });

    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function markNotificationRead(req: Request, res: Response) {
  try {
    const data = await CandidateService.markNotificationRead(
      req.candidateId!,
      String(req.params.id),
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function markAllNotificationsRead(req: Request, res: Response) {
  try {
    const data = await CandidateService.markAllNotificationsRead(req.candidateId!);

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
