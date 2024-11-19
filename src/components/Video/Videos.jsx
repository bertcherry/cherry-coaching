import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import { Metadata } from '../Metadata';

const Videos = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const getVideo = async () => {
            const resp = await fetch(`/api/`);
            const videosResp = await resp.json();
            setData(videosResp);
        };

        getVideo();
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
            <div className={styles.videoDisplay}>
                <h1>Exercise Demos</h1>
                <ul>
                    {data.map(video => 
                        <Video key={video.id} video={video} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default Videos;