import React from 'react';
import { Stream } from "@cloudflare/stream-react";
import styles from '../Videos.module.css';


export async function generateMetadata({ params }, parent) {
    // read route params
    const { id } = await params;
   
    // fetch data
    const video = await fetch(`api/video/${id}`).then((res) => res.json());
   
    return {
      title: video.name,
      description: video.description,
      type: video.other,
      openGraph: {
        video: video.id,
      },
    }
  }

const Video = async ({ params }) => {
    // read route params
    const { id } = await params;
   
    // fetch data
    const video = await fetch(`api/video/${id}`).then((res) => res.json());
    
    if (!Object.keys(video).length) return <div />;

    return (
        <>
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