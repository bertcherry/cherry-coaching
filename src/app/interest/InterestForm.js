'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Interest.module.css';
import AgreementPanel from './AgreementPanel';
import {
    CANCELLATION_POLICY,
    WAIVER_TITLE,
    WAIVER_PARAGRAPHS,
    SERVICE_OPTIONS,
    LOCATION_OPTIONS,
    REFERRAL_OPTIONS,
    REFERRAL_PROVIDER_TRIGGER,
    RATE_OPTIONS,
    RATE_TIERS,
    RATE_TABLE,
    PAYMENT_OPTIONS,
} from './content';

const OTHER = 'Other';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Message shown when an "Other" option is chosen but its text field is blank.
const OTHER_MSG = {
    referralOther: 'Please specify how you heard about me.',
    rateOther: 'Please specify the rate that fits your situation.',
    locationOther: 'Please specify your other location.',
};

const emptyForm = {
    fullName: '',
    pronouns: '',
    email: '',
    phone: '',
    serviceType: '',
    locations: [],
    locationOtherChecked: false,
    locationOther: '',
    goals: '',
    injuries: '',
    availability: '',
    frequency: '',
    extraNotes: '',
    referralSource: '',
    referralOther: '',
    referralProvider: '',
    rateTier: '',
    rateOther: '',
    paymentMethod: '',
    agreedCancellation: false,
    agreedWaiver: false,
    website: '', // honeypot
};

