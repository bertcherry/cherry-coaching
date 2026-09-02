'use client';

import React, { useRef, useState } from 'react';
import styles from './Interest.module.css';

// A disclosure panel whose checkbox stays disabled until the reader has opened
// it and scrolled its content to the end.
const AgreementPanel = ({ name, summary, checkboxLabel, checked, onChange, error, children }) => {
    const bodyRef = useRef(null);
    const [reachedEnd, setReachedEnd] = useState(false);

    const checkEnd = (el) => {
        if (!el) return;
        if (el.scrollHeight - el.scrollTop - el.clientHeight < 8) setReachedEnd(true);
    };

    return (
        <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
            <details
                className={styles.policy}
                onToggle={(e) => {
                    if (e.currentTarget.open) {
                        requestAnimationFrame(() => checkEnd(bodyRef.current));
                    }
                }}
            >
                <summary>{summary}</summary>
                <div
                    className={styles.policyBody}
                    ref={bodyRef}
                    tabIndex={0}
                    onScroll={(e) => checkEnd(e.currentTarget)}
                >
                    {children}
                    <p className={styles.policyEnd}>— End —</p>
                </div>
            </details>

            <label className={`${styles.choice} ${!reachedEnd ? styles.choiceDisabled : ''}`}>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    disabled={!reachedEnd}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-describedby={
                        [error ? `${name}-error` : null, !reachedEnd ? `${name}-hint` : null]
                            .filter(Boolean)
                            .join(' ') || undefined
                    }
                />
                {checkboxLabel}
            </label>

            {!reachedEnd && (
                <span className={styles.help} id={`${name}-hint`}>
                    Open the section above and scroll to the end to enable this checkbox.
                </span>
            )}
            {error && (
                <span className={styles.error} id={`${name}-error`} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default AgreementPanel;
