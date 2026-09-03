# Interest Form Rebuild — Spec

Replace the externally-linked Google Form with a form embedded on the site.

## Build status — built, tested locally, not yet deployed

New files:
- `src/app/interest/page.js` — route wrapper + metadata
- `src/app/interest/InterestForm.js` — the form (client component)
- `src/app/interest/AgreementPanel.js` — read-to-the-end disclosure + gated checkbox
- `src/app/interest/Interest.module.css`
- `src/app/interest/content.js` — option lists, policy + waiver text, rate table, version strings
- `src/app/api/interest/route.js` — edge route: validate → insert into D1 → notify → confirm
- `interest_submissions.sql` — D1 migration

### Layout / field details

- Form is `max-width: min(740px, 100vw - 40px)` so it stays inside the viewport even
  though the site's shared header overflows its container below ~500px (pre-existing,
  site-wide — not fixed here). `box-sizing: border-box` on everything in the form so inputs
  sit flush inside the section padding (equal gap left and right, matching the outer margin).
- Inline "Other:" text inputs are compact with a 1px border (lighter than the 3px section
  border) so they sit on the same line height as the plain radio/checkbox rows.
- **Locations**: "Other:" is now a checkbox selectable *alongside* the fixed options
  (multi-select), with its own text field. Copy updated to Bert's wording
  ("In-person gym, private studio near Jimi Hendrix Park", etc.).
- **"Other" text fields** (locations, referral, rate): required when the option is chosen —
  enforced client-side *and* server-side (a bare `"Other:"` is rejected). Selecting the Other
  radio/checkbox moves the cursor into its text field; leaving it empty on blur shows inline
  helper text, which clears once they type or pick another option.
- **Healthcare-provider follow-up** ("who are they, what do they see you for?") renders
  directly beneath that radio option, indented, not at the bottom of the list.
- **Rates**: a "See all rates" pop-out (`<details>`) holds one condensed table of every
  rate across all three tiers, in a horizontal-scroll wrapper, sized to stay legible down
  to ~260px wide (row labels wrap rather than force scroll).

Changed: `src/app/page.js` and `src/app/services/page.js` now link to `/interest`; the two
home-page "48 hours" promises softened; `wrangler.toml` gains a second D1 binding `siteDB`.

### Separate database

Form data goes to a **new** D1 database `cherry-coaching` (binding `siteDB`), not the existing
`videoDB`. `wrangler.toml` has the binding with a placeholder `database_id` — replace it after
running `wrangler d1 create`.

### Agreement panels — read-to-the-end gate

Each agreement is an `AgreementPanel`: a `<details>` disclosure with the text in a
fixed-height (200px) scroll box. The checkbox is `disabled` until the reader opens the panel
**and** scrolls its content to the bottom (or the content is short enough to need no scroll).
Helper text explains the gate; an "— End —" marker sits at the bottom of each text.

### Notification is not best-effort

Order in `route.js`:
1. Insert the submission into D1 — source of truth. Failure here → HTTP 500, user sees an error.
2. Email Bert the submission, **retrying up to 3× with backoff**. The row's `notify_status`
   column is set to `sent` or `failed`. **A missing `RESEND_API_KEY` also counts as `failed`**
   — a misconfigured deployment must not silently swallow submissions.
3. Email the submitter their confirmation — this one *is* best-effort.
4. Response is `{ ok: true, notifyFailed: <bool> }` where `notifyFailed` is simply `!notified`.

If the notification ultimately fails, the form's success screen changes: instead of "expect a
reply in 48 hours" it tells the person their submission was saved but there was a problem
alerting Bert, and asks them to also email `bert@cherry-coaching.com` directly. So Bert finds
out one of three ways: the email, the person's direct follow-up, or a periodic check of
`SELECT * FROM interest_submissions WHERE notify_status = 'failed'`.

Verified locally: `next build` passes; valid POST writes a row and returns `{ok:true}`;
invalid POST returns field errors; honeypot returns fake success; with a deliberately bad
Resend key the POST returns `notifyFailed:true` and the row is marked `failed`. Real email
delivery has **not** been exercised (no key in local dev).

## Wiring-up runbook

The Cloudflare steps need an authenticated wrangler / dashboard access — a non-interactive
agent session can't do them. Order:

### 1. Create the D1 database (local terminal)

```bash
npx wrangler login                       # one time, opens browser
npx wrangler d1 create cherry-coaching   # copy the database_id from the output
```

### 2. Put the id in wrangler.toml

