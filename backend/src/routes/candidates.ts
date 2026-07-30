import { Router } from "express";
import { upload } from "../middleware/upload";
import {
  // Dashboard
  getDashboard,

  // Profile
  getProfile,
  updateProfile,
  getProfileCompletion,

  // Jobs
  getJobs,
  getJob,
  saveJob,
  removeSavedJob,

  // Applications
  getApplications,
  getApplication,
  apply,
  withdrawApplication,
  getApplicationTimeline,

  // Documents
  getDocuments,
  getDocument,
  uploadDocument,
  replaceDocument,
  deleteDocument,

  // Interviews
  getInterviews,
  getInterview,
  getUpcomingInterview,

  // Offers
  getOffers,
  getOffer,
  acceptOffer,
  rejectOffer,

  // Medical
  getMedicals,
  getMedical,
  getMedicalStatus,

  // Visa
  getVisas,
  getVisa,
  getVisaStatus,

  // Deployment
  getDeployments,
  getDeployment,
  getDeploymentStatus,

  // Timeline
  getTimeline,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/candidate";
import { verifyAuth, requireRole } from "../middleware/verifyAuth";

const router = Router();

router.use(verifyAuth, requireRole("candidate"));

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/dashboard", getDashboard);

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

router.get("/profile", getProfile);

router.patch("/profile", updateProfile);

router.get("/profile/completion", getProfileCompletion);

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

router.get("/jobs", getJobs);

router.get("/jobs/:id", getJob);

router.post("/jobs/:id/save", saveJob);

router.delete("/jobs/:id/save", removeSavedJob);

/*
|--------------------------------------------------------------------------
| Applications
|--------------------------------------------------------------------------
*/

router.get("/applications", getApplications);

router.get("/applications/:id", getApplication);

router.post("/jobs/:jobId/apply", apply);

router.patch("/applications/:id/withdraw", withdrawApplication);

router.get("/applications/:id/timeline", getApplicationTimeline);

/*
|--------------------------------------------------------------------------
| Documents
|--------------------------------------------------------------------------
*/

router.get("/documents", getDocuments);

router.get("/documents/:id", getDocument);

router.post("/documents", upload.single("file"), uploadDocument);

router.patch("/documents/:id", replaceDocument);

router.delete("/documents/:id", deleteDocument);

/*
|--------------------------------------------------------------------------
| Interviews
|--------------------------------------------------------------------------
*/

router.get("/interviews", getInterviews);

router.get("/interviews/upcoming", getUpcomingInterview);

router.get("/interviews/:id", getInterview);

/*
|--------------------------------------------------------------------------
| Offers
|--------------------------------------------------------------------------
*/

router.get("/offers", getOffers);

router.get("/offers/:id", getOffer);

router.patch("/offers/:id/accept", acceptOffer);

router.patch("/offers/:id/reject", rejectOffer);

/*
|--------------------------------------------------------------------------
| Medical
|--------------------------------------------------------------------------
*/

router.get("/medicals", getMedicals);

router.get("/medicals/status", getMedicalStatus);

router.get("/medicals/:id", getMedical);

/*
|--------------------------------------------------------------------------
| Visa
|--------------------------------------------------------------------------
*/

router.get("/visas", getVisas);

router.get("/visas/status", getVisaStatus);

router.get("/visas/:id", getVisa);

/*
|--------------------------------------------------------------------------
| Deployment
|--------------------------------------------------------------------------
*/

router.get("/deployments", getDeployments);

router.get("/deployments/status", getDeploymentStatus);

router.get("/deployments/:id", getDeployment);

/*
|--------------------------------------------------------------------------
| Timeline
|--------------------------------------------------------------------------
*/

router.get("/timeline", getTimeline);

router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markNotificationRead);
router.patch("/notifications/read-all", markAllNotificationsRead);

export default router;
