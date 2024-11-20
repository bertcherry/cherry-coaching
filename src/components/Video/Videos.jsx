import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import { Metadata } from '../Metadata';

const Videos = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const getVideos = async () => {
            const resp = await fetch(`/api`);
            const videosResp = await resp.json();
            setData(videosResp);
        };

        getVideos();
    }, []);

    const Video = ({video}) => {
        return (
            <>
                <li><Link to={`/video/${video.id}`}>{video.name}</Link></li>
            </>
        );
    }

    if (!Object.keys(data).length) return <div />;

    return (
        <>
            <Metadata title="Exercise Demos" description="Cherry Coaching Exercise Demos" creator="Bert Cherry"/>
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