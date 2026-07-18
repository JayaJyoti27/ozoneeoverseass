import { Request, Response } from "express";
import * as CandidateService from "../services/candidates";

const DEMO_CANDIDATE_ID = "e7d9fc7d-5a85-4f51-8706-c6492dd94b4d";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getDashboard(req: Request, res: Response) {
  try {
    const data = await CandidateService.getCandidateDashboard(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateProfile(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.updateCandidateProfile(DEMO_CANDIDATE_ID, req.body);

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
    const data = await CandidateService.getProfileCompletion(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateJobs(DEMO_CANDIDATE_ID, {
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
    const data = await CandidateService.getCandidateJob(DEMO_CANDIDATE_ID, String(req.params.id));

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
    const data = await CandidateService.saveJob(DEMO_CANDIDATE_ID, String(req.params.id));

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
    const data = await CandidateService.removeSavedJob(DEMO_CANDIDATE_ID, String(req.params.id));

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
    const data = await CandidateService.getCandidateApplications(DEMO_CANDIDATE_ID, {
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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.applyForJob(DEMO_CANDIDATE_ID, String(req.params.jobId));

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
      DEMO_CANDIDATE_ID,
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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getCandidateDocuments(DEMO_CANDIDATE_ID);

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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.uploadCandidateDocument(DEMO_CANDIDATE_ID, req.body);

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
      DEMO_CANDIDATE_ID,
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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getCandidateInterviews(DEMO_CANDIDATE_ID);

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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getUpcomingInterview(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateOffers(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateOffer(DEMO_CANDIDATE_ID, String(req.params.id));

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
    const data = await CandidateService.acceptOffer(DEMO_CANDIDATE_ID, String(req.params.id));

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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getCandidateMedicals(DEMO_CANDIDATE_ID);

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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getMedicalStatus(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateVisas(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateVisa(DEMO_CANDIDATE_ID, String(req.params.id));

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
    const data = await CandidateService.getVisaStatus(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateDeployments(DEMO_CANDIDATE_ID);

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
      DEMO_CANDIDATE_ID,
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
    const data = await CandidateService.getDeploymentStatus(DEMO_CANDIDATE_ID);

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
    const data = await CandidateService.getCandidateTimeline(DEMO_CANDIDATE_ID);

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
