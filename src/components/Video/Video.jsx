import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stream } from "@cloudflare/stream-react";
import styles from './Video.module.css';
import { Metadata } from '../Metadata';
import { Helmet } from 'react-helmet-async';

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
        <>
            <Metadata title={video.name} description={video.description} type="video.other" creator="Bert Cherry"/>
            <Helmet>
                <meta property="og:video" content={video.id} />
            </Helmet>
            <div className={styles.videoDisplay}>
                <h1>{video.name}</h1>
                <div className={styles.videoContainer}>
                    <Stream controls src={video.id} />
                </div>
                <p>{video.description}</p>
            </div>
        </>
    );
};

export default Video;