import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Stream } from "@cloudflare/stream-react";

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
        <div>
            <h1>{video.title}</h1>
            <div>
                <Stream controls src={video.uid} />
            </div>
            <p>{video.description}</p>
            <p>
                <Link to="/">Go back</Link>
            </p>
        </div>
    );
};

export default Video;