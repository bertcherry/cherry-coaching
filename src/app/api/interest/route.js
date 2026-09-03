import { getRequestContext } from '@cloudflare/next-on-pages';
import {
    CANCELLATION_POLICY_VERSION,
    WAIVER_VERSION,
    REFERRAL_PROVIDER_TRIGGER,
} from '../../interest/content';

export const runtime = 'edge';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM = 'Bert Cherry <bert@cherry-coaching.com>';
const NOTIFY_TO = 'bert.m.cherry@gmail.com';
const MAX = 5000; // per-field character cap

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const clamp = (v) => str(v).slice(0, MAX);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function validate(body) {
    const errors = {};
    const f = {
        fullName: clamp(body.fullName),
        pronouns: clamp(body.pronouns),
        email: clamp(body.email),
        phone: clamp(body.phone),
        serviceType: clamp(body.serviceType),
        locations: Array.isArray(body.locations)
            ? body.locations
                  .map(clamp)
                  .filter((v) => v && !/^other:\s*$/i.test(v)) // drop a blank "Other:"
                  .slice(0, 12)
            : [],
        goals: clamp(body.goals),
        injuries: clamp(body.injuries),
        availability: clamp(body.availability),
        frequency: clamp(body.frequency),
        extraNotes: clamp(body.extraNotes),
        referralSource: clamp(body.referralSource),
        referralProvider: clamp(body.referralProvider),
        rateTier: clamp(body.rateTier),
        paymentMethod: clamp(body.paymentMethod),
        agreedCancellation: body.agreedCancellation === true,
        agreedWaiver: body.agreedWaiver === true,
    };

    if (!f.fullName) errors.fullName = 'Please enter your name.';
    if (!f.email) errors.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(f.email)) errors.email = 'Please enter a valid email address.';
    if (!f.serviceType) errors.serviceType = 'Please choose one.';
    if (f.locations.length === 0) errors.locations = 'Please choose at least one location.';
    if (!f.goals) errors.goals = 'Please tell me what you’re looking for.';
    if (!f.injuries) errors.injuries = 'Please answer this.';
    if (!f.availability) errors.availability = 'Please share your availability.';
    if (!f.frequency) errors.frequency = 'Please share how often you’d like to meet.';
    if (!f.referralSource) errors.referralSource = 'Please choose one.';
    else if (/^other:\s*$/i.test(f.referralSource))
        errors.referralOther = 'Please specify how you heard about me.';
    if (!f.rateTier) errors.rateTier = 'Please choose a rate.';
    else if (/^other:\s*$/i.test(f.rateTier))
        errors.rateOther = 'Please specify the rate that fits your situation.';
    if (!f.paymentMethod) errors.paymentMethod = 'Please choose one.';
    if (!f.agreedCancellation)
        errors.agreedCancellation = 'You must agree to the cancellation policy.';
    if (!f.agreedWaiver) errors.agreedWaiver = 'You must agree to the liability waiver.';

    return { f, errors };
}

