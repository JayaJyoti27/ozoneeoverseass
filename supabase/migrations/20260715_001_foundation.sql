-- =====================================================
-- EXTENSIONS
-- =====================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- ENUMS
-- =====================================================

DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='application_status') THEN
CREATE TYPE application_status AS ENUM (
'applied',
'application_received',
'cv_under_review',
'employer_shortlisted',
'interview_scheduled',
'interview_completed',
'selected',
'offer_letter_issued',
'documents_verification',
'medical',
'visa_processing',
'visa_approved',
'ticket_confirmed',
'deployed',
'rejected',
'withdrawn'
);
END IF;
END$$;

DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='job_order_status') THEN
CREATE TYPE job_order_status AS ENUM (
'requirement_submitted',
'under_admin_review',
'clarification_required',
'employer_approval_pending',
'legalization_in_progress',
'approved_for_recruitment',
'recruitment_open',
'recruitment_closed',
'candidate_selected',
'visa_processing',
'deployment_completed',
'cancelled'
);
END IF;
END$$;

DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='verification_status') THEN
CREATE TYPE verification_status AS ENUM (
'pending',
'verified',
'rejected'
);
END IF;
END$$;