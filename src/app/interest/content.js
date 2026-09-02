// Shared content + option lists for the interest form.
// Bump the *_VERSION strings only if the corresponding text is edited; old
// submissions keep the version they were recorded with.

export const CANCELLATION_POLICY_VERSION = '2023';
export const WAIVER_VERSION = '2023';

export const CANCELLATION_POLICY = [
    'You can cancel your enrollment up to 24 hours prior to the start of the session without penalty by messaging Bert.',
    'Please cancel as soon as you know you cannot make it.',
    'Cancellations made within 24 hours of the start of the session are considered Late Cancels/No Shows. You may be able to reschedule with Bert; if they cannot reschedule, it is treated as a Late Cancel/No Show. Late cancellations and no-shows incur a fee of your session rate.',
    'Bert may cancel sessions due to adverse weather, COVID exposure procedures, or coach illness. You will not be charged for these.',
    'Life happens! The Late Cancel/No Show fee is waived for your first time each calendar year.',
];

export const WAIVER_TITLE =
    'CHERRY COACHING – HEALTH & FITNESS PROGRAMMING WAIVER AND RELEASE OF LIABILITY';

export const WAIVER_PARAGRAPHS = [
    'In consideration of my use of the health and fitness programming provided by the company, I expressly agree and contract, on behalf of myself, my heirs, executors, administrators, successors and assigns, that Cherry Coaching and its insurers, employees, officers, directors, and associates, shall not be liable for any damages arising from personal injuries (including death) sustained by me, or my guests, as a result of the use of the health and fitness programming, regardless of whether such injuries result, in whole or in part, from the negligence of the company.',
    'By the execution of this agreement, I accept and assume full responsibility for any and all injuries, damages (both economic and non-economic), and losses of any type, which may occur to me or my guest, and I hereby fully and forever release and discharge Cherry Coaching, its insurers, employees, officers, directors, and associates, from any and all claims, demands, damages, rights of action, or causes of action, present or future, whether the same be known or unknown, anticipated, or unanticipated, resulting from or arising out of the use of said health & fitness programming.',
    'I expressly agree to indemnify and hold Cherry Coaching harmless against any and all claims, demands, damages, rights of action, or causes of action, of any person or entity, that may arise from injuries or damages sustained by me or my guests.',
    'I agree to comply with all rules imposed by Cherry Coaching regarding the use of health and fitness programming. I agree to conduct myself in a controlled and reasonable manner at all times, and to refrain from using any health and fitness programming in a manner inconsistent with its intended design and purpose.',
    'I understand and acknowledge that the use of health and fitness programming involves risk of serious injury, including permanent disability and death.',
    'BY CHECKING THE BOX YOU ATTEST TO HAVING READ THE FOREGOING WAIVER AND RELEASE OF LIABILITY AND VOLUNTARILY EXECUTED THIS DOCUMENT WITH FULL KNOWLEDGE OF ITS CONTENT.',
];

export const SERVICE_OPTIONS = [
    '1:1 Training Sessions',
    'Custom Programming',
    'A blend of the two',
    'Not sure yet',
];

export const LOCATION_OPTIONS = [
    'In-person gym, private studio near Jimi Hendrix Park',
    'In-person gym, Rain City Fit on Cap Hill',
    'In-person field work around central Seattle',
    'Virtual',
];

export const REFERRAL_OPTIONS = [
    'A friend or family member',
    'A healthcare provider (PT, chiro, massage therapist, etc.)',
    'Google or web search',
    'Rain City Fit',
    'Saw me coaching at a gym or field',
];

export const REFERRAL_PROVIDER_TRIGGER =
    'A healthcare provider (PT, chiro, massage therapist, etc.)';

export const RATE_OPTIONS = ['Community', 'Standard', 'Abundance'];

// Condensed single table of every rate, all three tiers. Shown in a pop-out panel.
export const RATE_TIERS = ['Community', 'Standard', 'Abundance'];
export const RATE_TABLE = [
    { label: '60-min session', rates: ['$90', '$110', '$130'] },
    { label: 'Custom program, monthly', rates: ['$180', '$220', '$260'] },
    { label: 'Custom program, per workout', rates: ['$30', '$35', '$40'] },
];

export const PAYMENT_OPTIONS = [
    'Venmo — @bertcherry',
    'Zelle — bert.m.cherry@gmail.com',
    'PayPal — paypal.me/CherryCoaching',
    'Cash',
];
