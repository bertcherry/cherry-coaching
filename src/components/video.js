import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Stream } from "@cloudflare/stream-react";
import Nav from './Nav/Nav';

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
    
    console.log(video);

    return (
        <div>
            <Nav />
            <h1>{video.name}</h1>
            <div>
                <Stream controls src={video.id} />
            </div>
            <p>{video.description}</p>
            <p>
                <Link to="/">Go back</Link>
            </p>
        </div>
    );
};

export default Video;