Replace `REPLACE_WITH_ID_FROM_wrangler_d1_create` (the `siteDB` block) with the real id.

### 3. Create the table in the remote DB

```bash
npm run sitedb:remote
# (npm run sitedb:local does the same for local dev — already done on this machine)
```

### 4. Cloudflare dashboard → Pages → `cherry-coaching` project → Settings

- **Bindings → D1**: add `siteDB` → database `cherry-coaching`, for **Production and Preview**.
  (The existing `videoDB` binding is a template for what this should look like.)
- **Environment variables / Secrets**: confirm **`RESEND_API_KEY`** exists for **Production**
  (and Preview, if you want preview deploys to send mail). It's already set per Bert — just
  verify it's on this project and the right environment.
- **Build**: confirm build command is `npx @cloudflare/next-on-pages` and output dir
  `.vercel/output/static` (matches `wrangler.toml`). Verified locally that this build
  produces `/api/interest` and `/interest` as edge routes.

### 5. Deploy

Commit the new files + `wrangler.toml` change and push to `main`. Cloudflare Pages builds and
deploys automatically (no CI workflow in the repo — it's the Pages Git integration).

### 6. Verify on the live site

- Open `/interest`, submit one real test.
- Confirm the row: `npx wrangler d1 execute cherry-coaching --remote --command "SELECT * FROM interest_submissions"`
- Confirm the notification email reaches bert.m.cherry@gmail.com and the confirmation email
  reaches the test address. Check neither is in spam.

**Diagnosing email failures.** The POST response carries `notifyReason` (leak-free — no key,
no PII):

| `notifyReason` | meaning | fix |
|---|---|---|
| `sent` | Resend accepted it | (delivery/spam issue if still missing) |
| `no-api-key` | `RESEND_API_KEY` not visible to the function | add it to the **Production** env in the Pages dashboard, then **redeploy** (env vars are baked per-deployment) |
| `resend-http-403` | domain not verified | finish `cherry-coaching.com` DNS verification in Resend |
| `resend-http-401` | key invalid / typo / wrong scope | regenerate a sending key, re-paste, redeploy |
| `resend-http-422` | bad `from`/`to` | `from` must be on the verified domain |
| `request-failed` | network error reaching Resend | transient — retry |

The row's `notify_status` mirrors this (`sent` / `failed`).

### 7. Retire the Google Form

Turn off responses (or leave it live and check it occasionally during a transition window).

### Later / optional

- Cloudflare Turnstile on the form if the honeypot proves insufficient.
- A scheduled worker emailing a digest of any `notify_status = 'failed'` rows, as a backstop.
- Untrack the stale `.vercel/output/` build artifacts (`.gitignore` already lists `.vercel/`);
  `git rm -r --cached .vercel` — Pages rebuilds from source so the committed copy is unused.

## Decisions locked

| Question | Decision |
|---|---|
| Submission destination | Cloudflare Pages Function → write to D1 + email Bert a copy |
| Payment method question | Keep on the form |
| Liability waiver | Keep at interest stage, shown in an expandable panel / overlay |
| Cancellation policy | Keep at interest stage, same overlay pattern |
| Consent capture | Both are required checkboxes, unchecked by default, **disabled until the reader opens the panel and scrolls its text to the end**; submit blocked until checked; store waiver + policy version with each submission |
| Database | New D1 database `cherry-coaching` (binding `siteDB`), separate from `videoDB` |
| Notification reliability | Retry 3×; record `notify_status`; if it still fails, tell the submitter to email Bert directly rather than showing a plain success |

## Content fixes (independent of platform)

These are drift between the current Google Form and the post-overhaul site:

1. **Rate tiers:** `Assisted / Value of Service / Abundance` → `Community / Standard / Abundance` (match services page).
2. **Locations:** drop the two Rain City Fit "SoDo" options. Current locations: studio near Jimi Hendrix Park, Rain City Fit Capitol Hill, sport fields around central Seattle, virtual.
3. **Intro copy:** single line — "Fill out this interest form and Bert will do her best to respond within 48 hours (sometimes longer over a weekend)." No bio paragraph; people arrive here from the site.
4. **Add a service-type question** — 1:1 Training / Custom Programming / A blend / Not sure yet. This is now the central framing on the site ("Two Ways to Work Together") and is missing from the form.
5. **Rate question** should show or link the actual rate tables (session vs. programming rates differ).
6. **Referral question** → "How did you hear about me?" with a healthcare-provider follow-up (see fields below).

## Field list

Required fields marked `*`.

### Contact
| # | Field | Type | Notes |
|---|---|---|---|
| 1 | Full name `*` | text | |
| 2 | Pronouns | text | |
| 3 | Email `*` | email | validated |
| 4 | Phone | tel | optional; used once scheduling starts |

### What you're looking for
| # | Field | Type | Notes |
|---|---|---|---|
| 5 | Which are you interested in? `*` | radio | 1:1 Training / Custom Programming / A blend / Not sure yet |
| 6 | Location(s) `*` | checkboxes | Studio near Jimi Hendrix Park / Rain City Fit Capitol Hill / Field work / Virtual / Other (text) |
| 7 | What are you looking for from coaching? `*` | textarea | helper: "As detailed as you can be, the better." |
| 8 | Do you have any injuries or chronic illnesses that significantly impact your movement options or your ability to train consistently? `*` | textarea | |
| 9 | When are you available to train? `*` | textarea | helper: "Be specific, including preferred times and alternates. e.g. Mondays 3–6pm; mid-morning any weekday." |
| 10 | How often do you want to work together? `*` | text | helper: "e.g. twice a week; once a month with programming for two workouts." |
| 11 | Do you have any specific requests around coaching, accessibility needs, or anything else you'd like to share at this stage? | textarea | optional |

### How you found me
| # | Field | Type | Notes |
|---|---|---|---|
| 12 | How did you hear about me? `*` | radio + Other | A friend or family member / A healthcare provider (PT, chiro, massage therapist, etc.) / Google or web search / Rain City Fit / Saw me coaching at a gym or field / Other (text) |
| 12a | If a healthcare provider referred you, who are they and what do they see you for? | textarea | shown when "healthcare provider" selected; copy: "With your okay, I like to coordinate with practitioners on your care." |

### Logistics
| # | Field | Type | Notes |
|---|---|---|---|
| 13 | Which rate fits your situation? `*` | radio + Other | Community / Standard / Abundance / Other (text). Show sliding-scale explainer + rate tables (or link to /services). Copy: "Pick according to your situation now. If anything changes, let Bert know and we'll adjust." |
| 14 | Payment method `*` | radio | Venmo (@bertcherry) / Zelle (bert.m.cherry@gmail.com) / PayPal (paypal.me/CherryCoaching) / Cash. Note PayPal fee caveat. |

### Agreements
| # | Field | Type | Notes |
|---|---|---|---|
| 15 | ☐ I have read and agree to the **cancellation policy** `*` | required checkbox | "cancellation policy" opens the overlay |
| 16 | ☐ I have read and agree to the **liability waiver and release of liability** `*` | required checkbox | opens the overlay |

## Overlay / panel behavior

- Trigger: the underlined phrase inside each checkbox label.
- Implementation: start with inline `<details>`/`<summary>` (lowest risk, no focus-management bugs). Upgrade to a modal only if design calls for it — a modal needs focus trap, ESC-to-close, visible close button, `role="dialog"` + `aria-modal`, background scroll lock, and its own internal scroll.
- Content is long on mobile — the panel must scroll independently.
- Checkbox stays unchecked regardless of whether the panel was opened; opening is not consent.

## Backend

### Route
`src/app/api/interest/route.js` — a Next.js edge route handler (next-on-pages), `runtime = 'edge'`,
bindings via `getRequestContext().env`. Accepts `POST` JSON, validates, writes to D1, sends
emails, returns `{ ok: true, notifyFailed }` or `{ errors }` (400) / `{ error }` (500).

### D1

New database `cherry-coaching`, binding `siteDB` (see `wrangler.toml`). Schema is in
`interest_submissions.sql` — the authoritative copy. Summary of columns: contact fields,
`service_type`, `locations` (JSON array), the free-text answers, `referral_source` /
`referral_provider`, `rate_tier`, `payment_method`, `agreed_cancellation` / `agreed_waiver`
(1/0), `cancellation_policy_version` / `waiver_version` (both `"2023"`), `notify_status`
(`pending` | `sent` | `failed`), `user_agent`, `created_at`.

### Email (Resend — already set up)

The function sends two emails per submission via Resend:

1. **Notification to Bert** — formatted copy of every field. `To:` bert.m.cherry@gmail.com, `Reply-To:` the submitter's email so Bert can reply directly.
2. **Confirmation to the submitter** — see copy below. `Reply-To:` bert.m.cherry@gmail.com.

**Resend config (confirmed):**
- Verified domain: `cherry-coaching.com`
- `From:` `Bert Cherry <bert@cherry-coaching.com>`
- `RESEND_API_KEY` already set as a Cloudflare Pages secret.

#### Confirmation email copy

> **Subject:** Thanks for reaching out to Cherry Coaching
>
> Hi {first name},
>
> Thanks for filling out the interest form — I've got your submission and I'll do my best to reply within 48 hours (sometimes a little longer if you're reaching out over a weekend).
>
> If anything changes in the meantime or you have questions, just reply to this email.
>
> — Bert

### Consent versioning

Each submission stores which version of the waiver and cancellation policy the person agreed to. Neither has changed since the business opened, so the stored value is just `"2023"` for both — a fixed label, nothing for Bert to maintain. It only matters later: if either text is ever edited, bump the label (e.g. `"2026"`) and old records still show what those people actually agreed to. No effective-date line needs to be added to the waiver text itself.

### Spam protection

- Honeypot field (hidden input, reject if filled).
- Cloudflare Turnstile widget (free, first-party) if honeypot proves insufficient.
- Basic per-IP rate limit in the function.

## Frontend

- New route `src/app/interest/page.js` + `Interest.module.css`, styled to match existing modules.
- Replace the three Google Form links (home page ×2, services page ×1) with `/interest`.
- Progressive enhancement: real `required`, `type`, and inline validation messages; disable submit while posting; success and error states.
- Consider splitting into sections/steps given the length (~16 fields), but a single scrolling page with clear section headers is fine and simpler.

## Open items for Bert

- [x] Form intro — one line, "Fill out this interest form and Bert will get back to you within 48 hours."
- [x] Cancellation policy text confirmed (reproduced below).
- [x] Confirmation email to submitter — yes.
- [x] Resend: `cherry-coaching.com` verified, from `bert@cherry-coaching.com`, `RESEND_API_KEY` secret set.

## Note: existing "48 hours" copy

The home page currently promises "I'll be in touch within 48 hours" and "Fill out the interest form and I'll be in touch within 48 hours." Consider softening to match the form's new phrasing.

### Cancellation policy (current text, from the Google Form)

> - You can cancel your enrollment up to 24 hours prior to the start of the session without penalty by messaging Bert.
> - Please cancel as soon as you know you cannot make it.
> - Cancellations made within 24 hours of the start of the session are considered Late Cancels/No Shows. You may be able to reschedule with Bert; if they cannot reschedule, it is treated as a Late Cancel/No Show. Late cancellations and no-shows incur a fee of your session rate.
> - Bert may cancel sessions due to adverse weather, COVID exposure procedures, or coach illness. You will not be charged for these.
> - Life happens! The Late Cancel/No Show fee is waived for your first time each calendar year.

### Liability waiver (current text, to be shown in the overlay)

> **CHERRY COACHING – HEALTH & FITNESS PROGRAMMING WAIVER AND RELEASE OF LIABILITY**
>
> In consideration of my use of the health and fitness programming provided by the company, I expressly agree and contract, on behalf of myself, my heirs, executors, administrators, successors and assigns, that Cherry Coaching and its insurers, employees, officers, directors, and associates, shall not be liable for any damages arising from personal injuries (including death) sustained by me, or my guests, as a result of the use of the health and fitness programming, regardless of whether such injuries result, in whole or in part, from the negligence of the company.
>
> By the execution of this agreement, I accept and assume full responsibility for any and all injuries, damages (both economic and non-economic), and losses of any type, which may occur to me or my guest, and I hereby fully and forever release and discharge Cherry Coaching, its insurers, employees, officers, directors, and associates, from any and all claims, demands, damages, rights of action, or causes of action, present or future, whether the same be known or unknown, anticipated, or unanticipated, resulting from or arising out of the use of said health & fitness programming.
>
> I expressly agree to indemnify and hold Cherry Coaching harmless against any and all claims, demands, damages, rights of action, or causes of action, of any person or entity, that may arise from injuries or damages sustained by me or my guests.
>
> I agree to comply with all rules imposed by Cherry Coaching regarding the use of health and fitness programming. I agree to conduct myself in a controlled and reasonable manner at all times, and to refrain from using any health and fitness programming in a manner inconsistent with its intended design and purpose.
>
> I understand and acknowledge that the use of health and fitness programming involves risk of serious injury, including permanent disability and death.
>
> BY CHECKING THE BOX OR SIGNING BELOW YOU ATTEST TO HAVING READ THE FOREGOING WAIVER AND RELEASE OF LIABILITY AND VOLUNTARILY EXECUTED THIS DOCUMENT WITH FULL KNOWLEDGE OF ITS CONTENT.
