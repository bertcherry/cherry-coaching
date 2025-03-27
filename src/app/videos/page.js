import React from 'react';
import styles from './Videos.module.css';

export const metadata = {
    title: 'Exercise Demos',
    description: 'Cherry Coaching Exercise Demos',
}

const Videos = async () => {
    const data = await fetch(`/api/video/`).then((res) => res.json());

    const Video = ({video}) => {
        return (
            <>
                <li><Link href={`/videos/${video.id}`}>{video.name}</Link></li>
            </>
        );
    }

    if (!Object.keys(data).length) return <div />;

    return (
        <>
            <div className={styles.videosContainer}>
                <h1>Exercise Demos</h1>
                <ul className={styles.videoList}>
                    {data.map(video => 
                        <Video key={video.id} video={video} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default Videos;