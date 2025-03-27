import React from 'react';
import styles from '../Videos.module.css';
import { getRequestContext } from "@cloudflare/next-on-pages";
import { ClientOnly } from './client';

export const runtime = "edge";

async function VideoData(id) {
  const ps = await getRequestContext().env.videoDB.prepare(`SELECT * FROM demos WHERE id = '${id}' LIMIT 1`);
  const { results } = await ps.all();

  if (!results) {
      return new Response('Not found', { status: 404 });
  }
  return results[0];
}


export async function generateMetadata({ params }, parent) {
    // read route params
    const { id } = await params;
   
    // fetch data
    const video = await VideoData(id);
   
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
    const video = await VideoData(id);
    console.log(video);

    return (
        <>
            <div className={styles.videoDisplay}>
                <h1>{video.name}</h1>
                  <ClientOnly video={video}/>
                <p>{video.description}</p>
            </div>
        </>
    );
};

export default Video;