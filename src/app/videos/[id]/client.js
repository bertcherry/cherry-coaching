'use client'

import React from 'react';
import { Stream } from "@cloudflare/stream-react";
import styles from '../Videos.module.css';

export function ClientOnly({video}) {
    return (
        <div className={styles.videoContainer}>
            <Stream controls src={video.id} />
        </div>
    )
}