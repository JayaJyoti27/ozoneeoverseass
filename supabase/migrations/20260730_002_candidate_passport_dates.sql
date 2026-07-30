-- =====================================================
-- Passport Information section had Issue Date / Expiry
-- Date inputs with nowhere to save to. Add real columns.
-- =====================================================

ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS passport_issue_date  date,
  ADD COLUMN IF NOT EXISTS passport_expiry_date date;
