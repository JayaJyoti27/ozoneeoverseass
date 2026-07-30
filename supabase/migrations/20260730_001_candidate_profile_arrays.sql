-- =====================================================
-- Add missing JSONB array columns to `candidates` so
-- Education / Experience / Skills / Languages sections
-- on the candidate profile can actually persist data.
-- Safe to re-run (IF NOT EXISTS on every column).
-- =====================================================

ALTER TABLE public.candidates
  ADD COLUMN IF NOT EXISTS education  jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS experience jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS skills     jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS languages  jsonb NOT NULL DEFAULT '[]'::jsonb;