const InterestForm = () => {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [notifyFailed, setNotifyFailed] = useState(false);

    const referralOtherRef = useRef(null);
    const rateOtherRef = useRef(null);
    const locationOtherRef = useRef(null);

    const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

    const clearErr = (name) =>
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });

    // Inline validation for an "Other" text field, run on blur (form best practice:
    // don't flag the field until the person leaves it empty).
    const blurOther = (name, isActive, value) => {
        if (isActive && !value.trim()) {
            setErrors((prev) => ({ ...prev, [name]: OTHER_MSG[name] }));
        } else {
            clearErr(name);
        }
    };

    const focusSoon = (ref) => requestAnimationFrame(() => ref.current?.focus());

    const toggleLocation = (value) => {
        setForm((f) => ({
            ...f,
            locations: f.locations.includes(value)
                ? f.locations.filter((v) => v !== value)
                : [...f.locations, value],
        }));
    };

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = 'Please enter your name.';
        if (!form.email.trim()) e.email = 'Please enter your email.';
        else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid email address.';
        if (!form.serviceType) e.serviceType = 'Please choose one.';
        if (form.locations.length === 0 && !(form.locationOtherChecked && form.locationOther.trim()))
            e.locations = 'Please choose at least one location.';
        else if (form.locationOtherChecked && !form.locationOther.trim())
            e.locationOther = OTHER_MSG.locationOther;
        if (!form.goals.trim()) e.goals = 'Please tell me what you’re looking for.';
        if (!form.injuries.trim())
            e.injuries = 'Please answer this — write "none" if that’s the case.';
        if (!form.availability.trim()) e.availability = 'Please share your availability.';
        if (!form.frequency.trim()) e.frequency = 'Please share how often you’d like to meet.';
        if (!form.referralSource) e.referralSource = 'Please choose one.';
        else if (form.referralSource === OTHER && !form.referralOther.trim())
            e.referralOther = OTHER_MSG.referralOther;
        if (!form.rateTier) e.rateTier = 'Please choose a rate.';
        else if (form.rateTier === OTHER && !form.rateOther.trim())
            e.rateOther = OTHER_MSG.rateOther;
        if (!form.paymentMethod) e.paymentMethod = 'Please choose one.';
        if (!form.agreedCancellation)
            e.agreedCancellation = 'You must agree to the cancellation policy to continue.';
        if (!form.agreedWaiver)
            e.agreedWaiver = 'You must agree to the liability waiver to continue.';
        return e;
    };

    const buildPayload = () => {
        const locations = [...form.locations];
        if (form.locationOtherChecked && form.locationOther.trim())
            locations.push(`Other: ${form.locationOther.trim()}`);
        return {
            fullName: form.fullName.trim(),
            pronouns: form.pronouns.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            serviceType: form.serviceType,
            locations,
            goals: form.goals.trim(),
            injuries: form.injuries.trim(),
            availability: form.availability.trim(),
            frequency: form.frequency.trim(),
            extraNotes: form.extraNotes.trim(),
            referralSource:
                form.referralSource === OTHER
                    ? `Other: ${form.referralOther.trim()}`
                    : form.referralSource,
            referralProvider:
                form.referralSource === REFERRAL_PROVIDER_TRIGGER
                    ? form.referralProvider.trim()
                    : '',
            rateTier:
                form.rateTier === OTHER ? `Other: ${form.rateOther.trim()}` : form.rateTier,
            paymentMethod: form.paymentMethod,
            agreedCancellation: form.agreedCancellation,
            agreedWaiver: form.agreedWaiver,
            website: form.website,
        };
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) {
            const first = document.querySelector('[aria-invalid="true"], .' + styles.hasError);
            if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setStatus('submitting');
        try {
            const res = await fetch('/api/interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload()),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setNotifyFailed(!!data.notifyFailed);
                setStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            if (res.status === 400 && data.errors) {
                setErrors(data.errors);
            }
            setStatus('error');
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.wrap}>
                <h1>Thanks — I’ve got your submission</h1>
                {notifyFailed ? (
                    <div className={styles.formError} role="alert">
                        <p>
                            Your submission was saved, but there was a problem emailing Bert to
                            let her know. Please also send a short note to{' '}
                            <a href="mailto:bert@cherry-coaching.com">
                                bert@cherry-coaching.com
                            </a>{' '}
                            so she’s sure to follow up.
                        </p>
                    </div>
                ) : (
                    <p>
                        I’ll do my best to reply within 48 hours (sometimes a little longer if
                        you’re reaching out over a weekend). Check your inbox for a confirmation
                        email; if it’s not there, check spam.
                    </p>
                )}
                <p>
                    <Link href="/">Back to home</Link>
                </p>
            </div>
        );
    }

    const err = (name) =>
        errors[name] ? (
            <span className={styles.error} id={`${name}-error`} role="alert">
                {errors[name]}
            </span>
        ) : null;

    const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);
    const invalid = (name) => (errors[name] ? 'true' : undefined);

    return (
        <form className={styles.wrap} onSubmit={handleSubmit} noValidate>
            <h1>Interest Form</h1>
            <p className={styles.intro}>
                Fill out this interest form and Bert will do her best to respond within 48 hours
                (sometimes longer over a weekend).
            </p>

            {status === 'error' && (
                <div className={styles.formError} role="alert">
                    Something went wrong submitting the form. Please check the fields above, or
                    email <a href="mailto:bert@cherry-coaching.com">bert@cherry-coaching.com</a>{' '}
                    directly.
                </div>
            )}

            {/* Honeypot: hidden from real users */}
            <div className={styles.hp} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set('website', e.target.value)}
                />
            </div>

            <fieldset className={styles.section}>
                <legend>Contact</legend>

                <div className={`${styles.field} ${errors.fullName ? styles.hasError : ''}`}>
                    <label htmlFor="fullName">Full name *</label>
                    <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                        aria-invalid={invalid('fullName')}
                        aria-describedby={describedBy('fullName')}
                    />
                    {err('fullName')}
                </div>

                <div className={styles.field}>
                    <label htmlFor="pronouns">Pronouns</label>
                    <input
                        id="pronouns"
                        type="text"
                        value={form.pronouns}
                        onChange={(e) => set('pronouns', e.target.value)}
                    />
                </div>

                <div className={`${styles.field} ${errors.email ? styles.hasError : ''}`}>
                    <label htmlFor="email">Email address *</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        aria-invalid={invalid('email')}
                        aria-describedby={describedBy('email')}
                    />
                    {err('email')}
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                    />
                </div>
            </fieldset>

            <fieldset
                className={`${styles.section} ${errors.serviceType ? styles.hasError : ''}`}
            >
                <legend>Which are you interested in? *</legend>
                {SERVICE_OPTIONS.map((opt) => (
                    <label key={opt} className={styles.choice}>
                        <input
                            type="radio"
                            name="serviceType"
                            value={opt}
                            checked={form.serviceType === opt}
                            onChange={(e) => set('serviceType', e.target.value)}
                            aria-describedby={describedBy('serviceType')}
                        />
                        {opt}
                    </label>
                ))}
                {err('serviceType')}
            </fieldset>

            <fieldset
                className={`${styles.section} ${
                    errors.locations || errors.locationOther ? styles.hasError : ''
                }`}
            >
                <legend>At which location(s) are you interested in coaching? *</legend>
                {LOCATION_OPTIONS.map((opt) => (
                    <label key={opt} className={styles.choice}>
                        <input
                            type="checkbox"
                            checked={form.locations.includes(opt)}
                            onChange={() => toggleLocation(opt)}
                        />
                        {opt}
                    </label>
                ))}
                <label className={styles.choice}>
                    <input
                        type="checkbox"
                        checked={form.locationOtherChecked}
                        onChange={(e) => {
                            set('locationOtherChecked', e.target.checked);
                            if (e.target.checked) focusSoon(locationOtherRef);
                            else clearErr('locationOther');
                        }}
                    />
                    <span>Other:</span>
                    <input
                        ref={locationOtherRef}
                        type="text"
                        className={styles.otherInput}
                        value={form.locationOther}
                        onChange={(e) => {
                            set('locationOther', e.target.value);
                            if (e.target.value.trim()) clearErr('locationOther');
                        }}
                        onFocus={() => set('locationOtherChecked', true)}
                        onBlur={() =>
                            blurOther(
                                'locationOther',
                                form.locationOtherChecked,
                                form.locationOther
                            )
                        }
                        aria-label="Other location"
                        aria-invalid={invalid('locationOther')}
                        aria-describedby={describedBy('locationOther')}
                    />
                </label>
                {err('locations')}
                {err('locationOther')}
            </fieldset>

            <fieldset className={styles.section}>
                <legend>What you&apos;re looking for</legend>

                <div className={`${styles.field} ${errors.goals ? styles.hasError : ''}`}>
                    <label htmlFor="goals">
                        What are you looking for from coaching? *
                    </label>
                    <span className={styles.help}>As detailed as you can be, the better.</span>
                    <textarea
                        id="goals"
                        rows={4}
                        value={form.goals}
                        onChange={(e) => set('goals', e.target.value)}
                        aria-invalid={invalid('goals')}
                        aria-describedby={describedBy('goals')}
                    />
                    {err('goals')}
                </div>

                <div className={`${styles.field} ${errors.injuries ? styles.hasError : ''}`}>
                    <label htmlFor="injuries">
                        Do you have any injuries or chronic illnesses that significantly impact
                        your movement options or your ability to train consistently? *
                    </label>
                    <textarea
                        id="injuries"
                        rows={3}
                        value={form.injuries}
                        onChange={(e) => set('injuries', e.target.value)}
                        aria-invalid={invalid('injuries')}
                        aria-describedby={describedBy('injuries')}
                    />
                    {err('injuries')}
                </div>

                <div className={`${styles.field} ${errors.availability ? styles.hasError : ''}`}>
                    <label htmlFor="availability">When are you available to train? *</label>
                    <span className={styles.help}>
                        Be as specific as possible, including preferred times and alternate times.
                        e.g. Mondays between 3–6pm; mid-morning any weekday.
                    </span>
                    <textarea
                        id="availability"
                        rows={3}
                        value={form.availability}
                        onChange={(e) => set('availability', e.target.value)}
                        aria-invalid={invalid('availability')}
                        aria-describedby={describedBy('availability')}
                    />
                    {err('availability')}
                </div>

                <div className={`${styles.field} ${errors.frequency ? styles.hasError : ''}`}>
                    <label htmlFor="frequency">How frequently do you want to work together? *</label>
                    <span className={styles.help}>
                        e.g. twice a week; once a month with programming for two workouts.
                    </span>
                    <textarea
                        id="frequency"
                        rows={2}
                        value={form.frequency}
                        onChange={(e) => set('frequency', e.target.value)}
                        aria-invalid={invalid('frequency')}
                        aria-describedby={describedBy('frequency')}
                    />
                    {err('frequency')}
                </div>

                <div className={styles.field}>
                    <label htmlFor="extraNotes">
                        Any specific requests around coaching, accessibility needs, or anything
                        else you&apos;d like to share at this stage?
                    </label>
                    <textarea
                        id="extraNotes"
                        rows={3}
                        value={form.extraNotes}
                        onChange={(e) => set('extraNotes', e.target.value)}
                    />
                </div>
            </fieldset>

            <fieldset
                className={`${styles.section} ${
                    errors.referralSource || errors.referralOther ? styles.hasError : ''
                }`}
            >
                <legend>How did you hear about me? *</legend>
                {REFERRAL_OPTIONS.map((opt) => (
                    <React.Fragment key={opt}>
                        <label className={styles.choice}>
                            <input
                                type="radio"
                                name="referralSource"
                                value={opt}
                                checked={form.referralSource === opt}
                                onChange={(e) => {
                                    set('referralSource', e.target.value);
                                    clearErr('referralOther');
                                }}
                            />
                            {opt}
                        </label>
                        {opt === REFERRAL_PROVIDER_TRIGGER &&
                            form.referralSource === REFERRAL_PROVIDER_TRIGGER && (
                                <div className={`${styles.field} ${styles.subField}`}>
                                    <label htmlFor="referralProvider">
                                        Who are they, and what do they see you for?
                                    </label>
                                    <span className={styles.help}>
                                        With your okay, I like to coordinate with practitioners
                                        on your care.
                                    </span>
                                    <textarea
                                        id="referralProvider"
                                        rows={2}
                                        value={form.referralProvider}
                                        onChange={(e) =>
                                            set('referralProvider', e.target.value)
                                        }
                                    />
                                </div>
                            )}
                    </React.Fragment>
                ))}
                <label className={styles.choice}>
                    <input
                        type="radio"
                        name="referralSource"
                        value={OTHER}
                        checked={form.referralSource === OTHER}
                        onChange={(e) => {
                            set('referralSource', e.target.value);
                            focusSoon(referralOtherRef);
                        }}
                    />
                    <span>Other:</span>
                    <input
                        ref={referralOtherRef}
                        type="text"
                        className={styles.otherInput}
                        value={form.referralOther}
                        onChange={(e) => {
                            set('referralOther', e.target.value);
                            if (e.target.value.trim()) clearErr('referralOther');
                        }}
                        onFocus={() => set('referralSource', OTHER)}
                        onBlur={() =>
                            blurOther(
                                'referralOther',
                                form.referralSource === OTHER,
                                form.referralOther
                            )
                        }
                        aria-label="Other source"
                        aria-invalid={invalid('referralOther')}
                        aria-describedby={describedBy('referralOther')}
                    />
                </label>
                {err('referralSource')}
                {err('referralOther')}
            </fieldset>

            <fieldset
                className={`${styles.section} ${
                    errors.rateTier || errors.rateOther ? styles.hasError : ''
                }`}
            >
                <legend>Which rate fits your situation? *</legend>
                <span className={styles.help}>
                    All rates are offered on a sliding scale based on access to financial
                    resources. Pick according to your situation now — if anything changes, let
                    Bert know and we&apos;ll adjust.
                </span>

                <details className={styles.ratePanel}>
                    <summary>See all rates</summary>
                    <div className={styles.rateScroll}>
                        <table className={styles.rateTable}>
                            <caption>Cherry Coaching rates by sliding-scale tier</caption>
                            <thead>
                                <tr>
                                    <th scope="col">&nbsp;</th>
                                    {RATE_TIERS.map((t) => (
                                        <th key={t} scope="col">
                                            {t}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {RATE_TABLE.map((row) => (
                                    <tr key={row.label}>
                                        <th scope="row">{row.label}</th>
                                        {row.rates.map((r, i) => (
                                            <td key={i}>{r}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className={styles.rateNote}>
                        Custom programming starts with 2–4 in-person assessment sessions billed
                        at the 60-min session rate.
                    </p>
                </details>

                {RATE_OPTIONS.map((opt) => (
                    <label key={opt} className={styles.choice}>
                        <input
                            type="radio"
                            name="rateTier"
                            value={opt}
                            checked={form.rateTier === opt}
                            onChange={(e) => {
                                set('rateTier', e.target.value);
                                clearErr('rateOther');
                            }}
                        />
                        {opt}
                    </label>
                ))}
                <label className={styles.choice}>
                    <input
                        type="radio"
                        name="rateTier"
                        value={OTHER}
                        checked={form.rateTier === OTHER}
                        onChange={(e) => {
                            set('rateTier', e.target.value);
                            focusSoon(rateOtherRef);
                        }}
                    />
                    <span>Other:</span>
                    <input
                        ref={rateOtherRef}
                        type="text"
                        className={styles.otherInput}
                        value={form.rateOther}
                        onChange={(e) => {
                            set('rateOther', e.target.value);
                            if (e.target.value.trim()) clearErr('rateOther');
                        }}
                        onFocus={() => set('rateTier', OTHER)}
                        onBlur={() =>
                            blurOther('rateOther', form.rateTier === OTHER, form.rateOther)
                        }
                        aria-label="Other rate"
                        aria-invalid={invalid('rateOther')}
                        aria-describedby={describedBy('rateOther')}
                    />
                </label>
                {err('rateTier')}
                {err('rateOther')}
            </fieldset>

            <fieldset
                className={`${styles.section} ${errors.paymentMethod ? styles.hasError : ''}`}
            >
                <legend>Which payment method will you use? *</legend>
                <span className={styles.help}>
                    Bert accepts Venmo, Zelle, PayPal, or cash. PayPal is less preferable due to
                    their fee structure, but works if it&apos;s the best option for you.
                </span>
                {PAYMENT_OPTIONS.map((opt) => (
                    <label key={opt} className={styles.choice}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={opt}
                            checked={form.paymentMethod === opt}
                            onChange={(e) => set('paymentMethod', e.target.value)}
                        />
                        {opt}
                    </label>
                ))}
                {err('paymentMethod')}
            </fieldset>

            <fieldset className={styles.section}>
                <legend>Agreements</legend>
                <span className={styles.help}>
                    Please open each of these and read to the end — the checkbox unlocks once
                    you&apos;ve scrolled through.
                </span>

                <AgreementPanel
                    name="agreedCancellation"
                    summary="Cancellation policy"
                    checkboxLabel="I have read and agree to the cancellation policy. *"
                    checked={form.agreedCancellation}
                    onChange={(v) => set('agreedCancellation', v)}
                    error={errors.agreedCancellation}
                >
                    <ul>
                        {CANCELLATION_POLICY.map((line, i) => (
                            <li key={i}>{line}</li>
                        ))}
                    </ul>
                </AgreementPanel>

                <AgreementPanel
                    name="agreedWaiver"
                    summary="Liability waiver and release of liability"
                    checkboxLabel="I have read and agree to the liability waiver and release of liability. *"
                    checked={form.agreedWaiver}
                    onChange={(v) => set('agreedWaiver', v)}
                    error={errors.agreedWaiver}
                >
                    <h3>{WAIVER_TITLE}</h3>
                    {WAIVER_PARAGRAPHS.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </AgreementPanel>
            </fieldset>

            <button className={styles.btn} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : 'Submit'}
            </button>
        </form>
    );
};

export default InterestForm;