const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function notificationHtml(f) {
    const row = (label, value) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:700;white-space:nowrap">${esc(
            label
        )}</td><td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${esc(
            value || '—'
        )}</td></tr>`;

    return `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111">
    <h2 style="margin:0 0 12px">New interest form submission</h2>
    <table style="border-collapse:collapse">
      ${row('Name', f.fullName)}
      ${row('Pronouns', f.pronouns)}
      ${row('Email', f.email)}
      ${row('Phone', f.phone)}
      ${row('Interested in', f.serviceType)}
      ${row('Location(s)', f.locations.join('\n'))}
      ${row('Looking for', f.goals)}
      ${row('Injuries / illness', f.injuries)}
      ${row('Availability', f.availability)}
      ${row('Frequency', f.frequency)}
      ${row('Other notes', f.extraNotes)}
      ${row('Heard about me', f.referralSource)}
      ${row('Provider details', f.referralProvider)}
      ${row('Rate', f.rateTier)}
      ${row('Payment', f.paymentMethod)}
      ${row('Agreed to policy', `yes (v${CANCELLATION_POLICY_VERSION})`)}
      ${row('Agreed to waiver', `yes (v${WAIVER_VERSION})`)}
    </table>
  </div>`;
}

function confirmationHtml(firstName) {
    return `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#111;line-height:1.5">
    <p>Hi ${esc(firstName || 'there')},</p>
    <p>Thanks for filling out the interest form — I&rsquo;ve got your submission and I&rsquo;ll
    do my best to reply within 48 hours (sometimes a little longer if you&rsquo;re reaching out
    over a weekend).</p>
    <p>If anything changes in the meantime or you have questions, just reply to this email.</p>
    <p>&mdash; Bert</p>
  </div>`;
}

async function sendEmail(apiKey, payload) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const detail = await res.text().catch(() => '');
        const err = new Error(`Resend ${res.status}: ${detail}`);
        err.status = res.status;
        throw err;
    }
}

// Try the notification email a couple of times before giving up.
// Returns { ok, reason } — reason is a leak-free category for diagnostics.
async function sendNotification(apiKey, f) {
    const payload = {
        from: FROM,
        to: NOTIFY_TO,
        reply_to: f.email,
        subject: `Interest form: ${f.fullName}`,
        html: notificationHtml(f),
    };
    let lastStatus = 0;
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            await sendEmail(apiKey, payload);
            return { ok: true, reason: 'sent' };
        } catch (err) {
            lastStatus = err?.status || 0;
            console.error(`notification email attempt ${attempt} failed`, err);
            if (attempt < 3) await sleep(attempt * 500);
        }
    }
    return { ok: false, reason: lastStatus ? `resend-http-${lastStatus}` : 'request-failed' };
}

// TEMP diagnostic: GET /api/interest?diag=env-keys lists the binding/var names
// visible to the function (names only, no values). Remove once email works.
export async function GET(request) {
    const url = new URL(request.url);
    if (url.searchParams.get('diag') === 'env-keys') {
        const { env } = getRequestContext();
        return Response.json({
            envKeys: Object.keys(env || {}).sort(),
            hasResendKey: Boolean(env && env.RESEND_API_KEY),
            hasProcessEnvResend: Boolean(
                typeof process !== 'undefined' && process.env && process.env.RESEND_API_KEY
            ),
        });
    }
    return new Response('Method Not Allowed', { status: 405 });
}

export async function POST(request) {
    const { env } = getRequestContext();

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    // Honeypot — pretend success so bots don't retry.
    if (str(body.website)) {
        return Response.json({ ok: true });
    }

    const { f, errors } = validate(body);
    if (Object.keys(errors).length > 0) {
        return Response.json({ errors }, { status: 400 });
    }

    const referralProvider =
        f.referralSource === REFERRAL_PROVIDER_TRIGGER ? f.referralProvider : '';

    // 1. Save the submission — this is the source of truth.
    let id;
    try {
        const result = await env.siteDB
            .prepare(
                `INSERT INTO interest_submissions
          (full_name, pronouns, email, phone, service_type, locations, goals, injuries,
           availability, frequency, extra_notes, referral_source, referral_provider,
           rate_tier, payment_method, agreed_cancellation, agreed_waiver,
           cancellation_policy_version, waiver_version, notify_status, user_agent)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
            )
            .bind(
                f.fullName,
                f.pronouns || null,
                f.email,
                f.phone || null,
                f.serviceType,
                JSON.stringify(f.locations),
                f.goals,
                f.injuries,
                f.availability,
                f.frequency,
                f.extraNotes || null,
                f.referralSource,
                referralProvider || null,
                f.rateTier,
                f.paymentMethod,
                1,
                1,
                CANCELLATION_POLICY_VERSION,
                WAIVER_VERSION,
                'pending',
                (request.headers.get('user-agent') || '').slice(0, 500) || null
            )
            .run();
        id = result?.meta?.last_row_id;
    } catch (err) {
        console.error('interest_submissions insert failed', err);
        return Response.json(
            { error: 'Could not save your submission. Please try again.' },
            { status: 500 }
        );
    }

    // 2. Notify Bert. Retry a few times; record the outcome on the row.
    // A missing API key counts as a failure — Bert still needs to find out.
    // Read from the request context binding first; fall back to process.env in
    // case the key was configured as a plain build var rather than a binding.
    const apiKey =
        env.RESEND_API_KEY ||
        (typeof process !== 'undefined' && process.env && process.env.RESEND_API_KEY) ||
        undefined;
    let notified = false;
    let notifyReason = 'no-api-key';
    if (apiKey) {
        const r = await sendNotification(apiKey, f);
        notified = r.ok;
        notifyReason = r.reason;
    } else {
        console.error('RESEND_API_KEY is not set for this deployment — cannot notify Bert');
    }

    if (id != null) {
        try {
            await env.siteDB
                .prepare(`UPDATE interest_submissions SET notify_status = ? WHERE id = ?`)
                .bind(notified ? 'sent' : 'failed', id)
                .run();
        } catch (err) {
            console.error('notify_status update failed', err);
        }
    }

    // 3. Confirmation to the submitter — best effort, don't block on it.
    if (apiKey) {
        try {
            await sendEmail(apiKey, {
                from: FROM,
                to: f.email,
                reply_to: NOTIFY_TO,
                subject: 'Thanks for reaching out to Cherry Coaching',
                html: confirmationHtml(f.fullName.split(/\s+/)[0]),
            });
        } catch (err) {
            console.error('confirmation email failed', err);
        }
    }

    // The submission is saved either way. `notifyFailed` tells the form to ask the
    // person to also reach out directly so Bert is sure to see it. `notifyReason`
    // is a leak-free category (no key, no PII) for diagnosing delivery problems.
    return Response.json({ ok: true, notifyFailed: !notified, notifyReason });
}
