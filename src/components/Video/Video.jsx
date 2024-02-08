import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stream } from "@cloudflare/stream-react";
import Nav from '../Nav/Nav';
import styles from './Video.module.css';

const Video = () => {
    const [video, setVideo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getVideo = async () => {
            const resp = await fetch(`/api/video/${id}`);
            const videoResp = await resp.json();
            setVideo(videoResp);
        };

        getVideo();
    }, [id]);

    if (!Object.keys(video).length) return <div />;

    return (
        <div className={styles.container}>
            <Nav />
            <div className={styles.videoDisplay}>
                <h1>{video.name}</h1>
                <div className={styles.videoContainer}>
                    <Stream controls src={video.id} />
                </div>
                <p>{video.description}</p>
            </div>
        </div>
    );
};

export default Video;