import React from 'react';
import styles from './Videos.module.css';
import Link from 'next/link';
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export const metadata = {
    title: 'Exercise Demos',
    description: 'Cherry Coaching Exercise Demos',
}

const Videos = async () => {
    const ps = await getRequestContext().env.videoDB.prepare(`SELECT name, id FROM demos`);
    const { results } = await ps.all();

    const Video = ({video}) => {
        return (
            <li><Link href={`/videos/${video.id}`}>{video.name}</Link></li>
        );
    }

    if (!Object.keys(results).length) return <div />;

    return (
        <div className={styles.videosContainer}>
            <h1>Exercise Demos</h1>
            <ul className={styles.videoList}>
                {results.map(video => 
                    <Video key={video.id} video={video} />
                )}
            </ul>
        </div>
    );
};

export default Videos;