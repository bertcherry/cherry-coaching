-- Interest form submissions. Lives in the `cherry-coaching` D1 database (binding `siteDB`).
--   Local dev:  npx wrangler d1 execute cherry-coaching --local  --file=interest_submissions.sql
--   Remote:     npx wrangler d1 execute cherry-coaching --remote --file=interest_submissions.sql

CREATE TABLE IF NOT EXISTS interest_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  full_name TEXT NOT NULL,
  pronouns TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  locations TEXT NOT NULL,                    -- JSON array of strings
  goals TEXT NOT NULL,
  injuries TEXT NOT NULL,
  availability TEXT NOT NULL,
  frequency TEXT NOT NULL,
  extra_notes TEXT,
  referral_source TEXT NOT NULL,
  referral_provider TEXT,                     -- only when referral_source is a healthcare provider
  rate_tier TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  agreed_cancellation INTEGER NOT NULL,       -- 1 / 0
  agreed_waiver INTEGER NOT NULL,             -- 1 / 0
  cancellation_policy_version TEXT NOT NULL,
  waiver_version TEXT NOT NULL,
  notify_status TEXT NOT NULL DEFAULT 'pending',  -- pending | sent | failed
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_interest_created_at ON interest_submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_interest_notify_status ON interest_submissions (notify_status);
