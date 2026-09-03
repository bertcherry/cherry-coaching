'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Interest.module.css';

// Disclosure panel whose checkbox unlocks only after the reader has reached the
// end of the text. "Reached the end" is detected with an IntersectionObserver on
// a 1px sentinel at the very bottom of the content, so it behaves the same for a
// mouse scroll, a keyboard scroll (the body is focusable), a screen-reader
// virtual cursor moving through the text, and the case where the text is short
// enough that it needs no scrolling at all.
const AgreementPanel = ({ name, summary, checkboxLabel, checked, onChange, error, children }) => {
    const bodyRef = useRef(null);
    const endRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);

    useEffect(() => {
        if (!open || reachedEnd) return;
        const target = endRef.current;
        const root = bodyRef.current;
        if (!target || !root) return;

        if (typeof IntersectionObserver === 'undefined') {
            setReachedEnd(true); // never trap the reader if the API is missing
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) setReachedEnd(true);
            },
            { root }
        );
        io.observe(target);
        return () => io.disconnect();
    }, [open, reachedEnd]);

    const hintId = `${name}-hint`;
    const errorId = `${name}-error`;
    const describedBy =
        [error ? errorId : null, !reachedEnd ? hintId : null].filter(Boolean).join(' ') ||
        undefined;

    return (
        <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
            <details className={styles.policy} onToggle={(e) => setOpen(e.currentTarget.open)}>
                <summary>{summary}</summary>
                <div className={styles.policyBody} ref={bodyRef} tabIndex={0}>
                    {children}
                    <p className={styles.policyEnd}>— End of the {summary.toLowerCase()} —</p>
                    <span ref={endRef} className={styles.endSentinel} aria-hidden="true" />
                </div>
            </details>

            <label className={`${styles.choice} ${!reachedEnd ? styles.choiceDisabled : ''}`}>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    aria-required="true"
                    aria-disabled={reachedEnd ? undefined : 'true'}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={describedBy}
                    onChange={(e) => {
                        if (reachedEnd) onChange(e.target.checked);
                    }}
                />
                {checkboxLabel}
            </label>

            {!reachedEnd && (
                <span className={styles.help} id={hintId}>
                    Open the section above and read to the end to turn on this checkbox.
                </span>
            )}
            {error && (
                <span className={styles.error} id={errorId}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default AgreementPanel;
